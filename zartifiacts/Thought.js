const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); 

const reactionSchema = require('./Reaction'); // Import the Reaction schema

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Embed the Reaction schema directly
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual field for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
