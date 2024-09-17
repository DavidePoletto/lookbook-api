const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photos: { type: [String], required: true } // Array di URL delle foto
});

module.exports = mongoose.model('Product', productSchema);
