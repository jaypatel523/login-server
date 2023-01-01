const mongoose = require('mongoose');
// const { emailValidation } = require('./user');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'username must be provided'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email must be provided'],
        // validate: [emailValidation, 'please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        min: [6, 'too few eggs']
    }
})

module.exports = mongoose.model('user', UserSchema);