const { filterProperties, checkProperties } = require('../utils/objFilter');
const catchAsync = require('../utils/catchAsync');

exports.createDeck = Model => 
    catchAsync(async(req, res, next) => {
        
        let filter = ["owner", "name", "lang1", "lang2", "level", "cards"];

        if ( checkProperties(req.body, filter) === false )
            return next("param err...");
           
        //creatingDeck
        let createdDeck = await Model.Deck
            .create({
                _owner : req.body.owner,
                name : req.body.name,
                lang1 : req.body.lang1,
                lang2 : req.body.lang2,
                level :  req.body.level,
            });

        //creating cards
        const createdCards = await Model.Card.insertMany(req.body.cards.map( card => ({...card, _deck: createdDeck._id})) );

        //add references to deck
        if (createdCards != null && createdDeck != null) {
            createdDeck._cards = createdCards.map(card => card.id);
            createdDeck = await createdDeck.save();
        }

        res.json(createdDeck);    
        
    });
