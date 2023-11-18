// /models/Reaction
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/helpers');
const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => format_date(timestamp),
  },
});

module.exports = reactionSchema;