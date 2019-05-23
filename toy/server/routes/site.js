const express = require('express');
const router = express.Router();
const db = require('../mysql');



router.get('/', (req, res) => {
    db.selectAllCate(function (lstCate) {
        db.selectAllName(function (lstName) {
            db.selectAllProduct(function (lstProduct) {
                res.render('site/home/index', { cate: lstCate, name: lstName, product: lstProduct });
            });
        })
    });
});



router.get('/filter-all-product', (req, res) => {
    var filter = req.query.filter;
    db.selectAllCate(function (lstCate) {
        db.selectAllName(function (lstName) {
            if (filter.substring(0, 2) == 'Kp') {
                filter = filter.substring(2, filter.lenght);
                db.selectProductLikeTitle(filter, function (lstProduct) {
                    res.render('site/home/index', { cate: lstCate, name: lstName, product: lstProduct });
                });
            } else {
                db.selectProductLikeCate(filter, function (lstProduct) {
                    res.render('site/home/index', { cate: lstCate, name: lstName, product: lstProduct });
                });
            }
        })
    });
});




router.get('/detail', (req, res) => {
    var idVideo = req.query.sn;
    db.selectAllCate(function (lstCate) {
        db.selectAllName(function (lstName) {
            db.selectAllProduct(function (lstProduct) {
                db.selectProduct(idVideo, function (product) {
                    res.render('site/detail/detail', { cate: lstCate, name: lstName, lstPro: lstProduct, pro: product[0] });
                })
            });
        })
    });
});

router.get('/find-vip-link', (req, res) => {
    var idVideo = req.query.sn;
    db.selectVipLink(idVideo, function (vipLink) {
        res.render('site/ads/ads', { vip: vipLink });
    })

});




module.exports = router;