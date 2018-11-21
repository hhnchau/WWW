var express = require('express');
var router = express.Router();
var settings = require('../settings');
var query = require('../query');
var helper = require('../helper');
var file = require('../file');
var log = require('../log');

const passPort = require('passport');
const localStategy = require('passport-local').Strategy;
const session = require('express-session');

router.use(session({
    secret: 'kingpes',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 //1month
    },
    resave: true,
    key: 'admin',
    saveUninitialized: true
}));
router.use(passPort.initialize());
router.use(passPort.session());

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // callback(null, '../public/upload');
        callback(null, '/home/public/upload');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var upload = multer({ storage: storage }).any();

/*
* LOGIN
*/
router.get('/login.html', (req, res) => {
    res.render('admin/login/login-layout');
});

router.post('/login.html',
    passPort.authenticate('local', { failureRedirect: '/admin/login.html', successRedirect: '/admin/dashboard.html' }));


/*
* DASHBOARD
*/
router.get('/dashboard.html', isLogin, (req, res) => {
    var status = [4, 5];
    var date = new Date();
    var currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    query.findDataDashboard(status, currentDate, currentDate, function (ProductForm) {
        res.render('admin/dashboard/dashboard', { user: req.user, dashboard: ProductForm });
    });
});

/*
* REPORT
*/
router.get('/report/open.html', isLogin, (req, res) => {
    res.render('admin/report/open/open', { user: req.user });
});

router.get('/report/signup.html', isLogin, (req, res) => {
    res.render('admin/report/signup/signup', { user: req.user });
});

router.get('/report/login.html', isLogin, (req, res) => {
    res.render('admin/report/login/login', { user: req.user });
});

router.get('/report/transaction.html', isLogin, (req, res) => {
    res.render('admin/report/transaction/transaction', { user: req.user });
});

router.get('/report/revenue.html', isLogin, (req, res) => {
    res.render('admin/report/revenue/revenue', { user: req.user });
});

router.get('/report/profit.html', isLogin, (req, res) => {
    res.render('admin/report/profit/profit', { user: req.user });
});

/*
* SELL
*/
router.get('/sell/store.html', isLogin, (req, res) => {
    res.render('admin/sell/store/store', { user: req.user });
});

