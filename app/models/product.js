const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    stock: {
        type: String,
        required: true,
        min: 0
    },
    codEligible: {
        type: Boolean,
        required: true,
        default: true
    },
    maxUnitsPurchase: {
        type: Number,
        required: true,
        min: 1
    },
    lowStockAlert: {
        type: Number,
        required: true,
        min: 0
    }

})

productSchema.statics.findByCategory = function(id) {
    let Product = this;
    return Product.find( { category: id });
} 

const Product = mongoose.model('Product', productSchema);



module.exports = {
    Product
}