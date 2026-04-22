const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContent');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, 'site-' + uuidv4() + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET site content
router.get('/', async (req, res) => {
  try {
    let content = await SiteContent.findOne({ key: 'main' });
    if (!content) return res.status(404).json({ error: 'No content found. Run seed first.' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update entire site content
router.put('/', async (req, res) => {
  try {
    const content = await SiteContent.findOneAndUpdate(
      { key: 'main' },
      req.body,
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update only company info
router.put('/company-info', async (req, res) => {
  try {
    const content = await SiteContent.findOneAndUpdate(
      { key: 'main' },
      { companyInfo: req.body },
      { new: true }
    );
    res.json(content.companyInfo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update hero banners
router.put('/banners', async (req, res) => {
  try {
    const content = await SiteContent.findOneAndUpdate(
      { key: 'main' },
      { heroBanners: req.body },
      { new: true }
    );
    res.json(content.heroBanners);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update categories
router.put('/categories', async (req, res) => {
  try {
    const content = await SiteContent.findOneAndUpdate(
      { key: 'main' },
      { categories: req.body },
      { new: true }
    );
    res.json(content.categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST upload image for any section (banner, category, promo)
router.post('/upload/:section/:index', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const imageUrl = '/uploads/' + req.file.filename;
    const { section, index } = req.params;
    const idx = parseInt(index);

    const content = await SiteContent.findOne({ key: 'main' });
    if (!content) return res.status(404).json({ error: 'No content' });

    if (section === 'banner' && content.heroBanners[idx]) {
      content.heroBanners[idx].image = imageUrl;
    } else if (section === 'category' && content.categories[idx]) {
      content.categories[idx].image = imageUrl;
    } else if (section === 'promo' && content.promoBanners[idx]) {
      content.promoBanners[idx].image = imageUrl;
    } else {
      return res.status(400).json({ error: 'Invalid section/index' });
    }

    await content.save();
    res.json({ imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
