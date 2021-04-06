const Schema = require('mongoose').Schema;
const db = require('../db');


const cardSchema = {
    _id: Schema.Types.ObjectId,
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
}

const Card = db.model('Card', cardSchema);



module.exports = {Card, cardSchema};