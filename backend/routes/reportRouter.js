const express = require('express');
const Model = require('../models');
const reportController = require('../controllers/reportController');
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.protect(Model));


router.route('/')
    .post(reportController.createReport(Model));

router.route("/owner")
    .get(reportController.findReportsByOwner(Model));


router.route("/reportedBy")
    .get(reportController.findReportsByreportedBy(Model));

module.exports = router;