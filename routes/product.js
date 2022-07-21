
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const Product = mongoose.model("Product");

//Create a new product and insert in DB
router.post("/addProduct", (req, res) => {
    const { title, description, price, category ,image,sex} = req.body;
    if (!title || !description || !price || !category || !image || !sex) {
      return res.json({ error: "Please enter all fields" });
    }
    Product.findOne({ title: title })
      .then((productData) => {
        if (productData) {
          return res.json({ error: "Product exists with the same name" });
        }
        const product = new Product({
            title: title,
            description: description,
            price: price,
            category: mongoose.Types.ObjectId(category),
            image:image,
            sex:sex
          });
          product
            .save()
            .then((product) => {
              return res.json({ message: "Product Inserted in DB" });
            })
            .catch((err) => {
              console.log(err);
            });
      })
      .catch((err) => {
        console.log(err);
      });
    //res.json({ message: "successfully posted" });
  });

  //Delete a product
  router.post("/deleteProduct", (req, res) => {
    Product.findByIdAndUpdate(
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

   //Get all products
   router.get("/getAllProducts",(req,res)=>{
    Product.find({},
      (err,result)=>{
        if (err) {
          return res.status(400).json({ err });
        }
        return res.json(result);
       });
   })

   //Get all products given a category id
   router.get("/getProductUsingCategoryId/:categoryId",(req,res)=>{
    Product.find({category:req.params.categoryId},
     (err,result)=>{
      if (err) {
        return res.status(400).json({ err });
      }
      return res.json(result);
     } )
  })

 




  module.exports = router;