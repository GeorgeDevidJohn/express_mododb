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
EmpSchema = new Schema({
    name : String,
    salary : Number,
	age : Number
});
module.exports = mongoose.model('Employee', EmpSchema);
PrdSchema = new Schema({
    "invoice ID": {
        type: String,
        
      },
      "branch": {
        type: String,
         
      },
      "city": {
        type: String,
         
      },
      "customer Type": {
        type: String,
         
      },
      "product Line": {
        type: String,
         
      },
      "name": {
        type: String,
         
      },
      "image": {
        type: String,
         
      },
      "unit Price": {
        type: Number,
         
      },
      "quantity": {
        type: Number,
         
      },
      "tax 5%": {
        type: Number,
         
      },
      "total": {
        type: Number,
         
      },
      "date": {
        type: Date,
         
      },
      "time": {
        type: String,
         
      },
      "payment": {
        type: String,
         
      },
      "cogs": {
        type: Number,
         
      },
      "gross Income": {
        type: Number,
         
      },
      "rating": {
        type: Number,
         
      },
    });

module.exports = mongoose.model('Products', PrdSchema);
