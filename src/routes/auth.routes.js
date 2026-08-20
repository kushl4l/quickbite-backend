

const express=require("express");
const authRouter=express.Router();
const authController=require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.logIn);
authRouter.get("/me", authMiddleware, authController.getMe);

module.exports=authRouter;