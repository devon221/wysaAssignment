const express = require('express');
const mongoose = require('mongoose')
const surveyRoutes = require('./routers/survey')
const userRoutes = require('./routers/user')
const passport = require('passport')
require('dotenv').config()


const app = express();
app.use(express.json());

//middlewares passport
require('./middleswares/auth/passport-config')(passport);
require('./middleswares/auth/passport-jwt-config')(passport);
app.use(passport.initialize()); 

mongoose.connect(`${process.env.CONNECTSTRING}`)

app.use('/survey' , surveyRoutes)
app.use('/user' , userRoutes)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
