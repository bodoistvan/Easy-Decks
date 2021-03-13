const { filterProperties, checkProperties } = require('../utils/objFilter');
const catchAsync = require('../utils/catchAsync');

exports.createDeck = Model => 
    catchAsync(async(req, res, next) => {
        
     
        const ownerId = "604ca45fc2fe7b1bd4cfecab";

        let filter = ["name", "lang1", "lang2", "level", "cards", "public"];

        if ( checkProperties(req.body, filter) === false )
            return next("param err...");
           
        //creatingDeck
        let createdDeck = await Model.Deck
            .create({
                _owner : ownerId,
                name : req.body.name,
                lang1 : req.body.lang1,
                lang2 : req.body.lang2,
                level :  req.body.level,
                public: req.body.public
            });
        
        //filter empty cards
        req.body.cards = req.body.cards.filter( card => card.lang1 != "" && card.lang2 != "" && card.action == "create");

        //creating cards
        const createdCards = await Model.Card
            .insertMany(req.body.cards.map( card => ({ 
                lang1: card.lang1, 
                lang2: card.lang2,
                _deck: createdDeck._id
            })) );

        
        //add references to deck
        if (createdCards != null && createdDeck != null) {
            createdDeck._cards = createdCards.map(card => card.id);
            createdDeck = await createdDeck.save();
        }
        



        res.status(200);
        res.json(createdDeck);    
        
    });

exports.getDecks = Model => 
    catchAsync(async(req, res, next) => {

        const decks = await Model.Deck.find({ _owner: "604ca45fc2fe7b1bd4cfecab"}).exec();

        if (decks === undefined){
            res.status(404);
            res.send("Not Found any decks");
        } else {

            res.status(200);
            res.json( decks.map( deck=> ( { 
                id:deck._id,
                name: deck.name,
                lang1: deck.lang1,
                lang2: deck.lang2,
                level: deck.level,
                count: deck._cards.length
            }) ))

        }
});

exports.getDeckById = Model => catchAsync( async(req,res,next) => {

    //userId should be in jwt
    const userId = "6048db21b6668241745421b3";

    console.log(req.params);

    const filter=["id"];

    if ( checkProperties(req.params, filter) === false )
        return next("param error, no id");
    
    const deck = await Model.Deck.findOne( { _id: req.params.id } )

   
    if (deck != undefined){
        res.json({
            id: deck._id,
            name: deck.name,
            lang1: deck.lang1,
            lang2: deck.lang2,
            level: deck.level
        })
    } else {
        res.status(404);
        res.json({message: "deck not found"})
    }

    
});

exports.getDeckByIdAll = Model =>
    catchAsync( async(req, res, next) => {

        const deckId = req.params.id;

        if (deckId === undefined)
            return next("no deck id")

        const deck = await Model.Deck.findOne({ _id: deckId});

        if (deck === undefined){
            res.status(404);
            res.json({message: "deck is not found"})
        }

        
        let cards = await Model.Card.find( { _deck : deckId } );

        if (cards != undefined){
            cards = cards.map(card => ({ id: card._id, lang1: card.lang1, lang2: card.lang2 }))
        }

        res.status(200);
        res.json({
            id: deck._id,
            name: deck.name,
            lang1: deck.lang1,
            lang2: deck.lang2,
            level: deck.level,
            public: deck.public,
            cards: cards
        })
            

    });

exports.patchDeckById = Model => 
    catchAsync( async (req, res, next)=>{

      
        
        const ownerId = "604ca45fc2fe7b1bd4cfecab";

        const myfilter = ["id", "name", "lang1", "lang2", "level", "public", "cards"];

        if ( checkProperties(req.body, myfilter) === false )
            return next("bad params");

        const deck = await Model.Deck.findOne({ _id : req.body.id })

        if (deck === undefined )
            return next("no deck found")

        
        if ( deck._owner != ownerId)
            return next("auth error")
        
        const cardsShouldBeDeletedIdArray = req.body.cards.filter(card => card.action=="delete" && card.id != undefined && card.id != "").map(card => card.id);
        const deletedCards = await Model.Card.deleteMany( { _id: { $in: cardsShouldBeDeletedIdArray }, _deck: deck._id });

        deck._cards = deck._cards.filter(card => !cardsShouldBeDeletedIdArray.includes(card) );

        const cardsShouldBeUpdatedData = req.body.cards.filter(card => card.action=="update" && card.id != undefined && card.id != "");
        const cardsShouldBeUpdatedIdArray = cardsShouldBeUpdatedData.map(card => card.id);

        const shouldBeUpdatedCardsModel = await Model.Card.find( {_id: {$in: cardsShouldBeUpdatedIdArray}, _deck: deck._id});

        shouldBeUpdatedCardsModel.forEach(cardModel => {
            const updateData = cardsShouldBeUpdatedData.filter(data => data.id == cardModel._id)[0];
            
            cardModel.lang1 = updateData.lang1;
            cardModel.lang2 = updateData.lang2;

        });

        shouldBeUpdatedCardsModel.forEach(model=>model.save());

        var cardsShouldBeCreated = req.body.cards.filter(card => card.action=="create" && checkProperties(card,["lang1", "lang2"]));

        const createdCards = await Model.Card
            .insertMany(cardsShouldBeCreated.map( card => ({ 
                lang1: card.lang1, 
                lang2: card.lang2,
                _deck: deck._id
         })) );

        deck._cards = [ ...deck._cards, ...createdCards.map(card => card.id)];

        res.json( { shouldBeUpdatedCardsModel});

    });
