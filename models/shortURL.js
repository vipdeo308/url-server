const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  urlCode: {
    type: String,
    required: true,
    unique: true
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);