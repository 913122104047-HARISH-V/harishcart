const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema= new mongoose.Schema({
    
    name : { type : String, required : [true,'Please enter name']},
    
    email :{ type : String, required :[true,'Please enter email'] , unique : true,validate : [validator.isEmail,'please enter valid email address']},
    
    password : { type : String, required : [true,"Please enter password"],maxlength : [6,'password cannot exceed 6 characters'], select : false}, 
    
    resetPasswordToken : String,

    resetPasswordTokenExpire : Date,
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      },
      
    role : { type  : String, default : 'user' },
    
    createdAt:{ type : Date,default : Date.now()}

})

userSchema.pre('save', async function(next){    // when 'save' operation happen, pre method 
    if(!this.isModified('password')){  //if our password is not modified it call next middleware
        next();
    }
    this.password = await bcrypt.hash(this.password,10)   // hashing password using bcrypt 
})

userSchema.methods.getJwtToken = function(){
   return jwt.sign({id :this.id},process.env.JWT_SECRET,{  // generate JWT token using id of the user by our given JWT secret key
    expiresIn : process.env.JWT_EXPIRE_TIME // expire time set
   })
}
userSchema.methods.isValidPassword = async function(enteredPassword){  // pass entered password while login by user
    return  bcrypt.compare(enteredPassword,this.password)  // compare the password with hash password
}  // use await key we use this method because compare()  return promise

userSchema.methods.getResetToken =  function (){
   // generate token 
   const token = crypto.randomBytes(20).toString('hex')
   // generate hash  and set to restPasswordToken
   this.resetPasswordToken= crypto.createHash('sha256').update(token).digest('hex')
   //set token expire time
   this.resetPasswordTokenExpire = Date.now()+30*60*100 // give 30 minutes after token generation
   return token

}
module.exports = mongoose.model('User',userSchema);

