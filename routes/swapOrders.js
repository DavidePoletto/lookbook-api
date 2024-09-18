const express = require('express');
const router = express.Router();
const SwapOrder = require('../models/swapOrderModel');

// Creazione swap
router.post('/', async (req, res) => {
  try {
    const swapOrder = new SwapOrder(req.body);
    await swapOrder.save();
    res.status(201).json(swapOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ottenere swap
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, product } = req.query;
    const query = {};

    // Filtro data
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Filtro prodotto
    if (product) {
      query.$or = [{ product1: product }, { product2: product }];
    }

    const swapOrders = await SwapOrder.find(query).populate('user1 user2 product1 product2');
    res.status(200).json(swapOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Modifica swap
router.put('/:id', async (req, res) => {
  try {
    const swapOrder = await SwapOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(swapOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancellazione swap
router.delete('/:id', async (req, res) => {
  try {
    await SwapOrder.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


