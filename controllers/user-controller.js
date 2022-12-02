const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                model: Thought,
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },
    //get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //create new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbData => res.json(dbData))
            .catch(err => res.json(err));
    },
    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //delete user by id
    deleteUser({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbData => {
                if(!dbData) {
                    res.status(404);
                    throw 'no user found with this id';
                }
                Thought.remove({
                    "_id": {
                        $in: dbData.thoughts
                    }
                })
                    .then(result => console.log(result))
                    .catch(err => res.json(err));
                User.findOneAndRemove({ _id: dbData._id })
                    .then(dbData => {
                        if(!dbData) {
                            res.status(404);
                            throw 'no user found with this id';
                        }
                        res.json(dbData)
                    })
                    .catch(err => res.json(err));
                
            })
            .catch(err => res.json(err));
    },
    //add new friend by id
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
            .then(dbData => {
                if (!dbData) {
                    res.status(404);
                    throw ('one of the ids does not match');
                }
                return res.json(dbData);
            })
            .catch(err => res.json(err));
    },
    //remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: {friends: params.friendId }},
            { new: true }
        )
           .then(dbData => res.json(dbData))
           .catch(err => res.json(err));
    }
};

module.exports = userController;