const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: 
    { 
      type: String, 
      required: true, 
    },
    address:[{ type: Object, ref: "Address" }],
    cart:[
     {
        type:Object
     }
    ]
  });
  mongoose.model("User", UserSchema);