const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    active:{
        type:Number,
        default:1,
    }
}, { timestamps: true });
mongoose.model("Category", CategorySchema);    