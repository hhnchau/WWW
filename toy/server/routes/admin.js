var express = require('express');
var router = express.Router();
const db = require('../mysql');


router.get('/', (req, res) => {
  res.render('admin/login/login');
});

// Login
router.post('/login', (req, res) => {
  var params = req.body;
  if (params.username == 'KPAdmin' && params.password == '@@@@@')
    db.selectAllSn(function (lstSn) {
      res.render('admin/new/new', { sn: lstSn });
    });
});

//Delete Force
router.get('/kp/deleteforce', (req, res) => {
  res.render('admin/deleteforce/delete');
});

//Delete Force
router.post('/deleteforce', (req, res) => {
  var params = req.body;
  if (params.username == 'KPAdmin' && params.password == '@@@@@')
    db.deleteProduct(params, function (result) {
      res.json(result);
      res.end();
    });
});

//Fetch
router.get('/kp/fetch', (req, res) => {
  res.render('admin/fetch/fetch');
});

//Analysis
router.get('/kp/analysis', (req, res) => {
  db.selectTracking(function (result) {
    res.render('admin/analysis/analysis', {analysis: result});
  });
});

//All-Analysis
router.get('/kp/analysis/all', (req, res) => {
  db.selectTrackingAll(function (result) {
    res.render('admin/analysis/analysis', {analysis: result});
  });
});

//Clear-Analysis
router.get('/kp/analysis/clear', (req, res) => {
  db.clearAnalysis(function (result) {
    res.json(result);
    res.end();
  });
});

//Get Link
router.get('/getAllSn', (req, res) => {
  db.selectAllSn(function (result) {
    res.json(result);
    res.end();
  });
});

//Get Link
router.get('/getAllSnByCate', (req, res) => {
  var c = req.query.cate;
  db.selectAllSnByCate(c, function (result) {
    res.json(result);
    res.end();
  });
});

//Get Link
router.get('/getAllSnByLink', (req, res) => {
  var l = req.query.link;
  db.selectAllSnByLink(l,function (result) {
    res.json(result);
    res.end();
  });
});

router.post('/update-vip-link.html', (req, res) => {
  var secret = req.headers['secret'];
  if (secret === 'qwerty') {
    var json = req.body.pro;
    var params = JSON.parse(json);
    db.updateVipLink(params, function (result) {
      res.json(result);
      res.end();
    });

  } else {
    //Response 404
    console.log("---SECRET-ERROR---")
  }
});

router.post('/new-product.html', (req, res) => {
  var secret = req.headers['secret'];
  if (secret === 'qwerty') {
    var json = req.body.pro;
    var params = JSON.parse(json);
    db.insertProduct(params, function (result) {
      res.json(result);
      res.end();
    });

  } else {
    //Response 404
    console.log("---SECRET-ERROR---")
  }
});


router.get('/edit-product', (req, res) => {
  var filter = req.query.filter;
  db.selectAllSn(function (lstSn) {
    db.selectProductBySn(filter, function (Product) {
      if (Product.length > 0)
        res.render('admin/edit/edit', { sn: lstSn, pro: Product[0] });
      else
        res.send("Không tìm thấy sản phẩm");
    })
  });
});

router.post('/edit-product.html', (req, res) => {
  var secret = req.headers['secret'];
  if (secret === 'qwerty') {
    var json = req.body.pro;
    var params = JSON.parse(json);
    db.updateProduct(params, function (result) {
      res.json(result);
      res.end();
    });

  } else {
    //Response 404
    console.log("---SECRET-ERROR---")
  }
});


router.post('/delete-product.html', (req, res) => {
  var secret = req.headers['secret'];
  if (secret === 'qwerty') {
    var json = req.body.pro;
    var params = JSON.parse(json);
    db.deleteProduct(params, function (result) {
      res.json(result);
      res.end();
    });

  } else {
    //Response 404
    console.log("---SECRET-ERROR---")
  }
});

// /*
// * TRACKING
// */
router.post("/trackingOpenApp", function (req, res) {
  var secret = req.headers['secret'];
  if (secret === 'qwerty') {

    var params = req.body;

    db.insertTracking(params);

  } else {
    //Response 404
    console.log("---SECRET-ERROR---")
  }
});

module.exports = router;