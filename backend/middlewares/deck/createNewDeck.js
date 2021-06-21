const { Deck } = require("../../models")

/*
creates deck in database
*/

exports = function() {

    const checkProperties = (obj, keys) => {

        let correct = true;
        for (let i = 0; i < keys.length; i++){
            if (keys[i] in obj){
                continue;
            } else {
                correct = false;
            }
        }
        return correct;
    }

    return async(req, res, next) => {
        if ( checkProperties(req.body, ["owner","name", "lang1", "lang2", "level"]) ) {


            Deck.create({
                _owner: req.body._owner,
                name: req.body.name,
                lang1 : req.body.lang1,
                lang2: req.body.lang2,
                level: req.body.level
            }, (err, deck) => {
                if (err) {
                    next(err);
                } else {
                    res.locals.deck = deck;
                    next();
                }
            });

        }

        next("creating deck, propety")
    }

} 

