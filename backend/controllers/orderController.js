const Order = require("../models/orderModel")
const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});



//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.findById(req.params.id).populate("user","name email");

  if(!order)
  {
    return next(ErrorHander("Order not found with this id .... ", 404));
  }
  res.status(200).json({
    success:true,
    order,
  })
})



//get LOGED IN USER order
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
  const orders = await Order.find({user: req.user._id});
  console.log("user id ",req.user._id)
  res.status(200).json({
    success:true,
    orders,
  })
})


//get ALL order --ADMIN
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
  const orders = await Order.find();

  let total = 0;
  orders.forEach((order)=>{
    total += order.totalPrice;
  })


  res.status(200).json({
    success:true,
    total,
    orders,
  })
})



//get update order --ADMIN
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.findById(req.params.id);

  if(!order)
  {
    return next(new ErrorHander("Order not found with this id .... ", 404));
  }
  if(order.orderStatus === "Delivered")
  {
    return next(new ErrorHander("Already delivered this product...",400));
  }

  order.orderItems.forEach(async (o)=>{
    await updateStock(o.product, o.quantity);
  })

  order.orderStatus = req.body.status;

  if(req.body.status === "Delivered")
  {
    order.deliveredAt = Date.now();
  }
  await order.save({validateBeforeSave:false});

  res.status(200).json({
    success:true,
    order,
  })
})

async function updateStock(id, quantity)
{
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({validateBeforeSave:false});
}



//delete order


exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.findById(req.params.id);
  if(!order)
  {
    return next(new ErrorHander("Order not found with this id .... ", 404));
  }
  await order.deleteOne()

  res.status(200).json({
    success:true,
  })
})

