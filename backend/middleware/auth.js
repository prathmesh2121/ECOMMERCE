const userModels = require("../models/userModels");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModels")
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    console.log("Token -> ",token);

    if(!token)
    {
        return next(new ErrorHander("Please login to access this resource", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id); // ???????
    next();
})

exports.authorizeRoles = (...roles) =>{
    return (req, res, next)=>{
        if( !roles.includes(req.user.role)) //not
        {
            console.log("User Role : ",req.user.role);
            return next(new ErrorHander(`Role : ${req.user.role} is not have authority to access this resource`, 403))
        }
        next();
    }
}