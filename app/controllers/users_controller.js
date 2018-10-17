const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { User } = require('../models/user');
const { CartItem } = require('../models/cart_item');
const { validateID } = require('../middlewares/utilities');
const { autheticateUser } = require('../middlewares/authentication');


router.post('/', (req,res) => {
    // let body = {
    //     username: req.body.username,
    //     email: req.body.email,                // we can do it like this instead of _.pick method
    //     password: req.body.password           // this is called as strong parameter i.e accepting only                                                  defined object properties 
    // }
    let body = _.pick(req.body, ['username', 'password', 'email']);
    let user = new User(body);
    user.save().then((user) => {
        return user.generateToken();  // actually generateToken gets resolved with user object, but as we are not returning user, we can neglect user as argument
    }).then((token) => {
        res.header('x-auth', token).send(user.shortInfo());
    }).catch((err) => {
        res.send(err);
    })
});

router.delete('/logout', autheticateUser, (req,res) => {
    let user = req.locals.user;
    let token = req.locals.token;
    let activeToken = user.tokens.find(function(inDbToken){
        return inDbToken.token == token;
    });
    user.tokens.id(activeToken._id).remove();         // user.tokens.id is standard method
    user.save().then((user) => {        // we are making changes at object level i.e. code running at model level,so again we are saving it to db for saving changes to db
        res.send();
    }).catch((err) => {
        res.send(err);
    })
});

// nested routes

// list all items in the cart
// GET users/cart_items
router.get('/cart_items', autheticateUser, (req,res) => {
    // let user = req.locals.user;
    // res.send(user.cartItems);
    res.send(req.locals.user.cartItems);
})

// adding product to the cart
// POST users/cart_items
router.post('/cart_items', autheticateUser, (req,res) => {
    let user = req.locals.user;
    let body = _.pick(req.body, ['product', 'quantity']);
    let cartItem = new CartItem(body);

    let inCart = user.cartItems.find(function(item){
        // if we want to compare 2 product ids, we need to use equals method
        return item.product.equals(cartItem.product);
    })
    if(inCart) {
        inCart.quantity = inCart.quantity + cartItem.quantity;
    } else {
        user.cartItems.push(cartItem);
    }
    user.save().then((user) => {
        res.send({
            cartItem,
            notice: 'Successfully added the product to the cart'
        });
    }).catch((err) => {
        res.send(err);
    })
})

// update the quantity
// PUT users/cart_items/:cart_items_id
router.put('/cart_items/:id', validateID, autheticateUser, (req, res) => {
    let cartItemId = req.params.id;
    let user = req.locals.user;
   
    let body = _.pick(req.body, ['quantity']);
    let inCart = user.cartItems.id(cartItemId);
    inCart.quantity = body.quantity;
    user.save().then((user) => {
        res.send({
            cartItem: inCart,
            notice: 'Successfully updated the quantity of the product'
        })
    }).catch((err) => {
        res.send(err);
    })
})

// delete the cart items
// DELETE uesrs/cart_items/:cart_item_id
router.delete('/cart_items/:id', validateID, autheticateUser, (req,res) => {
    let cartItemId = req.params.id;
    let user = req.locals.user;
    user.cartItems.id(cartItemId).remove();
    user.save().then((user) => {
        res.send({
            notice: 'Successfully removed the product from the cart'
        });
    }).catch((err) => {
        res.send(err);
    })
})

// emptying the cart
// DELETE users/cart_items/empty


// get wishlist_items
router.get('/wishlist_items', autheticateUser, (req, res) => {
    res.send(req.locals.user.wishListItems);
})

// POST users/wishlist_items
router.post('/wishlist_items', autheticateUser, (req,res) => {
    let user = req.locals.user;
    let body = _.pick(req.body, ['product', 'isPublic']);
    let inWishList = user.wishListItems.find(function(item){
        // if we want to compare 2 product ids, we need to use equals method
        return item.product.equals(body.product);
    })
    if(!inWishList) {
           user.wishListItems.push({
        product: body.product,
        isPublic: body.isPublic
    });
    } else {
        res.send('product already there in the wishlist')
       }
    user.save().then((user) => {
        res.send({
            body,
            notice: 'Successfully added the product to the wishlist'
        });
    }).catch((err) => {
        res.send(err);
    })
})

// DELETE wishlist items
router.delete('/wishlist_items/:id', validateID, autheticateUser, (req,res) => {
    let wishListItemId = req.params.id;
    let user = req.locals.user;
    user.wishListItems.id(wishListItemId).remove();
    user.save().then((user) => {
        res.send({
            notice: 'Successfully removed the product from the wishlist'
        });
    }).catch((err) => {
        res.send(err);
    })
})

// getting particular users public wishlist
router.get('/:username/wishlist_items/public', autheticateUser, (req,res) => {
    User.findOne({ username: req.params.username, 'wishListItems.isPublic': true }).then((user) => {
         res.send(user.wishListItems)
    }).catch((err) => {
        res.send(err);
    })
})

// moving item from wishlist to cart
router.delete('/move_to_cart/:id', validateID, autheticateUser, (req,res) => {
    let wishListItemId = req.params.id;
    let user = req.locals.user;
    let removedFromWishlist = user.wishListItems.id(wishListItemId).remove();
    let inCart = user.cartItems.find(function(item){
         return item.product.equals(removedFromWishlist.product);
    })
    if(inCart) {
        inCart.quantity = inCart.quantity + removedFromWishlist.quantity;
    } else {
        user.cartItems.push(removedFromWishlist);
    }
    user.save().then((user) => {
        res.send({
            notice: 'Successfully moved the product from the wishlist to cart'
        });
    }).catch((err) => {
        res.send(err);
    });
})

// router.get('/orders', autheticateUser, (req,res) => {
//     // console.log(req.header('x-auth'));           // for reading info thr' header on server
//     // console.log(req.query.token);                // for capturing if, we pass thr' URL

//     // for sending all orders corresponding to that user
//     // let user = req.locals.user;
//     // Order.find({ user: user._id })
//     res.send('listing all the orders of the user');
// });

module.exports = {
    usersController: router
}