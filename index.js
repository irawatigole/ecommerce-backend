const express = require('express');
const app = express();

const { mongoose } = require('./config/db');
const { routes } = require('./config/routes');
// const { Category } = require('./app/models/category');
const port = 3000;          // const port = process.env.PORT

app.use(express.json());

// middlewares
app.use('/', routes);



// Route Handlers
// app.get('/', (req,res) => {
//     res.send('welcome to our site')
// });

// // app.METHOD(PATH, HANDLER)
// app.get('/account/orders', (req,res) => {
//     // fetch users orders
//     res.send('here is the list of your order')
// });

// localhost:3000/categories
// app.get('/categories', (req,res) => {
//     Category.find().then((categories) => {
//         res.send(categories);
//     }).catch((err)=> {
//         console.log(err);
//     });
// });

app.listen(port, () => {
    console.log('listening on port', port);
});

