const express = require('express');
const { Deck, Card, User } = require('../models');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { route } = require('./deckRouter');

const Model = {
    Deck: Deck,
    Card: Card,
    User: User
}

const router = express.Router();

router.route('/')
    .get(userController.getAllUser(Model))
    .post(authController.signup(Model));

router.route('/login')
    .post(authController.login(Model));

module.exports = router;