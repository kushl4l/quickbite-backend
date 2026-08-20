const userModel=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


async function signUp(req,res){
    try{
const {name,email,password,address,role,phone_no}=req.body;
const existingUser= await userModel.findOne({
    email
})


if(existingUser){
    return res.status(409).json({
        message:"User already exists"
    })
};

const hashedPassword=await bcrypt.hash(password,10);

const user=await userModel.create({
    role,
    name,
    email,
    password:hashedPassword,
    phone_no,
    address
    
});

const token=jwt.sign({
    id:user._id
},process.env.JWT_SECRET,{expiresIn:"1d"});

res.cookie("token",token);
res.status(201).json({
    message:"User registered successfully",
    user:{
        _id: user._id,
        role:user.role,
        name:user.name,
        email:user.email,
        phone_no:user.phone_no,
        address:user.address
    }
})
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }

};

async function logIn(req,res){
    const {email,password}=req.body;
    const user=await userModel.findOne({
        email
    });

    if(!user){
        return res.status(404).json({
            message:"This email is not registered"
        })
    }


    
    const isPasswordValid=await bcrypt.compare(password,user.password);
    
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password is incorrect"
        })
    }

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);
    res.status(200).json({
        message:"User logged in successfully",
        user:{
    _id:user._id,
    role:user.role,
    name:user.name,
    email:user.email,
    phone_no:user.phone_no,
    address:user.address
}
    })

}

async function getMe(req, res) {
    return res.status(200).json({
        user: req.user
    });
}



module.exports={
    signUp,
    logIn,
    getMe
    
}


