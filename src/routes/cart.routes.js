const express=require("express");
const authMiddleware = require("../middleware/auth.middleware");
const customerMiddleware = require("../middleware/customer.middleware");
const cartRouter=express.Router();

const cartController=require("../controllers/cart.controller");

cartRouter.post("/",authMiddleware,customerMiddleware,cartController.addToCart);
cartRouter.get("/",authMiddleware,customerMiddleware,cartController.getCart);
cartRouter.put("/:foodId",authMiddleware,customerMiddleware,cartController.updateQuantity);
cartRouter.delete("/:foodId",authMiddleware,customerMiddleware,cartController.removeItem);
cartRouter.delete("/",authMiddleware,customerMiddleware,cartController.clearCart);

module.exports=cartRouter;