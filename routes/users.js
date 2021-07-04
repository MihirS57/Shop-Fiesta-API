const express = require('express');
const router = express.Router();
const {userProfile,userCart} = require('../controllers/users')
const {protect,authorize} = require('../middleware/auth');

router.route('/:Id').get(protect,userProfile);  //do authenticate with token
router.route('/cart/:Id').get(protect,authorize('admin','customer'),userCart);
module.exports = router;