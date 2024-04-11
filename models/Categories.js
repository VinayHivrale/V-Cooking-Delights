const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    
    strCategory: { type: String, unique: true },
    strCategoryThumb: String,
    strCategoryDescription: String
});

module.exports = mongoose.model('Category', categorySchema);
