const jwt = require('jsonwebtoken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIm5hbWUiOiJpcmF3YXRpIiwiaWF0IjoxNTM4MTA3OTk0fQ.XcN0rZzugLQIB1_mrNcgjMRDUgSyTimj-iYKZQ_YTog';

let person = jwt.verify(token, 'supersecret');
console.log(person);