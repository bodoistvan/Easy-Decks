const Schema = require('mongoose').Schema;
const db = require('../db');

const Deck = db.model('Deck', {
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
    level: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        require: true
    },
    _cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }]
});



module.exports = Deck;