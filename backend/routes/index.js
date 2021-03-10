var LEVEL = {
    INTERMADIEATE : "intermediate",
    BEGINNER : "beginner",
    ADVANCED : "advanced"
}

var LANG = {
    HUN : "hun",
    USA : "usa",
    GER : "ger"
}


var decks = [
    {
        name: "Gardening",
        level: LEVEL.BEGINNER,
        lang1: LANG.HUN,
        lang2: LANG.GER
    }, 
    {
        name: "Family",
        level: LEVEL.INTERMADIEATE,
        lang1: LANG.GER,
        lang2: LANG.HUN
    }, 
    {
        name: "Consumer Sociaty",
        level: LEVEL.ADVANCED,
        lang1: LANG.USA,
        lang2: LANG.HUN
    },
    {
        name: "Consumer Sociaty",
        level: LEVEL.ADVANCED,
        lang1: LANG.USA,
        lang2: LANG.HUN
    },
    {
        name: "Consumer Sociaty",
        level: LEVEL.ADVANCED,
        lang1: LANG.USA,
        lang2: LANG.HUN
    },
    {
        name: "Consumer Sociaty",
        level: LEVEL.ADVANCED,
        lang1: LANG.USA,
        lang2: LANG.HUN
    },{
        name: "Consumer Sociaty",
        level: LEVEL.ADVANCED,
        lang1: LANG.USA,
        lang2: LANG.HUN
    }
    ,{
        name: "Consumer Sociaty",
        level: LEVEL.ADVANCED,
        lang1: LANG.USA,
        lang2: LANG.HUN
    },{
        name: "Consumer Sociaty",
        level: LEVEL.ADVANCED,
        lang1: LANG.USA,
        lang2: LANG.HUN
    }
];
    


module.exports = function(app){

    app.get('/decks', (req, res) => {
        setTimeout(() => res.json(decks), 0);
    })

}

