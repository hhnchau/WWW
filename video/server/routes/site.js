const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.selectAllCateory(function (lstCate) {
        db.selectAllSn(function (lstSn) {
            db.selectAllProduct(function (lstProduct) {
                res.render('site/home/index', { cate: lstCate, sn: lstSn, product: lstProduct });
            });
        })
    });
});


router.get('/detail', (req, res) => {
    db.selectAllCateory(function (lstCate) {
        db.selectAllSn(function (lstSn) {
            db.selectAllProduct(function (lstProduct) {
                res.render('site/detail/detail', { cate: lstCate, sn: lstSn, product: lstProduct });
            });
        })
    });
});


router.get('/filter-all-product', (req, res) => {
    var filter = req.query.filter;
    db.selectAllCateory(function (lstCate) {
        db.selectAllSn(function (lstSn) {
            if (filter.substring(0, 1) == 'K') {
                db.selectProductBySn(filter, function (lstProduct) {
                    res.render('site/home/index', { cate: lstCate, sn: lstSn, product: lstProduct });
                });
            } else {
                db.selectAllProductLikeCateory(filter, function (lstProduct) {
                    res.render('site/home/index', { cate: lstCate, sn: lstSn, product: lstProduct });
                });
            }
        })
    });
});


router.get('/detail', (req, res) => {
    res.render('site/detail/detail',  { cate: null, sn: null, product: null });
});

module.exports = router;