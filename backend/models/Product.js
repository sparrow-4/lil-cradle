const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  oldPrice: { type: Number, default: null },
  image:    { type: String, default: '/images/p1.jpg' },
  rating:   { type: Number, default: 5 },
  sale:     { type: Boolean, default: false },
  type:     { type: String, enum: ['featured', 'best', 'new'], default: 'featured' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
