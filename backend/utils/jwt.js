const getCookieOptions = require("./cookieOptions");

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken(); // this method mentioned in user models, that is give the token

  const options = {
    ...getCookieOptions(),
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
     // after 7 days from current time cookie expired
     //when user has access to any resoures route only , when he login. 
     // this is acheived by sent any information(user token) to cookie for mention user is login or not 
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports=sendToken;

