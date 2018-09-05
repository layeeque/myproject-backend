const express = require('express');
const bodyParser = require('body-parser')
//const mongoose = require('mongoose');
//const login = require('./src/controllers/login');
// mongoose.connect('mongodb://localhost:27017/projectdb');
//mongoose.connect('mongodb://abc:abc123@ds135852.mlab.com:35852/projectdb');
const app = express();
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//login(app);

app.get('/api', (req, res) => {
  res.send({
    message: 'Welcome to the API'
  });
});



app.listen(5000, () => console.log('Server started on port 5000'));