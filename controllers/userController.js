const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const userService = require('../services/userService')

// Register a new user
const registerUser = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = new User({ name, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

// Authenticate user and generate JWT token
const loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ error: err.message });
        }

        const payload = { id: user._id, name: user.name };
        const token = jwt.sign(payload, 'dummy_jwt_secret', { expiresIn: '1h' });
        return res.json({ token: `Bearer ${token}` });
    })(req, res, next);
};

// Protected route handler
const protectedRoute = (req, res) => {
    res.json({ message: 'You have accessed a protected route!' });
};


// Fetch all users
const fetchAllUsers = async (req, res) => {
    try {
        //hardcoding admin logic for ease
        if(req.body.isAdmin )
        {
            throw new Error("Not Authorized : Admin Auth Failed")
        }
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: 'Error fetching users' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        if(req.body.isAdmin )
            {
                throw new Error("Not Authorized : Admin Auth Failed")
            }

        const result = await userService.deleteUserById(userId);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error deleting user' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    protectedRoute,
    //admin controls 
    deleteUser,
    fetchAllUsers
};
