const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
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
    dateOfBirth:{
        type: String,
    },
    address:{
        type: String,
        required: [true,'Please provide your address'],
        maxlength: 200
    },
    role: {
        type: String,
        enum: ['customer','supplier','admin'],
        default:'customer'
    },
    type:{
        type: String,
        enum: ['electronics','mobile','home','fashion']
    },    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
});

UserSchema.methods.getSignedUserToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_CODE,{
        expiresIn: process.env.JWT_TOKEN_EXPIRY
    });
}

UserSchema.methods.matchPasswords = async function(passwordIn){
    return await bcrypt.compare(passwordIn,this.password);
}

module.exports = mongoose.model('User',UserSchema);