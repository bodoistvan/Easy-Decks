const Schema = require('mongoose').Schema;
const db = require('../db');

const Card = db.model('Card', {
    _deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck',
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
});



module.exports = Card;