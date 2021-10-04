const express = require('express');
const router = express.Router();

const {registerUser,
    loginUser,
    getUsers} = require('../controllers/auth')

router.route('/register').post(registerUser);
router.route('/users').get(getUsers);   //only admin token authorized
router.route('/login').post(loginUser);


module.exports = router;