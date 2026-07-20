const mongoose=require("mongoose");
const cartSchema=new mongoose.Schema({
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
        
        quantity:{
            type:Number,
            default:1,
            min:[1,"Quantity must be atleast 1"]
        }

    }]
},{
    timestamps:true
})

const cartModel= mongoose.model("cart",cartSchema);
module.exports=cartModel