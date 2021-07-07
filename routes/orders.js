const express = require('express');
const router = express.Router();

const {orderProduct} = require('../controllers/orders');
const {protect,authorize} = require('../middleware/auth');

router.route('/:productId').post(protect,authorize('customer'),orderProduct);

module.exports = router;