const express = require('express');
const deckController = require('../controllers/deckController');
const { Deck, Card, User } = require('../models');


const Model = {
    Deck: Deck,
    Card: Card,
    User: User
}

const router = express.Router();

router.route('/')
    .post(deckController.createDeck(Model));

module.exports = router;