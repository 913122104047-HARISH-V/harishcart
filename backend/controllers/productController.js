const Product= require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require("../utils/cloudinary");


//get all product - api/v1/products
//add product - api/v1/admin/product/add
//get single product - api/v1/product/:id
//update product - api/v1/admin/product/:id
// delete product - api/v1/admin/product/:id
// Create or Update Review - api/v1/review
// get Reviews : api/v1/admin/reviews/:id

// Delete a review - api/v1/admin/review?productId=...&id=...
// get admin products  - api/v1/admin/products



//get all product - api/v1/products




//Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next)=>{
  const resPerPage = 2;
  
  let buildQuery = () => {
      return new APIFeatures(Product.find(), req.query).search().filter()
      // this function returns like this 
      /*{
        query: Product.find({
          name: { $regex: "phone", $options: "i" },
          price: { $gte: 500 }
        }),
        queryStr: { keyword: "phone", price: { gte: 500 }, page: "2" } // this refers to req.query we passed in eariler
      }*/
      
  }
  
  const filteredProductsCount = await buildQuery().query.countDocuments({})
  const totalProductsCount = await Product.countDocuments({});
  let productsCount = totalProductsCount;

  if(filteredProductsCount !== totalProductsCount) {
      productsCount = filteredProductsCount;
  }
  
  const products = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
      success : true,
      count: productsCount,
      resPerPage,
      products
  })
})

/*
//add product - api/v1/admin/product/add
exports.addProducts = catchAsyncError(async(req,res,next)=>{  // if any validation error ,cast error occurs
    req.body.user = req.user.id
    const product= await Product.create(req.body);    // to catch this type of error, we create middle ware like catchAsyncError 
   res.status(201).json({ success:true , product})   // and pass that error to error.js
});*/


// add product - api/v1/admin/product/add
exports.addProducts = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  let images = [];

  // req.body.images will be an array of base64 strings
  if (req.body.images) {
    for (let i = 0; i < req.body.images.length; i++) {
      const result = await cloudinary.uploader.upload(req.body.images[i], {
        folder: "products",
      });

      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  req.body.images = images;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


//get single product - api/v1/products/:id
exports.getSingleProduct = catchAsyncError( async(req,res,next) =>{
     const product = await Product.findById(req.params.id);
     if(!product){
        return next(new ErrorHandler("Product not found",404));  // here error object is created by using class ErrorHandler.   // next() method pass this ErrorHandler object to errormiddleware (error.js) , this action happened in app.js 
     }
     res.status(200).json({success:true,product});
});


//update product - api/v1/admin/product/:id
/*
exports.updateProduct = catchAsyncError(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({success:false,message: "product not found"});
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body, {
        new : true, // only get updated data after updatation
        runValidators : true //for create it set validation, but for update  we mention like this. 
    }); // here req.body send from frontend
    res.status(200).json({success:true,product});
});*/

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // handle image upload if file is present (FormData case)
  if (req.body.image) {
    const uploadResult = await cloudinary.uploader.upload(req.body.image, {
      folder: "products",
      resource_type: "image",
    });
    req.body.image = uploadResult.secure_url; // replace with Cloudinary URL
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});


// delete product - api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({success:false,message: "product not found"});
    }
    await product.deleteOne({_id:req.params.id});
    res.status(200).json({success:true,message : "product deleted"});
});


/*
// create review - api/v1/review
exports.createReview=catchAsyncError(async(req,res,next) =>{
    const {productId,rating,comment}=req.body;
    const userReview = {user: req.user.id,rating,comment}  // here we set one user review to one variable
    const product = await Product.findById(productId)
    // check user review exists 
    // here in find(),(all reviews) passed as parameter and 
    //and check where any review.id is equal to user id
    // if data already present, the user already reviewed so he try to update
    //if not ,first time he review the product
    const isReviewed =  product.reviews.find(review => review._id.toString()==req.user.id.toString()) 
    if(!isReviewed){  // first time review
      product.reviews.push(userReview);
      product.numOfReviews=product.reviews.length;
      console.log(product.reviews.length);
    }
    else{  //update the review
        product.reviews.forEach(review => {
             if(review.user.toString()==req.user.id.toString()){
                review.comment= userReview.comment;
                review.rating = userReview.rating;
             }
           });
    }
    // update the overall product rating here when one user reviewed.
    console.log('size:',product.reviews.length)
    product.ratings = product.reviews.reduce((acc,review)=>{
        console.log('1:',review.rating,'2:',acc)
        return review.rating+acc;
    },0) /product.reviews.length;

    console.log('obj',userReview.rating,'var',rating)
    console.log(product.ratings)
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;
    await product.save({validateBeforeSave :false})

    res.status(200).json({success:true});
});



//get reviews - api/v1/reviews?id={productId}
exports.getReview = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.query.id);
    res.status(200).json({success:true,reviews:product.reviews});
});


exports.deleteReview= catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.query.productId); // since each time reviews created , there is _id is generated for each review.
    const reviews = product.reviews.filter(review =>{  //_id is review ids 
        return review._id.toString() !== req.query.id.toString()
     });
    console.log(reviews.forEach(re=> { return re.comment;}));
     const numOfReviews =reviews.length;
     let ratings = reviews.reduce((acc,review)=>{
        return review.rating+acc;
    },0) /reviews.length;
    ratings = isNaN(product.ratings) ? 0 : ratings;
    await Product.findByIdAndUpdate(req.query.productId,{reviews,numOfReviews,ratings})
    res.status(200).json({success:true});
});

*/
// Create or Update Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;
  
    const review = {
      user: req.user.id,
      rating: parseFloat(rating),
      comment
    };
  
    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHandler("Product not found", 404));
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user.id.toString()
    );
  
    if (isReviewed) {
      // Update existing review
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id.toString()) {
          rev.comment = comment;
          rev.rating = parseFloat(rating);
        }
      });
    } else {
      // Add new review
      product.reviews.push(review);
    }
  
    // Update numOfReviews and average rating
    product.numOfReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((acc, rev) => acc + parseFloat(rev.rating), 0) /
      product.reviews.length;
  
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
      message: isReviewed ? "Review updated" : "Review added"
    });
  });


// get Reviews : api/v1/admin/reviews/:id
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
      return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
      success: true,
      reviews: product.reviews,
  });
});

 
// Delete a review - api/v1/admin/review?productId=...&id=...
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const { productId, id } = req.query;
  if (!productId || !id) {
    return next(new ErrorHandler("ProductId and reviewId are required", 400));
  }
    const product = await Product.findById(req.query.productId);
    if (!product) return next(new ErrorHandler("Product not found", 404));
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    const numOfReviews = reviews.length;
  
    let ratings =
      reviews.reduce((acc, rev) => acc + parseFloat(rev.rating), 0) /
      (reviews.length || 1); // prevent divide by zero
  
    ratings = isNaN(ratings) ? 0 : ratings;
  
    await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      numOfReviews,
      ratings
    });
  
    res.status(200).json({
      success: true,
      message: "Review deleted"
    });
  });

  // get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
  const products = await Product.find();
  res.status(200).send({
      success: true,
      products
  })
});
  