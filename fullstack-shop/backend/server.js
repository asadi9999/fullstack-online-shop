// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/shopDB', { useNewUrlParser: true, useUnifiedTopology: true });
//model
const productSchema = new mongoose.Schema({
  name: String,
  company: String,
  price: Number,
  des: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const Product = mongoose.model('Product', productSchema);

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;
  const { name, company, price , des } = req.body;

  const newProduct = new Product({
    name,
    company,
    des,
    price,
    image: {
      data: buffer,
      contentType: mimetype
    }
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload product' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}).sort('asceding');
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// app.post('/api/products' , async(req,res) => {

// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
