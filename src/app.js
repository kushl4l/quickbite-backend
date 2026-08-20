const express=require("express");
const cors=require("cors");
const app=express();
app.use(
    cors({
        origin: function (origin, callback) {

            if (
                !origin ||
                origin === "http://localhost:5173" ||
                origin.endsWith(".vercel.app")
            ) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }

        },
        credentials: true,
    })
);
const authRouter=require("./routes/auth.routes");
const restaurantRouter=require("./routes/restaurant.routes.js");
const cartRouter=require("./routes/cart.routes.js");
const orderRouter=require("./routes/order.routes.js");
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/restaurants',restaurantRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);


module.exports=app;