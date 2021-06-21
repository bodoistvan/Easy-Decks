const {Card} = require('./cardModel');

module.exports = {
    User: require('./userModel'),
    Deck: require('./deckModel'),
    Card,
    CardStat: require('./cardStatModel'),
    Report: require('./reportModel'),
    QuizResult: require('./quizResultModel')
}