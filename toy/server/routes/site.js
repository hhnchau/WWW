const express = require('express');
const router = express.Router();
const db = require('../mysql');



router.get('/', (req, res) => {
    db.selectAllCate(function (lstCate) {
        db.selectAllSn(function (lstSn) {
            db.selectAllProduct(function (lstProduct) {
                res.render('site/home/index', { cate: lstCate, sn: lstSn, product: lstProduct });
            });
        })
    });
});



router.get('/filter-all-product', (req, res) => {
    var filter = req.query.filter;
    db.selectAllCate(function (lstCate) {
        db.selectAllSn(function (lstSn) {
            if (filter.substring(0, 2) == 'Kp') {
                filter = filter.substring(2, filter.lenght);
                db.selectProductLikeTitle(filter, function (lstProduct) {
                    res.render('site/home/index', { cate: lstCate, sn: lstSn, product: lstProduct });
                });
            } else {
                db.selectProductLikeCate(filter, function (lstProduct) {
                    res.render('site/home/index', { cate: lstCate, sn: lstSn, product: lstProduct });
                });
            }
        })
    });
});




router.get('/detail', (req, res) => {
    var idVideo = req.query.sn;
    db.selectAllCate(function (lstCate) {
        db.selectAllSn(function (lstSn) {
            db.selectAllProduct(function (lstProduct) {
                res.render('site/detail/detail', { cate: lstCate, sn: lstSn, product: lstProduct, id: idVideo });
            });
        })
    });
});




module.exports = router;