// /models/Thought

// Dependencies
const { Schema, model } = require('mongoose');
const Reaction = require('../models/Reaction')
const dateFormat = require('../utils/dateFormat');

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
      get: timestamp => dateFormat(timestamp)
      },      

    username: {
      type: String,
      required: true,
    },
    reactions: [
      Reaction
    ]
  },
  {
    toJSON: {
      // virtuals: true,
      getters: true
    },
    id: false
  }
);

// Create a virtual field for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
