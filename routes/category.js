
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const Category = mongoose.model("Category");

//Add category
router.post("/addCategory", (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.json({ error: "Please enter all fields" });
    }
    Category.findOne({ title: title })
      .then((categoryTitle) => {
        if (categoryTitle) {
          return res.json({ error: "Category exists with this name" });
        }
        const category = new Category({
            title: title,
            description: description,
          });
          category
            .save()
            .then((categorySaved) => {
              return res.json({ message: "Category inserted in DB" });
            })
            .catch((err) => {
              console.log(err);
            });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //Delete Category

  router.post("/deleteCategory", (req, res) => {
    Category.findByIdAndUpdate(
        req.body._id,
        {
          $set: { active: 0 } ,
        },
        (err, result) => {
          if (err) {
            return res.json({ error: err });
          }
          return res.json(result);
        }
   )});

  //Get all categories

  router.get("/getAllCategories",(req,res)=>{
    Category.find({},
      (err,result)=>{
        if (err) {
          return res.status(400).json({ err });
        }
        return res.json(result);
       });
   })

   module.exports = router;