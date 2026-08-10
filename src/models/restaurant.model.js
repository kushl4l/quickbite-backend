const mongoose=require("mongoose");
const restaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name of the restaurant is required"]
    },

    description:String,

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: [true, "Owner is required"]
    },

    address:{
        type:String,
        required:[true,"Address is required"]
    },

    phone:{
        type:String,
        required:[true,"Phone number is required"]
    },
    images:[{
        type:String, //Array of images, idk the syntax//
    }],
    openingTime:{
        type:String,
        required:[true,"Field is required"]
    },
    
     closingTime:{
        type:String,
        required:[true,"Field is required"]
    },


    deliveryTime:{
        type:Number,
        required:true
    },

    categories:[String],
    
    rating:{
        type:Number, // idk stars lol
        default:0,
        min:0,
        max:5
    }

    
},{
    timestamps:true
})

const restaurantModel= new mongoose.model("restaurant",restaurantSchema);
module.exports=restaurantModel;