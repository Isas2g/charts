const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String, 
    required: true
  },
  borderColor: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('charts', chartSchema);