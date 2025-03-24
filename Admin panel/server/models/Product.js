const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  ratings: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  imageFilename: { type: String, required: true }, // Stores GridFS filename
});

module.exports = mongoose.model("Product", ProductSchema);
