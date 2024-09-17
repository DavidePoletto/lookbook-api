const mongoose = require('mongoose');

const swapOrderSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product1: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  product2: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SwapOrder', swapOrderSchema);

