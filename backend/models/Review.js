const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  userName:    { type: String, required: true },
  rating:      { type: Number, required: true, min: 1, max: 5 },
  comment:     { type: String, required: true },
  isApproved:  { type: Boolean, default: false }, // Admin can approve before showing
  date:        { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
