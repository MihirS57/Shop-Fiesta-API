const express = require('express');
const router = express.Router();

const {orderProduct,getOrders} = require('../controllers/orders');
const {protect,authorize} = require('../middleware/auth');

router.route('/:productId').post(protect,authorize('customer'),orderProduct);
router.route('/orders').get(protect,authorize('supplier','customer'),getOrders);
module.exports = router;