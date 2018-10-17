const express = require('express');
const _ = require('lodash');
const router = express.Router();
// const { ObjectID } = require('mongodb');
const { Product } = require('../models/product');
const { validateID } = require('../middlewares/utilities');
const { autheticateUser, authorizeUser } = require('../middlewares/authentication');


// index
router.get('/', (req,res) => {
    Product.find().then((products) => {
        res.send(products);
    }).catch((err) => {
        res.send(err);  
    })
})

// create
router.post('/', autheticateUser, authorizeUser, (req,res) => {
    let body = _.pick(req.body, ['codEligible', 'name', 'description', 'price', 'stock', 'category', 'maxUnitsPurchase', 'lowStockAlert'])
    let product = new Product(body);
    product.save().then((product) => {
        res.send({
            product,
            notice: 'Successfully created the product'
        });
    }).catch((err) => {
        res.send(err);
    })
})

// findbyid
router.get('/:id', validateID, (req, res) => {

    let id = req.params.id;
    Product.findById(id).populate('category', 'name').then((product) => {
        if (product){
        res.send(product)
        } else {
            res.send({
                notice: 'Product not found'
            });
        }
    }).catch((err) => {
        res.send(err);
    });
});

// delete
router.delete('/:id', validateID, autheticateUser, authorizeUser, (req,res) => {

    let id = req.params.id;
    Product.findByIdAndRemove(id).then((product) => {
        if(product) {
            res.send(product)
        } else {
            res.send({
                notice: 'Product not found'
            });
        }  
    }).catch((err) => {
        res.send(err);
    });
});

// update
router.put('/id:', validateID, autheticateUser, authorizeUser, (req,res) => {

    let id = req.params.id;
    let body = req.body;
    Product.findOneAndUpdate({_id: id}, { $set: body }, { new: true, runValidators: true}).then((product) => {
        if(!product) {
            res.send({
                notice: 'Product not found'
            });
        }
        res.send({
            product,
            notice: 'Successfully updated the product'
        });
    }).catch((err) => {
        res.send(err);
    })
});

module.exports = {
    productsController: router
}