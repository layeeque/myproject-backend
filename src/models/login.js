// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var emp = new Schema({
    empId: String,
    name: String,
    password: { type: String, 
       required: true 
    }
});

// the schema is useless so far
// we need to create a model using it
var Emp = mongoose.model('employee', emp);

// make this available to our users in our Node applications
module.exports = Emp;   