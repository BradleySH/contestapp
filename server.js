const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("express-jwt");
process.env.SECRET


app.use(express.json());
app.use(morgan("dev"));

const uri = 'mongodb+srv://dbUser:Vschool2021@cluster0.vnuzs.mongodb.net/test'

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
);

app.use("/api", jwt({ secret: process.env.SECRET, algorithms:["HS256"]}));



app.listen(9000, () => {
  console.log("Server is running on Port 9000")
})