/*
const mongoose = require('mongoose')
const productSchema= new mongoose.Schema({
    
    name : { type : String, required : [true,'Please enter product name'], trim : true, maxLength :[100,'Product name cannot exceed 100 characters'] },
    
    price :{ type : Number, default : 0.0 },
    
    description : { type : String, required : [true,"Please enter product description"]},
    
    ratings:{ type : Number, default : 0 },
    
    images : [ { image: { type  : String, required : true }} ],
    
    category: { 
        type : String, required : [true,"Please enter product category"],
        enum : {
            values:['Electronics','Laptops','Mobile Phones','Accessories','HeadPhones','Food','Books','Clothes/Shoes','Beauty/Health','Sports','Outdoor','Home']
        },
        message : "Please select correct category"
    },
    
    seller :{ type : String, required : [true,"Please enter product seller"] } ,
    
    stock : { type : Number, required : [true ,'please enter product stocks'], maxLength : [20,'product stock cannot exceed 20']},

    numOfReviews : {type : Number,default: 0},

    reviews:[{
            user:mongoose.Schema.Types.ObjectId,
            rating : { type : Number, required : true },
            comment : {type: String, required : true}
    }],
    user :{
        type:mongoose.Schema.Types.ObjectId   //for which user add product ..
    },
    createdAt:{ type : Date,default : Date.now()}

})

module.exports = mongoose.model('Product',productSchema);
*/
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                'Electronics',   'Mobile Phones', 'Laptops', 'Accessories',  'Headphones',
                'Food',  'Books',  'Clothes/Shoes',  'Beauty/Health',  'Sports',
                'Outdoor',  'Home'
            ],
            message: "Please select correct category"
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [20, 'Product stock cannot exceed 20']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String
            }
        }
    ],
    user: {   //user (outside of reviews) ➝ refers to the admin or seller (or authenticated user) who added the product.
        type: mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', productSchema);