const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParksSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String },
    nearly: { type: Number, required: true },
    ecology: { type: String },
  },
  { timestamps: true }
);

const ParksModel = mongoose.model("Parks", ParksSchema);

module.exports = ParksModel;
