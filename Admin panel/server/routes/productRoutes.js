const express = require("express");
const multer = require("multer");
const { Readable } = require("stream");
const Product = require("../models/Product");

const router = express.Router();

// Multer Setup (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Add Product with Image Upload
router.post("/products/add", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image upload required" });
  }

  const gridFSBucket = req.gridFSBucket; // Use the GridFSBucket from request

  try {
    const filename = `${Date.now()}-${req.file.originalname}`;
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = gridFSBucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
    });

    readableStream.pipe(uploadStream);

    uploadStream.on("finish", async () => {
      const newProduct = new Product({
        name: req.body.name,
        id: req.body.id,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        ratings: req.body.ratings,
        createdAt: req.body.createdAt,
        imageFilename: filename,
      });

      await newProduct.save();
      res.status(201).json({ message: "Product added successfully!", product: newProduct });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
