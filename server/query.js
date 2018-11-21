var db = require('./db');
var string = require('./string');
var log = require('./log');
var utils = require('./utils');
var settings = require('./settings');
var notify = require('./notify');
Models = require('./models');
var models = new Models({});


exports.findApiSettings = function (callback) {
  try {
    var sql = "SELECT * FROM settings";
    db.execute(sql, function (data, err) {
      if (err) {
        log.error("findApiSettings", err);
      } else {
        models.ApiSettingsForm(data[0]);
        log.write("findApiSettings", JSON.stringify(models.data));
        callback(models.data);
      }
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findHomeData = function (callback) {
  try {
    string.sqlFindAllBanner(function (stringQuery) {
      db.execute(stringQuery, function (BannerForm, err) {
        if (err) {
          log.error("findAllBanner", err);
        } else {
          string.sqlFindAllCategory(function (stringQuery) {
            db.execute(stringQuery, function (CategoryForm, err) {
              if (err) {
                log.error("findAllCategory", err);
              } else {

                string.sqlFindAllProductFlashsale(function (stringQuery) {
                  db.execute(stringQuery, function (FlashsaleForm, err) {
                    if (err) {
                      log.error("findAllProductFlashsale", err);
                    } else {

                      var home = {
                        Banner: BannerForm,
                        Category: CategoryForm,
                        Flashsale: FlashsaleForm
                      }

                      log.write("findHomeData", JSON.stringify(home));
                      callback(home);
                    }
                  });
                });

              }
            });
          });
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllProduct = function (filter, offset, limit, callback) {
  try {
    string.sqlFindAllProduct(filter, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllProduct", err);
        } else {
          models.ProductForm(data);
          log.write("findAllProduct", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findProduct = function (productId, callback) {
  try {
    string.sqlFindProduct(productId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findProduct", err);
        } else {
          models.ProductForm(data[0]);
          log.write("findProduct", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findProductForAdmin = function (productId, callback) {
  try {
    string.sqlFindProductForAdmin(productId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findProductForAdmin", err);
        } else {
          models.ProductForm(data[0]);
          log.write("findProductForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}


/*
* COMMENT
*/
exports.findCommentForProdut = function (productId, offset, limit, callback) {
  try {
    string.sqlFindCommentForProduct(productId, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findCommentForProdut", err);
        } else {
          models.ProductForm(data);
          log.write("findCommentForProdut", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertComment = function (params, callback) {
  try {
    string.sqlInsertComment(params.commentId, params.userId, params.question, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertComment", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {

          //Notify
          notify.newComment(params.commentId);

          models.ProductForm({ insert: 1 });
          log.write("insertComment", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllCommentForAdmin = function (callback) {
  try {
    string.sqlFindAllCommentForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllCommentForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllCommentForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findCommentForAdmin = function (commentId, callback) {
  try {
    string.sqlFindCommentForAdmin(commentId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("sqlFindCommentForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("sqlFindCommentForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateAnswerComment = function (params, callback) {
  try {
    string.sqlUpdateAnswerComment(params.id, params.answer, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateComment", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateComment", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteComment = function (params, callback) {
  try {
    string.sqlDeleteComment(params.id, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteComment", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteComment", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}


/*
* RAITING
*/
exports.findRaitingForProduct = function (productId, offset, limit, callback) {
  try {
    string.sqlFindRaitingForProduct(productId, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findRaitingForProduct", err);
        } else {
          models.ProductForm(data);
          log.write("findRaitingForProduct", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertRaiting = function (params, callback) {
  try {
    string.sqlInsertRaiting(params.rateId, params.userId, params.question, params.rate, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertRaiting", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {

          //Notify
          notify.newRaiting(params.rateId);

          models.ProductForm({ insert: 1 });
          log.write("insertRaiting", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllRaitingForAdmin = function (callback) {
  try {
    string.sqlFindAllRaitingForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllRaitingForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllRaitingForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findRaitingForAdmin = function (rateId, callback) {
  try {
    string.sqlFindRaitingForAdmin(rateId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findRaitingForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findRaitingForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateAnswerRaiting = function (params, callback) {
  try {
    string.sqlUpdateAnswerRaiting(params.id, params.answer, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateAnswerRaiting", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateAnswerRaiting", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteRaiting = function (params, callback) {
  try {
    string.sqlDeleteRaiting(params.id, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteRaiting", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteRaiting", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}


/*
* LIKE
*/
exports.findLikes = function (productId, offset, limit, callback) {
  try {
    string.sqlFindLikes(productId, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findLikes", err);
        } else {
          models.ProductForm(data);
          log.write("findLikes", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertLikes = function (params, callback) {
  try {
    string.sqlInsertLikes(params.likesId, params.userId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertLikes", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("insertLikes", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteLikes = function (params, callback) {
  try {
    string.sqlDeleteLikes(params.id, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteLikes", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteLikes", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}


/*
* TRANSACTION
*/
exports.insertOrderStore = function (params, callback) {
  try {
    var count = 0;
    db.execute('SELECT max(transactionId) as maxTransactionId FROM transactions', function (data, err) {
      if (!err) {
        var transactionId = data[0].maxTransactionId;
        transactionId++;
        for (var i = 0; i < params.length; i++) {
          //Insert Transaction
          string.sqlInsertTransactions(transactionId, settings.receiverStore, params[i], function (stringQuery) {
            db.execute(stringQuery, function (data, err) {
              count++;
              if (count == params.length)
                if (err) {
                  log.error("insertOrderStore", err);
                  models.ProductForm({ insert: 0 });
                  callback(models.data);
                } else {
                  models.ProductForm({ insert: 1 });
                  log.write("insertOrderStore", JSON.stringify(models.data));
                  callback(models.data);
                }
            });
          });
        }
      }
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertOrders = function (params, callback) {
  try {
    //
    var receiver = params[params.length - 1];
    //GUEST
    if (receiver.receiverUserId == 1) {
      //Insert Receiver
      string.sqlInsertReceiver(receiver, function (stringQuery) {
        db.execute(stringQuery, function (data, err) {
          if (err) {
            log.error("insertReceiver", err);
            models.ProductForm({ insert: 0 });
            callback(models.data);
          } else {
            //Count Insert
            var count = 0;
            //Get InsertId
            var receiverId = data.insertId;
            //Get Max transactionId
            db.execute('SELECT max(transactionId) as maxTransactionId FROM transactions', function (data, err) {
              if (!err) {
                var transactionId = data[0].maxTransactionId;
                transactionId++;
                for (var i = 0; i < params.length - 1; i++) {
                  //Insert Transaction
                  string.sqlInsertTransactions(transactionId, receiverId, params[i], function (stringQuery) {
                    db.execute(stringQuery, function (data, err) {
                      count++;
                      if (count == params.length - 1)
                        if (err) {
                          log.error("insertOrders", err);
                          models.ProductForm({ insert: 0 });
                          callback(models.data);
                        } else {

                          //Notify
                          notify.newOrder(transactionId);

                          models.ProductForm({ insert: 1 });
                          log.write("insertOrders", JSON.stringify(models.data));
                          callback(models.data);

                        }
                    });
                  });
                }
              }

            });
          }
        });
      });
    } else {
      //USER
      //Check Exist
      string.sqlExistReceiver(receiver.receiverUserId, function (stringQuery) {
        db.execute(stringQuery, function (data, err) {
          if (err) {
            log.error("ExistReceiver", err);
          } else {
            if (data.length > 0) {
              var receiverId = data[0].receiverId;
              //Exist
              //Update receiver
              string.sqlUpdateReceiver(receiverId, receiver, function (stringQuery) {
                db.execute(stringQuery, function (data, err) {
                  if (err) {
                    log.error("updateReceiver", err);
                  } else {
                    //Insert receiver
                    var count = 0;
                    db.execute('SELECT max(transactionId) as maxTransactionId FROM transactions', function (data, err) {
                      if (!err) {
                        var transactionId = data[0].maxTransactionId;
                        transactionId++;
                        for (var i = 0; i < params.length - 1; i++) {
                          //Insert Transaction
                          string.sqlInsertTransactions(transactionId, receiverId, params[i], function (stringQuery) {
                            db.execute(stringQuery, function (data, err) {
                              count++;
                              if (count == params.length - 1)
                                if (err) {
                                  log.error("insertTransaction", err);
                                  models.ProductForm({ insert: 0 });
                                  callback(models.data);
                                } else {

                                  //Notify
                                  notify.newOrder(transactionId);

                                  models.ProductForm({ insert: 1 });
                                  log.write("insertTransaction", JSON.stringify(models.data));
                                  callback(models.data);

                                }
                            });
                          });
                        }
                      }

                    });
                  }
                });
              });
            } else {
              //Not Exist
              //Insert receiver
              string.sqlInsertReceiver(receiver, function (stringQuery) {
                db.execute(stringQuery, function (data, err) {
                  if (err) {
                    log.error("insertReceiver", err);
                    models.ProductForm({ insert: 0 });
                    callback(models.data);
                  } else {
                    //Count Insert
                    var count = 0;
                    //Get InsertId
                    var receiverId = data.insertId;
                    //Get Max transactionId
                    db.execute('SELECT max(transactionId) as maxTransactionId FROM transactions', function (data, err) {
                      if (!err) {
                        var transactionId = data[0].maxTransactionId;
                        transactionId++;
                        for (var i = 0; i < params.length - 1; i++) {
                          //Insert Transaction
                          string.sqlInsertTransactions(transactionId, receiverId, params[i], function (stringQuery) {
                            db.execute(stringQuery, function (data, err) {
                              count++;
                              if (count == params.length - 1)
                                if (err) {
                                  log.error("insertOrders", err);
                                  models.ProductForm({ insert: 0 });
                                  callback(models.data);
                                } else {

                                  //Notify
                                  notify.newOrder(transactionId);

                                  models.ProductForm({ insert: 1 });
                                  log.write("insertOrders", JSON.stringify(models.data));
                                  callback(models.data);
                                }
                            });
                          });
                        }
                      }

                    });
                  }
                });
              });

            }
          }
        });
      });
    }
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}


/*
* USER
*/
exports.insertUser = function (params, callback) {
  try {
    string.sqlCheckUserName(params.nickname, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (data.length > 0) {
          log.error("insertUser", err);
          models.ProductForm({ insert: 2 });
          callback(models.data);
        } else {

          string.sqlCheckPhoneNumber(params.phone, function (stringQuery) {
            db.execute(stringQuery, function (data, err) {
              if (data.length > 0) {
                log.error("insertUser", err);
                models.ProductForm({ insert: 3 });
                callback(models.data);
              } else {

                var verify = utils.createVerify();

                string.sqlInsertUser(params, verify, function (stringQuery) {
                  db.execute(stringQuery, function (data, err) {
                    if (err) {
                      log.error("insertUser", err);
                      models.ProductForm({ insert: 0 });
                      callback(models.data);
                    } else {
                      //Send sms
                      notify.smsVerify(params.phone, verify);

                      //Callback
                      models.ProductForm({ insert: 1 });
                      log.write("insertUser", JSON.stringify(models.data));
                      callback(models.data);
                    }
                  });
                });

              }
            });
          });

        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateVerify = function (params, callback) {
  try {
    string.sqlUpdateVerify(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateVerify", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateVerify", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.resendVerifyCode = function (params, callback) {
  try {
    var newCode = utils.createVerify();
    string.sqlResendVerifyCode(params, newCode, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("resendVerifyCode", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {

          //Send sms
          notify.smsVerify(params.phone, newCode);

          models.ProductForm({ update: 1 });
          log.write("resendVerifyCode", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.resetPassword = function (params, callback) {
  try {
    string.sqlResetPassword(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("resetPassword", err);
        } else {
          if (data.length > 0) {
            //Send Sms
            notify.smsResetPassword(params.phone, data[0].nickname, data[0].password);

            models.ProductForm({ reset: 1 });
            log.write("resetPassword", JSON.stringify(models.data));
            callback(models.data);
          } else {
            models.ProductForm({ reset: 0 });
            log.write("resetPassword", JSON.stringify(models.data));
            callback(models.data);
          }
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateUser = function (params, callback) {
  try {
    string.sqlUpdateUser(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updatetUser", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updatetUser", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* VOUCHER
*/
exports.findAllVoucherForAdmin = function (callback) {
  try {
    string.sqlFindAllVoucherForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllVoucherForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllVoucherForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertVoucher = function (params, callback) {
  try {
    string.sqlInsertVoucher(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertVoucher", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("insertVoucher", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateVoucher = function (params, callback) {
  try {
    string.sqlUpdateVoucher(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateVoucher", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateVoucher", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteVoucher = function (params, callback) {
  try {
    string.sqlDeleteVoucher(params.voucherId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteVoucher", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteVoucher", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* PROMOTION
*/
exports.findAllPromotionForAdmin = function (callback) {
  try {
    string.sqlFindAllPromotionForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllPromotionForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllPromotionForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertPromotion = function (params, callback) {
  try {
    string.sqlInsertPromotion(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertPromotion", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("insertPromotion", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updatePromotion = function (params, callback) {
  try {
    string.sqlUpdatePromotion(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updatePromotion", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updatePromotion", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deletePromotion = function (params, callback) {
  try {
    string.sqlDeletePromotion(params.promotionId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deletePromotion", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deletePromotion", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* RECEIVER
*/
exports.findReceiver = function (userId, callback) {
  try {
    string.sqlFindReceiver(userId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findReceiver", err);
        } else {
          if (data.length > 0) {
            models.ProductForm(data[0]);
          } else {
            models.ProductForm({ value: 0 });
          }
          log.write("findReceiver", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateReceiver = function (params, callback) {
  try {
    string.sqlUpdateReceiver(params.receiverId, params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateReceiver", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateReceiver", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* SHIP
*/
exports.findAllShipForAdmin = function (callback) {
  try {
    string.sqlFindAllShipForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllShipForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllShipForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertShip = function (params, callback) {
  try {
    string.sqlInsertShip(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertShip", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("insertShip", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateShip = function (params, callback) {
  try {
    string.sqlUpdateShip(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateShip", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateShip", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteShip = function (params, callback) {
  try {
    string.sqlDeleteShip(params.shipId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteShip", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteShip", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* FLASHSALE
*/
exports.findAllFlashsaleForAdmin = function (callback) {
  try {
    string.sqlFindAllFlashsaleForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllFlashsaleForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllFlashsaleForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertFlashsale = function (params, callback) {
  try {
    string.sqlInsertFlashsale(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertFlashsale", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("insertFlashsale", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateFlashsale = function (params, callback) {
  try {
    string.sqlUpdateFlashsale(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateFlashsale", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateFlashsale", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteFlashsale = function (params, callback) {
  try {
    string.sqlDeleteFlashsale(params.flashsaleId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteFlashsale", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteFlashsale", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* POINT
*/
exports.findAllPointForAdmin = function (callback) {
  try {
    string.sqlFindAllPointForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllPointForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllPointForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertPoint = function (params, callback) {
  try {
    string.sqlInsertPoint(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertPoint", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("insertPoint", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updatePoint = function (params, callback) {
  try {
    string.sqlUpdatePoint(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updatePoint", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updatePoint", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deletePoint = function (params, callback) {
  try {
    string.sqlDeletePoint(params.pointId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deletePoint", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deletePoint", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* GIFT
*/
exports.findAllGiftForAdmin = function (callback) {
  try {
    string.sqlFindAllGiftForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllGiftForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllGiftForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertGift = function (params, callback) {
  try {
    string.sqlInsertGift(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertGift", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("insertGift", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateGift = function (params, callback) {
  try {
    string.sqlUpdateGift(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateGift", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateGift", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteGift = function (params, callback) {
  try {
    string.sqlDeleteGift(params.giftId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteGift", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteGift", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* HISTORY
*/
exports.findHistory = function (userId, offset, limit, callback) {
  try {
    string.sqlFindHistory(userId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findHistory", err);
        } else {
          string.sqlFindProductHistory(data, offset, limit, function (stringQuery) {
            db.execute(stringQuery, function (data, err) {
              if (err) {
                log.error("sqlFindProductHistrory", err);
              } else {
                models.ProductForm(data);
                log.write("sqlFindProductHistrory", JSON.stringify(models.data));
                callback(models.data);
              }
            });
          });
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findBought = function (userId, offset, limit, callback) {
  try {
    string.sqlFindBought(userId, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findBought", err);
        } else {
          models.ProductForm(data);
          log.write("findBought", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* BANNER
*/
exports.findAllBannerForAdmin = function (callback) {
  try {
    string.sqlFindAllBannerForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllBannerForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllBannerForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findBanner = function (bannerId, callback) {
  try {
    string.sqlFindBanner(bannerId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findBanner", err);
        } else {
          models.ProductForm(data);
          log.write("findBanner", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateBanner = function (params, callback) {
  try {
    string.sqlUpdateBanner(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateBanner", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateBanner", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateImageBanner = function (params, callback) {
  try {
    string.sqlUpdateImageBanner(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateImageBanner", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateImageBanner", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateActiveBanner = function (params, callback) {
  try {
    string.sqlUpdateActiveBanner(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateActiveBanner", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateActiveBanner", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.addBanner = function (params, callback) {
  try {
    string.sqlInsertBanner(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("addBanner", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("addBanner", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteBanner = function (params, callback) {
  try {
    string.sqlDeleteCategory(params.categoryId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteCategory", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteCategory", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}


/*
* CATEGORY
*/
exports.findAllCategoryForAdmin = function (callback) {
  try {
    string.sqlFindAllCategoryForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllCategoryForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllCategoryForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateCategory = function (params, callback) {
  try {
    string.sqlUpdateCategory(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateCategory", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateCategory", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.insertCategory = function (params, callback) {
  try {
    string.sqlInsertCategory(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertCategory", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("insertCategory", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.deleteCategory = function (params, callback) {
  try {
    string.sqlDeleteCategory(params.categoryId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("deleteCategory", err);
          models.ProductForm({ delete: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ delete: 1 });
          log.write("deleteCategory", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateActiveCategory = function (params, callback) {
  try {
    string.sqlUpdateActiveCategory(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateActiveCategory", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateActiveCategory", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* SUPPORT
*/
exports.findAllSupport = function (callback) {
  try {
    string.sqlFindAllSupport(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllSupport", err);
        } else {
          models.ProductForm(data);
          log.write("findAllSupport", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateSupport = function (params, callback) {
  try {
    string.sqlUpdateSupport(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateSupport", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateSupport", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}


/*
* EVENT
*/
exports.findAllEvent = function (offset, limit, callback) {
  try {
    string.sqlFindAllEvent(offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllEvent", err);
        } else {
          models.ProductForm(data);
          log.write("findAllEvent", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllEventForAdmin = function (callback) {
  try {
    string.sqlFindAllEventForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllEventForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllEventForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findEvent = function (eventId, callback) {
  try {
    string.sqlFindEvent(eventId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findEvent", err);
        } else {
          models.ProductForm(data);
          log.write("findEvent", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateEvent = function (params, callback) {
  try {
    string.sqlUpdateEvent(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateEvent", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateEvent", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateImageEvent = function (params, callback) {
  try {
    string.sqlUpdateImageEvent(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateImageEvent", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateImageEvent", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.addEvent= function (params, callback) {
  try {
    string.sqlInsertEvent(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("addEvent", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("addEvent", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateActiveEvent = function (params, callback) {
  try {
    string.sqlUpdateActiveEvent(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateActiveEvent", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateActiveEvent", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* BLOG
*/
exports.findAllRanking = function (offset, limit, callback) {
  try {
    string.sqlFindAllRanking(offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllRanking", err);
        } else {
          models.ProductForm(data);
          log.write("findAllRanking", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* BLOG
*/
exports.findAllBlog = function (offset, limit, callback) {
  try {
    string.sqlFindAllBlog(offset, limit, function(stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllBlog", err);
        } else {
          models.ProductForm(data);
          log.write("findAllBlog", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllBlogForAdmin = function (callback) {
  try {
    string.sqlFindAllBlogForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllBlogForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllBlogForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findBlog = function (blogId, callback) {
  try {
    string.sqlFindBlog(blogId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findBlog", err);
        } else {
          models.ProductForm(data);
          log.write("findBlog", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateBlog = function (params, callback) {
  try {
    string.sqlUpdateBlog(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateBlog", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateBlog", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateImageBlog = function (params, callback) {
  try {
    string.sqlUpdateImageBlog(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateImageBlog", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateImageBlog", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.addBlog = function (params, callback) {
  try {
    string.sqlInsertBlog(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("addBlog", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("addBlog", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateActiveBlog = function (params, callback) {
  try {
    string.sqlUpdateActiveBlog(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateActiveBlog", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateActiveBlog", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* SERVICE
*/
exports.findAllService = function (callback) {
  try {
    string.sqlFindAllService(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllService", err);
        } else {
          models.ProductForm(data);
          log.write("findAllService", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllServiceForAdmin = function (callback) {
  try {
    string.sqlFindAllServiceForAdmin(function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllServiceForAdmin", err);
        } else {
          models.ProductForm(data);
          log.write("findAllServiceForAdmin", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findService = function (serviceId, callback) {
  try {
    string.sqlFindService(serviceId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findService", err);
        } else {
          models.ProductForm(data);
          log.write("findService", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateActiveService = function (params, callback) {
  try {
    string.sqlUpdateActiveService(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateActiveService", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateActiveService", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.addService = function (params, callback) {
  try {
    string.sqlInsertService(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("addService", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ insert: 1 });
          log.write("addService", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateService = function (params, callback) {
  try {
    string.sqlUpdateService(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateService", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateService", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateImageService = function (params, callback) {
  try {
    string.sqlUpdateImageService(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateImageService", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateImageService", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* ADMIN
*/


/*
* PRODUCT
*/
exports.findListProduct = function (offset, limit, callback) {
  try {
    string.sqlFindListProduct(offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findListProduct", err);
        } else {
          models.ProductForm(data);
          log.write("findListProduct", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.checkProductSn = function (sn, callback) {
  try {
    string.sqlCheckProductSn(sn, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          //Error
          log.write("checkProductSn", err);
          models.ProductForm({ productId: -1 });
          callback(models.data);
        } else {
          if (data[0]) {
            //Exist
            log.write("ProductId: ", data[0].productId);
            models.ProductForm({ productId: data[0].productId });
            callback(models.data);
          } else {
            //Not Exist
            log.write("checkProductSn: ", '0');
            models.ProductForm({ productId: 0 });
            callback(models.data);
          }
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.addProduct = function (params, callback) {
  try {
    string.sqlInsertProduct(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("insertProduct", err);
          models.ProductForm({ insert: 0 });
          callback(models.data);
        } else {
          var productId = data.insertId;
          string.sqlInsertPrice(productId, params.productBuy, params.productSell, function (stringQuery) {
            db.execute(stringQuery, function (data, err) {
              if (err) {
                log.error("sqlInsertPrice", err);
                models.ProductForm({ insert: 0 });
                callback(models.data);
              } else {
                string.sqlInsertAmount(productId, params.productAmount, function (stringQuery) {
                  db.execute(stringQuery, function (data, err) {
                    if (err) {
                      log.error("sqlInsertAmount", err);
                      models.ProductForm({ insert: 0 });
                      callback(models.data);
                    } else {
                      var image = utils.splitString(params.productImage, "~");

                      string.sqlInsertImage(productId, image[0], image[1], image[2], image[3], image[4], function (stringQuery) {
                        db.execute(stringQuery, function (data, err) {
                          if (err) {
                            log.error("sqlInsertImage", err);
                            models.ProductForm({ insert: 0 });
                            callback(models.data);
                          } else {
                            var yt = utils.splitString(params.productVideo);

                            string.sqlInsertYoutube(productId, yt[0], yt[1], yt[2], function (stringQuery) {
                              db.execute(stringQuery, function (data, err) {
                                if (err) {
                                  log.error("sqlInsertYoutube", err);
                                  models.ProductForm({ insert: 0 });
                                  callback(models.data);
                                } else {
                                  models.ProductForm({ insert: 1 });
                                  log.write("sqlInsertYoutube", JSON.stringify(models.data));
                                  callback(models.data);
                                }
                              });
                            });
                          }
                        });
                      });
                    }
                  });
                });
              }
            });
          });
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllDiscount = function (callback) {
  try {
    string.sqlFindAllPromotion(function (stringQuery) {
      db.execute(stringQuery, function (PromotionForm, err) {
        if (err) {
          log.error("findAllPromotion", err);
        } else {
          string.sqlFindAllFlashsale(function (stringQuery) {
            db.execute(stringQuery, function (FlashForm, err) {
              if (err) {
                log.error("findAllFlashsale", err);
              } else {
                string.sqlFindAllVoucher(function (stringQuery) {
                  db.execute(stringQuery, function (VoucherForm, err) {
                    if (err) {
                      log.error("findAllVoucher", err);
                    } else {
                      string.sqlFindAllShip(function (stringQuery) {
                        db.execute(stringQuery, function (ShipForm, err) {
                          if (err) {
                            log.error("findAllShip", err);
                          } else {
                            string.sqlFindAllPoint(function (stringQuery) {
                              db.execute(stringQuery, function (PointForm, err) {
                                if (err) {
                                  log.error("findAllPoint", err);
                                } else {
                                  string.sqlFindAllCategory(function (stringQuery) {
                                    db.execute(stringQuery, function (CategoryForm, err) {
                                      if (err) {
                                        log.error("findAllCategory", err);
                                      } else {
                                        var discount = {
                                          Promotion: PromotionForm,
                                          Flashsale: FlashForm,
                                          Voucher: VoucherForm,
                                          Ship: ShipForm,
                                          Point: PointForm,
                                          Category: CategoryForm
                                        };

                                        log.write("findAllDiscount", JSON.stringify(discount));
                                        callback(discount);
                                      }
                                    });
                                  });
                                }
                              });
                            });
                          }
                        });
                      });
                    }
                  });
                });
              }
            });
          });
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findProductId = function (productSn, callback) {
  try {
    string.sqlFindProductId(productSn, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findProductId", err);
        } else {
          models.ProductForm(data);
          log.write("findProductId", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateProduct = function (params, callback) {
  try {
    string.sqlUpdateProduct(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateProduct", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateProduct", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateImage = function (params, callback) {
  try {
    string.sqlUpdateImage(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateImage", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateImage", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateVideo = function (params, callback) {
  try {
    string.sqlUpdateVideo(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateVideo", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateVideo", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updatePrice = function (params, callback) {
  try {
    string.sqlUpdatePrice(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updatePrice", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updatePrice", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateAmount = function (params, callback) {
  try {
    string.sqlUpdateAmount(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateAmount", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateAmount", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateActiveProduct = function (params, callback) {
  try {
    string.sqlUpdateActiveProduct(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateActiveProduct", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateActiveProduct", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* SELL
*/
exports.findAllTransactionByStatus = function (status, offset, limit, callback) {
  try {
    string.sqlFindAllTransactionByStatus(status, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllTransactionByStatus", err);
        } else {
          models.ProductForm(data);
          log.write("findAllTransactionByStatus", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findTransactionDetail = function (transactionId, callback) {
  try {
    string.sqlFindTransactionDetail(transactionId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findTransactionDetail", err);
        } else {
          models.ProductForm(data);
          log.write("findTransactionDetail", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findProductBySn = function (productSn, callback) {
  try {
    string.sqlFindProductBySn(productSn, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findProductBySn", err);
        } else {
          models.ProductForm(data);
          log.write("findProductBySn", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* REPORT
*/
exports.findAllTransactionByDate = function (from, to, offset, limit, callback) {
  try {
    string.sqlFindAllTransactionByDate(from, to, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllTransactionByDate", err);
        } else {
          models.ProductForm(data);
          log.write("findAllTransactionByDate", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllRevenueByDate = function (from, to, offset, limit, callback) {
  try {
    string.sqlFindAllRevenueByDate(from, to, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("sqlFindAllRevenueByDate", err);
        } else {
          models.ProductForm(data);
          log.write("sqlFindAllRevenueByDate", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findAllProfitByDate = function (from, to, offset, limit, callback) {
  try {
    string.sqlFindAllProfitByDate(from, to, offset, limit, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("findAllProfitByDate", err);
        } else {
          models.ProductForm(data);
          log.write("findAllProfitByDate", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.updateTransactionStatus = function (params, callback) {
  try {
    string.sqlUpdateTransactionStatus(params, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          log.error("updateTransactionStatus", err);
          models.ProductForm({ update: 0 });
          callback(models.data);
        } else {
          models.ProductForm({ update: 1 });
          log.write("updateTransactionStatus", JSON.stringify(models.data));
          callback(models.data);
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

exports.findDataDashboard = function (status, from, to, callback) {
  try {
    string.sqlFindRevenue(status, from, to, function (stringQuery) {
      db.execute(stringQuery, function (RevenueForm, err) {
        if (err) {
          log.error("findRevenue", err);
        } else {
          string.sqlCountTransaction(from, to, function (stringQuery) {
            db.execute(stringQuery, function (TotalTransction, err) {
              if (err) {
                log.error("countTransaction", err);
              } else {
                string.sqlCountOpenApp(from, to, function (stringQuery) {
                  db.execute(stringQuery, function (OpenForm, err) {
                    if (err) {
                      log.error("findAllOpenApp", err);
                    } else {
                      string.sqlCountSignup(from, to, function (stringQuery) {
                        db.execute(stringQuery, function (SignupForm, err) {
                          if (err) {
                            log.error("findSignup", err);
                          } else {
                            string.sqlCountLogin(from, to, function (stringQuery) {
                              db.execute(stringQuery, function (LoginForm, err) {
                                if (err) {
                                  log.error("findLogin", err);
                                } else {
                                  var dashboard = {
                                    Revenue: RevenueForm[0],
                                    Transaction: TotalTransction[0],
                                    OpenApp: OpenForm[0],
                                    Signup: SignupForm[0],
                                    Login: LoginForm[0],
                                  };

                                  log.write("findDataDashboard", JSON.stringify(dashboard));
                                  callback(dashboard);
                                }
                              });
                            });

                          }
                        });
                      });

                    }
                  });
                });

              }
            });
          });
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}

/*
* HISTORY
*/
exports.insertViewHistory = function (params, callback) {
  try {
    string.sqlFindHistory(params.userId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          //Error
          log.write("sqlFindHistory", err);
        } else {
          var count = 0;
          for (var i in data) {
            if (data[i].productId == params.productId) {
              count++;
            }
          }
          if (count == 0) {
            string.sqlInsertViewHistory(params, function (stringQuery) {
              db.execute(stringQuery, function (data, err) {
                if (err) {
                  log.error("insertViewHistory", err);
                  models.ProductForm({ insert: 0 });
                  callback(models.data);
                } else {
                  models.ProductForm({ insert: 1 });
                  log.write("insertViewHistory", JSON.stringify(models.data));
                  callback(models.data);
                }
              });
            });
          }
        };
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}


/*
* TRACKING
*/
exports.trackingOpenApp = function (params, callback) {
  try {
    string.sqlCheckOpenId(params.openId, function (stringQuery) {
      db.execute(stringQuery, function (data, err) {
        if (err) {
          //Error
          log.write("sqlCheckOpenId", err);
        } else {
          if (data[0]) {
            //Exist-->Update
            string.sqlUpdateOpenApp(params, function (stringQuery) {
              db.execute(stringQuery, function (data, err) {
                if (err) {
                  log.error("updateOpenApp", err);
                  models.ProductForm({ update: 0 });
                  callback(models.data);
                } else {
                  models.ProductForm({ update: 1 });
                  log.write("updateOpenApp", JSON.stringify(models.data));
                  callback(models.data);
                }
              });
            });

          } else {
            //Not Exist --> Insert
            string.sqlInsertOpenApp(params, function (stringQuery) {
              db.execute(stringQuery, function (data, err) {
                if (err) {
                  log.error("insertOpenApp", err);
                  models.ProductForm({ insert: 0 });
                  callback(models.data);
                } else {
                  models.ProductForm({ insert: 1 });
                  log.write("insertOpenApp", JSON.stringify(models.data));
                  callback(models.data);
                }
              });
            });
          }
        }
      });
    });
  } catch (ex) {
    log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
  }
}
