const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create order
router.post('/', async (req, res) => {
  try {
    const orderId = '#ORD-' + Math.floor(1000 + Math.random() * 9000);
    const order = new Order({
      ...req.body,
      orderId,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending',
      statusColor: 'yellow'
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    let statusColor = 'yellow';
    if (status === 'Processing') statusColor = 'yellow';
    if (status === 'Shipped') statusColor = 'green';
    if (status === 'Out for Delivery') statusColor = 'blue';
    if (status === 'Delivered') statusColor = 'blue';
    if (status === 'Cancelled') statusColor = 'red';

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, statusColor },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
