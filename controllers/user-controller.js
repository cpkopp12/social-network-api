const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
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

    //create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbData => res.json(dbData))
            .catch(err => res.json(err));
    }

};

module.exports = userController;