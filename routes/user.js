
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
              return res.json({ message: "User Inserted in DB" });
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


  router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Enter the given fields" });
    }
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.json({ error: "Given email is not registered" });
        }
        bcrypt
          .compare(password, savedUser.password)
          .then((matched) => {
            if (!matched) {
              return res.json({ error: "Password did not match" });
            } else {
              /*res.json({ message: "User logged in" });
              return savedUser;*/
              //console.log(savedUser);
              const {
                _id,
                name,
                email,
                phone,
                address,
              } = savedUser;
              const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
              return res.json({
                token: token,
                user: { _id, name, email, phone, address },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });




  module.exports = router;
