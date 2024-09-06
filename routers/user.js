const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

// Protected route using JWT
router.get('/protected', passport.authenticate('jwt', { session: false }), userController.protectedRoute);

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

//admin control routes relating to user actions
// Fetch all users
router.get('/all', passport.authenticate('jwt', { session: false }), userController.fetchAllUsers);

// Delete a user by ID
router.delete('/:userId', passport.authenticate('jwt', { session: false }), userController.deleteUser);


module.exports = router;
