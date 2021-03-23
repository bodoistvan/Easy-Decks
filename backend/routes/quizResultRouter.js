const express = require('express');
const Model = require('../models');
const quizResultController = require('../controllers/quizResultController');
const authController = require('../controllers/authController')
const router = express.Router();

router.use(authController.protect(Model));

router.route('/deck/:id')
    .get(quizResultController.getQuizResults(Model));

router.route('/deck/:id/last')
    .get(quizResultController.getLastQuizResult(Model))

module.exports = router;