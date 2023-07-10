const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,  "Please enter name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,  "Please enter description"]
    },
    price:{
        type:Number,
        required:[true,  "Please enter price"],
        maxLenght:[8, "Price can not exceed 8 char"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please enter catergory"],
    }, 
    Stock:{ 
        type:Number,
        //required:[true, "Please enter stock"],
        maxLenght:[4,"stock cannot exceed 4 char"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }    
})
module.exports = mongoose.model("Product",productSchema);