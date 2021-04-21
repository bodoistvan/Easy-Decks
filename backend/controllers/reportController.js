const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.createReport = (Model) => catchAsync( async (req,res,next) => {

    const userId = req.user.id;
    const cardId = req.body.cardId;
    const text = req.body.text;


    if ( !cardId )
        next(new AppError("param error: no deckId ir cardId"),403);

    const card = await Model.Card.findOne( { _id: cardId} )

    if ( !card )
        next(new AppError("no card found on cardId", 404));

    const deck = await Model.Deck.findOne( {_id: card._deck} );

    if ( !deck )
        next(new AppError("no deck found on deckId", 404));


    const report = await Model.Report.create( 
        { _reportedBy: userId, 
            card: card, 
            _deck: deck._id,
            _owner: deck._owner,
            type: "spelling",
            text: text
        })

    const savedCard = { id: card._id, lang1: card.lang1, lang2: card.lang2};
    res.status(201);
    res.json({
        id : report._id,
        owner: report._owner,
        deck: report._deck,
        card: savedCard,
        reportedBy: report._reportedBy,
        text: report.text,
        createdAt: report.createdAt,
        type: report.type,
    });

    
});

exports.findReportsByOwner = (Model) => catchAsync( async (req,res,next) => {

    const userId = req.user.id;

    const reports = await Model.Report.find( { _owner: userId, status:"active" } ).sort( { createdAt: -1 } );

    const reportPromises = [];

    if (reports != undefined){
        reports.forEach( report => {
            const reportPromise = new Promise((resolve, reject)=> {
                Model.Card.findOne ({ _id: report.card._id }).exec((err, card)=>{
                    if (err)
                        reject();

                    if (card != undefined){
                        if ( (report.card.lang1 + "" != card.lang1 + "") || (report.card.lang2 + "" != card.lang2 + "")){
                            report.newCard = { lang1 : card.lang1, lang2 : card.lang2 }
                            report.changed = true;
                        } else {
                            report.changed = false;
                        }
                    }
                    resolve()
                })
            })
            reportPromises.push(reportPromise);
        });
    }

    await Promise.all(reportPromises);

    const foundReports = reports.map( report => ({ id : report._id,
        owner: report._owner,
        deck: report._deck,
        card: {id: report.card._id, lang1: report.card.lang1, lang2: report.card.lang2},
        newCard: report.newCard,
        reportedBy: report._reportedBy,
        text: report.text,
        createdAt: report.createdAt,
        changed: report.changed,
        type: report.type,
        status: report.status
     }))


    res.json(foundReports);


})

exports.findReportsByreportedBy = (Model) => catchAsync( async (req,res,next) => {

    const userId = req.user.id;

    const reports = await Model.Report.find( { _reportedBy: userId } ).sort( { createdAt: -1 } );

    const foundReports = reports.map( report => ({ id : report._id,
        owner: report._owner,
        deck: report._deck,
        card: {id: report.card._id, lang1: report.card.lang1, lang2: report.card.lang2},
        reportedBy: report._reportedBy,
        text: report.text,
        createdAt: report.createdAt,
        type: report.type,
        status: report.status
     }))

     res.json(foundReports);
})

exports.submitReport = (Model, status) => catchAsync( async (req,res,next) => {
    
    const reportId = req.params.id;
    const userId = req.user.id;

    const report = await Model.Report.findOne( { _id: reportId} );

    if (!report)
        return next(new AppError("No report found at id!", 404));

    if (report.status +"" != "active")
        return next(new AppError("Report already submitted", 405));

    if ( report._owner + "" != userId + "")
        return next(new AppError("Auth err"), 405);

    report.status = status;
    report.save();

    res.status(201);
    res.send();

});
