/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name:  George devid john       Student ID:  no1547325        Date:   November 26         
*
*
******************************************************************************
**/
// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
PrdSchema = new Schema({
  "Invoice ID": String,
  Branch: String,
  City: String,
  "Customer Type": String,
  "Product line": String,
  name: String,
  image: String,
  "Unit price": Number,
  Quantity: Number,
  "Tax 5%": Number,
  Total: Number,
  Date: String,
  Time: String,
  Payment: String,
  cogs: Number,
  "gross income": Number,
  Rating: Number,
});

module.exports = mongoose.model('Products', PrdSchema);
