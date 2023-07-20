const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander");
const catchAsycnErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//create product -- admin
exports.createProduct = catchAsycnErrors(async(req,res, next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});


//get all products
exports.getAllProducts = catchAsycnErrors(async (req, res,next)=>
{
  // return next(new ErrorHander("ERROR : System will be Crashed",404))

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    console.log("TOTAL PRODUCT COUNT : ",productCount);

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filters()
    .pagination(resultPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        succes:true,
        products,
        productCount,
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
        product,
        productCount,
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

//  create / update review

exports.createProductReview = catchAsycnErrors(async(req,res,next)=>{

    const {rating, comment, productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev=> rev.user.toString() === req.user._id.toString());
    
    if(isReviewed)
    {
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
            {
                rev.rating = rating,
                rev.comment = comment
            }

        });
    }else{
        product.reviews.push(review);
        product.numoOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg += rev.rating;
    });

    product.rating = avg / product.reviews.length;
    console.log(product.rating)

    await product.save({validateBeforeSave:false})
    res.status(200).json({
        succes:true,
        message:"Product reviewed successfully"
    })
})

// Get All Reviews of a product
exports.getProductReviews = catchAsycnErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsycnErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });