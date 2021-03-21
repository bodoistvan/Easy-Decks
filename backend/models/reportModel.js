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
    _card: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    comment: String

});

const Report = db.model('Report', reportSchema );
module.exports = Report;