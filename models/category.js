const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryId: { type: Number },
  categoryName: { type: String },
})

const Category = mongoose.model('category', categorySchema);

module.exports = { Category };