const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Define absolute paths for uploads
const uploadDir = path.join(__dirname, '../../public/uploads');
const adminPanelDir = '../admin/public/uploads';

// Ensure both directories exist
[uploadDir, adminPanelDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});


// Serve uploaded images statically
app.use('/uploads', express.static(uploadDir));

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save initially to the first directory
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    },
});

const upload = multer({ storage });

// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    id: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    image: String, // Store relative path
    ratings: Number,
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

// POST endpoint to add a product
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const filename = req.file.filename;
        const sourcePath = path.join(uploadDir, filename);
        const destPath = path.join(adminPanelDir, filename);

        // Copy the file to the second directory
        fs.copyFile(sourcePath, destPath, (err) => {
            if (err) {
                console.error('Error copying file:', err);
            }
        });

        const product = new Product({
            name: req.body.name,
            id: req.body.id,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            image: `/uploads/${filename}`, // Store relative path
            ratings: req.body.ratings,
        });

        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET endpoint to fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json("Product deleted");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Use additional routes
app.use('/api/admin', adminRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
