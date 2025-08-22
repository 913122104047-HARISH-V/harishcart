const catchAsyncError = require("../middleware/catchAsyncError")
const User = require('../models/userModel');
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require('../utils/jwt')
const crypto=require('crypto')
const cloudinary = require("../utils/cloudinary"); // import Cloudinary config
//register user details - api/v1/register
// login user details - api/v1/login
// logout - /api/v1/logout
// forgot password -/api/v1/password/forgot
// reset password - /api/v1/password/reset/:token 
//change password - /api/v1/myprofile/update/password
//get user profile - /api/v1/myprofile
// updateprofile - /api/v1/myprofile/update

//admin : get all users -  /api/v1/admin/users
//admin : get specific user - /api/v1/admin/user/:id
//admin : update specific user - /api/v1/admin/user/:id
//admin - delete user - /api/v1/admin/user/:id


//admin : update specific user - /api/v1/admin/user/:id



/*//register user details - api/v1/register
exports.registerUser = catchAsyncError( async(req,res,next) => {  //here method for register the new user details,
   const {name,email,password}=req.body
   const user = await User.create({name,email,password})  // here user details and json web token is created 
   sendToken(user,201,res)  //here jwt token is sended for their user and cookie also setted
});*/



exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  let avatarUrl;

  if (avatar) {
    const uploadResult = await cloudinary.uploader.upload(avatar, {
      folder: "user_avatars",
      resource_type: "image",
    });
    avatarUrl = uploadResult.secure_url;
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: avatarUrl,
  });

  sendToken(user, 201, res);
});




// login user details - api/v1/login
exports.loginUser = catchAsyncError( async(req,res,next) => { //this method user login by their email,password 
    const {email,password }=req.body
    if(!email || !password) {
        return next(new ErrorHandler("Please enter email & password",400));
    }
    //finding user data in database
    const user = await User.findOne({email}).select('+password');  // here we get password from req using select
    if(!user){
        return next(new ErrorHandler("Invalid email & password",401)); 
    }
    if(! await user.isValidPassword(password)){
       return next(new ErrorHandler('Invalid email & password',401));
    }
    sendToken(user,201,res) //here jwt token is created for their user and cookie also setted
 });

// logout - /api/v1/logout
 exports.logoutUser = (req,res,user) =>{      // for user logout we simply set token to null in the cookie 
    res.cookie('token',null,{ expires : new Date(Date.now()),httpOnly : true})
        .status(200).json({ success: true, message:'Loggedout'})
 }

 // forgot password -/api/v1/password/forgot
exports.forgotPassword = catchAsyncError( async(req,res,next)=>{  // user forgot password , then use their email to their details
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return next(new ErrorHandler('User not found with this email',404));
    }
    const resetToken =user.getResetToken();  // we generate new token and expire time for reset operation by using method

    await user.save({validateBeforeSave : false}) // save data of reset token and expire and no validation perform
    //create reset url
    const resetUrl =`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `your password reset url is as follows \n\n${resetUrl}\n\n If you not have not requested this email, then ignore it.`;
    
    try{   // for sent reset url and msg to that user email id 
        sendEmail({email : user.email, subject : 'Harishcart password Recovery', message })
        res.status(200).json({ success: true, message : `Email sent to ${user.email}`})
    }
    catch(error){
        user.resetPasswordToken = undefined;  // if email is not send, then undefined the resettoken and expire time in db
        user.resetPasswordTokenExpire=undefined;
        await user.save({validateBeforeSave : false})
        return next(new ErrorHandler(error.message),500)
    }
})


// reset password - /api/v1/password/reset/:token 

// this method is called when user clik the reset url 
exports.resetPasword = catchAsyncError( async(req,res,next)=>{  
 const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
 const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire:{$gt : Date.now()}
 })
 if(!user){
    return next(new ErrorHandler('Password reset token is invalid or expired'));
 }
  
  if(req.body.password!=req.body.confirmPassword){
    return next(new ErrorHandler('Password does not match'))
  }

  user.password = req.body.password;
  user.resetPasswordToken=undefined;
  user.resetPasswordTokenExpire=undefined;
  await user.save({validateBeforeSave: false})

  sendToken(user,201,res)
})


//change password - /api/v1/myprofile/update/password
exports.changePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');

    //check 
    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect',401));
    }
    // assign new password
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({success : true})

});


//get user profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError( async(req,res,next)=>{
    const user = await User.findById(req.user.id);  //since user login, isAuthenticatedUser method called eariler , from where we get used id
    res.status(200).json({success: true,user})
})


// updateprofile - /api/v1/myprofile/update
exports.updateUserProfile = catchAsyncError(async(req,res,next)=>{
    const newUserData={ name : req.body.name, email : req.body.email};
    const user= await User.findByIdAndUpdate(req.user.id,newUserData,{ new:true,runValidators:true });
    res.status(200).json({success: true,user})
})

/*
exports.updateUserProfile = catchAsyncError(async(req,res,next)=>{
    const user= await User.findByIdAndUpdate(req.user.id,{name:req.body.name},{ new:true,runValidators:true });
    res.status(200).json({success: true,user})
})*/


//admin : get all users -  /api/v1/admin/users
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({success: true,users})
})


//admin : get specific user - /api/v1/admin/user/:id
exports.getUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        next(new ErrorHandler(`User not found with this id ${req.params.id}`,404));
    }
    res.status(200).json({success: true,user})
})
//admin : update specific user - /api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async(req,res,next)=>{
    const newUserData={ name : req.body.name, email : req.body.email,role : req.body.role};
    const user= await User.findByIdAndUpdate(req.params.id,newUserData,{ new:true,runValidators:true });
    res.status(200).json({success: true,user})
})

//admin - delete user - /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        next(new ErrorHandler(`User not found with this id ${req.params.id}`,404));
    }
    await user.deleteOne({_id:req.params.id});
    res.status(200).json({success: true})
})