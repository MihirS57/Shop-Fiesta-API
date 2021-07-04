const express = require('express');
const router = express.Router();
const {getProducts,getProduct,addProduct,addToCart} = require('../controllers/products');
const {protect,authorize} = require('../middleware/auth');
    
router.route('/:productType').get(getProducts).post(protect,authorize('admin','supplier'),addProduct);  //do authenticate with customer token and supplier token
router.route('/:productType/:productId').get(getProduct).post(protect,authorize('customer'),addToCart);

module.exports = router;