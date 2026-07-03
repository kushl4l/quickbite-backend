const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    role:{
        type:String,
        required:[true,"Role should be specified"],
        enum:{
            values:["customer","business","admin"],
            message:"{VALUE} is not a valid role"
        }
    },
    name:{
        type:String,
        required:[true,"Your name is required"]
    },
    email:{
        type:String,
        required:[true,"Your email is required"],
        unique:[true,"This is email is already registered"]
    },
    phone_no:{
        type:String,
        required:[true,"Your phone number is required"]
    },
    password:{
        type:String,
        required:[true,"Your password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },

    address:{
        type:String,
        required:[true,"Your address is required"]
    },
    
    
},


{
    timestamps:true
}


);

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;