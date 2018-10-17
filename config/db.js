const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // telling,I want to use JS library and any 3rd party library

mongoose.connect('mongodb://localhost:27017/mern-july-ecommerce', {useNewUrlParser: true}).then(() => {
  console.log('connected to db');
}).catch((err) => {
   console.log(err); 
});

mongoose.set('useCreateIndex', true);

module.exports = {
    mongoose
}