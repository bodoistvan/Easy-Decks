const express = require('express');
const Model = require('../models');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(userController.getAllUser(Model))
    .post(authController.signup(Model));

router.route('/login')
    .post(authController.login(Model));

module.exports = router;