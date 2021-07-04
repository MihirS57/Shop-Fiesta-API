const express = require('express');
const router = express.Router();

const {registerUser,
    loginUser,
    getUsers} = require('../controllers/auth')

router.route('/register').post(registerUser);
router.route('/users').get(getUsers);   //only admin token authorized
router.route('/login').get(loginUser);


module.exports = router;