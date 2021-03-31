const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.download = (Model) => catchAsync ( async (req,res,next) => {
    
    setTimeout( () => {res.redirect('../sound/helloWorld.mp3')}, 1000);
    
  
});
