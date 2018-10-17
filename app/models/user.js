/* 
username
email
password
tokens: [{ }]
role:
*/
const mongoose = require('mongoose');
// const { mongoose } = require('../../config/db')
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { cartItemSchema } = require('./cart_item');

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 64,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // [true, 'email should be unique'] - for passing your own message
        // validate is used for defining our own validations
        validate:{
            validator: function(value){
              //  return always false to throw a validation error
              return validator.isEmail(value);
            },
            message: function(){
                return 'invalid email format'
            }
        }   
    },
    password: {
    type: String,
    minlength: 8,
    maxlength:128, 
    required: true
    },
    tokens: [{
        token: {
            type: String            // [String]/ [Number] for storing as array of strings or number
        }
    }],
    role: {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    cartItems: [cartItemSchema],
    wishListItems: [
        { createdAt: { type: Date, default: Date.now },
        product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
        isPublic: { default: true, type:Boolean }
         }
        ]
});

// middleware provided by mongoose, it is not express middleware, so not defining in controller folder
userSchema.pre('save', function(next){
    let user = this;
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(user.password, salt).then((hashed) =>{
        user.password = hashed;
        next();
        })
    });
});

// we don't want to send back whole created user information i.e. user object including password to user, so we are overwriting deafult behavior by defining our own instance method
userSchema.methods.shortInfo = function() {     //instead of shortInfo,there is built in toJSON method
    return {
        _id: this._id,
        username: this.username,
        email: this.email
    }
}

userSchema.statics.findByToken = function(token) {
    let User = this;     //capital User because we are defining method on class
    let tokenData;       // defined outside, as variable defined using let are block scoped, they are available only within flower brackets         
    try {
        tokenData = jwt.verify(token, 'supersecret');
    } catch(e) {                                          // exception handling
        return Promise.reject(e);
    }
    return User.findOne({               // could have use findById method
        _id: tokenData._id,                
        'tokens.token': token            // to access token field i.e property of tokens array, syntax                                     will be 'tokens.token' 
    }).then((user) => {
        if(user) {
            return Promise.resolve(user);
        } else {
            return Promise.reject(user); 
        }
    })
};

userSchema.methods.generateToken = function(next) {
    let user = this;
    let tokenData = {
        _id: user.id
    };
// here we have hardcoded the value 'supersecret', but in actual application, you will not do like this,it must read from process object
    let token = jwt.sign(tokenData, 'supersecret');
    user.tokens.push({
        token
    });

    return user.save().then(() => {
        return token;
    });
}


const User = mongoose.model('User', userSchema);

module.exports = { 
    User
}





