//DECLARATIONS: thought-controller, router ---------------------------
const router = require('express').Router();
const { 
    addThought,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

//ROUTE: /api/thoughts/:userId ========================
router.route('/:userId')
    .post(addThought);

//ROUTE: /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId')
    .post(addReaction)
    .delete(removeThought);

//ROUTE: /api/thoughts/:userId/:thoughtId/:reactionId
router.route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);



//EXPORT ROUTER ------------
module.exports = router; 