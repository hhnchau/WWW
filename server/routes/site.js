var express = require('express');
var router = express.Router();

var helper = require('../helper');
var query = require('../query');

var passPort = require('passport');
var localStategy = require('passport-local').Strategy;
var session = require('express-session');

router.use(session({
    secret: 'kingpes',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 //1month
    },
    resave: true,
    key: 'user',
    saveUninitialized: true
}));
router.use(passPort.initialize());
router.use(passPort.session());


/*
* LOGIN
*/
router.get('/login.html', (req, res) => {
    res.render('site/login/login');
});

router.post('/login.html',
    passPort.authenticate('local', { failureRedirect: '/login.html', successRedirect: '/' }));


/*
* PROFILE
*/
router.get('/site/profile.html', isLogin, (req, res) => {
    res.render('site/profile/profile', { user: req.user });
});

/*
* LOGOUT
*/
router.get('/logout.html', isLogin, function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/login.html');
});

/*
* REGISTER
*/
router.get('/register.html', function (req, res) {
    res.render('site/register/register');
});

/*
* VERIFY
*/
router.get('/verify.html', function (req, res) {
    res.render('site/verify/verify');
});


/*
* FORGET
*/
router.get('/forget.html', function (req, res) {
    res.render('site/forget/forget');
});

/*
* INDEX
*/
router.get('/', (req, res) => {
    query.findHomeData(function (ProductForm) {
        res.render('site/home/index', { user: req.user, home: ProductForm });
    });
});

/*
* DETAIL
*/
router.get('/site/detail/sn:id.html', (req, res) => {
    var productId = req.params.id;
    productId = productId.substring(1, productId.length);
    query.findProduct(productId, function (ProductForm) {
        res.render('site/detail/detail', { user: req.user, product: ProductForm });
    });
});

/*
* CART
*/
router.get('/site/cart.html', (req, res) => {
    res.render('site/cart/cart', { user: req.user });
});

/*
* ORDER
*/
router.get('/site/profile/order/detail/id:transactionId.html', isLogin, (req, res) => {
    var transactionId = req.params.transactionId;
    transactionId = transactionId.substring(1, transactionId.length);
    query.findTransactionDetail(transactionId, function (ProductForm) {
        res.render('site/order/order', { user: req.user, transaction: ProductForm });
    });
});

/*
* BLOG
*/
router.get('/site/blog.html', (req, res) => {
    res.render('site/blog/list/list', { user: req.user });
});

router.get('/site/blog/id:blogId.html', (req, res) => {
    var blogId = req.params.blogId;
    blogId = blogId.substring(1, blogId.length);
    query.findBlog(blogId, function (ProductForm) {
        res.render('site/blog/detail/detail', { user: req.user, blog: ProductForm });
    });
});

/*
* EVENT
*/
router.get('/site/event.html', (req, res) => {
    res.render('site/event/list/list', { user: req.user });
});

router.get('/site/event/id:eventId.html', (req, res) => {
    var eventId = req.params.eventId;
    eventId = eventId.substring(1, eventId.length);
    query.findEvent(eventId, function (ProductForm) {
        res.render('site/event/detail/detail', { user: req.user, event: ProductForm });
    });
});

/*
* SERVICE
*/
router.get('/site/service.html', (req, res) => {
    query.findAllService(function (ProductForm) {
        res.render('site/service/service', { user: req.user, service: ProductForm });
    });
});

/*
* SUPPORT
*/
router.get('/site/support.html', (req, res) => {
    query.findAllSupport(function (ProductForm) {
        res.render('site/support/support', { user: req.user, support: ProductForm });
    });
});

/*
* AUTH
*/
passPort.use(new localStategy(
    (username, password, cb) => {
        helper.findUser(username, password, function (user) {
            if (user && user.verify == 1) {
                //Successfull
                return cb(null, user); // Call back user for serializeUser
            } else {
                //Fail
                return cb(null, false);
            }
        });
    }
));

passPort.serializeUser((user, cb) => {
    cb(null, user.userId); //Store id user for deserializeUser
});

passPort.deserializeUser((id, cb) => {
    helper.findUserById(id, function (user) {
        if (user) {
            //Successfull
            return cb(null, user);
        } else {
            //Fail
            return cb(null, false);
        }
    });
});

function isLogin(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login.html');
    }
}

module.exports = router;