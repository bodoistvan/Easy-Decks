const Schema = require('mongoose').Schema;
const db = require('../db');


const cardSchema = new Schema(
{
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
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

cardSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

const Card = db.model('Card', cardSchema);

module.exports = {Card, cardSchema};