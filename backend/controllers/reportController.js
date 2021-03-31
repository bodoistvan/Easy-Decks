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

    console.log("card: "+  {card})

    const report = await Model.Report.create( 
        { _reportedBy: userId, 
            _card: card._id, 
            _deck: deck._id,
            _owner: deck._owner,
            type: "spelling",
            text: text
        })

    
    res.status(201);
    res.json({
        id : report._id,
        owner: report._owner,
        deck: report._deck,
        card: report._card,
        reportedBy: report._reportedBy,
        text: report.text,
        createdAt: report.createdAt,
        type: report.type,
    });

    
});

exports.findReportsByOwner = (Model) => catchAsync( async (req,res,next) => {

    const userId = req.user.id;

    const reports = await Model.Report.find( { _owner: userId } );

    const foundReports = reports.map( report => ({ id : report._id,
        owner: report._owner,
        deck: report._deck,
        card: report._card,
        reportedBy: report._reportedBy,
        text: report.text,
        createdAt: report.createdAt,
        type: report.type,
        status: report.status
     }))


    res.json(foundReports);


})

exports.findReportsByreportedBy = (Model) => catchAsync( async (req,res,next) => {

    const userId = req.user.id;

    const reports = await Model.Report.find( { _reportedBy: userId } );

    const foundReports = reports.map( report => ({ id : report._id,
        owner: report._owner,
        deck: report._deck,
        card: report._card,
        reportedBy: report._reportedBy,
        text: report.text,
        createdAt: report.createdAt,
        type: report.type,
        status: report.status
     }))

     res.json(foundReports);
})