const express = require('express');
const deckController = require('../controllers/deckController');
const authController = require('../controllers/authController')
const { Deck, Card, User } = require('../models');


const Model = {
    Deck: Deck,
    Card: Card,
    User: User
}

const router = express.Router();

router.use(authController.protect(Model));

router.route("/:id")
    .get(deckController.getDeckById(Model))
    .patch(deckController.patchDeckById(Model));

router.route("/:id/all")
    .get(deckController.getDeckByIdAll(Model))

router.route('/')
    .get(deckController.getDecks(Model))
    .post(deckController.createDeck(Model));

module.exports = router;