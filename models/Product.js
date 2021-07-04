const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter product name'],
        unique: true
    },
    company: {
        type: String,
        required: [true,'Please provide a company name']
    },
    description: {
        type: String,
        maxlength: 500,
        required: [true,'Please add a product description']
    },
    dimensions: {
        type: String
    },
    weight: {
        type: String
    },
    cost: {
        type: Number,
        required: [true,'Please add the cost of the product']
    },
    type: {
        type: String,
        enum: ['electronics','mobile','home','fashion'],
        required: [true,'Please enter type of product']
    },
    available:{
        type: Boolean,
        default: true
    },
    warranty: {
        type: String,
        default: "No warranty"
    },
    countryOfOrigin: {
        type: String,
        required: [true,'Please add a country of origin']
    },
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Product',ProductSchema);