const Schema = require('mongoose').Schema;
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
    _card: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    type: String,
    text: String,
    createdAt: {
        type : Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "active" //accepted, ignored
    }

});

const Report = db.model('Report', reportSchema );
module.exports = Report;