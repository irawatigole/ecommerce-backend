const express = require('express');
const _ = require('lodash');
const router = express.Router();
// const { ObjectID } = require('mongodb');
const { Category } = require('../models/category');
const { validateID } = require('../middlewares/utilities');
const { Product } = require('../models/product');
const { autheticateUser, authorizeUser } = require('../middlewares/authentication');

// localhost:3000/categories/
router.get('/', (req, res) => {
    Category.find().then((categories) => {
        res.send(categories); 
    }).catch((err) => {
        res.send(err); 
    });
});

// localhost:3000/categories/:id
router.get('/:id', validateID, (req, res) => {

    let id = req.params.id; 
    Category.findById(id).then((category) => {
        if(category) {
            res.send(category); 
        } else {
            res.send({
                notice: 'Category not found'
            })
        }
    }).catch((err) => {
        res.send(err);
    })
});

router.post('/', autheticateUser, authorizeUser, (req,res) => {
    let body = _.pick(req.body, ['name']);
    let category = new Category(body);
    category.save().then((category) => {
        res.send({
            category,
            notice: 'successfully created a category'
        });
    }).catch((err) => { 
        res.send((err))
    })
})


router.put('/:id', validateID, autheticateUser, authorizeUser, (req,res) => {
    let id = req.params.id;
    let body = req.body;

    Category.findOneAndUpdate({_id: id}, { $set: body}, {new: true, runValidators: true}).then((category) => {
        if (!category) {
            res.send({
                notice: 'Category not found'
            })
        }

            res.send({
                category,
                notice:'Successfully updated the category'
            })
      }).catch((err) => {
          res.send(err);
      })
})

router.delete('/:id', validateID, autheticateUser, authorizeUser, (req, res) => {
    let id = req.params.id;
    Category.findOneAndRemove(id).then((category) => {
        if (category) {
            res.send(category);
        } else {
            res.send({
                notice:'Category not found'
            })
        }
    }).catch((err) => {
        res.send(err);
    })
})

// show all products belonging to category model
router.get('/:id/products', validateID, (req,res) => {
    let id = req.params.id;
    // using built in mongoose methods
    // Product.find({ category: id }).then((products) => {
    //     res.send(products);
    // }).catch((err) => {
    //     res.send(err);
    // })

    // creating our own static method
    Product.findByCategory(id).then((products) => {
        res.send(products);
    }).catch((err) => {
        res.send(err);
    });
})

module.exports = {
    categoriesController: router
}