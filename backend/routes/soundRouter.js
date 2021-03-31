const express = require('express');
const Model = require('../models');
const soundController = require('../controllers/soundController');
const authController = require('../controllers/authController')

const router = express.Router();

//router.use(authController.protect(Model));


router.route('/')
    .get(soundController.download(Model));


module.exports = router;