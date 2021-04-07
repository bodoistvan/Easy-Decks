const flagInfo = require('../models/FlagInfoModel')

exports.getFlagInfo = () => (req,res,next)=>{
    res.json(flagInfo);
}