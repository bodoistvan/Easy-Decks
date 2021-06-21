const { filterProperties, checkProperties } = require('../utils/objFilter');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const getBookMarkedCardsIdByDeckIdandUserId = async ({Model, userId, deckId}) => {
    const cards = await Model.CardStat.find( { _deck: deckId, _user: userId, bookmarked: true } ).exec();
    return cards.map(card =>  card._card + "");
}

const showBookMarks = async ({ cards: cards, deckId: deckId, userId: userId, Model: Model}) => {
    let bookedCardsIds;
        
    bookedCardsIds = await getBookMarkedCardsIdByDeckIdandUserId( { deckId: deckId, userId: userId, Model: Model} ); 
  
    cards = cards.map(card => ({
        bookmarked: bookedCardsIds.indexOf(card.id + "") != -1,
        ...card
    }));
    return cards;
                 
}

exports.deleteDeck = Model => catchAsync(async(req, res, next) => {

    const userId = req.user.id;
    const deckId = req.params.id;

    const deck = await Model.Deck.findOne({_id : deckId});

    if (deck._owner + "" != userId + ""){
        return next(new AppError("autherror", 403));
    }

    deck.active = false;
    deck.save();

    Model.Card.find({ _deck : deckId}).exec((err, cards) =>{
        if (err)
            return;

        cards.forEach(card => {
            card.active = false;
            card.save();
        })
    })
    

    Model.QuizResult.find({ _deck : deckId }).exec((err, quizResults) =>{
        if (err)
            return;

        quizResults.forEach(quizResult => {
            quizResult.active = false;
            quizResult.save();
        })
    })

    Model.Report.find({ _deck : deckId }).exec((err, reports) =>{
        if (err)
            return;

        reports.forEach(report => {
            report.active = false;
            report.save();
        })
    })

    Model.CardStat.find({ _deck : deckId }).exec((err, cardStats) =>{
        if (err)
            return; 

        cardStats.forEach(cardStat => {
            cardStat.active = false;
            cardStat.save();
        })
    })

    

    res.send("deleted")

});

