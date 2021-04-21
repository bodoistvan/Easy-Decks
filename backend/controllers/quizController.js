const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { checkProperties } = require('../utils/objFilter');
const uniqid = require('uniqid');
const model = require('../models');

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
    constructor( { userId, deckId, cards, selectedLang} ){
        this.id = this.genUid();
        this.startedAt = Date.now();
        this.amount = cards.length;
        this.finishAt = new Date(this.startedAt + this.amount * 2 * 60 * 1000).getTime();
        this.userId = userId;
        this.deckId = deckId;
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

    saveQuizResult(){
        const resultPercent = this.cards.filter(c => c.status + "" == "correct").length * 100 / this.amount;
        model.QuizResult.create({
                _user : this.userId,
                _deck : this.deckId,
                startedAt : this.startedAt,
                selectedLang: this.selectedLang,
                resultPercent: resultPercent,
                amount: this.amount,
                results : this.cards
        })
    }

}

class QuizStorage {
    constructor(){
        this.quizes = [];
    }

    pushQuiz( quiz ){
        const preQuiz = this.findQuizByUserIdDeckId( quiz.userId, quiz.deckId );
        if (preQuiz){
            console.log("letezett");
            this.deleteQuiz( preQuiz.id, preQuiz.startedAt );
        }
        
        setTimeout(()=>{this.deleteQuiz( quiz.id, quiz.startedAt )}, quiz.finishAt - quiz.startedAt )
        this.quizes.push(quiz);
    }

    

    deleteQuiz( id, startedAt ){
        const quiz = this.findQuizById ( id );
        if (!quiz)
            return
        if (quiz.startedAt + "" == startedAt + ""){
            quiz.saveQuizResult();
            const index = this.quizes.indexOf(quiz);
            this.quizes.splice(index, 1);
            console.log("deleted...")
        }
        
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

    findQuizByUserIdDeckId( userId, deckId ){
        return this.quizes.find( q => (q.userId + "" == userId + "" && q.deckId + "" == deckId + "" )); 
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

    async saveQuizResultById({ userId, quizId, Model }) {
        const quiz = this.findQuizById( quizId );
        if ( quiz != undefined){
            if (quiz.userId + "" != userId + "")
                return { error : "autherror"};

            const resultPercent = quiz.cards.filter(c => c.status + "" == "correct").length * 100 / quiz.amount;

            await Model.QuizResult.create({
                _user : quiz.userId,
                _deck : quiz.deckId,
                startedAt : quiz.startedAt,
                selectedLang: quiz.selectedLang,
                resultPercent: resultPercent,
                amount: quiz.amount,
                results : quiz.cards
            })
        }
    }

    async saveCardStat( { userId, Model, status, cardId } ){

        let cardStat = await Model.CardStat.findOne({ _user : userId, _card: cardId});
        const card = await Model.Card.findOne({ _id: cardId })

        if (!card)
            return;
        
        if (cardStat == undefined){
      
            cardStat = await Model.CardStat.create({
                _card: cardId,
                _user: userId,
                _deck: card._deck
            })
        }
  
        if (status +'' == 'correct')
            cardStat.correctpp();
        
        if (status+ '' == 'wrong')
            cardStat.wrongpp();

        cardStat.save();
      
    }

}

const quizStorage = new QuizStorage();


exports.createQuiz = (Model) => catchAsync( async (req,res,next) => {

    //check params: userId and deckId
    const userId = req.user._id;
    const type = req.body.type;

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

    let cards;

    if (type!= undefined){
       
        if( type == 'statistic'){

            const cardStat = await Model.CardStat.find( { _user: userId, _deck: deckId } );
            const cardIds = cardStat.filter(stat => stat.wrongCounter > stat.correctCounter).map(stat => stat._card)
            cards = await Model.Card.find({ _id : cardIds });

        } else if( type == 'bookmarked'){

            const cardStats = await Model.CardStat.find({ _user: userId, _deck: deckId, bookmarked: true});
            const cardIds = cardStats.map( stat => stat._card);
            cards = await Model.Card.find({ _id : cardIds })
        } else {
            cards = await Model.Card.find({ _deck: deckId })
        }
    } else {
        cards = await Model.Card.find({ _deck: deckId })
    }

    if (!cards){
        return ( new AppError("no cards found at deck id", 404))
    }

    cards = cards.map(card => ({_id: card._id, lang1: card.lang1, lang2: card.lang2}));
    console.log(cards);
    //get randoms 
    let dbCards = [];

    while ( dbCards.length != amount && cards.length > 0){
        const randomIndex =  Math.floor(Math.random() * cards.length);
        const item = cards[randomIndex];    
        dbCards.push(item);
        cards.splice(randomIndex, 1);
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
        return next(new AppError("param error: no quizId", 404));

    const cards = quizStorage.getQuestionsByQuizId( {quizId: quizId, userId: userId} );

    if (cards.error != undefined)
        return next(new AppError(cards.error), 404);

    const quiz = {...quizStorage.findQuizById(quizId)}
    quiz.cards = undefined;
    if (quiz != undefined){
        quiz.questions = cards;
    }

    res.json(quiz);

});

exports.answerQuiestion = (Model) => catchAsync( async(req,res,next)=>{

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

    //statistic
    quizStorage.saveCardStat({
        Model: Model,
        cardId: cardId,
        userId : userId,
        status : result.status
    })
    const finished = quizStorage.getQuestionsByQuizId( {quizId: quizId, userId: userId});
    if (finished.length === 0){
        const quiz = quizStorage.findQuizById( quizId )
        quizStorage.deleteQuiz( quiz.id, quiz.startedAt )
    }


    res.json(result);

});


exports.getAllQuizes = () => catchAsync(async (req,res,next) =>{

    res.json(quizStorage);

});

exports.getInProgress = () => catchAsync(async (req,res,next) =>{

    const userId = req.user.id;
    const deckId = req.params.deckId;

    const quiz = quizStorage.findQuizByUserIdDeckId( userId, deckId );

    if (!quiz){
        console.log("nincs");
        return next(new AppError("no quiz found", 404));
    }
        

    res.json(quiz);

});