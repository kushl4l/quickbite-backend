const restaurantModel=require("../models/restaurant.model");
const foodModel=require("../models/food.model");

async function addFood(req, res) {
    try {
        const user = req.user;
        const { restaurantId } = req.params;

        const restaurant = await restaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        if (restaurant.owner.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to add food to this restaurant"
            });
        }

        const {
            name,
            description,
            price,
            image,
            category
        } = req.body;

        const food = await foodModel.create({
            name,
            description,
            price,
            image,
            category,
            restaurant: restaurantId
        });

        return res.status(201).json({
            message: "Food item added successfully",
            food
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

async function getAllFood(req,res) {
    try{
    const {restaurantId}=req.params;
    const restaurant=await restaurantModel.findById(restaurantId);
    if(!restaurant){
        return res.status(404).json({
            message:"Restaurant not found"
        });
    }

    const allFood=await foodModel.find({
        restaurant:restaurantId
    });
    return res.status(200).json({
        message:"Food items fetched successfully",
        allFood
    });
}catch(err){
    return res.status(500).json({
        message:err.message
    });
}
    
}

async function updateFood(req,res) {
    try{
    const user=req.user;
    const {restaurantId}=req.params;
    const restaurant=await restaurantModel.findById(restaurantId);
    if(!restaurant){
        return res.status(404).json({
            message:"Restaurant not found"
        });
    }

      if (restaurant.owner.toString() !== user._id.toString()) {
    return res.status(403).json({
      message: "You are not allowed to update food items in this restaurant",
    });
  }

    const {foodId}=req.params;
    const food=await foodModel.findById(foodId);
    if (!food) {
    return res.status(404).json({
        message: "Food item not found"
    });
}

if (food.restaurant.toString() !== restaurantId) {
    return res.status(400).json({
        message: "Food does not belong to this restaurant"
    });
}

  

   const updatedFood = await foodModel.findByIdAndUpdate(
    foodId,
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  return res.status(200).json({
    message:"Food item updated successfully",
    updatedFood
  });
    } catch(err){
        return res.status(500).json({
            message:err.message
        });
    }

    
}

async function deleteFood(req,res) {
try{

    const user=req.user;

    const{restaurantId,foodId}=req.params;
    const restaurant=await restaurantModel.findById(restaurantId);
    if(!restaurant){
        return res.status(404).json({
            message:"Restaurant not found"
        });
    }

      if (restaurant.owner.toString() !== user._id.toString()) {
    return res.status(403).json({
      message: "You are not allowed to delete food items from this restaurant",
    });
  }

    const food=await foodModel.findById(foodId);
    if(!food){
        return res.status(404).json({
            message:"Food item not found"
        });
    }

    if (food.restaurant.toString() !== restaurantId) {
    return res.status(400).json({
        message: "Food does not belong to this restaurant"
    });
}

    await food.deleteOne();

    return res.status(200).json({
        message:"Food item deleted successfully"
    });

} catch(err){
    return res.status(500).json({
        message:err.message
    });
}
    
}

module.exports={
    addFood,
    getAllFood,
    updateFood,
    deleteFood
    
}