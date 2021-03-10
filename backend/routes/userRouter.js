const express = require('express');
const { Deck, Card, User } = require('../models');
const userController = require('../controllers/userController');

const Model = {
    Deck: Deck,
    Card: Card,
    User: User
}

const router = express.Router();

router.route('/')
    .post(userController.createUser(Model));


module.exports = router;