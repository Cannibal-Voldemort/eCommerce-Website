const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const { connectMongoDb } = require("./connection");


connectMongoDb(
  "mongodb+srv://amanSingh17:Aman%402024@cluster0.xdaj3.mongodb.net/"
).then(() => console.log("MongoDB Connected"));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin:"http://localhost:5173/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Contol',
        'Expires',
        'Pragma'
    ],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
