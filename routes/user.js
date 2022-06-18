
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const User = mongoose.model("User");

//Create a new user and insert in DB
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

//Retrieve user from the DB based upon email and password
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


 //Add address to existing users
 router.post("/addAddress", (req, res) => {
  const { contactName,contactPhone,addressline1,addressline2,landmark } = req.body.address;
  if (!contactName || !contactPhone || !addressline1 || !addressline2) {
    return res.json({ message: "Enter all the fields" });
  }
  const data  = {
      "contactName":contactName,
      "contactPhone":contactPhone,
      "addressline1":addressline1,
      "addressline2":addressline2,
      "landmark":landmark
  }
  User.findByIdAndUpdate(
    req.body._id,
    {
      $push: { address: data } ,
    },
    (err, result) => {
      if (err) {
        return res.json({ error: err });
      }
      return res.json(result);
    }
  )});
       




  module.exports = router;
