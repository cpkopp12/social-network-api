//DECLARATIONS: mongoose schema+model -----------------------
const { Schema, model } = require('mongoose');

//USER SCHEMA ========================================
const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [isEmail, 'invalid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//friend count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//USER MODEL ==========================================
const User = model('User', UserSchema);

//EXPORT USER --------------------------------------------
module.exports = User;