const ErrorHander = require("../utils/errorhander")

module.exports = (err, req, res, next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal servar error";

// wrong mongodb id error



    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}