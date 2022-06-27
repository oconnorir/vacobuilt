const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
})

const Category = mongoose.model('category', categorySchema);
Category.deleteMany({});
Category.insertMany([
  { 'id': 1, 'name': 'General' },
  { 'id': 2, 'name': 'Technology' },
  { 'id': 3, 'name': 'Random' },
])

module.exports = { Category };