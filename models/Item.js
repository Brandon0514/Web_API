const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String
  },
  release_date: {
    type: String
  },
  overview: {
    type: String
  },
  id: {
    type: String
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
