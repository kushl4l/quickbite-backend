const mongoose=require("mongoose");
const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Field is required"],
         trim: true

    },
    description:String,

    price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"]
},

    image:String,
    category:String,
    restaurant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"restaurant",
            required: [true, "Restaurant is required"]
        },
        isAvailable:{
            type:Boolean,
            default:true
        }
},{
    timestamps:true
})

const foodModel=new mongoose.model("food",foodSchema);
module.exports=foodModel;