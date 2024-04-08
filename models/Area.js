const mongoose = require('mongoose');

// Define area schema
const areaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

// Create area model
const Area = mongoose.model('Area', areaSchema);

module.exports = Area;
