const User = require('../models/user');

// Fetch all users
const getAllUsers = async () => {
    return await User.find({});
};

// Delete a user by ID
const deleteUserById = async (userId) => {
    return await User.deleteOne({ _id: userId });
};

module.exports = {
    getAllUsers,
    deleteUserById
};
