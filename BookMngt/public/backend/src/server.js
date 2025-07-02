const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");

const app = express();

app.use(express.json());
app.use("/", route);

mongoose
  .connect(
    "mongodb+srv://sumitcoc2nd:ltZ9asX4BPe9Rori@cluster0.wfi8x42.mongodb.net/E-Commerce"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("DB Connection Failed"));

app.listen(4000, (err) => {
  err
    ? console.log("Server Not Connected")
    : console.log("Server is Running at port 4000");
});
