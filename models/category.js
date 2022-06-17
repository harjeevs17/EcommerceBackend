const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    }
});
mongoose.model("Category", CategorySchema);    