exports.createDeck = Model => 
    catchAsync(async(req, res, next) => {
        
        const userId = req.user._id + "";
        const ownerId = userId;

        let filter = ["name", "lang1", "lang2", "difficulty", "cards", "public"];

        if ( checkProperties(req.body, filter) === false )
            return next("param err...");
           
        //creatingDeck
        let createdDeck = await Model.Deck
            .create({
                _owner : ownerId,
                name : req.body.name,
                lang1 : req.body.lang1,
                lang2 : req.body.lang2,
                difficulty :  req.body.difficulty,
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

        const userId = req.user._id + "";
        const limit = req.query.limit || 0;
        let lang1 = req.query.lang1 || ".*";
        let lang2 = req.query.lang2 || ".*";
        let name = req.query.name || ".*";

        const type = req.query.status || "owned";

        const user = await Model.User.findOne({ _id: userId});

        const subscriptions = user._subscriptions;

        const searhObjectLang = 
                { 
                    $or: 
                    [
                        {
                            $and: 
                                [
                                    {lang1 : { $regex : lang1}},
                                    {lang2 : { $regex : lang2}}
                                ]
                        },
                        {
                                $and: [
                                    {lang1 : { $regex : lang2}},
                                    {lang2 : { $regex : lang1}}
                                ]
                        }
                    ]
                };

        let searchStatus = {};
        if (type == "owned"){
            searchStatus = { _owner : userId };
        } else if (type == "subscribed"){
            searchStatus = { _id : subscriptions, public : true }
        } else if (type == "explore"){
            searchStatus = { $and : [ { _owner : { $ne : userId} }, { _id : { $nin : subscriptions} }, {public: true} ]};
        } else if ( type == "all"){
            searchStatus = { $or : [{public : true}, {_owner: userId}] } 
        } else {
            searchStatus = { _owner : userId };
        }
        const sob = { $and: [{...searchStatus},{...searhObjectLang}, {name: { $regex:  new RegExp( name.toLowerCase(), "i") }} ] }
        
        console.log({...sob});
        const decks = await Model.Deck.find({ ...sob }).limit(limit);
   
        if (decks === undefined){
            res.status(404);
            res.send("Not Found any decks");
        } else {

            const cardPromises = [];
            decks.forEach( (deck) => {
                const myPromise = new Promise((resolve, reject) => {
                    Model.Card.find( {_deck: deck._id} ).exec((err, cards) =>{
                        if (err)
                            reject();

                        deck.cardsCount = cards.length;
                        resolve();
                        
                    });
                }) 

                cardPromises.push( myPromise );
                
            });
            await Promise.all(cardPromises)

            res.status(200);
            res.json( decks.map( deck=> ( { 
                    id:deck._id,
                    name: deck.name,
                    lang1: deck.lang1,
                    lang2: deck.lang2,
                    difficulty: deck.difficulty,
                    count: deck.cardsCount
            }) ))
           
            

        }
});

exports.getDeckById = Model => catchAsync( async(req,res,next) => {

    //userId should be in jwt
   //const userId = req.user._id + "";
    //TODO check deck auth
    console.log(req.params);

    const userId = req.user.id;
    const deckId = req.params.id;

    const filter=["id"];

    if ( checkProperties(req.params, filter) === false )
        return next("param error, no id");
    
    const deck = await Model.Deck.findOne( { _id: deckId } )
    
    if (!deck)
        return next(new AppError("no deck found by id", 404));

    let status = "";

    if (deck._owner + "" == userId + ""){
        status = "owner"
    }

    else {
        const user = await Model.User.findOne( { _id: userId });

        status = "subscribed";

        const subbed = user._subscriptions.find(id => id == deckId)
        if (!subbed){
            status = "unsubscribed";
        }

        if (deck.public == false){
            status = "private"
        }
    }
    
   
    if (deck != undefined){
        res.json({
            id: deck._id,
            name: deck.name,
            lang1: deck.lang1,
            lang2: deck.lang2,
            difficulty: deck.difficulty,
            status
        })
    } else {
        res.status(404);
        res.json({message: "deck not found"})
    }

    
});

exports.getDeckByIdAll = Model =>
    catchAsync( async(req, res, next) => {

        const userId = req.user.id;
        const deckId = req.params.id;

        if (!deckId)
            return next(new AppError("param error: no deckId", 403))

        const deck = await Model.Deck.findOne({ $and: [ 
                                            {_id: deckId}, 
                                            { $or: [{public:true}, {_owner: userId}] } 
                                        ]  
                                    });
                            
        if (!deck)
            return next(new AppError("deck is not found or auth error", 400))

        let cards;

        if (req.query.type!= undefined){
            const qlist = req.query.type.split(',');
            if( qlist.indexOf('statistic') != -1){

                const cardStat = await Model.CardStat.find( { _user: userId, _deck: deckId } );
                const cardIds = cardStat.filter(stat => stat.wrongCounter > stat.correctCounter).map(stat => stat._card)
                cards = await Model.Card.find({ _id : cardIds });

            } else if(qlist.indexOf('bookmarked') != -1 ){

                const cardStats = await Model.CardStat.find({ _user: userId, _deck: deckId, bookmarked: true});
                const cardIds = cardStats.map( stat => stat._card);
                cards = await Model.Card.find({ _id : cardIds })
            } else {
                cards = await Model.Card.find({ _deck: deckId })
            }
        } else {
            cards = await Model.Card.find({ _deck: deckId })
        }
        
        if (cards != undefined){
            cards = cards.map(card => ({ id: card._id, lang1: card.lang1, lang2: card.lang2 }))

            if (req.query.with!= undefined){
                const qlist = req.query.with.split(',');
                if( qlist.indexOf('bookmark') != -1){
                    cards = await showBookMarks( { cards: cards, deckId: deckId, userId: userId, Model: Model} );
                }
            }
           
            const cardPromises = [];
            cards.forEach(card => {
                const cardPromise = new Promise((resolve, reject) => {
                    Model.Report.findOne({ 'card._id' : card.id  , status: "active" }).exec((err,report) =>{
                        if (err) {
                            console.log(err)
                            reject();
                        }
                            

                        if (report != undefined){
                            card.isReported = true
                        } else {
                            card.isReported = false;
                        }
                        resolve();
                    });
                })
                cardPromises.push(cardPromise);
            })
            
            await Promise.all(cardPromises);
            
        }

        res.status(200);
        res.json({
            id: deck._id,
            name: deck.name,
            lang1: deck.lang1,
            lang2: deck.lang2,
            difficulty: deck.difficulty,
            public: deck.public,
            cards: cards
        })
            

    });

exports.patchDeckById = Model => 
    catchAsync( async (req, res, next)=>{
        

        const ownerId = req.user._id;
        const difficulty = req.body.difficulty || 3;

        const myfilter = ["id", "difficulty", "public", "cards"];

        if ( checkProperties(req.body, myfilter) === false )
            return next(new AppError("bad params", 400 ));

        const deck = await Model.Deck.findOne({ _id : req.body.id })

        if (deck === undefined )
            return next(new AppError("no deck found by id", 404));

        
        if ( deck._owner + "" != ownerId + "")
            return next(new AppError("auth error", 403));

        //delete cards
        
        if (deck.difficulty < 1 || deck.difficulty > 5) {
            return next(new AppError("bad parameter: diff" + difficulty))
        }

        deck.difficulty = difficulty;
        deck.public = req.body.public;
        
        
        const cardsShouldBeDeletedIdArray = req.body.cards.filter(card => (card.action=="delete" && card.id != undefined && card.id != "")).map(card => card.id);
        
        Model.Card.find( { _id: { $in: cardsShouldBeDeletedIdArray }, _deck: deck._id }).exec((err, cards) =>{
            if (err)
                return

            if (cards != undefined){
                cards.forEach( card => {
                    card.active = false;
                    card.save()
                    Model.Report.find( { 'card._id' : card.id} ).exec( (error, reports) => {
                        if (error) {
                            console.log(error)
                            return
                        }

                        if (reports != undefined){
                            reports.forEach( report=> {
                                
                                report.active = false;
                                console.log(report)
                                report.save();
                            })
                        }
                    })
                } )
            }
            
        });

        deck._cards = deck._cards.filter(cardid => !cardsShouldBeDeletedIdArray.includes(cardid + ""));
        
        const cardsShouldBeUpdatedData = req.body.cards.filter(card => (card.action=="update" && card.lang1 != "" && card.lang2 != "" && card.id != "" && checkProperties(card, ["lang1", "lang2","id"]) === true ));
        const cardsShouldBeUpdatedIdArray = cardsShouldBeUpdatedData.map(card => card.id);

        //update cards

        const shouldBeUpdatedCardsModel = await Model.Card.find( {_id: {$in: cardsShouldBeUpdatedIdArray}, _deck: deck._id});

        shouldBeUpdatedCardsModel.forEach(cardModel => {
            const updateData = cardsShouldBeUpdatedData.filter(data => data.id == cardModel._id)[0];
            
            cardModel.lang1 = updateData.lang1;
            cardModel.lang2 = updateData.lang2;

        });
        
        if (shouldBeUpdatedCardsModel.length > 0)
            shouldBeUpdatedCardsModel.forEach(model=>model.save());

        //create cards

        var cardsShouldBeCreated = req.body.cards.filter(card => (card.action=="create" && card.lang1 != "" && card.lang2 != "" && checkProperties(card, ["lang1", "lang2"])))

        

        const createdCards = await Model.Card
            .insertMany(cardsShouldBeCreated.map( card => ({ 
                lang1: card.lang1, 
                lang2: card.lang2,
                _deck: deck._id
         })) );

        deck._cards = [ ...deck._cards, ...createdCards.map(card => card.id)];
         

        await deck.save();

        let newCards = await Model.Card.find( {_deck: deck._id} );

        if (newCards != undefined){
            newCards = newCards.map(card => ({ id: card._id, lang1: card.lang1, lang2: card.lang2 }))
        }

        res.json( { 
            id: deck._id,
            name: deck.name,
            lang1: deck.lang1,
            lang2: deck.lang2,
            difficulty: deck.difficulty,
            public: deck.public,
            cards: newCards
         });

    });

exports.getDeckCardsBookMarked = (Model) => catchAsync( async (req,res,next) => {

    const limit = req.query.limit | 0;
    const userId = req.user.id;
    const deckId = req.params.id;

    const deck = await Model.Deck.findOne({ _id: deckId });

    if (!deck)
        return next(new AppError("no deck found by id", 404));

    const cardStats = await Model.CardStat.find({ _user: userId, _deck: deckId, bookmarked: true}).limit(limit);

    const cardIds = cardStats.map( stat => stat._card);

    const cards = await Model.Card.find({ _id : cardIds })

    res.json(cards);
});

exports.getDeckCardsAll = (Model) => catchAsync( async (req,res,next) => {
    
    const limit = req.query.limit | 0;
   // const userId = req.user.id;
    const deckId = req.params.id;

    const cards = await Model.Card.find( { _deck: deckId }).limit(limit);
    
    res.json(cards);

});


exports.getDeckCardsStatistic = (Model) => catchAsync( async (req,res,next) => {

    const limit = req.query.limit | 0;
    const userId = req.user.id;
    const deckId = req.params.id;

    const cardStat = await Model.CardStat.find( { _user: userId, _deck: deckId } ).limit(limit);

    const cardIds = cardStat.filter(stat => stat.wrongCounter > stat.correctCounter).map(stat => stat._card)

    const cards = await Model.Card.find({ _id : cardIds });

    res.json(cards);

})

exports.subsribeDeck = (Model) => catchAsync( async (req,res,next) => {

    const userId = req.user.id;
    const deckId = req.params.id;

    const deck = await Model.Deck.findOne({ _id: deckId, public: true, _owner: { $ne : userId } });

    if (!deck)
        return next(new AppError("no deck found, may deck is not public or belongs to user", 404));

    const user = await Model.User.findOne({ _id : userId });
    
    const subbedDeckId = user._subscriptions.find(id => id == deckId);

    if(subbedDeckId == undefined){
        user._subscriptions.push(deckId);
        await user.save();
    } 

    res.status(201);
    res.json({subbedDeckId, deckId, userId,_subscriptions: user._subscriptions});

});

exports.unsubsribeDeck = (Model) => catchAsync( async (req,res,next) => {

    const userId = req.user.id;
    const deckId = req.params.id;

    const deck = await Model.Deck.findOne({ _id: deckId, public: true, _owner: { $ne : userId } });

    if (!deck)
        return next(new AppError("no deck found, may deck is not public or belongs to user", 404));

    const user = await Model.User.findOne({ _id : userId });
    
    const subbedDeckId = user._subscriptions.find(id => id == deckId);

    if(subbedDeckId != undefined){
        const index = user._subscriptions.indexOf(subbedDeckId);
        user._subscriptions.splice(index, 1);
        await user.save();
    } 

    res.status(201);
    res.json({subbedDeckId, deckId, userId,_subscriptions: user._subscriptions});

});
