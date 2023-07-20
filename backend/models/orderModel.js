const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    shippingInfo:{

        address : {type : String , require:true},
        city    : {type : String , require:true},
        state   : {type : String , require:true},
        pinCode : { type:Number ,  require:true},
        phoneNo : { type:Number ,  require:true},
    },

    orderItems:[{
                  name    : {type : String , require:true},
                  price   : {type : Number , require:true},                      
                  quantity: {type : Number , require:true},
                  image   : {type : String , require:true},
                  product : {type : mongoose.Schema.ObjectId , ref:"Product", require:true},
    },],

    user : {type : mongoose.Schema.ObjectId , ref:"User", require:true},

    paymentInfo : {
                    id:
                    {
                        type:String,
                        required: true,
                    },
                    status:
                    {
                        type:String,
                        required: true,
                    },
    },          //product closed


                    paidAt: {
                        type: Date,
                        required: true,
                    },
                    itemsPrice:{
                        type:Number,
                        default:0,
                    },
                    taxPrice:{
                        type:Number,
                        default:0,
                    },
                    shippingPrice:{
                        type:Number,
                        default:0,
                    },
                    totalPrice:{
                        type:Number,
                        default:0,
                    },
                    orderStatus: {
                        type: String,
                        required: true,
                        default: "Processing..........",
                      },
                      deliveredAt: Date,
                      createdAt: {
                        type: Date,
                        default: Date.now,
                      },
                
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;