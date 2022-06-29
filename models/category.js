const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
})

const Category = mongoose.model('category', categorySchema);

Category.deleteMany({})
  .then((result) => {
    Category.insertMany([
      { 'id': 1, 'name': 'General' },
      { 'id': 2, 'name': 'Technology' },
      { 'id': 3, 'name': 'Random' },
    ])
  })
  .catch((error) => {
    console.log(error);
  })

module.exports = { Category };