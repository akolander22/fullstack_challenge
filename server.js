//variables
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');

//initialize app using express(invoked)
var app = express();

//routes
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/', index);


//Listening on port...
var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port', port);
})
