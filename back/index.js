const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const newsRouter = require("./route/routeNews");
const userRouter = require("./route/userRoute");
const parksRouter = require("./route/routeParks");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/news", newsRouter );
app.use("/api/users", userRouter);
app.use("/api/parks",parksRouter);



mongoose
  .connect(
    "mongodb+srv://farideaazmp202:farideaazmp202@cluster0.prbin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    console.log("Connected!");
  });
