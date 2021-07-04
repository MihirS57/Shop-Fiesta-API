const User = require('../models/User');
const Cart = require('../models/Cart');
const errorResponse = require('../utils/errorResponse');

// @desc    Fetch user profile
// @route   GET /api/v1/users/:Id
// @access  Private/Admin/User
exports.userProfile = async (req,res,next) => {
    try{
        const userId = req.params.Id;
        if(!req.user.id == userId && !req.user.role == 'admin'){
            return next(new errorResponse('Unauthorized',401));
        }
        const users = await User.findById(userId);
        
        if(!users){
            return next(new errorResponse('User not found!', 400));
        }
        res.status(200)
        .json({
            success: true,
            role: req.user.role,
            User: users
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

// @desc    Fetch user cart
// @route   GET /api/v1/users/cart/:Id
// @access  Private/Admin/User
exports.userCart = async (req,res,next) => {
    try{
        const userId = req.params.Id;
        if(!req.user.id == userId && !req.user.role == 'admin'){
            return next(new errorResponse('Unauthorized',401));
        }
        const users = await User.findById(userId);
        if(!users){
            return next(new errorResponse('User not found!', 400));
        }
        const cart = await Cart.find({customer:userId}).populate({
            path: 'product supplier',
            select: 'name description company countryOfOrigin'
        });
        if(!cart){
            return next(new errorResponse('Cart empty',401));
        }
        res.status(200)
        .json({
            success: true,
            count: cart.length,
            user: users.name,
            cart: cart
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

