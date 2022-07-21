const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: 
  { 
     type: ObjectId, 
     ref: "Category" 
  },
  image:{
    type: String,
    required: true,
  },
  sex:{
    type: String,
    required: true,
  },
  active:{
    type:Number,
    default:1
  }  
},{ timestamps: true });
mongoose.model("Product", ProductSchema);

