const bcrypt = require('bcryptjs');
// value in db
 let encryptedPassword = '$2a$10$kf2JVKG/ZJp/ipbJ/TH69umYeRsQJleAsMFc.EvGjH9S0TCm1Aife';

// login
let userEmail = 'irawatigole@gmail.com';
let userPassword = 'secret124';

bcrypt.compare(userPassword, encryptedPassword).then((res) => {
    console.log(res);
})