const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:path.join(__dirname,"../config/config.env")});
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary.v2; // CommonJS export
