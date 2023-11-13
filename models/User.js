const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Define a virtual property for friendCount
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Mongoose middle ware to add friendCount
userSchema.pre('save', function (next) {
  console.log('Middleware executed: Updating friendCount');
  this.friendCount = this.friends.length;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
