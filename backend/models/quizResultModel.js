const Schema = require('mongoose').Schema;
const db = require('../db');

const quizResultSchema = new Schema({

    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    startedAt: Date,
    finishedAt: {
        type: Date,
        default: Date.now
    },
    resultPercent: Number,
    amount : Number,
    selectedLang: String,
    results: [
        {
            lang1: String,
            lang2: String,
            status: String
        }
    ]
    
});


const Report = db.model('QuizResult', quizResultSchema );
module.exports = Report;