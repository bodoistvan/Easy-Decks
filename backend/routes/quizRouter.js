const express = require('express');
const { Deck, Card, User } = require('../models');
const quizController = require('../controllers/quizController');

const Model = {
    Deck: Deck,
    Card: Card,
    User: User
}

const router = express.Router();

router.route('/:id')
    .get(quizController.getQuestions())
    .post(quizController.sendAnswer());

router.route('/')
    .post(quizController.createQuiz());



module.exports = router;