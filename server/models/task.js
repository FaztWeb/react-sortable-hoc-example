const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  sorting: {
    type: Number,
    default: 0
  }
});

module.exports = model('Task', schema);