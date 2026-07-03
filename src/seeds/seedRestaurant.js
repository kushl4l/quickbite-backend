require("dotenv").config();
const mongoose = require("mongoose");

const connectToDB = require("../config/database");
const restaurantModel = require("../models/restaurant.model");

async function seedDB() {
    try {
        await connectToDB();

        // Replace this with a real business user's _id
        const ownerId = "6a43c434c1567b36982d74e9";

        await restaurantModel.deleteMany();

        await restaurantModel.insertMany([
            {
                name: "Domino's Rohini",
                description: "Pizza, pasta and garlic bread",
                owner: ownerId,
                address: "Sector 9, Rohini, Delhi",
                phone: "9876543210",
                images: [
                    "https://images.unsplash.com/photo-1513104890138-7c749659a591"
                ],
                openingTime: "10:00",
                closingTime: "23:00",
                deliveryTime: 30,
                categories: ["Pizza", "Italian", "Fast Food"]
            },
            {
                name: "KFC NSP",
                description: "Fried chicken, burgers and wraps",
                owner: ownerId,
                address: "Netaji Subhash Place, Delhi",
                phone: "9811111111",
                images: [
                    "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb"
                ],
                openingTime: "11:00",
                closingTime: "23:30",
                deliveryTime: 25,
                categories: ["Chicken", "Fast Food", "Burgers"]
            },
            {
                name: "McDonald's Pitampura",
                description: "Burgers, fries and beverages",
                owner: ownerId,
                address: "Pitampura, Delhi",
                phone: "9822222222",
                images: [
                    "https://images.unsplash.com/photo-1550547660-d9450f859349"
                ],
                openingTime: "09:00",
                closingTime: "23:00",
                deliveryTime: 20,
                categories: ["Burgers", "Fast Food"]
            },
            {
                name: "Pizza Hut Rajouri Garden",
                description: "Pizzas, pasta and desserts",
                owner: ownerId,
                address: "Rajouri Garden, Delhi",
                phone: "9833333333",
                images: [
                    "https://images.unsplash.com/photo-1513104890138-7c749659a591"
                ],
                openingTime: "10:00",
                closingTime: "23:00",
                deliveryTime: 28,
                categories: ["Pizza", "Italian"]
            },
            {
                name: "Starbucks CP",
                description: "Coffee, cakes and sandwiches",
                owner: ownerId,
                address: "Connaught Place, Delhi",
                phone: "9844444444",
                images: [
                    "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
                ],
                openingTime: "08:00",
                closingTime: "22:00",
                deliveryTime: 15,
                categories: ["Cafe", "Coffee", "Desserts"]
            },
            {
                name: "Biryani Blues Rohini",
                description: "Authentic Hyderabadi biryani",
                owner: ownerId,
                address: "Sector 7, Rohini, Delhi",
                phone: "9855555555",
                images: [
                    "https://images.unsplash.com/photo-1563379091339-03246963d29d"
                ],
                openingTime: "11:00",
                closingTime: "00:00",
                deliveryTime: 35,
                categories: ["Biryani", "North Indian"]
            }
        ]);

        console.log("✅ Restaurants seeded successfully!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDB();