const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const AddressSchema = new Schema({
     contactName: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
        required: true,
      },  
     addressline1: {
        type: String,
        required: true,
      },
      addressline2: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
    }
});
mongoose.model("Address", AddressSchema);
