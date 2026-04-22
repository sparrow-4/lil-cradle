const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  tagline:    String,
  headline:   String,
  buttonText: String,
  buttonLink: String,
  image:      String,
  bgColor:    String
}, { _id: true });

const categorySchema = new mongoose.Schema({
  name:  String,
  image: String,
  link:  String
}, { _id: true });

const promoSchema = new mongoose.Schema({
  tag:                String,
  tagColor:           String,
  headline:           String,
  headlineHoverColor: String,
  buttonText:         String,
  buttonBg:           String,
  image:              String,
  bgColor:            String
}, { _id: true });

const featureSchema = new mongoose.Schema({
  title:   String,
  sub:     String,
  iconSvg: String
}, { _id: true });

const blogPostSchema = new mongoose.Schema({
  title:    String,
  desc:     String,
  date:     String,
  category: String,
  catColor: String,
  image:    String,
  bg:       String
}, { _id: true });

const companyInfoSchema = new mongoose.Schema({
  name:         String,
  addressLine1: String,
  addressLine2: String,
  email:        String,
  phone:        String,
  whatsapp:     String,
  hoursLine1:   String,
  hoursLine2:   String,
  description:  String,
  copyright:    String
}, { _id: false });

const siteContentSchema = new mongoose.Schema({
  key:          { type: String, unique: true, default: 'main' },
  heroBanners:  [bannerSchema],
  categories:   [categorySchema],
  promoBanners: [promoSchema],
  features:     [featureSchema],
  blogPosts:    [blogPostSchema],
  companyInfo:  companyInfoSchema
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
