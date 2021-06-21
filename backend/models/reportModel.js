const Schema = require('mongoose').Schema;
const {cardSchema} = require('../models/cardModel')
const db = require('../db');

const reportSchema = new Schema({
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _reportedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    card: cardSchema,
    type: String,
    text: String,
    createdAt: {
        type : Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "active" //accepted, ignored
    },
    active: {
        type: Boolean,
        default: true
    }

});

reportSchema.pre(/^find/, function(next) {
    this.find({ active: { $ne: false } });
    next();
});

const Report = db.model('Report', reportSchema );
module.exports = Report;
