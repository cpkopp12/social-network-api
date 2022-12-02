//DECLARATIONS: router, user controller -------------
const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
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

//EXPORT ROUTER -------------------------------------
module.exports = router;