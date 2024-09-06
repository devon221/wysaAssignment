const express = require('express');
const mongoose = require('mongoose')
const surveyRoutes = require('./routers/survey')
const userRoutes = require('./routers/user')
const passport = require('passport')
const userSchema = require('./models/user')
require('dotenv').config()


const app = express();
app.use(express.json());

//middlewares passport
require('./middleswares/auth/passport-config')(passport);
require('./middleswares/auth/passport-jwt-config')(passport);
app.use(passport.initialize()); 

mongoose.connect('mongodb+srv://vedchak2020:fA3xP7x7uPE24fiH@wysatest.4kt15.mongodb.net/?retryWrites=true&w=majority&appName=wysaTest')

app.use('/survey' , surveyRoutes)
app.use('/user' , userRoutes)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
