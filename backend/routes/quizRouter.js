const express = require('express');
const { Deck, Card, User } = require('../models');
const quizController = require('../controllers/quizController');
const authController = require('../controllers/authController')

const Model = {
    Deck: Deck,
    Card: Card,
    User: User
}

const router = express.Router();

router.use(authController.protect(Model));

router.route('/:id')
    .get(quizController.getQuestions())
    .post(quizController.sendAnswer());

router.route('/')
    .post(quizController.createQuiz(Model));


module.exports = router;