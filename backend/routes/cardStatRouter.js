const express = require('express');
const cardStat = require('../controllers/cardStatController');
const authController = require('../controllers/authController');
const Model = require('../models');

const router = express.Router();


router.use(authController.protect(Model));

router.route("/:deckId/reset")
    .put(cardStat.resetStat(Model));

router.route("/:id/bookmark/:value")
    .post(cardStat.bookMark(Model));

module.exports = router;