const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const secret = process.env.SECRET || "pug file lamp slick"
const connection = process.env.DB_URI || "mongodb://localhost:27017/piniondb"

const jwt = require("express-jwt");

app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(
  connection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
);

app.use("/auth", require("./routes/authRouter"));
app.use("/api", jwt({ secret: secret, algorithms:["HS256"]}));
app.use("/api/client", require('./routes/clientRouter'))
app.use("/api/user", require("./routes/userRouter"))
app.use("/api/team", require("./routes/teamRouter"))
app.use("/api/event", require("./routes/eventRouter"))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthroizedError"){
    res.staus(err.status)
  }
  return res.send({ errMsg: err.message })
});

const path = require("path")

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Online")
})