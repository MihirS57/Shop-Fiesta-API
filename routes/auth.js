const express = require('express');
const router = express.Router();

const {registerCustomer,getCustomers} = require('../controllers/auth')

router.route('/register').post(registerCustomer);
router.route('/customers').get(getCustomers);

module.exports = router;