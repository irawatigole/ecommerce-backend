const jwt = require('jsonwebtoken');

const person = {
    _id: 1,
    name: 'irawati'
};

let token = jwt.sign(person, 'supersecret');
console.log(token);