var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var dashboard = new Schema({
    email:String,
    fname:String, 
    lname: String,
    address: String,
    state: String,
    mobile: String  
});

// the schema is useless so far
// we need to create a model using it
var dashboard = mongoose.model('dashboard', dashboard);

// make this available to our users in our Node applications
module.exports = dashboard;  