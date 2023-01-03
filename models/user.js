const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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


// hashing password
UserSchema.pre("save", async function (req, res, next) {
    // console.log("insider pre method");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})


module.exports = mongoose.model('user', UserSchema);