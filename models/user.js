const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { emailValidation } = require('./user');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'username must be provided'],
        validator: function (v) {
            return /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(v);
        }
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
    ,
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        },
    ]
})


// hashing password
UserSchema.pre("save", async function (req, res, next) {
    // console.log("insider pre method");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})


// generate token 
UserSchema.methods.generateToken = async function () {
    try {
        let newtoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: newtoken });
        await this.save();
        return newtoken;
    } catch (error) {
        console.log(error);
    }
}



module.exports = mongoose.model('user', UserSchema);