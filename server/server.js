var express = require('express');
var path = require('path');
var file = require('./file');
var log = require('./log');
var settings = require('./settings');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(settings.listenPort, function () {
  log.write("Server", "is running!");
});

var admin = require('./routes/admin');
app.use('/admin', admin);

var site = require('./routes/site');
app.use('/', site);

var api = require('./routes/api');
app.use('/api', api);