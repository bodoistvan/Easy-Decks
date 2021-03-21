const Schema = require('mongoose').Schema;
const db = require('../db');

const cardStatSchema = new Schema({

    _user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    _card : {
        type: Schema.Types.ObjectId,
        ref: 'card',
        required: true
    },
    lastSeen : Date,
    seenTimes : Number,
    bookmarked: {
        type: Boolean,
        default: true
    },
    answerRatio : Number,
    
});

const CardStat = db.model('CardStat', cardStatSchema );
module.exports = CardStat;