//Find Product By Sn
router.get("/product/findProductBySn", function (req, res) {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var sn = req.query.productSn;

        query.findProductBySn(sn, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.get('/sell/bought/detail/id:transactionId.html', isLogin, (req, res) => {
    var transactionId = req.params.transactionId;
    transactionId = transactionId.substring(1, transactionId.length);
    query.findTransactionDetail(transactionId, function (ProductForm) {
        res.render('admin/sell/detail/detail', { user: req.user, transaction: ProductForm });
    });
});
router.get('/sell/processing/detail/id:transactionId.html', isLogin, (req, res) => {
    var transactionId = req.params.transactionId;
    transactionId = transactionId.substring(1, transactionId.length);
    query.findTransactionDetail(transactionId, function (ProductForm) {
        res.render('admin/sell/detail/detail', { user: req.user, transaction: ProductForm });
    });
});
router.get('/sell/cancel/detail/id:transactionId.html', isLogin, (req, res) => {
    var transactionId = req.params.transactionId;
    transactionId = transactionId.substring(1, transactionId.length);
    query.findTransactionDetail(transactionId, function (ProductForm) {
        res.render('admin/sell/detail/detail', { user: req.user, transaction: ProductForm });
    });
});
router.get('/sell/complete/detail/id:transactionId.html', isLogin, (req, res) => {
    var transactionId = req.params.transactionId;
    transactionId = transactionId.substring(1, transactionId.length);
    query.findTransactionDetail(transactionId, function (ProductForm) {
        res.render('admin/sell/detail/detail', { user: req.user, transaction: ProductForm });
    });
});
router.get('/report/transaction/detail/id:transactionId.html', isLogin, (req, res) => {
    var transactionId = req.params.transactionId;
    transactionId = transactionId.substring(1, transactionId.length);
    query.findTransactionDetail(transactionId, function (ProductForm) {
        res.render('admin/sell/detail/detail', { user: req.user, transaction: ProductForm });
    });
});


router.get('/sell/bought.html', isLogin, (req, res) => {
    var status = [settings.bought]; //0
    var offset = 0;
    var limit = 100;
    query.findAllTransactionByStatus(status, offset, limit, function (ProductForm) {
        res.render('admin/sell/bought/bought', { user: req.user, bought: ProductForm });
    });
});

router.get('/sell/cancel.html', isLogin, (req, res) => {
    var status = [settings.user_cancel, settings.admin_cancel]; //2+3
    var offset = 0;
    var limit = 100;
    query.findAllTransactionByStatus(status, offset, limit, function (ProductForm) {
        res.render('admin/sell/cancel/cancel', { user: req.user, bought: ProductForm });
    });
});

router.get('/sell/processing.html', isLogin, (req, res) => {
    var status = [settings.processing];//1
    var offset = 0;
    var limit = 100;
    query.findAllTransactionByStatus(status, offset, limit, function (ProductForm) {
        res.render('admin/sell/processing/processing', { user: req.user, bought: ProductForm });
    });
});
router.get('/sell/complete.html', isLogin, (req, res) => {
    var status = [settings.complete, settings.store]; //4+5
    var offset = 0;
    var limit = 100;
    query.findAllTransactionByStatus(status, offset, limit, function (ProductForm) {
        res.render('admin/sell/complete/complete', { user: req.user, bought: ProductForm });
    });
});

/*
* BANNER
*/
router.get('/banner/list/all-banner.html', isLogin, (req, res) => {
    query.findAllBannerForAdmin(function (ProductForm) {
        res.render('admin/banner/list/list', { user: req.user, banner: ProductForm });
    });
});

router.get('/banner/add/add-banner.html', isLogin, (req, res) => {
    res.render('admin/banner/add/add', { user: req.user });
});

router.post('/banner/add-image-banner.html', isLogin, (req, res) => {
    upload(req, res, function (err) {
        log.write("addImage", req.files);
        if (err) {
            return res.end("");
            //Delete Image
        }
        res.json(req.files);
    });
});

router.put('/banner/update-data-banner.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateImageBanner(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.delete('/banner/delete-image-banner.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var imageName = req.body.imageName;
        var params = req.body;

        file.deleteFile(imageName, (err) => {
            if (err) {
                log.error("deleteFile", err);
                var models = new Models({});
                models.ProductForm({ update: 0 });
                res.json(models.data);
                res.end();
            } else {
                params.imageName = "";
                query.updateImageBanner(params, function (ProductForm) {
                    res.json(ProductForm);
                    res.end();
                });
            }
        });
    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.post('/banner/add-data-banner.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {
        var params = req.body;

        query.addBanner(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.put('/banner/update-active-banner.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateActiveBanner(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.get('/banner/edit-banner/id:bannerId.html', isLogin, (req, res) => {
    var bannerId = req.params.bannerId;
    bannerId = bannerId.substring(1, bannerId.length);
    query.findBanner(bannerId, function (ProductForm) {
        res.render('admin/banner/edit/edit', { user: req.user, banner: ProductForm });
    });
});

router.put("/banner/update-banner.html", isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateBanner(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});


/*
* CATEGORY
*/
router.get('/category/all-category.html', isLogin, (req, res) => {
    res.render('admin/category/category', { user: req.user });
});

//UPDATE CATEGORY ACTIVE
router.put('/category/update-active-category.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateActiveCategory(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

/*
* PRODUCT
*/

//LIST PRODUCT
router.get('/product/all-product.html', isLogin, (req, res) => {
    res.render('admin/product/list/list', { user: req.user });
});

//FIND ALL PRODUCT
router.get("/product/findListProduct", function (req, res) {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var offset = req.query.offset;
        var limit = req.query.limit;

        query.findListProduct(offset, limit, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

//PRODUCT
router.put("/product/update-product.html", function (req, res) {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateProduct(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

//VIDEO
router.put('/product/update-video.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;
        query.updateVideo(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });
    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

//IMAGE
router.put('/product/update-image.html', isLogin, (req, res) => {
    upload(req, res, function (err) {
        log.write("updateImage", req.files);
        if (err) {
            return res.end("");
            //Delete Image
        }
        res.json(req.files);
    });
});

//NAME IMAGE
router.put('/product/update-image-data.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;
        query.updateImage(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });
    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

//DELETE IMAGE
router.delete('/product/delete-image.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var imageName = req.body.imageName;
        var params = req.body;

        file.deleteFile(imageName, (err) => {
            if (err) {
                log.error("deleteFile", err);
                var models = new Models({});
                models.ProductForm({ update: 0 });
                res.json(models.data);
                res.end();
            } else {
                params.imageName = "";
                query.updateImage(params, function (ProductForm) {
                    res.json(ProductForm);
                    res.end();
                });
            }
        });
    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

//PRICE
router.put('/product/update-price.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updatePrice(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

//AMOUNT
router.put('/product/update-amount.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateAmount(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

//Add
router.get('/product/add-product.html', isLogin, (req, res) => {
    query.findAllDiscount(function (DiscountForm) {
        res.render('admin/product/add/add', { user: req.user, discount: DiscountForm });
    });
});

router.post('/product/add-data-product.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {
        var params = req.body;

        query.addProduct(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.post('/product/add-image-product.html', isLogin, (req, res) => {
    upload(req, res, function (err) {
        log.write("addImage", req.files);
        if (err) {
            return res.end("");
            //Delete Image
        }
        res.json(req.files);
    });
});

//Check
router.post('/product/check-product', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var productSn = req.body.productSn;

        query.checkProductSn(productSn, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }

});

//Edit
router.get('/product/edit-product/id:productId.html', isLogin, (req, res) => {
    var productId = req.params.productId;
    productId = productId.substring(1, productId.length);
    query.findProductForAdmin(productId, function (ProductForm) {
        query.findAllDiscount(function (DiscountForm) {
            res.render('admin/product/edit/edit', { user: req.user, product: ProductForm, discount: DiscountForm });
        });
    });
});

//Find Product Id
router.get('/product/edit-product.html', isLogin, (req, res) => {
    res.render('admin/product/find/find', { user: req.user });
});

//FIND ID
router.get("/product/find-product-id.html", function (req, res) {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var sn = req.query.productSn;

        query.findProductId(sn, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

//UPDATE PRODUCT ACTIVE
router.put('/product/update-active-product.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateActiveProduct(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

/*
* VOUCHER
*/
router.get('/voucher/all-voucher.html', isLogin, (req, res) => {
    res.render('admin/voucher/voucher', { user: req.user });
});

/*
* PROMOTION
*/
router.get('/promotion/all-promotion.html', isLogin, (req, res) => {
    res.render('admin/promotion/promotion', { user: req.user });
});

/*
* FLASHSALE
*/
router.get('/flashsale/all-flashsale.html', isLogin, (req, res) => {
    res.render('admin/flashsale/flashsale', { user: req.user });
});

/*
* SHIP
*/
router.get('/ship/all-ship.html', isLogin, (req, res) => {
    res.render('admin/ship/ship', { user: req.user });
});

/*
* GIFT
*/
router.get('/gift/all-gift.html', isLogin, (req, res) => {
    res.render('admin/gift/gift', { user: req.user });
});

/*
* POINT
*/
router.get('/point/all-point.html', isLogin, (req, res) => {
    res.render('admin/point/point', { user: req.user });
});

/*
* SUPPORT
*/
router.get('/support/all-support.html', isLogin, (req, res) => {
    query.findAllSupport(function (ProductForm) {
        res.render('admin/support/support', { user: req.user, support: ProductForm });
    });
});

router.put('/support/update-support.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateSupport(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

/*
* BLOG
*/
router.get('/blog/list/all-blog.html', isLogin, (req, res) => {
    query.findAllBlogForAdmin(function (ProductForm) {
        res.render('admin/blog/list/list', { user: req.user, blog: ProductForm });
    });
});

router.get('/blog/add/add-blog.html', isLogin, (req, res) => {
    res.render('admin/blog/add/add', { user: req.user });
});

router.get('/blog/edit-blog/id:blogId.html', isLogin, (req, res) => {
    var blogId = req.params.blogId;
    blogId = blogId.substring(1, blogId.length);
    query.findBlog(blogId, function (ProductForm) {
        res.render('admin/blog/edit/edit', { user: req.user, blog: ProductForm });
    });
});


router.put("/blog/update-blog.html", isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateBlog(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.delete('/blog/delete-image-blog.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var imageName = req.body.imageName;
        var params = req.body;

        file.deleteFile(imageName, (err) => {
            if (err) {
                log.error("deleteFile", err);
                var models = new Models({});
                models.ProductForm({ update: 0 });
                res.json(models.data);
                res.end();
            } else {
                params.imageName = "";
                query.updateImageBlog(params, function (ProductForm) {
                    res.json(ProductForm);
                    res.end();
                });
            }
        });
    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});


router.post('/blog/add-image-blog.html', isLogin, (req, res) => {
    upload(req, res, function (err) {
        log.write("addImage", req.files);
        if (err) {
            return res.end("");
            //Delete Image
        }
        res.json(req.files);
    });
});

router.put('/blog/update-data-blog.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateImageBlog(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.post('/blog/add-data-blog.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {
        var params = req.body;

        query.addBlog(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});


router.put('/blog/update-active-blog.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateActiveBlog(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});


/*
* SERVICE
*/
router.get('/service/list/all-service.html', isLogin, (req, res) => {
    query.findAllServiceForAdmin(function (ProductForm) {
        res.render('admin/service/list/list', { user: req.user, service: ProductForm });
    });
});

router.get('/service/add/add-service.html', isLogin, (req, res) => {
    res.render('admin/service/add/add', { user: req.user });
});

router.get('/service/edit-service/id:serviceId.html', isLogin, (req, res) => {
    var serviceId = req.params.serviceId;
    serviceId = serviceId.substring(1, serviceId.length);
    query.findService(serviceId, function (ProductForm) {
        res.render('admin/service/edit/edit', { user: req.user, service: ProductForm });
    });
});

router.put('/service/update-active-service.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateActiveService(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.post('/service/add-image-service.html', isLogin, (req, res) => {
    upload(req, res, function (err) {
        log.write("addImage", req.files);
        if (err) {
            return res.end("");
            //Delete Image
        }
        res.json(req.files);
    });
});

router.post('/service/add-data-service.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {
        var params = req.body;

        query.addService(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.put("/service/update-service.html", isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateService(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.delete('/service/delete-image-service.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var imageName = req.body.imageName;
        var params = req.body;

        file.deleteFile(imageName, (err) => {
            if (err) {
                log.error("deleteFile", err);
                var models = new Models({});
                models.ProductForm({ update: 0 });
                res.json(models.data);
                res.end();
            } else {
                params.imageName = "";
                query.updateImageService(params, function (ProductForm) {
                    res.json(ProductForm);
                    res.end();
                });
            }
        });
    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.put('/service/update-data-service.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateImageService(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

/*
* EVENT
*/
router.get('/event/list/all-event.html', isLogin, (req, res) => {
    query.findAllEventForAdmin(function (ProductForm) {
        res.render('admin/event/list/list', { user: req.user, event: ProductForm });
    });
});

router.get('/event/edit-event/id:eventId.html', isLogin, (req, res) => {
    var eventId = req.params.eventId;
    eventId = eventId.substring(1, eventId.length);
    query.findEvent(eventId, function (ProductForm) {
        res.render('admin/event/edit/edit', { user: req.user, event: ProductForm });
    });
});

router.put("/event/update-event.html", isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateEvent(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.delete('/event/delete-image-event.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var imageName = req.body.imageName;
        var params = req.body;

        file.deleteFile(imageName, (err) => {
            if (err) {
                log.error("deleteFile", err);
                var models = new Models({});
                models.ProductForm({ update: 0 });
                res.json(models.data);
                res.end();
            } else {
                params.imageName = "";
                query.updateImageEvent(params, function (ProductForm) {
                    res.json(ProductForm);
                    res.end();
                });
            }
        });
    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.post('/event/add-image-event.html', isLogin, (req, res) => {
    upload(req, res, function (err) {
        log.write("addImage", req.files);
        if (err) {
            return res.end("");
            //Delete Image
        }
        res.json(req.files);
    });
});

router.put('/event/update-data-event.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateImageEvent(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.get('/event/add/add-event.html', isLogin, (req, res) => {
    res.render('admin/event/add/add', { user: req.user });
});

router.post('/event/add-data-event.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {
        var params = req.body;

        query.addEvent(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

router.put('/event/update-active-event.html', isLogin, (req, res) => {
    var secret = req.headers[settings.secret_key];
    if (secret === settings.secret_encrypt) {

        var params = req.body;

        query.updateActiveEvent(params, function (ProductForm) {
            res.json(ProductForm);
            res.end();
        });

    } else {
        //Response 404
        res.write(settings.secret_fail);
        res.end();
    }
});

/*
* COMMENT
*/
router.get('/comment/new-comment.html', isLogin, (req, res) => {
    res.render('admin/comment/list/list', { user: req.user });
});

router.get("/comment/answer/id:commentId.html", function (req, res) {
    var commentId = req.params.commentId;
    commentId = commentId.substring(1, commentId.length);
    query.findCommentForAdmin(commentId, function (ProductForm) {
        res.render('admin/comment/answer/answer', { user: req.user, comment: ProductForm });
    });
});

/*
* RAITING
*/
router.get('/raiting/new-raiting.html', isLogin, (req, res) => {
    res.render('admin/raiting/list/list', { user: req.user });
});

router.get("/raiting/answer/id:rateId.html", function (req, res) {
    var rateId = req.params.rateId;
    rateId = rateId.substring(1, rateId.length);
    query.findRaitingForAdmin(rateId, function (ProductForm) {
        res.render('admin/raiting/answer/answer', { user: req.user, raiting: ProductForm });
    });
});

/*
* AUTH
*/
passPort.use(new localStategy(
    (username, password, cb) => {
        helper.findUser(username, password, function (user) {
            if (user) {
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
        if (req.user.groups > 0) {
            next();
        } else {
            res.redirect('/admin/login.html');
        }
    } else {
        res.redirect('/admin/login.html');
    }
}

module.exports = router;