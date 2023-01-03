const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');



const emailValidation = (email) => {
    return validator.isEmail(email);
}

const usernameValidation = (username) => {
    if (!validator.isAlphanumeric(username)) return false;
    return true;
}




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            // comparing hash password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.send({ msg: "Login Successfull", user: user })
            }
            else {
                throw new Error('password didn\'t match');
            }
        }
        else {
            throw new Error('please do register first');
        }
    } catch (error) {
        res.send({ msg: error.message });
    }



}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // console.log(req.body);


        // validation 
        if (!usernameValidation(username)) {
            throw new Error('please provide a valid username');
        }
        if (!emailValidation(email)) {
            throw new Error('please provide a valid email');
        }
        if (password.length < 1) {
            throw new Error('please provide a valid password');
        }


        const dbemail = await User.findOne({ email: email });
        const dbusername = await User.findOne({ username: username });
        if (dbemail) {
            res.send({ msg: 'user already registered' });
        }
        else if (dbusername) {
            res.send({ msg: 'this username is not available' });
        }
        else {
            if (username && password) {

                const newUser = new User(req.body);

                // hashing of password using pre method in models
                newUser.save();
                // const newUser = await User.save(req.body);
                res.send({ msg: 'registered successfully', newUser });
            }
            else {
                res.send({ msg: 'please provide proper creadentials' })
            }
        }
    }
    catch (error) {
        res.send({ msg: error.message });
    }
}

module.exports = { login, register, emailValidation };