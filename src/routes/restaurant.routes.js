const express=require("express");
const restaurantRouter=express.Router();
const restaurantController=require("../controllers/restaurant.controller");
restaurantRouter.post("/",restaurantController.addRestaurant);
restaurantRouter.get("/",restaurantController.getRestaurants);
restaurantRouter.get("/:id",restaurantController.getRestaurantById);
module.exports=restaurantRouter;
