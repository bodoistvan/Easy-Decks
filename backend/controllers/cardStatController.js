const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.bookMark = (Model) => catchAsync( async (req,res,next) => {
    
    const userId = req.user.id;
    const cardId = req.params.id;
    const value = req.params.value;

    if ( !value )
        return next(new AppError("param error, no value", 400));

    if(value !== 'true' && value !== 'false')
        return next(new AppError("param error: invalid value", 400));

    const bookmarked = value === 'true';

    if (!userId || !cardId)
        return next(new AppError("param error, userId or deckId", 400));

    const card = await Model.Card.findOne( { _id: cardId } )
    
    if (!card) 
        return next(new AppError("no card found", 404));

    let cardStat = await Model.CardStat.findOne({ _user: userId, _card: cardId });

    if (!cardStat) {
        cardStat = await Model.CardStat.create({
            _deck: card._deck,
            _card : card,
            _user: userId,
            bookmarked: bookmarked
        })
    } else {
        cardStat.bookmarked = bookmarked;
        await cardStat.save()
    }

    res.json(cardStat);
        
});