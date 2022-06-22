const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const http = require("http").Server(app);

var cors = require("cors");
const { MONGOURI } = require("./keys");

/*Mongo connection*/
mongoose.connect(MONGOURI, {
  useNewUrlParser: "true",
  useUnifiedTopology: "true",
});
mongoose.connection.on("connected", () => {
  console.log("Connected successfully");
});
mongoose.connection.on("error", (err) => {
    console.log("There was an error", err);
  });
app.all("*", function (req, res, next) {
    var origin = req.get("origin");
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
app.use(cors());
require("./models/address");
require("./models/category");
require("./models/product");
require("./models/user");
app.use(express.json()); // this will accept json values
app.use(require("./routes/user"));
app.use(require("./routes/category"));
app.use(require("./routes/product"));
/*Middleware*/
const middleware = (req, res, next) => {
    console.log("This is the middle for about");
    next();
  };
/*Middleware*/
app.get("/about-us", middleware, (req, res) => {
    console.log("This is the middle");
    res.send("About us");
  });
const server = http.listen(PORT, () => {
    console.log("Listening to port", PORT);
});  

/**app.use(require("./routes/address"));
app.use(require("./routes/category"));
app.use(require("./routes/product")); */