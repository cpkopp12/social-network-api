//DECLARATIONS: mongoose Schema+model+Types ---------------------------
const { Schema, model, Types } = require('mongoose');

//THOUGHT+REACTION SCHEMAS ============================================
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
            //ADD GEtTER TO FORMAT
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
            //ADD GETTER TO FORMAT
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals:true,
            getters: true
        },
        id: false
    }
);

//reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//THOUGHT MODEL =======================================================
const Thought = model('Thought', ThoughtSchema);

//EXPORT THOUGHT -----------------------------------------------------
module.exports = Thought;