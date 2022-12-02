//DECLARATIONS: model object -------------------------
const { User, Thought } = require('../models');

//THOUGHT CONTROLLER ================================
const thoughtController = {
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
    }
};

//EXPORT CONTROLLER ---------------------
module.exports = thoughtController;