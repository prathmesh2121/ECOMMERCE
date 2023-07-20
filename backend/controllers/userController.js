const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendTokens = require('../utils/jwttokens')
const User = require("../models/userModels")
const sendEmail = require("../utils/sendEmail")


exports.registerUser = catchAsyncErrors(async(req,res,next)=>
{
    const {name, email, password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"SAMPLE ID",
            url:"DP url"
        }
    })

    
    sendTokens(user,201,res);
})

//login user

exports.loginUser = catchAsyncErrors( async (req, res, next)=>{

    // const email = req.body.email;
    // const password = req.body.password;
    
    const { email, password } = req.body;

    //check user & psw are both given
    console.log(email, password);

    if( !email || !password)
    {
        return next(new ErrorHander("Enter both email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    //console.log("before invalid");
    if(!user)
    {
        return next(new ErrorHander("Invalid Email OR PASSWORD", 401));
    }

    const isPwdMatch = await user.comparePassword(password);
    if(!isPwdMatch)
    {
        return next(new ErrorHander("Invalid Email OR Password", 401));
    }
    sendTokens(user,200,res);
});

//logout user

exports.logout = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now()),
        httpOnly:true,

        
    })
    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})


//forgot password 
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    console.log(user.email)
    if(!user)
    {
        return next(new ErrorHander("User not found ", 404));
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    
    const message = `YOUR RESET PASSWORD URL IS : \n\n${resetPasswordUrl}`;

    try{
        await sendEmail({
            email:user.email,
            subject:`PASSWORD RECOVERY`,
            message,    
        })

        res.status(200).json({
            success:true,
            message:`email sent to ${user.email} successfully`
        });

    }catch(error)
    {
        user.resetPasswordToken = undefined;
        user.resertPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHander(error.message, 500));
    }
})

//get user detailes
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    });
})

//update user password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    
    const isPwdMatch = await user.comparePassword(req.body.oldPassword);
    if(!isPwdMatch)
    {
        return next(new ErrorHander("Old Password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new ErrorHander("Password doen not match ", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendTokens(user,200,res);
})


//update user PROFILE
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }
    //cloudanary

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators : true,
        useFindAndModify:false,
    })
   
    res.status(200).json({
        success:true,
        
    })
})

//get all users  - ADMIN can se ONLY
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });

//get SINGLE user  - ADMIN can se ONLY
exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    console.log("Single User : ",user)
    if(!user)
    {
        return next(new(ErrorHander(`User does not exits with ${req.params.id}`)))
    }
    res.status(200).json({
        success:true,
        user,
        
    })   
})



//update user ROLE -- ADMIN
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
   
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators : true,
        useFindAndModify:false,
    })
   
    res.status(200).json({
        success:true,
        user,
        
    })
})



//DELETE user PROFILE -- ADMIN
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

   //remove cloudnary later

   const user = await User.findById(req.params.id);

   if(!user)
   {
    return next(new(ErrorHander(`User does not exits with ${req.params.id}`)))
   }

   await user.deleteOne();
   

       res.status(200).json({
        success:true,
        message:"user deleted successfully"
        
    })
})

