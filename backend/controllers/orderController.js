const Order= require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//create new order - api/v1/order/new
//getsingle order - api/v1/order/:id   --here it is order id
//get logged user orders - api/v1/myorders

// admin - get all orders - api/v1/admin/orders
// admin - update orders - api/v1/admin/order/:id  // for orders item ,then stock is decresed
//Admin :delete Order - api/v1/admin/order/:id


//create new order - api/v1/order/new
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {orderItems,shippingInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paymentInfo} = req.body;
    const order=await Order.create({orderItems,shippingInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paymentInfo,paidAt:Date.now(),user:req.user.id})
    res.status(200).json({ success : true, order })
});

//getsingle order - api/v1/order/:id   --here it is order id
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{      
    const order= await Order.findById(req.params.id).populate('user','name email');
    if(!order){
        return next(new ErrorHandler(`Order not found with this id :${req.params.id}`,404))
    }
    res.status(200).json({ success : true, order })
})

//get logged user orders - api/v1/myorders
exports.myOrders=catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user : req.user.id});
    res.status(200).json({ success : true, orders })
})

// admin - get all orders - api/v1/admin/orders
exports.orders=catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount =0;
    orders.forEach(order =>{totalAmount+=order.totalPrice});
    res.status(200).json({ success : true, totalAmount,orders })
})

// admin - update orders - api/v1/admin/order/:id  // for orders item ,then stock is decresed
exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    const order= await Order.findById(req.params.id)
    if(order.orderStatus=='Delivered'){
        return next(new ErrorHandler('Order has been already delivered',404));
    }
    console.log(order.orderItems);
    //update the product stock for each ordered item
    const updateStockPromises = order.orderItems.map( async orderItem =>{
        await updateStock(orderItem.product,orderItem.quantity)
    })
    await Promise.all(updateStockPromises);
    order.orderStatus=req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save()

    res.status(200).json({ success : true })
})

async function updateStock(productId,quantity){
    const product = await Product.findById(productId);
    product.stock=product.stock-quantity;
    await product.save({validateBeforeSave:false})
}

//Admin :delete Order - api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }
    await order.deleteOne();
    res.status(200).json({success: true })
})