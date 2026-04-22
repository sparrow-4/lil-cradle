const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name:  String,
  price: Number,
  qty:   Number,
  image: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId:         { type: String, unique: true },
  customerName:    String,
  customerPhone:   String,
  customerAddress: String,
  date:            { type: String },
  items:           [orderItemSchema],
  total:           Number,
  status:          { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  statusColor:     { type: String, default: 'yellow' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
