
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const User = mongoose.model("User");


router.post("/signup", (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.json({ error: "Please enter all fields" });
    }
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res.json({ error: "User exists with this email" });
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
          });
          user
            .save()
            .then((user) => {
              return res.json({ message: "User Inserted" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //res.json({ message: "successfully posted" });
  });
  module.exports = router;
