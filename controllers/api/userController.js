// /controllers/api/userController
const { User, Thought } = require('../../models');

// controller functions for user routes
const userController = {
  // GET all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({},
        '_id username email thoughts friends friendCount');
      const userObj = { users };

      res.json({ userObj });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // GET a single user by _id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // POST a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      // Access the 'friendCount' property directly
      const responseUser = user.toObject(); // Convert the Mongoose document to a plain JavaScript object
      responseUser.friendCount = user.friendCount; // Add the friendCount property

      res.json(responseUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT to update a user by _id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body }, // Use $set to update specific fields
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.json(updatedUser);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE a user by _id and remove user's associated thought
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      // Delete the user
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user found with that ID :(' });
      }

      // Delete associated thoughts
      const deletedThoughts = await Thought.deleteMany({ username: deletedUser.username });

      res.json({ msg: 'User and associated thoughts deleted.', deletedUser, deletedThoughts });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      // Get user ID and friend ID from request parameters
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      // Update the user's friends array by adding the new friend's ID
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { friends: friendId } },
        { new: true }
      );

      // user not found
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }
      // Respond with the updated user information
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      // Update the user's friends array by removing the friend's ID
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      // User not found
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with that ID :(' });
      }

      // Respond with the updated user information
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Bonus feature to remove a user's associated thoughts
  async removeUserThoughts(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: {} } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
