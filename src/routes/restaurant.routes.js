const express=require("express");
const restaurantRouter=express.Router();
const restaurantController=require("../controllers/restaurant.controller");
const foodController=require("../controllers/food.controller");
const authMiddleware=require("../middleware/auth.middleware");
const businessMiddleware=require("../middleware/business.middleware");
restaurantRouter.post("/",authMiddleware,businessMiddleware,restaurantController.addRestaurant);
restaurantRouter.get("/",restaurantController.getRestaurants);
restaurantRouter.get("/:restaurantId",restaurantController.getRestaurantById);
restaurantRouter.put("/:restaurantId",authMiddleware,businessMiddleware,restaurantController.updateRestaurant);
restaurantRouter.delete("/:restaurantId",authMiddleware,businessMiddleware,restaurantController.deleteRestaurant);
//Food
restaurantRouter.post("/:restaurantId/food",authMiddleware,businessMiddleware,foodController.addFood);
restaurantRouter.get("/:restaurantId/food",foodController.getAllFood);
restaurantRouter.put("/:restaurantId/food/:foodId",authMiddleware,businessMiddleware,foodController.updateFood);
restaurantRouter.delete("/:restaurantId/food/:foodId",authMiddleware,businessMiddleware,foodController.deleteFood);
module.exports=restaurantRouter;
