const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  removeUserThoughts, // Implement this function for the bonus feature
} = require('../../controllers/api/userController');

// Define routes for '/api/users'
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Separate route for removing user thoughts
router.route('/:userId/remove-thoughts')
  .delete(removeUserThoughts);

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;