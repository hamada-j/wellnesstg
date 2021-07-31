'use strict';
const mongoose = require('mongoose');

const customSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
    default: 0,
  },
  consumption: {
    type: Number,
    required: true,
    default: 0,
  },
  difference: {
    type: Number,
    required: true,
    default: 0,
  },
  city: {
    type: String,
    required: true,
  },
  bonus: {
    type: Boolean,
    required: true,
    default: false,
  },
  created: {
    type: Date,
    default: new Date(),
  }
});

module.exports = mongoose.model('customSchema', customSchema);