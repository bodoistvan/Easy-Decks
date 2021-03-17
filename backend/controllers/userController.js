const catchAsync = require('../utils/catchAsync');
const { filterProperties, checkProperties } = require('../utils/objFilter');

exports.createUser = Model => 
    catchAsync( async(req, res, next) =>{

        let filter = ["name", "password", "mail"]
        
        if(checkProperties(req.body, filter) === false)
            return next("bad User params...");

        const User = await Model.User.create(
            filterProperties( req.body, filter )
        );
        
        console.log(User);

        User.password = undefined;

        res.status(201);
        res.json(User);

})

exports.getAllUser = Model => catchAsync( async (req,res,next) => {

    const users = await Model.User.find();

    res.json({users});

})