require('dotenv').load();
require('babel-register');
require('babel-polyfill');
require('dotenv').config();

var app = require('./app'),
  port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('App started on: ' + port);
});
