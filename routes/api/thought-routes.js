//DECLARATIONS: thought-controller, router ---------------------------
const router = require('express').Router();
const { 
    addThought
} = require('../../controllers/thought-controller');

//ROUTE: /api/thoughts/:userId ========================
router.route('/:userId')
    .post(addThought);


//EXPORT ROUTER ------------
module.exports = router; 