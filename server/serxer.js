var express = require('express');
var path = require('path');
var log = require('./log');
var settings = require('./settings');

var app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(settings.listenPort, function () {
    log.write("TempServer", "is running!");
});

/*
* LOGIN
*/
app.get('/login.html', (req, res) => {
    res.render('site/upgrade/upgrade');
});

/*
* PROFILE
*/
app.get('/site/profile.html', (req, res) => {
    res.render('site/upgrade/upgrade');
});

/*
* LOGOUT
*/
app.get('/logout.html', function (req, res) {
    res.render('site/upgrade/upgrade');
});

/*
* REGISTER
*/
app.get('/register.html', function (req, res) {
    res.render('site/upgrade/upgrade');
});

/*
* VERIFY
*/
app.get('/verify.html', function (req, res) {
    res.render('site/upgrade/upgrade');
});


/*
* FORGET
*/
app.get('/forget.html', function (req, res) {
    res.render('site/upgrade/upgrade');
});

/*
* INDEX
*/
app.get('/', (req, res) => {
    res.render('site/upgrade/upgrade');
});

/*
* DETAIL
*/
app.get('/site/detail/sn:id.html', (req, res) => {
    res.render('site/upgrade/upgrade');
});

/*
* CART
*/
app.get('/site/cart.html', (req, res) => {
    res.render('site/upgrade/upgrade');
});

/*
* ORDER
*/
app.get('/site/profile/order/detail/id:transactionId.html', (req, res) => {
    res.render('site/upgrade/upgrade');
  });

/*
* BLOG
*/
app.get('/site/blog.html', (req, res) => {
    res.render('site/upgrade/upgrade');
});

/*
* EVENT
*/
app.get('/site/event.html', (req, res) => {
    res.render('site/upgrade/upgrade');
});

/*
* SERVICE
*/
app.get('/site/service.html', (req, res) => {
    res.render('site/upgrade/upgrade');
});

/*
* SUPPORT
*/
app.get('/site/support.html', (req, res) => {
    res.render('site/upgrade/upgrade');
});
