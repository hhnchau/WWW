const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;

var db = require('./db');
//db.create();
db.insert();
//db.newColume();
//db.createTracking();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, function () {
  console.log("Server", "is running!");
});

var admin = require('./routes/admin');
app.use('/admin', admin);

var site = require('./routes/site');
app.use('/', site);
