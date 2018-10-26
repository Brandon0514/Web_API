const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String
  },
  first_air_date: {
    type: String
  },
  overview: {
    type: String
  },
  poster_path: {
    type: String
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
