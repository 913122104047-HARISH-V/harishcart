const catchAsyncError = require("./catchAsyncError");
const jwt= require('jsonwebtoken');  
const User= require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies; // get the token from the cookie
    if(!token){    // if token is undefined
        return next(new ErrorHandler('Login first to handle the resoures',401)) 
    }
    // decode the jwt token 
    const decoded = jwt.verify(token,process.env.JWT_SECRET) // pass token and jwt secret key value so,we get orginal data form the token (i.e, id of the user) like { id: '676e6e64005a19877ce460fb', iat: 1735290788, exp: 1735895588 }
    req.user= await User.findById(decoded.id)  // then we assign this value in  field 'id' of user and use this user field in req object in next 'middleware'
    next();
})

exports.authorizeRoles = (...roles)=>{ // we must role parameter here 
   return (req,res,next) =>{
     if(!roles.includes(req.user.role)){  // from the previous fun , we get used role from the request object
        return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401));
     }
     next(); // if it role is admin ,then access this resources , if not show error
   }
}
