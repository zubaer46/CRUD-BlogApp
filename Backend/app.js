require("dotenv").config();

const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const userRouter = require("./api/users/user.router");
const newsRouter = require("./api/news/news.router");

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/news", newsRouter);
const port = process.env.APP_PORT || 3000;


app.listen(port, () =>{
    console.log("Server up and running on PORT: ", port);
}); 