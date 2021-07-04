const errorResponse = require('../utils/errorResponse');
const User = require('../models/User');
// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = async (req,res,next) => {
    try{
        if(req.body.role == 'admin'){
            const user = await User.findOne({
                role: 'admin'
            });
            if(user){
                return next(new errorResponse('Admin already exists',401));
            }
        }
        const user = await User.create(req.body);
        if(!user){
            return next(new errorResponse('Some error occured. Please try again later', 400));
        }
        res.status(200)
        .json({
            success: true,
            user: user
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

// @desc    Login a user
// @route   GET /api/v1/auth/login
// @access  Public
exports.loginUser = async (req,res,next) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return next(new errorResponse('Missing fields',401));
        }

        const user = await User.findOne({
            email: email
        }).select('+password');

        if(!user || ! (await user.matchPasswords(password))){
            return next(new errorResponse('Incorrect email or password', 401));
        }
        const token = user.getSignedUserToken();
        res.status(200)
        .json({
            success: true,
            role: user.role,
            token: token,
            message: `${user.name}, you have successfully logged in`
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

// @desc    Fetch all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = async (req,res,next) => {
    try{

        const users = await User.find();
        console.log(users);
        if(users.length == 0){
            return next(new errorResponse('No users found!', 400));
        }
        res.status(200)
        .json({
            success: true,
            users: users
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

