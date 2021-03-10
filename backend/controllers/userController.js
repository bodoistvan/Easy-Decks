const { filterProperties, checkProperties } = require('../utils/objFilter');

exports.createUser = Model => 
    async(req, res, next) =>{

        let filter = ["name", "password", "mail"]
        
        if(checkProperties(req.body, filter) === false)
            return next("bad User params...");

        const User = await Model.User.create(
            filterProperties( req.body, filter )
        );
        
        console.log(User);

        res.status(201);
        res.json(User);

}