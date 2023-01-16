const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/login');
const { createToDo } = require('../controllers/todo');
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/create').post(createToDo);

module.exports = router;

