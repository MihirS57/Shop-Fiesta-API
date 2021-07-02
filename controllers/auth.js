const Customer = require('../models/customer');
const errorResponse = require('../utils/errorResponse');

// @desc    Register a customer
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerCustomer = async (req,res,next) => {
    try{
        const customer = await Customer.create(req.body);
        if(!customer){
            return next(new errorResponse('Some error occured. Please try again later', 400));
        }
        res.status(200)
        .json({
            success: true,
            user: customer
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

// @desc    Fetch all customer
// @route   GET /api/v1/auth/customers
// @access  Private/Admin
exports.getCustomers = async (req,res,next) => {
    try{
        const customers = await Customer.find();
        console.log(customers);
        if(customers.length == 0){
            return next(new errorResponse('No customers found!', 400));
            /* return res.status(200)
            .json({
                success: false,
                message: 'No customers found'
            }) */
        }
        res.status(200)
        .json({
            success: true,
            users: customers
        })
    }catch(err){
        console.log(err.stack)
        next(new errorResponse(err.message,404));
    }
}

