const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getQuizResults = (Model) => catchAsync( async(req,res,next)=>{

    const userId = req.user.id;
    const deckId = req.params.id;

    const quizResults = await Model.QuizResult.find({ _user: userId ,_deck: deckId });

    if (quizResults == undefined){
        return next(new AppError("no result", 404));
    }

    res.json(quizResults);

});

exports.getLastQuizResult = (Model) => catchAsync( async(req,res,next)=>{

    const userId = req.user.id;
    const deckId = req.params.id 

    const lastQuiz = await Model.QuizResult.find( {_user: userId, _deck: deckId}).sort( { startedAt: -1 } ).limit(1);

    if (!lastQuiz || lastQuiz.length == 0)
        return next(new AppError("no quiz result found",404));

    res.json(lastQuiz[0])

});