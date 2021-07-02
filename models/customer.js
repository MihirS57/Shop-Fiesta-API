const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please provide your name']
    },
    email:{
        type: String,
        required: [true,'Please provide your email'],
        unique: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            'Please provide a valid email ID'
        ]
    },
    password:{
        type: String,
        required: [true,'Please provide a password'],
        minlength:6,
        select: false
    },
    DateOfBirth:{
        type: String,
        required: [true,'Please provide your date of birth']
    },
    Address:{
        type: String,
        required: [true,'Please provide your address'],
        maxlength: 200
    },
    Pincode:{
        type: Number,
        required: [true,'Please provide your pincode']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customer',CustomerSchema);