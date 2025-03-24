const mongoose = require("mongoose");
const Product = require("./models/Products"); // Ensure this path is correct
const dotenv = require("dotenv");
const products = require("./data/products")
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

// const products = [
//   {
//     name: "Stylish Jacket",
//     description: "A warm and stylish jacket for winter.",
//     price: 12000,
//     category: "Men",
//     image: "./Featured/jacket.jpeg",
//   },
//   {
//     name: "Casual Shoes",
//     description: "Comfortable casual shoes for everyday wear.",
//     price: 1500,
//     category: "Footwear",
//     image: "./Featured/Casual Shoes.jpeg",
//   },
//   {
//     name: "Smart Watch",
//     description: "A feature-rich smartwatch to track your fitness.",
//     price: 21000,
//     category: "Accessories",
//     image: "./Featured/watch.jpeg",
//   },
// ];

const seedDB = async () => {
  try {
    await Product.deleteMany();
    console.log("Existing products removed");
    await Product.insertMany(products);
    console.log("New products added");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
    mongoose.connection.close();
  }
};

seedDB();
