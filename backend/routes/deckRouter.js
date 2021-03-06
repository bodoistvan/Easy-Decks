const express = require('express');
const deckController = require('../controllers/deckController');
const authController = require('../controllers/authController')
const Model = require('../models');


const router = express.Router();

router.use(authController.protect(Model));

router.route("/:id")
    .get(deckController.getDeckById(Model))
    .delete(deckController.deleteDeck(Model))
    .patch(deckController.patchDeckById(Model));

router.route("/:id/all") 
    .get(deckController.getDeckByIdAll(Model))

router.route("/:id/subscribe")
    .post(deckController.subsribeDeck(Model));

    
router.route("/:id/unsubscribe")
.post(deckController.unsubsribeDeck(Model));

router.route("/:id/cards/bookmarked")
    .get(deckController.getDeckCardsBookMarked(Model))

    
router.route("/:id/cards/all")
    .get(deckController.getDeckCardsAll(Model))

        
router.route("/:id/cards/statistic")
    .get(deckController.getDeckCardsStatistic(Model))

router.route('/')
    .get(deckController.getDecks(Model))
    .post(deckController.createDeck(Model));


module.exports = router;