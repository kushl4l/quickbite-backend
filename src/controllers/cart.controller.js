const cartModel=require("../models/cart.model");
const foodModel = require("../models/food.model");





async function addToCart(req,res) {
    try{

    const user=req.user;
    const {foodId}=req.body;
    const quantity = Number(req.body.quantity) || 1;
    if (quantity < 1) {
    return res.status(400).json({
        message: "Quantity must be at least 1"
    });
}

    const food=await foodModel.findById(foodId);
    if(!food){
        return res.status(404).json({
            message:"Food not found"
        });
    }

    const cart=await cartModel.findOne({
        user:user._id
    });

if (!cart) {
    const newCart = await cartModel.create({
        user: user._id,
        restaurant: food.restaurant,
        items: [
            {
                food: food._id,
                quantity
            }
        ]
    });

    return res.status(201).json({
        message: "Cart created successfully",
        cart: newCart
    });
}

if(cart.restaurant.toString() !== food.restaurant.toString()){
    return res.status(400).json({
        message:"Your cart contains items from different restaurant"
    });
}

const existingItem=cart.items.find(item=>
    item.food.toString()===foodId
);

if(existingItem){
    existingItem.quantity+=quantity;

} else{
    cart.items.push({
        food:food._id,
        quantity
    });
    
}
await cart.save();

return res.status(200).json({
    message:"Cart updated successfully",
    cart
})
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

async function getCart(req,res){
    const user=req.user;
    const cart=await cartModel.findOne({
        user:user._id
    }).populate("items.food", "_id name price image category");

    if(!cart){
        return res.status(200).json({
            message:"Cart is empty",
            cart:null
        });
    }

    return res.status(200).json({
        message:"Cart fetched successfully",
        cart
    })


}

async function updateQuantity(req,res){
    try{
    const user=req.user;
    const quantity = Number(req.body.quantity);

if (isNaN(quantity) || quantity < 1) {
    return res.status(400).json({
        message: "Quantity must be at least 1"
    });
}
    const cart=await cartModel.findOne({
        user:user._id
    });

    if(!cart){
        return res.status(404).json({
            message:"Cart not found"
        })
    }

    const {foodId}=req.params;

    const existingItem=cart.items.find(
        item=> item.food.toString()===foodId
    );

    if(!existingItem){
        return res.status(404).json({
            message:"Food not found in cart"
        });
    }


    existingItem.quantity=quantity;
    await cart.save();

    return res.status(200).json({
        message:"Quantity updated successfully",
        cart
    })

    } catch(err){
        return res.status(500).json({
            message:err.message
        })
    }



}

async function removeItem(req,res) {
    try{
    const user=req.user;
    const {foodId}=req.params;
    const cart=await cartModel.findOne({
        user:user._id
    });

    if(!cart){
        return res.status(404).json({
            message:"Cart not found"
        });
    }

    const index=cart.items.findIndex(
        item=>item.food.toString()===foodId
    );

    if(index === -1){
        return res.status(404).json({
            message:"Food not found in cart"
        });
    }

    cart.items.splice(index,1);

    if(cart.items.lenght===0){
        await cart.deleteOne();

        return res.status(200).json({
            message:"Cart is now empty and has been deleted"
        });
    }



    await cart.save();

    return res.status(200).json({
        message:"Food removed successfully",
        cart
    });
} catch(err){
    return res.status(500).json({
        message:err.message
    })
}

}

async function clearCart(req,res) {
    try{
    const user=req.user;
    const cart=await cartModel.findOne({
        user:user._id
    });
    
    if(!cart) {
    return res.status(404).json({
        message:"Cart is already empty"
    });
}

    await cart.deleteOne();

    return res.status(200).json({
        message:"Cart cleared successfully"
    });


    } catch(err){
        return res.status(500).json({
            message:err.message
        });
    }



}




module.exports={
    addToCart,
    getCart,
    updateQuantity,
    removeItem,
    clearCart
}