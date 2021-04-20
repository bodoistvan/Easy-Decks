const Schema = require('mongoose').Schema;
const db = require('../db');

const deckSchema = new Schema(
{
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    lang1: {
        type: String,
        required: true
    },
    lang2: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        default: 3
    },
    public: {
        type: Boolean,
        require: true
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    _cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }]
});

deckSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

const Deck = db.model('Deck', deckSchema );

module.exports = Deck;