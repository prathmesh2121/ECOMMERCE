const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator');
const crypto= require('crypto');
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:[true, "Please enter your name "],
        maxLength:[25, "Name Exceed 25 letters"],
        minLength:[2],
    },
    email:{
        type:String,
        require:[true, "Plz enter email"],
        unique:true,
        validate:[validator.isEmail,"plz enter valid email"]
    },
    password:{
        type:String,
        require:[true, "Plz enter password"],
        minLength:[4,"enter more than 4+ char1"],
        select:false
    },
    avtar:
        {
            public_id:{
                type:String,
                
            },
            url:{
                type:String,
             
            }
        },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resertPasswordExpire:Date,
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//JWT token

userSchema.methods.getJWTToken = function()
{
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

// compare password

userSchema.methods.comparePassword = async function(enteredPassword)
{
        return await bcrypt.compare(enteredPassword, this.password);
                            // entered by user , HASHED PASS
}

// forgot password - token reset

userSchema.methods.getResetPasswordToken = function()
{
    //token generation
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding to user schema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resertPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model("User",userSchema);