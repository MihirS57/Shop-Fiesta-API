const Order = require('../models/Order');
const Product = require('../models/Product');
const errorResponse = require('../utils/errorResponse');
// @desc    Order product
// @route   POST /api/v1/orderProduct/:productId
// @access  Private/User/Customer
exports.orderProduct = async (req,res,next) => {
    try{
        const productId = req.params.productId;
        const {paymentMethod,quantity} = req.body;
        const product = await Product.findById(productId);
        if(!product){
            return next(new errorResponse('Product does not exist',404));
        }
        const supplierId = product.supplier;
        const customerId = req.user.id;
        const orderItem = await Order.create({
            supplier: supplierId,
            customer: customerId,
            product: productId,
            quantity: quantity,
            paymentMethod: paymentMethod
        });
        if(!orderItem){
            return next(new errorResponse('Some error occured while ordering your item',404));
        }
        res.status(200).
        json({
            success: true,
            message: `Your order has been placed for ${product.name}.`
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}