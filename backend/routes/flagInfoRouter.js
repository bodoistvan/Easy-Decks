const express = require('express');
const flagInfoController = require('../controllers/flagInfoController')
const authController = require('../controllers/authController')
const Model = require('../models');
const router = express.Router();

//router.use(authController.protect(Model));

router.route("/")
    .get(flagInfoController.getFlagInfo())


module.exports = router;