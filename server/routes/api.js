var express = require('express');
var settings = require('../settings');
var query = require('../query');
var router = express.Router();

router.get("/findAllProduct", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;

    query.findAllProduct(filter, offset, limit, function (ProductForm) {
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
* RAITING
*/
router.get("/findRating", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;
    var productId = req.query.productId;

    query.findRaitingForProduct(productId, offset, limit, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertRating", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertRaiting(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.get("/findAllRaitingForAdmin", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllRaitingForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateAnswerRaiting", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateAnswerRaiting(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deleteRaiting", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deleteRaiting(params, function (ProductForm) {
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
router.get("/findComment", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;
    var productId = req.query.productId;

    query.findCommentForPrduct(productId, offset, limit, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertComment", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertComment(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.get("/findAllCommentForAdmin", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllCommentForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateAnswerComment", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateAnswerComment(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deleteComment", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deleteComment(params, function (ProductForm) {
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
* TRANSACTION
*/
router.post("/insertOrders", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var json = req.body.order;
    var params = JSON.parse(json);

    query.insertOrders(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertOrderStore", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var json = req.body.order;
    var params = JSON.parse(json);

    query.insertOrderStore(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.get("/findReceiver", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var userId = req.query.userId;

    query.findReceiver(userId, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateReceiver", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateReceiver(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.get("/findHistory", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;
    var userId = req.query.userId;

    query.findHistory(userId, offset, limit, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.get("/findBought", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;
    var userId = req.query.userId;

    query.findBought(userId, offset, limit, function (ProductForm) {
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
router.get("/findAllCategory", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllCategoryForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateCategory", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateCategory(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertCategory", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertCategory(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deleteCategory", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deleteCategory(params, function (ProductForm) {
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
router.get("/findAllVoucherForAdmin", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllVoucherForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateVoucher", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateVoucher(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertVoucher", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertVoucher(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deleteVoucher", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deleteVoucher(params, function (ProductForm) {
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
* PROMOTION
*/
router.get("/findAllPromotionForAdmin", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllPromotionForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updatePromotion", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updatePromotion(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertPromotion", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertPromotion(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deletePromotion", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deletePromotion(params, function (ProductForm) {
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
* SHIP
*/
router.get("/findAllShipForAdmin", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllShipForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateShip", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateShip(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertShip", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertShip(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deleteShip", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deleteShip(params, function (ProductForm) {
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
* FLASHSALE
*/
router.get("/findAllFlashsaleForAdmin", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllFlashsaleForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateFlashsale", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateFlashsale(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertFlashsale", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertFlashsale(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deleteFlashsale", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deleteFlashsale(params, function (ProductForm) {
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
* POINT
*/
router.get("/findAllPointForAdmin", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllPointForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updatePoint", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updatePoint(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertPoint", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertPoint(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deletePoint", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deletePoint(params, function (ProductForm) {
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
* GIFT
*/
router.get("/findAllGiftForAdmin", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    query.findAllGiftForAdmin(function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateGift", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateGift(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertGift", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertGift(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.delete("/deleteGift", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.deleteGift(params, function (ProductForm) {
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
* REPORT
*/
router.get("/findAllTransaction", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;
    var from = req.query.dateFrom;
    var to = req.query.dateTo;

    query.findAllTransactionByDate(from, to, offset, limit, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.get("/findAllRevenue", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;
    var from = req.query.dateFrom;
    var to = req.query.dateTo;

    query.findAllRevenueByDate(from, to, offset, limit, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.get("/findAllProfit", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;
    var from = req.query.dateFrom;
    var to = req.query.dateTo;

    query.findAllProfitByDate(from, to, offset, limit, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateTransactionStatus", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateTransactionStatus(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertViewHistory", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertViewHistory(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/insertUser", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.insertUser(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateUser", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateUser(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/updateVerify", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.updateVerify(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.put("/resendVerifyCode", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.resendVerifyCode(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});

router.post("/resetPassword", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.resetPassword(params, function (ProductForm) {
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
router.get("/findAllBlog", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;

    query.findAllBlog(offset, limit, function (ProductForm) {
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
router.get("/findAllEvent", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;

    query.findAllEvent(offset, limit, function (ProductForm) {
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
* GAME
*/
router.get("/findAllRanking", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var offset = req.query.offset;
    var limit = req.query.limit;

    query.findAllRanking(offset, limit, function (ProductForm) {
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
* TRACKING
*/
router.post("/trackingOpenApp", function (req, res) {
  var secret = req.headers[settings.secret_key];
  if (secret === settings.secret_encrypt) {

    var params = req.body;

    query.trackingOpenApp(params, function (ProductForm) {
      res.json(ProductForm);
      res.end();
    });

  } else {
    //Response 404
    res.write(settings.secret_fail);
    res.end();
  }
});


function isLogin(req, res, next) {
  var session = req.headers[settings.session];
  console.log(session);
  
  if (session) {
      //next();
  }else{
    //next();
  } 
}

module.exports = router;