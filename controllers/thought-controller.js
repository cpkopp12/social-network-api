//DECLARATIONS: model object -------------------------
const { User, Thought } = require('../models');

//THOUGHT CONTROLLER ================================
const thoughtController = {
    // add thought
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
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.json(err));
    }
};

//EXPORT CONTROLLER ---------------------
module.exports = thoughtController;