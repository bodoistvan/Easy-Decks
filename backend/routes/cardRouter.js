const express = require('express');
const cardController = require('../controllers/cardController');
const authController = require('../controllers/authController');
const Model = require('../models');

const router = express.Router();


router.use(authController.protect(Model));

router.route("/:id")
    .patch(cardController.updateCard(Model));

module.exports = router;