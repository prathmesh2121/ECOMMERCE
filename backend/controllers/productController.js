const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander");
const catchAsycnErrors = require("../middleware/catchAsyncErrors")


//create product -- admin
exports.createProduct = catchAsycnErrors(async(req,res, next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});


//get all products
exports.getAllProducts = catchAsycnErrors(async (req, res)=>
{
    const product = await Product.find();
    res.status(200).json({
        succes:true,
        product  
    });
})

// GET A PRODUCT DETAILES

exports.getProductDetailes = catchAsycnErrors(async(req, res, next)=>{

    const product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHander("Product Not Found", 404));
    }

    res.status(200).json({
        succes:true,
        product
    })

})



//update product --admin

exports.updateProduct = catchAsycnErrors(async(req, res, next)=>
{
    let product = Product.findById(req.params.id);

    if(!product)
    {
        return next(new ErrorHander("Product Not Found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, 
        { new:true, 
          runValidators:true,
          useFindandModify:false
        });

        res.status(200).json({
            succes:true,
            product
        })
})


//DELETE PRODUCT - ADMIN

exports.deleteProduct = catchAsycnErrors(async(req, res, next)=>
{
    const product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHander("Product Not Found", 404));
    }

    await product.deleteOne();


    res.status(200).json({
        succes:true,
        message:"Product Deleted successfully"
    })
})