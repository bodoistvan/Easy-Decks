const { Card } = require("../../models")

exports = function(){

    return (req,res,next) => {
        
        if ( res.locals.deck === undefined || req.body.cards === undefined) {
            next("no cards or no deck");
        } else {
            const cards = [ ...req.body.cards ];
            let cardIds = [];
            for (let i = 0; i < cards.length; i++){
                Card.create({
                    _owner : res.body.locals.deck._id,
                    lang1 : cards[i].lang1,
                    lang2 : cards[i].lang2
                }, (err, card) =>{
                    if (err){
                        next(err);
                    } else {
                        cardIds.push(card._id);
                    }
                })
            }
            res.locals.cardIds = cardIds;
            next();
        }

    }

}