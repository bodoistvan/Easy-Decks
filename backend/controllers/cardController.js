const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.updateCard = (Model) => catchAsync( async(req,res,next)=>{
    
    const cardId = req.params.id + "";
    const userId = req.user.id;

    console.log(cardId);

    const lang1 = req.body.lang1;
    const lang2 = req.body.lang2;

    if (!lang1 || !lang2)
        return next(new AppError("param error, lang1 or lang2 not provided"), 400);

    console.log("asdasdasdsadasdsasadas")

    if (lang1 == "" || lang2 =="" )
        return next(new AppError("param error, lang1 or lang2 shouldnt be empty"), 400);

    console.log("asd");

    const card = await Model.Card.findOne({ _id: cardId });

    if (!card)
        return next(new AppError("no card found at id", 404));

    const deck = await Model.Deck.findOne( {_id : card._deck} );

    if (!deck)
        return next(new AppError("no card found at id", 404));

    if (deck._owner + "" != userId + ""){
        return next(new AppError("auth error", 405));
    }

    card.lang1 = lang1;
    card.lang2 = lang2;
    
    console.log("asdasdsad")

    await card.save();

    res.status(201);

    res.json({id : card._id, lang1: card.lang1, lang2: card.lang2});

});
