// const { mongoose } = require('../../config/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true     // server side validation
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = {
    Category
}
// create a new category
// let category = new Category({name:''});
// category.save().then((category) => {
//     console.log(category);
//   }).catch((err) => {
//       console.log(err);
//   });

  // find all categories
//   Category.find().then((categories) => {
//       console.log(categories);
//   }).catch((err) => {
//       console.log(err);
//   });     

// find category of an id
// Category.findById('5ba1d8ed2936db0dcc8944de').then((category) => {
//     console.log(category);
// }).catch((err)=> {
//     console.log(err);
// });

// find all categories by name (returns an array, if category is not found, it returns empty array)
// Category.find({ name: 'furniture'}).then((categories) => {
//     console.log(categories);
// }).catch((err) => {
//     console.log(err);
// });

// find one category by name (returns an object, if category is not found, it returns null)
// Category.findOne({name: 'furniture'}).then((category) => {
//     if(category){
//     console.log(category);
//     } else {
//         connsole.log('no category found')
//     }
// }).catch((err) => {
//     console.log(err);
// });

// update a category's name
// 2 step process first find and then update
// Category.findOneAndUpdate({ _id:'5ba221d7049c0817b4a3eb27'}, { $set: { name: 'gardening & manure'} },{ new: true})
// .then((category) => {
//     console.log(category);
// }).catch((err) => {
//     console.log(err);
// });

// find all the categories and list them one below the other
/* 
1. categorya
2. categoryb
3. categoryc
*/
// Category.find().then((categories) => {
//     console.log('Listing Categories ' + categories.length);
//     for (let i=0; i<categories.length; i++){
//         console.log(i+1 + '.',categories[i].name);
//     }
// }).catch((err)=>{
//     console.log(err);
// });

// find the first record from the categories collection and change the name to groceries
// Category.findOneAndUpdate({ _id:'5ba1d8ed2936db0dcc8944de'}, { $set: {name: 'groceries'} },{ new: true, runValidators: true}).then((category) => {
//      console.log(category);
// }).catch((err) => {
//     console.log(err);
// });

// delete one category
// Category.findOneAndDelete({ _id:'5ba1da5429b5fb0cc8d264da'}).then((category) =>{
//     console.log(category);
// }).catch((err) =>{
//     console.log(err);
// });

