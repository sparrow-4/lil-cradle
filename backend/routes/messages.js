const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new message
router.post('/', async (req, res) => {
  const message = new Message(req.body);
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update status
router.put('/:id/status', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.status = req.body.status;
      const updated = await message.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
