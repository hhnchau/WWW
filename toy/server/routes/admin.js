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

//Analysis
router.get('/kp/analysis', (req, res) => {
  db.selectTracking(function (result) {
    res.render('admin/analysis/analysis', {analysis: result});
  });
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