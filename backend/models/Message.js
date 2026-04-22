const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  subject:  { type: String, default: 'Inquiry from Website' },
  message:  { type: String, required: true },
  status:   { type: String, enum: ['New', 'Read', 'Replied'], default: 'New' },
  date:     { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
