const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:[true,"User is required"]
        },

        restaurant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"restaurant",
            required:[true,"Restaurant is required"]
        },

        items:[{
            food:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"food",
                required:[true,"Food is required"]
            },
            name:{
                type:String,
                required:[true, "Food name is required"]
            },

            price: {
                type: Number,
                required: [true, "Price is required"]
            },

            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                min: 1
            }
        }],

        deliveryAddress:{
            type:String,
            required: [true, "Delivery address is required"]
        },


        totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
        min: 0
    },

        paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },

        orderStatus: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    }
},

{

    timestamps:true

});

const orderModel= mongoose.model("order",orderSchema);
module.exports=orderModel