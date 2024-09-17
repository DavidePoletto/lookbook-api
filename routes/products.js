const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Creazione di un prodotto
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ottenere tutti i prodotti
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Modifica di un prodotto
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancellazione di un prodotto
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

