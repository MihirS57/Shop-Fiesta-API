const Product = require('../models/Product');
const Order = require('../models/Order');
const errorResponse = require('../utils/errorResponse');
const Cart = require('../models/Cart');
// @desc    Fetch all products
// @route   GET /api/v1/products/:productType
// @access  Public
exports.getProducts = async (req,res,next) => {
    try{
        const productType = req.params.productType;
        const productId = req.params.productId;
        let products;
        if(!productId){
            products = await Product.find({
                type: productType
            });
        }else{
            products = await Product.findById(productId);
        }
        
        if(!products && !productId){
            if(!productId){
                return next(new errorResponse(`No ${productType} products not found!`, 400));
            }else{
                return next(new errorResponse(`${productId} product not found!`, 400));
            }
        }
        res.status(200)
        .json({
            success: true,
            count:products.length,
            products: products
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

// @desc    Get a product
// @route   GET /api/v1/products/:productType/:productId
// @access  Public
exports.getProduct = async (req,res,next) => {
    try{
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if(!product){
            return next(new errorResponse(`${productId} product not found!`, 400));
        }
        res.status(200)
        .json({
            success: true,            
            product: product
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

// @desc    Add a product
// @route   POST /api/v1/products/:productType
// @access  Private/Supplier/Admin
exports.addProduct = async (req,res,next) => {
    try{
        req.body.type = req.params.productType;
        req.body.supplier = req.user.id;
        const {name,cost,company,gender,dimensions,ageGroup,weight,available,imageUrl,type,warranty,description,countryOfOrigin,supplier} = req.body;
        
        const product = await Product.create({
            name,cost,company,gender,dimensions,ageGroup,weight,available,imageUrl,warranty,type,description,countryOfOrigin,supplier
        })
        if(!product){
            return next(new errorResponse('Some error occurred while registering the product',404));
        }
        res.status(200).
        json({
            success: true,
            product: product
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

// @desc    Add to cart
// @route   POST /api/v1/products/:productType/:productId
// @access  Private/User/Customer
exports.addToCart = async (req,res,next) => {
    try{
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if(!product){
            return next(new errorResponse('Product does not exist',404));
        }
        const supplierId = product.supplier;
        const customerId = req.user.id;
        const cartItem = await Cart.create({
            supplier: supplierId,
            customer: customerId,
            product: productId
        });
        
        res.status(200).
        json({
            success: true,
            cartItem: cartItem
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}





