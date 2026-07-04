const express=require("express");
const restaurantRouter=express.Router();
const restaurantController=require("../controllers/restaurant.controller");
restaurantRouter.post("/",restaurantController.addRestaurant);
restaurantRouter.get("/",restaurantController.getRestaurants);
restaurantRouter.get("/:id",restaurantController.getRestaurantById);
restaurantRouter.put("/:id",restaurantController.updateRestaurant);
restaurantRouter.delete("/:id",restaurantController.deleteRestaurant);
module.exports=restaurantRouter;
