const SleepPattern = require('../models/sleepPattern');

const createSleepSurvey = async (userId, surveyData) => {
    //scoring logic for survey
    const getScore = (timeElapsed, hoursSlept) => {
        let score = 0;

        // Scoring based on timeElapsed
        switch (timeElapsed) {
            case 'less than 2 weeks':
                score += 15;
                break;
            case '2 to 8 weeks':
                score += 10;
                break;
            case 'more than 8 weeks':
                score += 5;
                break;
            default:
                score += 0; // Default score for undefined timeElapsed
                break;
        }

        // Scoring based on hoursSlept
        if (hoursSlept < 4) {
            score += hoursSlept; // Bad sleep
        } else if (hoursSlept >= 4 && hoursSlept < 8) {
            score += 10; // Average sleep
        } else if (hoursSlept >= 8) {
            score += 15; // Good sleep
        }

        return score;
    };

    // Calculate the score
    const { timeElapsed, hoursSlept } = surveyData;
    const score = getScore(timeElapsed, hoursSlept);

    // Determine conclusion based on score
    let conclusion;
    if (score >= 25) {
        conclusion = 'Good sleeping habits';
    } else if (score >= 15 && score < 25) {
        conclusion = 'Average sleeping habits';
    } else {
        conclusion = 'Bad sleeping habits';
    }

    // Create a new SleepPattern document with the score and conclusion
    const sleepSurveyData = new SleepPattern({
        userId,
        ...surveyData,
        score,
        conclusion, // Add conclusion to the document
    });

    // Save the document and return the result
    await sleepSurveyData.save();

    // Return the score, hours slept, and conclusion
    return {
        score,
        hoursSlept,
        conclusion
    };
};

module.exports = {
    createSleepSurvey
};
