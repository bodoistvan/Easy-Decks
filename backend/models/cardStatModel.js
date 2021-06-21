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
    bookmarked: {
        type: Boolean,
        default: false
    },
    correctCounter : {
        type : Number,
        default: 0
    },
    wrongCounter: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

cardStatSchema.methods.correctpp = function() {
    this.correctCounter = this.correctCounter + 1;
}

cardStatSchema.methods.wrongpp = function() {
   this.wrongCounter = this.wrongCounter + 1; 
}

cardStatSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

const CardStat = db.model('CardStat', cardStatSchema );
module.exports = CardStat;