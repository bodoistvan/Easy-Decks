const Schema = require('mongoose').Schema;
const db = require('../db/index');

const User = db.model('User', {
    name: String,
    password: String,
    mail: String,
    _publicDecks: [{
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    }]
});

module.exports = User;