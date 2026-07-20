const cartModel = require("../models/cart.model");
const foodModel=require("../models/cart.model");
const orderModel = require("../models/order.model");
const restaurantModel= require("../models/restaurant.model");



async function placeOrder(req,res) {

    const user=req.user;
    const cart= await cartModel.findOne({
        user:user._id
    }).populate("items.food","_id name price quantity");

    if(!cart){
        return res.status(404).json({
            message:"Cart is empty"
        });
    }

    const orderItems=[];
    let totalAmount=0;
    
    for(const item of cart.items){
        orderItems.push({
            food:item.food._id,
            name:item.food.name,
            price:item.food.price,
            quantity:item.quantity
        });

        totalAmount+=item.food.price * item.quantity;
    }

    const deliveryAddress =
    req.body.deliveryAddress?.trim() || user.address;

    const order= await orderModel.create({
        user:user._id,
        restaurant:cart.restaurant,
        items:orderItems,
        deliveryAddress,
        totalAmount
    });

    await cart.deleteOne();

    return res.status(201).json({
    message: "Order placed successfully",
    order
});


}

async function getAllOrders(req,res){
    const user=req.user;
   const orders = await orderModel
    .find({ 
        user: user._id 
    })
    .populate("restaurant", "name image")
    .populate("items.food", "image");

    if(orders.length===0){
        return res.status(200).json({
            message:"You have no orders",
            orders: []
        });
    }

    return res.status(200).json({
        message:"Orders fetched successfully",
        orders
    });

}

async function getOrder(req,res) {
    try{
    const user=req.user;
    const {orderId}=req.params;
    const order= await orderModel.findOne({
        _id:orderId,
        user:user._id
    })
    .populate("restaurant", "name image")
    .populate("items.food", "image");



    if(!order){
        return res.status(404).json({
            message:"Order not found"
        });
    }

    return res.status(200).json({
        message:"Order fetched successfully",
        order
    })
} catch(err){
    return res.status(500).json({
        message:err.message
    })
}
    
}

async function getRestaurantOrders(req,res) {
    try{
    const user=req.user;
    const restaurant= await restaurantModel.findOne({
        owner:user._id
    });

    if(!restaurant){
        return res.status(404).json({
            message:"Restaurant not found"
        });
    }

    const orders = await orderModel.find({
        restaurant: restaurant._id
    })
    .sort({ createdAt: -1 })
    .populate("user", "name phone_no")
    .populate("items.food", "image");

    if(orders.length===0){
        return res.status(200).json({
            message:"You have no orders",
            orders: []
        });
    }

    return res.status(200).json({
        message:"Orders fetched successfully",
        orders
    });
    } catch(err){
        return res.status(500).json({
            message:err.message
        })
    }

    
}

async function updateRestaurantStatus(req,res) {
    try{
    const user=req.user;
    const {orderId}=req.params;
    const { status } = req.body;
    const restaurant= await restaurantModel.findOne({
        owner:user._id
    });

    if(!restaurant){
        return res.status(404).json({
            message:"Restaurant not found"
        });
    }

    const order= await orderModel.findOne({
        _id:orderId
    });

    if(!order){
        return res.status(404).json({
            message:"Order not found"
        });

    }

    if(order.restaurant.toString()!==restaurant._id.toString()){
        return res.status(403).json({
            message:"Unauthorized access"
        });
    }

    if (status === "Cancelled") {
    if (
        order.orderStatus !== "Pending" &&
        order.orderStatus !== "Accepted"
    ) {
        return res.status(400).json({
            message: "This order can no longer be cancelled."
        });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({
        message: "Order cancelled successfully",
        order
    });
}

    const orderFlow = [
    "Pending",
    "Accepted",
    "Preparing",
    "Out for Delivery",
    "Delivered"
    ];

    const currentIndex=orderFlow.indexOf(order.orderStatus);
    const newIndex=orderFlow.indexOf(status);

    if (newIndex === -1) {
    return res.status(400).json({
        message: "Invalid order status"
    });
}

    if(newIndex!==currentIndex+1) {
        return res.status(400).json({
            message:"Invalid status transition"
        });
    }

   order.orderStatus = status;
   await order.save();

   return res.status(200).json({
    message:"Status Updated successfully",
    orderStatus: order.orderStatus
   })
} catch(err){
    return res.status(500).json({
        message:err.message
    });
}
}

module.exports={
    placeOrder,
    getAllOrders,
    getOrder,
    getRestaurantOrders,
    updateRestaurantStatus
}