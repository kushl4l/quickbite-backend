const jwt=require("jsonwebtoken");
const restaurantModel=require("../models/restaurant.model");
const userModel=require("../models/user.model");

async function addRestaurant(req,res) {
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    let decoded=null;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);

    }catch(err){
        return res.status(401).json({
            message:"User not authorized(wrong token)"
        })
    }

    const user=await userModel.findById(decoded.id);
    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}
    if(user.role!=="business"){
        return res.status(403).json({
            message:"Only business accounts can add restaurants"
        })
    }

    const {
    name,
    description,
    address,
    phone,
    images,
    openingTime,
    closingTime,
    deliveryTime,
    categories
} = req.body;

    const restaurant = await restaurantModel.create({
    name,
    description,
    owner: user._id,
    address,
    phone,
    images,
    openingTime,
    closingTime,
    deliveryTime,
    categories
});

return res.status(201).json({
    message:"Restaurant added successfully",
    restaurant
})
    


}
async function getRestaurants(req,res){

  try {
    const restaurants = await restaurantModel.find();

    return res.status(200).json({
        message: "Restaurants fetched successfully",
        restaurants
    });

} catch (err) {
    return res.status(500).json({
        message: err.message
    });
}
}

async function getRestaurantById(req,res) {
    const {id}=req.params;
    try{
    const restaurant=await restaurantModel.findById(id);
    if (!restaurant) {
    return res.status(404).json({
        message: "Restaurant not found"
    });
}
    return res.status(200).json({
        message:"Restaurant details fetched successfully",
        restaurant
    })

    } catch(err){
        
            return res.status(500).json({
                message:err.message
            });
        
    }
    
    
}

module.exports={
    addRestaurant,
    getRestaurants,
    getRestaurantById
    
}