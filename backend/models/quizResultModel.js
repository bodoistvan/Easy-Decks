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
    ],
    active: {
        type: Boolean,
        default: true,
        select: false
    }
    
});

quizResultSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

const QuizResult = db.model('QuizResult', quizResultSchema );
module.exports = QuizResult;