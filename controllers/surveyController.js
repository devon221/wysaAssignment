const sleepPatternService = require('../services/surveyService');

const createSurvey = async (req, res) => {
    try {
        const { timeElapsed, sleptAt, wokeUpAt, hoursSlept } = req.body;

        // Check if any of the required fields are missing
        if (!timeElapsed) {
            throw new Error('timeelapsed is required');
        }
        if (!sleptAt) {
            throw new Error('sleptAt is required');
        }
        if (!wokeUpAt) {
            throw new Error('wokeUpAt is required');
        }
        if (!hoursSlept) {
            throw new Error('hoursSlept is required');
        }
        if(!req.headers.userid)
        {
            throw new Error('Invalid User Present')
        }
        const surveyResponse =  await sleepPatternService.createSleepSurvey(req.headers.userid ,  { timeElapsed, sleptAt, wokeUpAt, hoursSlept } );
        res.status(200).json(surveyResponse);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports = { createSurvey };
