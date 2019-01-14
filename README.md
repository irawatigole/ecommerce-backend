# E-commerce

# overview
This project contains the back-end code for the clone of any e-commerce website with functionalities such as adding a product to cart, creating wishlists, placing orders, creating user account along with authorization and authentication. Authentication is implemented by genarating web tokens from npm package 'jwt', and password hashed using 'bcrypt' package.

# Dependencies and installation
| package | command to install | link to see more |
| ------- | ------------------ | ---------------- |
| bcryptjs | npm i bcryptjs    | https://www.npmjs.com/package/bcryptjs |
| express | npm i express | https://www.npmjs.com/package/express |
| faker | npm i faker| https://www.npmjs.com/package/faker |
| jsonwebtoken | npm i jsonwebtoken | https://www.npmjs.com/package/jsonwebtoken |
| lodash | npm i lodash | https://www.npmjs.com/pakage/lodash |
| mongodb | npm i mongodb | https://www.npmjs.com/package/mongodb |
| mongoose | npm i mongoose | https://www.npmjs.com/package/mongoose
| shorthash | npm i shorthash | https://www.npmjs.com/package/shortash |


# Folder structure
- app
  - controllers
  - middlewares
  - models
  - task
- config
  - db.js
  - routes.js
- index.js
# Usage
### ` categories `
  - url ` www.example.com/categories `
  - create a new category, edit and update the existing one and delete the unwanted category using api calls.
  - A user can add a new category only if he is authorized.
### ` products `
  - url ` www.example.com/products `
  - add a new product, add it to the category by adding the id of the category, edit the product details and update and delete the unwanted product.
### ` orders `
  - url ` www.example.com/orders `
  - find all the orders placed by the user, delete it if not necessary.
### ` wishlists `
  - url ` www.example.com/wishlists `
  - view the wishlist, create new wishlist, add a product on wishlists to orders and remove from wishlist.
### ` users `
  - url `www.example.com/users `
  - create account, see profile, make changes to the profile, delete account, see orders, create wishlist, add a product to wishlist and move it to orders.
  - To place orders user must be logged in.
# Author
Irawati Gole
