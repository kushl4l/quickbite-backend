const express=require("express");
const authRouter=express.Router();
const authController=require("../controllers/auth.controller")
authRouter.post("/signup",authController.signUp);
authRouter.post("/login",authController.logIn);
module.exports=authRouter;