//DECLARATIONS: thought-controller, router ---------------------------
const router = require('express').Router();
const { 
    addThought,
    addReaction
} = require('../../controllers/thought-controller');

//ROUTE: /api/thoughts/:userId ========================
router.route('/:userId')
    .post(addThought);

//ROUTE: /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId')
    .post(addReaction);


//EXPORT ROUTER ------------
module.exports = router; 