const mongoose = require("mongoose");



const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    createdTime: { type: Number, default: Date.now },
  },
  { timestamps: true }
);

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;
