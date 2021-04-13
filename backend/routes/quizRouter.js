const express = require('express');
const Model = require('../models');
const quizController = require('../controllers/quizController');
const authController = require('../controllers/authController')



const router = express.Router();

router.use(authController.protect(Model));



router.route('/create')
   // .get(quizController.getQuestions())
    .post(quizController.createQuiz(Model));

router.route('/inprogress')
    .get(quizController.getInProgress());

router.route('/:id')
    .get(quizController.getQuestions(Model))
    .post(quizController.answerQuiestion(Model));
    
router.route('/')
    .get(quizController.getAllQuizes());


module.exports = router;