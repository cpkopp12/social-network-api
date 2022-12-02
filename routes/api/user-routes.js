//DECLARATIONS: router, user controller -------------
const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/user-controller');

//ROUTES: /api/users ==================================
router.route('/')
    .get(getAllUsers)
    .post(createUser);

//ROUTES: /api/user/:id ================================
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//ROUTES: /api/user/:userId/:friendId
router.route('/:userId/:friendId')
    .put(addFriend)

//EXPORT ROUTER -------------------------------------
module.exports = router;