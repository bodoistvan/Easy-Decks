const { User } = require('../models');
const catchAsync = require('../utils/catchAsync');
const { checkProperties } = require('../utils/objFilter');

class Card {
    constructor( {cardId, lang1, lang2} ) {
        this.cardId = cardId;
        this.lang1 = lang1;
        this.lang2 = lang2;
        this.status="none";
    }

    answer( {selectedLang, answer} ){
        if (this.status == "none"){

            let word;
            if (selectedLang == "lang1"){
                word = this.lang1;
            } else {
                word = this.lang2;
            }
            if (answer == word){
                this.status = "correct";
                return { status : this.status }
            } else {
                this.status = "wrong";
                return { status : this.status, word }
            }

        } else {
            return {error: "question already answered"}
        }
    }
}

class Deck {
    constructor( {deckId, selectedLang, cards }){
        this.deckId = deckId;
        this.selectedLang = selectedLang;
        this.cards = cards;
    }
}

class UserQuiz {
    constructor( { userId }){
        this.userId = userId;
        this.decks = [];
    }
    
    pushDeck( deck ){
        this.decks.push(deck);
    }
}

class QuizStorage {
    constructor () {
        this.userQuizes = [];
    }

    pushQuiz( newUserQuiz ) {
        const foundUserQuiz = this.userQuizes.find(userQuizItem => userQuizItem.userId == newUserQuiz.userId);

        //if user exist
        if ( foundUserQuiz != undefined){

            //if the deck is already being quized, then replace with the new one
            const foundDeck = foundUserQuiz.decks.find(item => item.deckId == newUserQuiz.decks[0].deckId);
            
            if (foundDeck != undefined){
                console.log(foundDeck);
                const index = foundUserQuiz.decks.indexOf(foundDeck);
                foundUserQuiz.decks.splice(index,1);
            }

            foundUserQuiz.pushDeck(newUserQuiz.decks[0]);
        } else {
            this.userQuizes.push(newUserQuiz);
        }
       
    }

    getQuestions( uid, did ) {
        const user = this.userQuizes.find(item => item.userId == uid);

        if (user != undefined){
            
            const deck = user.decks.find(item => item.deckId == did)

            if (deck != undefined) {
                
                if (deck.selectedLang == "lang1") {
                    return deck.cards.filter(card=> card.status == "none").map(card => ({id: card.cardId, word: card.lang2}));
                }

                if (deck.selectedLang == "lang2") {
                    return deck.cards.filter(card=> card.status == "none").map(card => ({id: card.cardId, word: card.lang1}));
                }
                
            } else {
                return { error: "no deck found"};
            }

        } else { 
            return {error: "no user find"};
        }
    }

    answerQuestion( {userId, deckId, cardId, answer} ){
        const user = this.userQuizes.find(item => item.userId == userId);

        if (user != undefined){
            
            const deck = user.decks.find(item => item.deckId == deckId)

            if (deck != undefined) {
                
                const card = deck.cards.find(item => item.cardId == cardId);

                if (card !=undefined ){
                        
                    return card.answer({ selectedLang: deck.selectedLang, answer}) 

                } else {
                    return { error: "no card found" }
                }   
                
            } else {
                return { error: "no deck found"};
            }

        } else { 
            return {error: "no user find"};
        }
    }
    
}

var quizStorage = new QuizStorage();

exports.createQuiz = () => catchAsync( async (req,res,next) => {

    //quizStorage = new QuizStorage();

    const cards = [
        new Card( { cardId:"cardid1", lang1: "kutya", lang2: "dog" } ),
        new Card( { cardId:"cardid2", lang1: "macska", lang2: "cat" } ),
        new Card( { cardId:"cardid3", lang1: "madár", lang2: "bird" } )
    ]

    const deck = new Deck( {deckId: "deckId1", selectedLang:"lang2", cards: cards, } )

    const userQuiz = new UserQuiz({ userId: "604ca45fc2fe7b1bd4cfecab"}); 
    userQuiz.pushDeck(deck);
    quizStorage.pushQuiz(userQuiz);
   
    res.json({ quizStorage, cards });
    

});

exports.getQuestions = () => catchAsync( async(req,res,next)=>{
    const userId = "604ca45fc2fe7b1bd4cfecab";
    const deckId = req.params.id;

    if (deckId == undefined)
        return next("no deck id found");

    const cards = quizStorage.getQuestions(userId, deckId);

    res.json(cards);

});


exports.sendAnswer = () => catchAsync( async(req,res,next)=>{

    const userId = "604ca45fc2fe7b1bd4cfecab";
    const deckId = req.params.id;
    
    if (deckId == undefined)
        return next("no deck id found");

    const filter = ["id", "word"];
    
    if ( checkProperties(req.body, filter) === false) 
        return next("bad properties")


    const result = quizStorage.answerQuestion({ userId, deckId, cardId: req.body.id, answer: req.body.word })

    res.json(result);

});


