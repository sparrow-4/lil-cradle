const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');

// Get all reviews (Admin)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('productId', 'name').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get approved reviews for a product
router.get('/product/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id, isApproved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new review
router.post('/', async (req, res) => {
  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Toggle approval
router.put('/:id/approve', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.isApproved = !review.isApproved;
      const updated = await review.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
