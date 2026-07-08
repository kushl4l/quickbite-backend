const restaurantModel = require("../models/restaurant.model");

async function addRestaurant(req, res) {
    try {
        const user = req.user;

        const {
            name,
            description,
            address,
            phone,
            images,
            openingTime,
            closingTime,
            deliveryTime,
            categories,
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
            categories,
        });

        return res.status(201).json({
            message: "Restaurant added successfully",
            restaurant,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

async function getRestaurants(req, res) {
    try {
        const restaurants = await restaurantModel.find();

        return res.status(200).json({
            message: "Restaurants fetched successfully",
            restaurants,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

async function getRestaurantById(req, res) {
    try {
        const { restaurantId } = req.params;

        const restaurant = await restaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
            });
        }

        return res.status(200).json({
            message: "Restaurant details fetched successfully",
            restaurant,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

async function updateRestaurant(req, res) {
    try {
        const user = req.user;
        const { restaurantId } = req.params;

        const restaurant = await restaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
            });
        }

        if (restaurant.owner.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this restaurant",
            });
        }

        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            restaurantId,
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        return res.status(200).json({
            message: "Restaurant updated successfully",
            updatedRestaurant,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

async function deleteRestaurant(req, res) {
    try {
        const user = req.user;
        const { restaurantId } = req.params;

        const restaurant = await restaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
            });
        }

        if (restaurant.owner.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to delete this restaurant",
            });
        }

        await restaurant.deleteOne();

        return res.status(200).json({
            message: "Restaurant deleted successfully",
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = {
    addRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
};