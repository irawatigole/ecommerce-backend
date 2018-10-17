let name = 'irawati';
// let dataFromAnotherFile = require('./place');
// cnsole.log(name + ' lives in ' + dataFromAnotherFile.city);

// console.log(require('./place));
// let city = rquire('./place').city);
// let skills = require('./place).skills);

// es6 object destructuring
let { city, skills, details } = require('./place');
console.log(city);

console.log(name + ' lives in ' + city);
console.log(details);
console.log(details(name, skills));

