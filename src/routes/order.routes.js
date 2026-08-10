const authMiddleware=require("../middleware/auth.middleware");
const customerMiddleware=require("../middleware/customer.middleware");
const businessMiddleware = require("../middleware/business.middleware")
const orderController=require("../controllers/order.controller");

const express=require("express");
const orderRouter=express.Router();

orderRouter.post("/",authMiddleware,customerMiddleware,orderController.placeOrder);
orderRouter.get("/",authMiddleware,customerMiddleware,orderController.getAllOrders);
orderRouter.get(
    "/checkout",
    authMiddleware,
    customerMiddleware,
    orderController.getCheckout
);
orderRouter.get("/:OrderId",authMiddleware,customerMiddleware,orderController.getOrder);
orderRouter.get("/business/orders",authMiddleware,businessMiddleware,orderController.getRestaurantOrders);
orderRouter.patch("/:orderId/status",authMiddleware,businessMiddleware,orderController.updateRestaurantStatus);


module.exports=orderRouter