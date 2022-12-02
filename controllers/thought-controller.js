//DECLARATIONS: model object -------------------------
const { User, Thought } = require('../models');

//THOUGHT CONTROLLER ================================
const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id:-1 })
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
              });
    },
    //thought by id
    getThoughtById({ params }, res) {
        Thought.find({ _id: params.thoughtId})
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'no thought matching id' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.json(err));
    },
    // create new thought
    addThought({ params, body }, res) {
        Thought.create(body)
            //pass new thought id to user
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbData => {
                if(!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.json(err));
    },
    //create new reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
            .then(dbData => {
                if(!dbData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => res.json(err));
    },
    //delete thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404);
                    throw 'no thought with this id';
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId }},
                    { new: true }  
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'no user with this id' });
                    return res.json(); 
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    //delete reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId }}},
            { new: true }
        )
            .then(dbData => res.json(dbData))
            .catch(err => res.json(err));
    }
};

//EXPORT CONTROLLER ---------------------
module.exports = thoughtController;