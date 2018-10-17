const mongoose = require('mongoose');
const sh = require('shorthash');

const { User } = require('./user');

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['confirmed', 'packed', 'out for delivery', 'delivered'],
        default: 'confirmed',
        required: true
    },
    orderItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                reuired: true,
                ref: 'Product'
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }    
    ]
});

orderSchema.pre('validate', function(next) {
    let order = this;
    order.orderNumber = `DCT-${sh.unique(`${order.orderDate} + ${order.user}`)}`;
    next();
})

orderSchema.pre('save', function(next) {
    let order = this;
    let total = 0;
    User.findById({ _id: order.user}).populate('cartItems.product').then((user) => {
            user.cartItems.forEach(function(cartItem){
            order.orderItems.push({
                product: cartItem.product._id,
                price: cartItem.product.price,
                qunatity: cartItem.quantity
            });
            total += cartItem.product.price * cartItem.quantity;
        });
        order.total = total;
        next();
    });
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Order
}