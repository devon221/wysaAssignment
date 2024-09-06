const express = require('express')
const surveyController = require('../controllers/surveyController')
const router = express.Router();

//route to store the survey submitted by user
router.post('/' , surveyController.createSurvey)

module.exports = router; 