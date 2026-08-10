require("dotenv").config();

const bcrypt = require("bcrypt");
const connectToDB = require("../config/database"); // <-- change if your db.js path is different

const userModel = require("../models/user.model");
const restaurantModel = require("../models/restaurant.model");
const foodModel = require("../models/food.model");

const restaurantsData = [
{
    name: "Pizza Hut",
    ownerName: "Rahul Sharma",
    email: "owner@pizzahut-demo.com",
    phone: "9876543201",
    address: "Connaught Place, New Delhi",
    description: "Serving delicious pizzas, pasta and sides.",
    categories: ["Pizza","Italian"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    openingTime: "10:00",
    closingTime: "23:00",
    deliveryTime: 25,
    rating: 4.6
},
{
    name: "Domino's",
    ownerName: "Aman Verma",
    email: "owner@dominos-demo.com",
    phone: "9876543202",
    address: "Rajouri Garden, New Delhi",
    description: "Hot pizzas delivered fast.",
    categories: ["Pizza","Fast Food"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
    openingTime: "10:00",
    closingTime: "23:30",
    deliveryTime: 22,
    rating: 4.5
},
{
    name: "McDonald's",
    ownerName: "Rohit Gupta",
    email: "owner@mcd-demo.com",
    phone: "9876543203",
    address: "Saket, New Delhi",
    description: "Burgers, fries and shakes.",
    categories: ["Burger","Fast Food"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    openingTime: "09:00",
    closingTime: "23:00",
    deliveryTime: 18,
    rating: 4.4
},
{
    name: "Burger King",
    ownerName: "Neha Kapoor",
    email: "owner@bk-demo.com",
    phone: "9876543204",
    address: "Karol Bagh, New Delhi",
    description: "Flame grilled burgers.",
    categories: ["Burger"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    openingTime: "10:00",
    closingTime: "23:00",
    deliveryTime: 24,
    rating: 4.3
},
{
    name: "KFC",
    ownerName: "Siddharth Jain",
    email: "owner@kfc-demo.com",
    phone: "9876543205",
    address: "Lajpat Nagar, New Delhi",
    description: "World famous fried chicken.",
    categories: ["Chicken","Fast Food"],
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1200&q=80",
    openingTime: "10:00",
    closingTime: "23:30",
    deliveryTime: 28,
    rating: 4.5
},
{
    name: "Subway",
    ownerName: "Karan Mehta",
    email: "owner@subway-demo.com",
    phone: "9876543206",
    address: "Dwarka, New Delhi",
    description: "Fresh sandwiches and wraps.",
    categories: ["Healthy","Sandwich"],
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569",
    openingTime: "09:00",
    closingTime: "22:00",
    deliveryTime: 20,
    rating: 4.4
},
{
    name: "Starbucks",
    ownerName: "Priya Singh",
    email: "owner@starbucks-demo.com",
    phone: "9876543207",
    address: "Cyber Hub, Gurugram",
    description: "Coffee and desserts.",
    categories: ["Cafe","Coffee"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    openingTime: "08:00",
    closingTime: "22:00",
    deliveryTime: 15,
    rating: 4.7
},
{
    name: "Blue Tokai",
    ownerName: "Riya Arora",
    email: "owner@bluetokai-demo.com",
    phone: "9876543208",
    address: "Hauz Khas, New Delhi",
    description: "Specialty coffee.",
    categories: ["Cafe"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    openingTime: "08:00",
    closingTime: "21:00",
    deliveryTime: 19,
    rating: 4.8
},
{
    name: "Haldiram's",
    ownerName: "Ankit Bansal",
    email: "owner@haldirams-demo.com",
    phone: "9876543209",
    address: "Noida Sector 18",
    description: "Authentic Indian meals.",
    categories: ["Indian","Snacks"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    openingTime: "09:00",
    closingTime: "22:00",
    deliveryTime: 30,
    rating: 4.6
},
{
    name: "Bikanervala",
    ownerName: "Mohit Garg",
    email: "owner@bikanervala-demo.com",
    phone: "9876543210",
    address: "Janakpuri, New Delhi",
    description: "North Indian food & sweets.",
    categories: ["Indian"],
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
    openingTime: "09:00",
    closingTime: "22:00",
    deliveryTime: 27,
    rating: 4.5
},
{
    name:"Biryani Blues",
    ownerName:"Harsh Kumar",
    email:"owner@biryaniblues-demo.com",
    phone:"9876543211",
    address:"Malviya Nagar, Delhi",
    description:"Authentic Dum Biryani.",
    categories:["Biryani"],
    image:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
    openingTime:"11:00",
    closingTime:"23:00",
    deliveryTime:31,
    rating:4.7
},
{
    name:"Wow! Momo",
    ownerName:"Deepak Yadav",
    email:"owner@wowmomo-demo.com",
    phone:"9876543212",
    address:"Pitampura, Delhi",
    description:"India's favourite momos.",
    categories:["Momos"],
    image:"https://images.unsplash.com/photo-1526318896980-cf78c088247c",
    openingTime:"10:00",
    closingTime:"22:30",
    deliveryTime:26,
    rating:4.5
},
{
    name:"Taco Bell",
    ownerName:"Akash Singh",
    email:"owner@tacobell-demo.com",
    phone:"9876543213",
    address:"Select Citywalk, Delhi",
    description:"Mexican favourites.",
    categories:["Mexican"],
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1200&q=80",
    openingTime:"10:00",
    closingTime:"23:00",
    deliveryTime:24,
    rating:4.4
},
{
    name:"Belgian Waffle Co.",
    ownerName:"Sakshi Malhotra",
    email:"owner@waffle-demo.com",
    phone:"9876543214",
    address:"Pacific Mall, Delhi",
    description:"Desserts and waffles.",
    categories:["Dessert"],
    image:"https://images.unsplash.com/photo-1562376552-0d160a2f238d",
    openingTime:"10:00",
    closingTime:"22:30",
    deliveryTime:18,
    rating:4.6
},
{
    name:"Barbeque Nation",
    ownerName:"Vivek Khanna",
    email:"owner@bbq-demo.com",
    phone:"9876543215",
    address:"Vasant Kunj, Delhi",
    description:"Premium BBQ experience.",
    categories:["BBQ","North Indian"],
    image:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
    openingTime:"12:00",
    closingTime:"23:00",
    deliveryTime:40,
    rating:4.8
}
];

const foodData = {
    "Pizza Hut": [
        { name: "Margherita Pizza", description: "Classic cheese pizza", price: 299, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
        { name: "Farmhouse Pizza", description: "Loaded with fresh veggies", price: 399, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
        { name: "Veg Supreme", description: "Veggie delight", price: 449, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
        { name: "Garlic Bread", description: "Cheesy garlic bread", price: 179, category: "Sides", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec" },
        { name: "Choco Lava Cake", description: "Molten chocolate cake", price: 129, category: "Dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" }
    ],

    "Domino's": [
        { name: "Peppy Paneer", description: "Paneer pizza", price: 329, category: "Pizza", image: "https://images.unsplash.com/photo-1548365328-9f547fb0953b" },
        { name: "Cheese Burst", description: "Extra cheesy pizza", price: 449, category: "Pizza", image: "https://images.unsplash.com/photo-1548365328-9f547fb0953b" },
        { name: "Veg Extravaganza", description: "Loaded veggies", price: 499, category: "Pizza", image: "https://images.unsplash.com/photo-1548365328-9f547fb0953b" },
        { name: "Stuffed Garlic Bread", description: "Cheese stuffed", price: 199, category: "Sides", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec" },
        { name: "Choco Lava", description: "Chocolate dessert", price: 119, category: "Dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" }
    ],

    "McDonald's": [
        { name: "McAloo Tikki", description: "Veg burger", price: 79, category: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
        { name: "McSpicy Paneer", description: "Paneer burger", price: 199, category: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
        { name: "French Fries", description: "Crispy fries", price: 119, category: "Sides", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" },
        { name: "McFlurry", description: "Vanilla ice cream", price: 99, category: "Dessert", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb" },
        { name: "Coke", description: "Chilled drink", price: 60, category: "Beverage", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" }
    ],

    "Burger King": [
        { name: "Whopper", description: "Classic Whopper", price: 229, category: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
        { name: "Veg Whopper", description: "Veg Whopper", price: 199, category: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
        { name: "Chicken Fries", description: "Chicken fries", price: 179, category: "Sides", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d" },
        { name: "Onion Rings", description: "Crunchy rings", price: 129, category: "Sides", image: "https://images.unsplash.com/photo-1639024471283-03518883512d" },
        { name: "Chocolate Sundae", description: "Ice cream", price: 99, category: "Dessert", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb" }
    ],

    "KFC": [
        { name: "Hot & Crispy Chicken", description: "Signature chicken", price: 299, category: "Chicken", image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36" },
        { name: "Zinger Burger", description: "Chicken burger", price: 199, category: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
        { name: "Popcorn Chicken", description: "Chicken bites", price: 179, category: "Chicken", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d" },
        { name: "French Fries", description: "Salted fries", price: 109, category: "Sides", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" },
        { name: "Pepsi", description: "Cold drink", price: 60, category: "Beverage", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e" }
    ],

    "Subway": [
    { name: "Veggie Delight", description: "Fresh veggie sub", price: 199, category: "Sandwich", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569" },
    { name: "Paneer Tikka Sub", description: "Paneer sandwich", price: 249, category: "Sandwich", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569" },
    { name: "Chicken Teriyaki", description: "Chicken sub", price: 299, category: "Sandwich", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569" },
    { name: "Cookie", description: "Chocolate chip cookie", price: 59, category: "Dessert", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e" },
    { name: "Coke", description: "Cold drink", price: 60, category: "Beverage", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" }
],

"Starbucks": [
    { name: "Cappuccino", description: "Fresh coffee", price: 240, category: "Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
    { name: "Cafe Latte", description: "Milk coffee", price: 260, category: "Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
    { name: "Mocha", description: "Chocolate coffee", price: 280, category: "Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
    { name: "Brownie", description: "Chocolate brownie", price: 170, category: "Dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" },
    { name: "Blueberry Muffin", description: "Fresh muffin", price: 180, category: "Dessert", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa" }
],

"Blue Tokai": [
    { name: "Flat White", description: "Coffee", price: 220, category: "Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { name: "Cold Brew", description: "Cold coffee", price: 230, category: "Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { name: "Americano", description: "Classic coffee", price: 190, category: "Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { name: "Croissant", description: "Butter croissant", price: 150, category: "Bakery", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" },
    { name: "Cheesecake", description: "Classic cheesecake", price: 250, category: "Dessert", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad" }
],

"Haldiram's": [
    { name: "Chole Bhature", description: "North Indian", price: 180, category: "Indian", image: "https://images.unsplash.com/photo-1626132647523-66b46f1b9c8d" },
    { name: "Raj Kachori", description: "Street food", price: 140, category: "Snacks", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },
    { name: "Paneer Thali", description: "Complete meal", price: 260, category: "Indian", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe" },
    { name: "Gulab Jamun", description: "Sweet", price: 90, category: "Dessert", image: "https://images.unsplash.com/photo-1605197161470-5f08d89d5c6d" },
    { name: "Lassi", description: "Sweet lassi", price: 80, category: "Beverage", image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41" }
],

"Bikanervala": [
    { name: "Rajma Chawal", description: "Comfort food", price: 180, category: "Indian", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19" },
    { name: "Pav Bhaji", description: "Mumbai special", price: 170, category: "Indian", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84" },
    { name: "Masala Dosa", description: "South Indian", price: 190, category: "Indian", image: "https://images.unsplash.com/photo-1630383249896-424e482df921" },
    { name: "Rasgulla", description: "Sweet", price: 90, category: "Dessert", image: "https://images.unsplash.com/photo-1615485737651-9d7b14cb8c67" },
    { name: "Badam Milk", description: "Drink", price: 85, category: "Beverage", image: "https://images.unsplash.com/photo-1551024709-8f23befc6cf7" }
],

"Biryani Blues": [
    { name: "Chicken Dum Biryani", description: "Hyderabadi style", price: 349, category: "Biryani", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a" },
    { name: "Veg Biryani", description: "Veg biryani", price: 269, category: "Biryani", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a" },
    { name: "Paneer Biryani", description: "Paneer biryani", price: 299, category: "Biryani", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a" },
    { name: "Raita", description: "Curd", price: 50, category: "Sides", image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41" },
    { name: "Gulab Jamun", description: "Dessert", price: 80, category: "Dessert", image: "https://images.unsplash.com/photo-1605197161470-5f08d89d5c6d" }
],

"Wow! Momo": [
    { name: "Steamed Veg Momos", description: "Steamed momos", price: 149, category: "Momos", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c" },
    { name: "Chicken Momos", description: "Steamed chicken momos", price: 189, category: "Momos", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c" },
    { name: "Fried Momos", description: "Crispy momos", price: 179, category: "Momos", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c" },
    { name: "Moburg", description: "Momo burger", price: 169, category: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { name: "Pepsi", description: "Cold drink", price: 60, category: "Beverage", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e" }
],

"Taco Bell": [
    { name: "Crunchy Taco", description: "Mexican taco", price: 169, category: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38174c4a6c94" },
    { name: "Quesadilla", description: "Cheesy quesadilla", price: 239, category: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38174c4a6c94" },
    { name: "Burrito", description: "Loaded burrito", price: 259, category: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38174c4a6c94" },
    { name: "Nachos", description: "Cheesy nachos", price: 149, category: "Sides", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
    { name: "Pepsi", description: "Cold drink", price: 60, category: "Beverage", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e" }
],

"Belgian Waffle Co.": [
    { name: "Nutella Waffle", description: "Chocolate waffle", price: 239, category: "Dessert", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d" },
    { name: "Red Velvet Waffle", description: "Red velvet", price: 259, category: "Dessert", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d" },
    { name: "Chocolate Shake", description: "Thick shake", price: 199, category: "Beverage", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699" },
    { name: "Brownie Waffle", description: "Brownie loaded", price: 279, category: "Dessert", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d" },
    { name: "Cold Coffee", description: "Coffee", price: 180, category: "Beverage", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" }
],

"Barbeque Nation": [
    { name: "Chicken Tikka", description: "Grilled chicken", price: 349, category: "BBQ", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd" },
    { name: "Paneer Tikka", description: "Grilled paneer", price: 299, category: "BBQ", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd" },
    { name: "Seekh Kebab", description: "Juicy kebab", price: 379, category: "BBQ", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd" },
    { name: "Butter Naan", description: "Fresh naan", price: 60, category: "Bread", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },
    { name: "Kulfi", description: "Indian dessert", price: 99, category: "Dessert", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb" }
]
};

async function seedDatabase(){

    await connectToDB();

    console.log("Connected to MongoDB");

    await foodModel.deleteMany({});
    await restaurantModel.deleteMany({});
    await userModel.deleteMany({role:"business"});

    const hashedPassword = await bcrypt.hash("QuickBite@123",10);

    for(const data of restaurantsData){

        const owner = await userModel.create({
            role:"business",
            name:data.ownerName,
            email:data.email,
            password:hashedPassword,
            phone_no:data.phone,
            address:data.address
        });

        const restaurant = await restaurantModel.create({

            name:data.name,
            description:data.description,
            owner:owner._id,
            address:data.address,
            phone:data.phone,

            images:[data.image],

            openingTime:data.openingTime,
            closingTime:data.closingTime,

            deliveryTime:data.deliveryTime,

            categories:data.categories,

            rating:data.rating,

            isOpen:true
        });

        const foods = foodData[data.name];

        if (foods) {
         const formattedFoods = foods.map(food => ({
        ...food,
        restaurant: restaurant._id
        }));

    await foodModel.insertMany(formattedFoods);
}

        console.log(`✔ ${data.name} Created`);
    }

    console.log("\n🎉 15 Restaurants & Owners Seeded Successfully!");

    process.exit();

}

seedDatabase();