const products=require('../data/products.json');
const Product =require('../models/productModel');
const dotenv = require('dotenv');
const connectDatabase=require('../config/database');
dotenv.config({path:'backend/config/config.env'}); 
connectDatabase();// use above env variable, this method call the database

const seedProduct = async()=>{
    try{ 
        await Product.deleteMany();
        console.log('All data are deleted');
        await Product.insertMany(products);
        console.log('All data are inserted');
    }
    catch(error){
        console.log(error.message);
    }
    process.exit();
};
seedProduct();



