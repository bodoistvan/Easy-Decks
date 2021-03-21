const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { checkProperties } = require('../utils/objFilter');
const uniqid = require('uniqid');

class QuizCard {
    constructor( {cardId, lang1, lang2} ) {
        this.cardId = cardId;
        this.lang1 = lang1;
        this.lang2 = lang2;
        this.status="none";
    }

    //check answer, if it is correct returns status : 'correct' 
    //
    // returns: 
    // {status : 'correct'} --> ok
    // {status : 'wrong', word: correctWord}
    // {error : errMsg } if already answered
    answerQuestion( {selectedLang, answerWord} ){
        if (this.status == "none"){

            let word;
            if (selectedLang == "lang1"){
                word = this.lang1;
            } else {
                word = this.lang2;
            }
            if (answerWord == word){
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

    //should returns whether card has been answered
    //returns:
    // true : already answered
    isAnswered(){
        return this.status != "none"
    }

    getQuestion( {selectedLang} ) {
        let question = { id : this.cardId };
        if (selectedLang == "lang1"){
            question.word = this.lang2;
        } else {
            question.word = this.lang1;
        }
        return question;
    }
}

class Quiz {
    constructor( { userId, dekcId, cards, selectedLang} ){
        this.id = this.genUid();
        this.userId = userId;
        this.dekcId = dekcId;
        this.cards = cards;
        this.selectedLang = selectedLang;
    }

    genUid(){
        return uniqid();
    }

    getUnAnsCards(){
        const unAnsCards = this.cards.filter(card => !card.isAnswered()).map(card => (card.getQuestion( { selectedLang: this.selectedLang } )) );
        return unAnsCards;
    }

    //answer -> { id, word }
    answerQuestion( {answer} ){
        const card = this.cards.find(c => c.cardId + "" == answer.id + "");
        if (card != undefined)
            return card.answerQuestion( {selectedLang: this.selectedLang, answerWord : answer.word} ) 

        return { error: "no card find by cardId" }
    }
}

class QuizStorage {
    constructor(){
        this.quizes = [];
    }

    pushQuiz( quiz ){
        this.quizes.push(quiz);
    }

    getQuestionsByQuizId( {quizId, userId} ){
        const quiz = this.findQuizById( quizId );
        if ( quiz != undefined){
            if (quiz.userId + "" != userId + "")
                return { error : "autherror"};
            return quiz.getUnAnsCards();
        }
            

        return {error: "no quiz found by id"};
    }

    //answer -> { id, word }

    //should auth
    answerQuestionByQuizId( {quizId, answer, userId} ){
        const quiz = this.findQuizById( quizId );
        if ( quiz != undefined){
            if (quiz.userId + "" != userId + "")
                return { error : "autherror"};

            return quiz.answerQuestion( {answer} );
        }
            

        return {error: "no quiz found by id"};
    }

    findQuizById( id ){
        return this.quizes.find( q => q.id + "" == id + "" ); 
    }

}

const quizStorage = new QuizStorage();


exports.createQuiz = (Model) => catchAsync( async (req,res,next) => {

    //check params: userId and deckId
    const userId = req.user._id;

    if ( !userId )
        return next(new AppError('param error: no userid found', 403));

    const deckId = req.body.deckId;

    if ( !deckId )
        return next(new AppError('param error: no deckid found', 403));

    const selectedLang = req.body.language;

    if (!selectedLang)
        return next(new AppError('param error: no language found', 403));

    if (selectedLang != "lang1" && selectedLang != "lang2"){
        return next(new AppError('param error: selected language not valid', 403));
    }

    const deck = await Model.Deck.findOne({ $and: [ 
                                                {_id: deckId}, 
                                                { $or: [{public:true}, {_owner: userId}] } 
                                            ]  
                                        });

    if ( !deck)
        return next( new AppError('no deck found at id'),404);

    const amount = req.body.amount || 10;

    //TODO cards should be active as well
    const dbCards = await Model.Card.find( { _deck: deck._id }).limit(amount);

    if (!dbCards){
        return ( new AppError("no cards found at deck id", 404))
    }

    const quizCards = dbCards.map(card => new QuizCard ({cardId: card._id, lang1: card.lang1, lang2: card.lang2}) );

    const quiz = new Quiz( {userId: userId, deckId: deckId, cards: quizCards, selectedLang: selectedLang } );

    quizStorage.pushQuiz(quiz);

    res.status(200);
    res.json( {id : quiz.id} );

});

exports.getQuestions = () => catchAsync( async(req,res,next)=>{
    const userId = req.user._id;

    if (!userId)
        return next(new AppError("No userId found", 400));

    const quizId = req.params.id;

    if (!quizId)
        return next(new AppError("No quiz found by id", 404));

    const cards = quizStorage.getQuestionsByQuizId( {quizId: quizId, userId: userId} );

    if (cards.error != undefined)
        return next(new AppError(cards.error), 404);

    res.json(cards);

});

exports.answerQuiestion = () => catchAsync( async(req,res,next)=>{

    const userId = req.user._id;
    const quizId = req.params.id;
    
    if (quizId == undefined)
        return next(new AppError("no deck id found", 404));

    const filter = ["id", "word"];
    
    if ( checkProperties(req.body, filter) === false) 
        return next(new AppError("bad properties", 400));

    const cardId = req.body.id;
    const cardWord = req.body.word;
    
    const result = quizStorage.answerQuestionByQuizId({ quizId: quizId, answer: { id: cardId, word: cardWord }, userId: userId})

    if (result.error)
        return next(new AppError(error), 400);

    res.json(result);

});