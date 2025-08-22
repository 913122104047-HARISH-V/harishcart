const express= require('express');
const cors = require('cors');
const app=express();
const errorMiddeware=require('./middleware/error');
const cookieParser= require('cookie-parser');
const dotenv=require('dotenv')
const path = require('path'); // absolute path 

//to use the env variables from config file to node.js 
dotenv.config({path:path.join(__dirname,"config/config.env")}); // we use absolute path only , not direct path, because the node run outside of our application.



app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors({
    origin: 'https://harishcart.vercel.app', // frontend URL
    credentials: true
  }));

app.use(express.json()); // for accecpting json data from requests
app.use(cookieParser());

const products=require('./routes/productRoute')
const auth = require('./routes/authRoute')
const orders = require('./routes/orderRoute')


app.use('/api/v1/',products) // when error occured, 
app.use('/api/v1/',auth)
app.use('/api/v1/',orders)

app.use(errorMiddeware) // passed to here, in this middleware
module.exports=app;

