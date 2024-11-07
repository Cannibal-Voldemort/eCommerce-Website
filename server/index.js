const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectMongoDb } = require("./connection");
const authRouter = require("./routes/auth/auth-route");
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-route')
const shopOrderRouter = require('./routes/shop/order-routes')


connectMongoDb(
  "mongodb+srv://amanSingh17:Aman%402024@cluster0.xdaj3.mongodb.net/"
).then(() => console.log("MongoDB Connected"));

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter)
app.use('/api/shop/products', shopProductRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
