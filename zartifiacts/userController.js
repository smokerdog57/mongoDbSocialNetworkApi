// /controllers/api/userController
const { User, Thought } = require('../../models');

const userController = {
  // Define your controller functions for user routes here

  // GET all users
  async getAllUsers(req, res) {
    try {
      //const users = await User.find();
      const users = await User.find().populate('thoughts');
      const userObj = {
        users,
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // GET a single user by _id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
      });
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
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body }, // Use $set to update specific fields
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.json({ user, message: 'User successfully updated' });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE a user by _id

  //******************************************************************nedd to delete assocaited thought */
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.json({ message: 'User successfully deleted and associated thoughts' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
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
  },

  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friend: { friendId: req.params.friendId } } },
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
