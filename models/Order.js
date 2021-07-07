const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    Quantity: {
        type: Number,
        default: 1
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card','Debit Card','Cash On Delivery','UPI','Bank Transfer','EMI'],
        required: true
    }
});

module.exports = mongoose.model('Order',OrderSchema);