var utils = require('./utils');

exports.sqlFindAllProduct = function (search, offset, limit, query) {
    var sql = "";
    sql += "SELECT allProduct.*, raiting.likeTotal, raiting.rateTotal, raiting.rateValue, raiting.commentTotal";
    sql += " FROM";
    sql += " (SELECT p.productId, p.productName, p.time, pri.sell, pro.promotionDiscount, img.image1, shi.shipValue, poin.pointValue, flash.flashsaleDiscount";
    sql += " FROM product AS p";
    sql += " LEFT JOIN price AS pri ON p.productId = pri.priceId";
    sql += " LEFT JOIN image AS img ON p.productId = img.imageId";
    sql += " LEFT JOIN promotion AS pro ON p.promotionId = pro.promotionId AND now() >= pro.start AND now() < pro.end";
    sql += " LEFT JOIN ship as shi ON p.shipId = shi.shipId";
    sql += " LEFT JOIN point as poin ON p.pointId = poin.pointId AND now() >= poin.start AND now() < poin.end";
    sql += " LEFT JOIN flashsale as flash ON p.flashsaleId = flash.flashsaleId AND now() >= flash.start AND now() < flash.end";

    if (search == null || search == "") {
        sql += " WHERE p.active = 1) AS allProduct";
    } else {
        var key = utils.splitString(search, "~");
        if (key.length == 1)
            if (search.substring(0, 2) == 'KP' || search.substring(0, 2) == 'kp') {
                //Search ProductSn
                sql += " WHERE p.productSn = '" + search + "' AND p.active = 1) AS allProduct";
            } else {
                //Search Any Key
                sql += " WHERE p.productName like '%" + search + "%' AND p.active = 1) AS allProduct";
            }
        else if (key.length > 1)
            //Search Category
            sql += " WHERE p.categoryId = " + key[1] + " AND p.active = 1) AS allProduct";

    }

    sql += " LEFT JOIN";
    sql += " (SELECT id.productId, countLikes.likeTotal, countRate.rateValue, countRate.rateTotal, countComment.commentTotal";
    sql += " FROM";
    //Select productId
    sql += " (SELECT p.productId";
    sql += " FROM product AS p";
    sql += ") AS id";
    //
    sql += " LEFT JOIN";
    //Select likes
    sql += " (SELECT p.productId, count(*) AS likeTotal";
    sql += " FROM product AS p, likes AS l";
    sql += " WHERE p.productId = l.likesId";
    sql += " GROUP BY p.productId) AS countLikes ON id.productId = countLikes.productId";
    //
    sql += " LEFT JOIN";
    //Select rate
    sql += " (SELECT p.productId, sum(r.rate) AS rateValue, count(*) AS rateTotal";
    sql += " FROM product AS p, rate AS r";
    sql += " WHERE p.productId = r.rateId";
    sql += " GROUP BY p.productId) AS countRate ON id.productId = countRate.productId";
    //
    sql += " LEFT JOIN";
    //Select comment
    sql += " (SELECT p.productId, count(*) AS commentTotal";
    sql += " FROM product AS p, comment AS c";
    sql += " WHERE p.productId = c.commentId"
    sql += " GROUP BY p.productId) AS countComment ON id.productId = countComment.productId";
    //
    sql += ") AS raiting";
    sql += " ON allProduct.productId = raiting.productId";

    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
};

exports.sqlFindAllProductFlashsale = function (query) {
    var sql = "";
    sql += "SELECT allProduct.*, raiting.likeTotal, raiting.rateTotal, raiting.rateValue, raiting.commentTotal";
    sql += " FROM";
    sql += " (SELECT p.productId, p.productName, p.time, pri.sell, pro.promotionDiscount, img.image1, shi.shipValue, poin.pointValue, flash.flashsaleDiscount";
    sql += " FROM product AS p";
    sql += " LEFT JOIN price AS pri ON p.productId = pri.priceId";
    sql += " LEFT JOIN image AS img ON p.productId = img.imageId";
    sql += " LEFT JOIN promotion AS pro ON p.promotionId = pro.promotionId AND now() >= pro.start AND now() < pro.end";
    sql += " LEFT JOIN ship as shi ON p.shipId = shi.shipId";
    sql += " LEFT JOIN point as poin ON p.pointId = poin.pointId AND now() >= poin.start AND now() < poin.end";
    sql += " LEFT JOIN flashsale as flash ON p.flashsaleId = flash.flashsaleId AND now() >= flash.start AND now() < flash.end";

    sql += " WHERE p.active = 1 AND p.flashsaleId > 0 AND now() >= flash.start AND now() < flash.end) AS allProduct";

    sql += " LEFT JOIN";
    sql += " (SELECT id.productId, countLikes.likeTotal, countRate.rateValue, countRate.rateTotal, countComment.commentTotal";
    sql += " FROM";
    //Select productId
    sql += " (SELECT p.productId";
    sql += " FROM product AS p";
    sql += ") AS id";
    //
    sql += " LEFT JOIN";
    //Select likes
    sql += " (SELECT p.productId, count(*) AS likeTotal";
    sql += " FROM product AS p, likes AS l";
    sql += " WHERE p.productId = l.likesId";
    sql += " GROUP BY p.productId) AS countLikes ON id.productId = countLikes.productId";
    //
    sql += " LEFT JOIN";
    //Select rate
    sql += " (SELECT p.productId, sum(r.rate) AS rateValue, count(*) AS rateTotal";
    sql += " FROM product AS p, rate AS r";
    sql += " WHERE p.productId = r.rateId";
    sql += " GROUP BY p.productId) AS countRate ON id.productId = countRate.productId";
    //
    sql += " LEFT JOIN";
    //Select comment
    sql += " (SELECT p.productId, count(*) AS commentTotal";
    sql += " FROM product AS p, comment AS c";
    sql += " WHERE p.productId = c.commentId"
    sql += " GROUP BY p.productId) AS countComment ON id.productId = countComment.productId";
    //
    sql += ") AS raiting";
    sql += " ON allProduct.productId = raiting.productId";

    query(sql);
};

exports.sqlFindProduct = function (productId, query) {
    var sql = "";
    sql += "SELECT p.*, ca.*, img.*, yt.*, pri.*, pro.*, flash.*, poin.*, vou.*, shi.*, sum(r.rate) as rateValue, count(r.rateId) as rateTotal, c.commentTotal, l.likesTotal, amoun.*";
    sql += " FROM product AS p";
    sql += " LEFT JOIN image as img ON p.productId = img.imageId";
    sql += " LEFT JOIN youtube as yt ON p.productId = yt.ytId";
    sql += " LEFT JOIN category as ca ON p.categoryId = ca.categoryId";
    sql += " LEFT JOIN price as pri ON p.productId = pri.priceId";
    sql += " LEFT JOIN promotion as pro ON p.promotionId = pro.promotionId AND now() >= pro.start AND now() < pro.end";
    sql += " LEFT JOIN flashsale as flash ON p.flashsaleId = flash.flashsaleId AND now() >= flash.start AND now() < flash.end";
    sql += " LEFT JOIN point as poin ON p.pointId = poin.pointId AND now() >= poin.start AND now() < poin.end";
    sql += " LEFT JOIN voucher as vou ON p.voucherId = vou.voucherId AND now() >= vou.start AND now() < vou.end";
    sql += " LEFT JOIN amount as amoun ON p.productId = amoun.amountId";
    sql += " LEFT JOIN ship as shi ON p.shipId = shi.shipId";
    sql += " LEFT JOIN rate as r ON p.productId = r.rateId";
    sql += " LEFT JOIN (SELECT count(*) as commentTotal, commentId FROM comment WHERE commentId = '" + productId + "') as c ON p.productId = c.commentId";
    sql += " LEFT JOIN (SELECT count(*) as likesTotal, likesId FROM likes WHERE likesId = '" + productId + "') as l ON p.productId = l.likesId";
    sql += " WHERE p.productId = '" + productId + "' AND p.active = 1";

    query(sql);
};

exports.sqlFindProductForAdmin = function (productId, query) {
    var sql = "";
    sql += "SELECT p.*, ca.*, img.*, yt.*, pri.*, pro.*, flash.*, poin.*, vou.*, shi.*, sum(r.rate) as rateValue, count(r.rateId) as rateTotal, c.commentTotal, l.likesTotal, amoun.*";
    sql += " FROM product AS p";
    sql += " LEFT JOIN image as img ON p.productId = img.imageId";
    sql += " LEFT JOIN youtube as yt ON p.productId = yt.ytId";
    sql += " LEFT JOIN category as ca ON p.categoryId = ca.categoryId";
    sql += " LEFT JOIN price as pri ON p.productId = pri.priceId";
    sql += " LEFT JOIN promotion as pro ON p.promotionId = pro.promotionId AND now() >= pro.start AND now() < pro.end";
    sql += " LEFT JOIN flashsale as flash ON p.flashsaleId = flash.flashsaleId";
    sql += " LEFT JOIN point as poin ON p.pointId = poin.pointId";
    sql += " LEFT JOIN voucher as vou ON p.voucherId = vou.voucherId";
    sql += " LEFT JOIN amount as amoun ON p.productId = amoun.amountId";
    sql += " LEFT JOIN ship as shi ON p.shipId = shi.shipId";
    sql += " LEFT JOIN rate as r ON p.productId = r.rateId";
    sql += " LEFT JOIN (SELECT count(*) as commentTotal, commentId FROM comment WHERE commentId = '" + productId + "') as c ON p.productId = c.commentId";
    sql += " LEFT JOIN (SELECT count(*) as likesTotal, likesId FROM likes WHERE likesId = '" + productId + "') as l ON p.productId = l.likesId";
    sql += " WHERE p.productId = '" + productId + "'";

    query(sql);
};

/*
* LIKE
*/
exports.sqlFindLikes = function (productId, offset, limit, query) {
    var sql = "";
    sql += "SELECT u.nickname, l.*";
    sql += " FROM user AS u";
    sql += " LEFT JOIN likes AS l ON u.userId = l.userId";
    sql += " WHERE l.likesId = '" + productId + "'";
    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
};

exports.sqlInsertLikes = function (likesId, userId, query) {
    //commentId = productId
    //userId = userId
    var sql = "";
    sql += "INSERT INTO likes";
    sql += " (likesId, userId)";
    sql += " VALUES";
    sql += " ('" + likesId + "', '" + userId + "')";

    query(sql);
}

exports.sqlDeleteLikes = function (id, query) {
    //id = primary Id Of Table
    var sql = "";
    sql += "DELETE FROM likes";
    sql += " WHERE";
    sql += " userId = '" + id + "'";

    query(sql);
}

/*
* RAITING
*/
exports.sqlFindRaitingForProduct = function (productId, offset, limit, query) {
    var sql = "";
    sql += "SELECT u.nickname, r.*";
    sql += " FROM user AS u";
    sql += " LEFT JOIN rate as r ON u.userId = r.userId";
    sql += " WHERE r.rateId = '" + productId + "'";
    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
};

exports.sqlInsertRaiting = function (rateId, userId, question, rate, query) {
    //commentId = productId
    //userId = userId
    var sql = "";
    sql += "INSERT INTO rate";
    sql += " (rateId, userId, rateQuestion, rate)";
    sql += " VALUES";
    sql += " ('" + rateId + "', '" + userId + "', '" + question + "', '" + rate + "')";

    query(sql);
}

exports.sqlFindAllRaitingForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM rate";
    sql += " WHERE status = 0";

    query(sql);
};

exports.sqlFindRaitingForAdmin = function (rateId, query) {
    var sql = "";
    sql += "SELECT u.nickname, r.*, p.productId, p.productSn, p.productName, img.image1, amoun.*, pri.*";
    sql += " FROM user AS u";
    sql += " LEFT JOIN rate as r ON u.userId = r.userId";
    sql += " LEFT JOIN product as p ON r.rateId = p.productId";
    sql += " LEFT JOIN image as img ON r.rateId = img.imageId";
    sql += " LEFT JOIN amount as amoun ON r.rateId = amoun.amountId";
    sql += " LEFT JOIN price as pri ON r.rateId = pri.priceId";
    sql += " WHERE r.id = '" + rateId + "'";

    query(sql);
};

exports.sqlUpdateAnswerRaiting = function (id, answer, query) {
    //id = primary Id Of Table
    var sql = "";
    sql += "UPDATE rate";
    sql += " SET";
    sql += " rateAnswer = '" + answer + "',";
    sql += " status = 1";
    sql += " WHERE";
    sql += " id = '" + id + "'";

    query(sql);
}

exports.sqlDeleteRaiting = function (id, query) {
    //id = primary Id Of Table
    var sql = "";
    sql += "DELETE FROM rate";
    sql += " WHERE";
    sql += " id = '" + id + "'";

    query(sql);
}

/*
* COMMENT
*/
exports.sqlFindCommentForProduct = function (productId, offset, limit, query) {
    var sql = "";
    sql += "SELECT u.nickname, c.*";
    sql += " FROM user AS u";
    sql += " LEFT JOIN comment as c ON u.userId = c.userId";
    sql += " WHERE c.commentId = '" + productId + "'";
    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
};

exports.sqlInsertComment = function (commentId, userId, question, query) {
    //commentId = productId
    //userId = userId
    var sql = "";
    sql += "INSERT INTO comment";
    sql += " (commentId, userId, commentQuestion)";
    sql += " VALUES";
    sql += " ('" + commentId + "', '" + userId + "', '" + question + "')";

    query(sql);
}

exports.sqlFindAllCommentForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM comment";
    sql += " WHERE status = 0";

    query(sql);
};

exports.sqlFindCommentForAdmin = function (commentId, query) {
    var sql = "";
    sql += "SELECT u.nickname, c.*, p.productId, p.productSn, p.productName, img.image1, amoun.*, pri.*";
    sql += " FROM user AS u";
    sql += " LEFT JOIN comment as c ON u.userId = c.userId";
    sql += " LEFT JOIN product as p ON c.commentId = p.productId";
    sql += " LEFT JOIN image as img ON c.commentId = img.imageId";
    sql += " LEFT JOIN amount as amoun ON c.commentId = amoun.amountId";
    sql += " LEFT JOIN price as pri ON c.commentId = pri.priceId";
    sql += " WHERE c.id = '" + commentId + "'";

    query(sql);
};

exports.sqlUpdateAnswerComment = function (id, answer, query) {
    //id = primary Id Of Table
    var sql = "";
    sql += "UPDATE comment";
    sql += " SET";
    sql += " commentAnswer = '" + answer + "',";
    sql += " status = 1";
    sql += " WHERE";
    sql += " id = '" + id + "'";

    query(sql);
}

exports.sqlDeleteComment = function (id, query) {
    //id = primary Id Of Table
    var sql = "";
    sql += "DELETE FROM comment";
    sql += " WHERE";
    sql += " id = '" + id + "'";

    query(sql);
}


/*
* TRANSACTION
*/
exports.sqlInsertTransactions = function (transactionId, receiverId, params, query) {
    //status = 0 : new, 1: waiting for confirm, 2:finish
    //userId = 1: Guest mode, >1: Member mode
    var sql = "";
    sql += " INSERT INTO transactions";
    sql += " ("
    sql += "transactionId,";
    sql += " receiverId,";
    sql += " productId,";
    if (params.promotionId > 0)
        sql += " promotionId,";
    if (params.flashsaleId > 0)
        sql += " flashsaleId,";
    if (params.voucherId > 0)
        sql += " voucherId,";
    if (params.pointId > 0)
        sql += " pointId,";
    if (params.giftId > 0)
        sql += " giftId,";
    if (params.pointUse > 0)
        sql += " pointUse,";
    sql += " price,";
    sql += " totalFee,";
    sql += " amount,";
    sql += " status";
    sql += ")";

    sql += " VALUES (";
    sql += "'" + transactionId + "',";
    sql += "'" + receiverId + "',";
    sql += "'" + params.productId + "',";
    if (params.promotionId > 0)
        sql += "'" + params.promotionId + "',";
    if (params.flashsaleId > 0)
        sql += "'" + params.flashsaleId + "',";
    if (params.voucherId > 0)
        sql += "'" + params.voucherId + "',";
    if (params.pointId > 0)
        sql += "'" + params.pointId + "',";
    if (params.giftId > 0)
        sql += "'" + params.giftId + "',";
    if (params.pointUse > 0)
        sql += "'" + params.pointUse + "',";
    sql += " '" + params.productPrice + "',";
    sql += " '" + params.productTotalFee + "',";
    sql += " '" + params.productAmount + "',";
    sql += " '" + params.status + "'";
    sql += ");";

    query(sql);
}

exports.sqlExistReceiver = function (userId, query) {
    var sql = "";
    sql += "SELECT receiverId FROM receiver";
    sql += " WHERE userId = " + userId;

    query(sql);
}

exports.sqlInsertReceiver = function (receiver, query) {
    var sql = "";
    sql += "INSERT INTO receiver";
    sql += " (receiverName, receiverAddress, receiverPhone, receiverNote, receiverPayment, latitude, longitude, userId)";
    sql += " VALUES";
    sql += " ('" + receiver.receiverName + "', '" + receiver.receiverAddress + "', '" + receiver.receiverPhone + "', '" + receiver.receiverNote + "', '" + receiver.receiverPayment + "', '" + receiver.receiverLatitude + "', '" + receiver.receiverLongitude + "', '" + receiver.receiverUserId + "')";

    query(sql);
}

exports.sqlUpdateReceiver = function (receiverId, receiver, query) {
    var sql = "";
    sql += "UPDATE receiver";
    sql += " SET";
    sql += " receiverName = '" + receiver.receiverName + "',";
    sql += " receiverAddress = '" + receiver.receiverAddress + "',";
    sql += " receiverPhone = '" + receiver.receiverPhone + "',";
    sql += " receiverNote = '" + receiver.receiverNote + "',";
    sql += " receiverPayment = '" + receiver.receiverPayment + "',";
    sql += " latitude = '" + receiver.receiverLatitude + "',";
    sql += " longitude = '" + receiver.receiverLongitude + "'";
    sql += " WHERE";
    sql += " receiverId = '" + receiverId + "'";

    query(sql);
}

exports.sqlCheckUserName = function (username, query) {
    var sql = "";
    sql += " SELECT 1 FROM user";
    sql += " WHERE nickname = '" + username + "'";

    query(sql);
}

exports.sqlCheckPhoneNumber = function (phone, query) {
    var sql = "";
    sql += " SELECT 1 FROM user";
    sql += " WHERE phone = '" + phone + "'";

    query(sql);
}

exports.sqlInsertUser = function (params, verify, query) {
    var sql = "";
    sql += " INSERT INTO user";
    sql += " (nickname, password, phone, verify)";
    sql += " VALUES";
    sql += " ('" + params.nickname + "', '" + params.password + "', '" + params.phone + "', '" + verify + "')";

    query(sql);
}

exports.sqlUpdateVerify = function (params, query) {
    var sql = "";
    sql += "UPDATE user";
    sql += " SET";
    sql += " verify = '1'";
    sql += " WHERE";
    sql += " phone = '" + params.phone + "' AND verify = '" + params.verify + "'";

    query(sql);
}

exports.sqlResendVerifyCode = function (params, newCode, query) {
    var sql = "";
    sql += "UPDATE user";
    sql += " SET";
    sql += " verify = '" + newCode + "'";
    sql += " WHERE";
    sql += " phone = '" + params.phone + "' AND nickname = '" + params.nickname + "'";

    query(sql);
}

exports.sqlResetPassword = function (params, query) {
    var sql = "";
    sql += "SELECT nickname, password FROM user";
    sql += " WHERE";
    sql += " phone = '" + params.phone + "'";

    query(sql);
}

exports.sqlUpdateUser = function (params, query) {
    var sql = "";
    sql += "UPDATE user";
    sql += " SET";
    if (params.address !== "")
        sql += " address = '" + params.address + "'";
    if (params.email !== "")
        sql += " email = '" + params.email + "'";
    if (params.password !== "")
        sql += " password = '" + params.password + "'";
    if (params.sex !== "")
        sql += " sex = '" + params.sex + "'";

    sql += " WHERE";
    sql += " userId = '" + params.userId + "'";

    query(sql);
}


exports.sqlFindReceiver = function (userId, query) {
    var sql = "";
    sql += "SELECT * FROM receiver";
    sql += " WHERE";
    sql += " userId = '" + userId + "'";

    query(sql);
}

exports.sqlFindHistory = function (userId, query) {
    var sql = "";
    sql += "SELECT productId FROM history";
    sql += " WHERE userId =" + userId;

    query(sql);
}

exports.sqlInsertViewHistory = function (params, query) {
    var sql = "";
    sql += " INSERT INTO history";
    sql += " (userId, productId)";
    sql += " VALUES";
    sql += " ('" + params.userId + "', '" + params.productId + "')";

    query(sql);
}

exports.sqlFindProductHistory = function (data, offset, limit, query) {
    var sql = "";
    sql += "SELECT allProduct.*, raiting.likeTotal, raiting.rateTotal, raiting.rateValue, raiting.commentTotal";
    sql += " FROM";
    sql += " (SELECT p.productId, p.productName, p.time, pri.sell, pro.promotionDiscount, img.image1, shi.shipValue, poin.pointValue, flash.flashsaleDiscount";
    sql += " FROM product AS p";
    sql += " LEFT JOIN price AS pri ON p.productId = pri.priceId";
    sql += " LEFT JOIN image AS img ON p.productId = img.imageId";
    sql += " LEFT JOIN promotion AS pro ON p.promotionId = pro.promotionId AND now() >= pro.start AND now() < pro.end";
    sql += " LEFT JOIN ship as shi ON p.shipId = shi.shipId";
    sql += " LEFT JOIN point as poin ON p.pointId = poin.pointId AND now() >= poin.start AND now() < poin.end";
    sql += " LEFT JOIN flashsale as flash ON p.flashsaleId = flash.flashsaleId AND now() >= flash.start AND now() < flash.end";
    sql += " WHERE";

    for (var i in data) {
        sql += " productId = " + data[i].productId;
        if (i != data.length - 1)
            sql += " OR";
    }
    sql += ") AS allProduct";

    sql += " LEFT JOIN";
    sql += " (SELECT id.productId, countLikes.likeTotal, countRate.rateValue, countRate.rateTotal, countComment.commentTotal";
    sql += " FROM";
    //Select productId
    sql += " (SELECT p.productId";
    sql += " FROM product AS p";
    sql += ") AS id";
    //
    sql += " LEFT JOIN";
    //Select likes
    sql += " (SELECT p.productId, count(*) AS likeTotal";
    sql += " FROM product AS p, likes AS l";
    sql += " WHERE p.productId = l.likesId";
    sql += " GROUP BY p.productId) AS countLikes ON id.productId = countLikes.productId";
    //
    sql += " LEFT JOIN";
    //Select rate
    sql += " (SELECT p.productId, sum(r.rate) AS rateValue, count(*) AS rateTotal";
    sql += " FROM product AS p, rate AS r";
    sql += " WHERE p.productId = r.rateId";
    sql += " GROUP BY p.productId) AS countRate ON id.productId = countRate.productId";
    //
    sql += " LEFT JOIN";
    //Select comment
    sql += " (SELECT p.productId, count(*) AS commentTotal";
    sql += " FROM product AS p, comment AS c";
    sql += " WHERE p.productId = c.commentId"
    sql += " GROUP BY p.productId) AS countComment ON id.productId = countComment.productId";
    //
    sql += ") AS raiting";
    sql += " ON allProduct.productId = raiting.productId";

    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
};

exports.sqlFindBought = function (userId, offset, limit, query) {
    var sql = "";
    sql += "SELECT trans.*, count(trans.transactionId) as totalProduct";
    sql += " FROM";
    sql += " (SELECT re.receiverId FROM receiver as re";
    sql += " WHERE userId = '" + userId + "') as receive";

    sql += " LEFT JOIN transactions as trans ON receive.receiverId = trans.receiverId"
    sql += " GROUP BY trans.transactionId";
    sql += " ORDER BY trans.transactionId DESC";
    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

exports.sqlFindBoughtDetail = function (transactionId, query) {
    var sql = "";
    sql += "SELECT *";
    sql += " FROM transactions";
    sql += " WHERE transactionId = '" + transactionId + "'";

    query(sql);
}


/*
* VOUCHER
*/
exports.sqlFindAllVoucherForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM voucher";

    query(sql);
}

exports.sqlInsertVoucher = function (params, query) {
    var sql = "";
    sql += " INSERT INTO voucher";
    sql += " (voucherName, voucherValue, start, end)";
    sql += " VALUES";
    sql += " ('" + params.voucherName + "', '" + params.voucherValue + "', '" + params.voucherStart + "', '" + params.voucherEnd + "')";

    query(sql);
}

exports.sqlUpdateVoucher = function (params, query) {
    var sql = "";
    sql += "UPDATE voucher";
    sql += " SET";
    sql += " voucherName = '" + params.voucherName + "',";
    sql += " voucherValue = '" + params.voucherValue + "',";
    sql += " start = '" + params.voucherStart + "',";
    sql += " end = '" + params.voucherEnd + "'";
    sql += " WHERE";
    sql += " voucherId = '" + params.voucherId + "'";

    query(sql);
}

exports.sqlDeleteVoucher = function (id, query) {
    var sql = "";
    sql += "DELETE FROM voucher";
    sql += " WHERE";
    sql += " voucherId = '" + id + "'";

    query(sql);
}

/*
* PROMOTION
*/
exports.sqlFindAllPromotionForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM promotion";

    query(sql);
}

exports.sqlInsertPromotion = function (params, query) {
    var sql = "";
    sql += " INSERT INTO promotion";
    sql += " (promotionName, promotionDiscount, start, end)";
    sql += " VALUES";
    sql += " ('" + params.promotionName + "', '" + params.promotionDiscount + "', '" + params.promotionStart + "', '" + params.promotionEnd + "')";

    query(sql);
}

exports.sqlUpdatePromotion = function (params, query) {
    var sql = "";
    sql += "UPDATE promotion";
    sql += " SET";
    sql += " promotionName = '" + params.promotionName + "',";
    sql += " promotionDiscount = '" + params.promotionDiscount + "',";
    sql += " start = '" + params.promotionStart + "',";
    sql += " end = '" + params.promotionEnd + "'";
    sql += " WHERE";
    sql += " promotionId = '" + params.promotionId + "'";

    query(sql);
}

exports.sqlDeletePromotion = function (id, query) {
    var sql = "";
    sql += "DELETE FROM promotion";
    sql += " WHERE";
    sql += " promotionId = '" + id + "'";

    query(sql);
}

/*
* SHIP
*/
exports.sqlFindAllShipForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM ship";

    query(sql);
}

exports.sqlInsertShip = function (params, query) {
    var sql = "";
    sql += " INSERT INTO ship";
    sql += " (shipName, shipValue)";
    sql += " VALUES";
    sql += " ('" + params.shipName + "', '" + params.shipValue + "')";

    query(sql);
}

exports.sqlUpdateShip = function (params, query) {
    var sql = "";
    sql += "UPDATE ship";
    sql += " SET";
    sql += " shipName = '" + params.shipName + "',";
    sql += " shipValue = '" + params.shipValue + "'";
    sql += " WHERE";
    sql += " shipId = '" + params.shipId + "'";

    query(sql);
}

exports.sqlDeleteShip = function (id, query) {
    var sql = "";
    sql += "DELETE FROM ship";
    sql += " WHERE";
    sql += " shipId = '" + id + "'";

    query(sql);
}

/*
* FLASHSALE
*/
exports.sqlFindAllFlashsaleForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM flashsale";

    query(sql);
}

exports.sqlInsertFlashsale = function (params, query) {
    var sql = "";
    sql += " INSERT INTO flashsale";
    sql += " (flashsaleName, flashsaleDiscount, start, end)";
    sql += " VALUES";
    sql += " ('" + params.flashsaleName + "', '" + params.flashsaleDiscount + "', '" + params.flashsaleStart + "', '" + params.flashsaleEnd + "')";

    query(sql);
}

exports.sqlUpdateFlashsale = function (params, query) {
    var sql = "";
    sql += "UPDATE flashsale";
    sql += " SET";
    sql += " flashsaleName = '" + params.flashsaleName + "',";
    sql += " flashsaleDiscount = '" + params.flashsaleDiscount + "',";
    sql += " start = '" + params.flashsaleStart + "',";
    sql += " end = '" + params.flashsaleEnd + "'";
    sql += " WHERE";
    sql += " flashsaleId = '" + params.flashsaleId + "'";

    query(sql);
}

exports.sqlDeleteFlashsale = function (id, query) {
    var sql = "";
    sql += "DELETE FROM flashsale";
    sql += " WHERE";
    sql += " flashsaleId = '" + id + "'";

    query(sql);
}

/*
* POINT
*/
exports.sqlFindAllPointForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM point";

    query(sql);
}

exports.sqlInsertPoint = function (params, query) {
    var sql = "";
    sql += " INSERT INTO point";
    sql += " (pointName, pointValue, start, end)";
    sql += " VALUES";
    sql += " ('" + params.pointName + "', '" + params.pointValue + "', '" + params.pointStart + "', '" + params.pointEnd + "')";

    query(sql);
}

exports.sqlUpdatePoint = function (params, query) {
    var sql = "";
    sql += "UPDATE point";
    sql += " SET";
    sql += " pointName = '" + params.pointName + "',";
    sql += " pointValue = '" + params.pointValue + "',";
    sql += " start = '" + params.pointStart + "',";
    sql += " end = '" + params.pointEnd + "'";
    sql += " WHERE";
    sql += " pointId = '" + params.pointId + "'";

    query(sql);
}

exports.sqlDeletePoint = function (id, query) {
    var sql = "";
    sql += "DELETE FROM point";
    sql += " WHERE";
    sql += " pointId = '" + id + "'";

    query(sql);
}

/*
* GIFT
*/
exports.sqlFindAllGiftForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM gift";

    query(sql);
}

exports.sqlInsertGift = function (params, query) {
    var sql = "";
    sql += " INSERT INTO gift";
    sql += " (giftName, giftValue, start, end)";
    sql += " VALUES";
    sql += " ('" + params.giftName + "', '" + params.giftValue + "', '" + params.giftStart + "', '" + params.giftEnd + "')";

    query(sql);
}

exports.sqlUpdateGift = function (params, query) {
    var sql = "";
    sql += "UPDATE gift";
    sql += " SET";
    sql += " giftName = '" + params.giftName + "',";
    sql += " giftValue = '" + params.giftValue + "',";
    sql += " start = '" + params.giftStart + "',";
    sql += " end = '" + params.giftEnd + "'";
    sql += " WHERE";
    sql += " giftId = '" + params.giftId + "'";

    query(sql);
}

exports.sqlDeleteGift = function (id, query) {
    var sql = "";
    sql += "DELETE FROM gift";
    sql += " WHERE";
    sql += " giftId = '" + id + "'";

    query(sql);
}

/*
* BANNER
*/
exports.sqlFindAllBanner = function (query) {
    var sql = "";
    sql += "SELECT * FROM banner";
    sql += " WHERE active = 1"
    sql += " ORDER BY priority DESC";

    query(sql);
}

exports.sqlFindAllBannerForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM banner";
    sql += " ORDER BY priority DESC";

    query(sql);
}

exports.sqlFindBanner = function (bannerId, query) {
    var sql = "";
    sql += "SELECT * FROM banner";
    sql += " WHERE bannerId = '" + bannerId + "'";

    query(sql);
}

exports.sqlUpdateBanner = function (params, query) {
    var sql = "";
    sql += "UPDATE banner";
    sql += " SET";
    if (params.bannerTitle != "")
        sql += " title = '" + params.bannerTitle + "'";
    if (params.bannerContent != "")
        sql += " content = '" + params.bannerContent + "'";
    if (params.bannerImage != "")
        sql += " image = '" + params.bannerImage + "'";
    if (params.productSn != "")
        sql += " productSn = '" + params.productSn + "'";
    if (params.bannerPriority != "")
        sql += " priority = '" + params.bannerPriority + "'";
    if (params.bannerStart != "")
        sql += " start = '" + params.bannerStart + "'";
    if (params.bannerEnd != "")
        sql += " end = '" + params.bannerEnd + "'";
    sql += " WHERE";
    sql += " bannerId = '" + params.bannerId + "'";

    query(sql);
}

exports.sqlUpdateImageBanner = function (params, query) {
    var sql = "";
    sql += "UPDATE banner";
    sql += " SET";
    sql += " image = '" + params.imageName + "'";
    sql += " WHERE";
    sql += " bannerId = '" + params.bannerId + "'";

    query(sql);
}

exports.sqlUpdateActiveBanner = function (params, query) {
    var sql = "";
    sql += "UPDATE banner";
    sql += " SET";
    sql += " active = '" + params.active + "'";
    sql += " WHERE";
    sql += " bannerId = '" + params.bannerId + "'";

    query(sql);
}

exports.sqlInsertBanner = function (params, query) {
    var sql = "";
    sql += "INSERT INTO banner";
    sql += " (title, content, image, productSn, priority";
    if (params.bannerStart != "")
        sql += " ,start"
    if (params.bannerEnd != "")
        sql += " ,end"
    sql += ")"
    sql += " VALUES";
    sql += " ('" + params.bannerTitle + "', '" + params.bannerContent + "', '" + params.bannerImage + "', '" + params.productSn + "', '" + params.bannerPriority + "'";
    if (params.bannerStart != "")
        sql += ", '" + params.bannerStart + "'";
    if (params.bannerEnd != "")
        sql += ", '" + params.bannerEnd + "'";
    sql += ")"
    query(sql);
}

/*
* SUPPORT
*/
exports.sqlFindAllSupport = function (query) {
    var sql = "";
    sql += "SELECT * FROM support";

    query(sql);
}

exports.sqlUpdateSupport = function (params, query) {
    var sql = "";
    sql += "UPDATE support";

    sql += " SET";
    if (params.bought !== "")
        sql += " bought = '" + params.bought + "'";
    if (params.delivery !== "")
        sql += " delivery = '" + params.delivery + "'";
    if (params.returns !== "")
        sql += " returns = '" + params.returns + "'";
    if (params.warranty !== "")
        sql += " warranty = '" + params.warranty + "'";
    if (params.contact !== "")
        sql += " contact = '" + params.contact + "'";

    query(sql);
}


/*
* EVENT
*/
exports.sqlFindAllEvent = function (offset, limit, query) {
    var sql = "";
    sql += "SELECT * FROM event";
    sql += " WHERE active = 1";
    sql += " ORDER BY start ASC";
    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

exports.sqlFindAllEventForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM event";

    query(sql);
}

exports.sqlFindEvent = function (eventId, query) {
    var sql = "";
    sql += "SELECT * FROM event";
    sql += " WHERE eventId = '" + eventId + "'";

    query(sql);
}

exports.sqlUpdateEvent = function (params, query) {
    var sql = "";
    sql += "UPDATE event";
    sql += " SET";
    if (params.eventTitle != "")
        sql += " eventTitle = '" + params.eventTitle + "'";
    if (params.eventContent != "")
        sql += " eventContent = '" + params.eventContent + "'";
    if (params.eventImage != "")
        sql += " eventImage = '" + params.eventImage + "'";
    if (params.eventStart != "")
        sql += " start = '" + params.eventStart + "'";
    if (params.eventEnd != "")
        sql += " end = '" + params.eventEnd + "'";
    sql += " WHERE";
    sql += " eventId = '" + params.eventId + "'";

    query(sql);
}

exports.sqlUpdateImageEvent = function (params, query) {
    var sql = "";
    sql += "UPDATE event";
    sql += " SET";
    sql += " eventImage = '" + params.imageName + "'";
    sql += " WHERE";
    sql += " eventId = '" + params.eventId + "'";

    query(sql);
}

exports.sqlInsertEvent = function (params, query) {
    var sql = "";
    sql += "INSERT INTO event";
    sql += " (eventTitle, eventContent, eventImage, start, end)";
    sql += " VALUES";
    sql += " ('" + params.eventTitle + "', '" + params.eventContent + "', '" + params.eventImage + "', '" + params.eventStart + "', '" + params.eventEnd + "')";
    query(sql);
}

exports.sqlUpdateActiveEvent = function (params, query) {
    var sql = "";
    sql += "UPDATE event";
    sql += " SET";
    sql += " active = '" + params.active + "'";
    sql += " WHERE";
    sql += " eventId = '" + params.eventId + "'";

    query(sql);
}

/*
* RANKING
*/
exports.sqlFindAllRanking = function (offset, limit, query) {
    var sql = "";
    sql += "SELECT u.nickname, g.*";
    sql += " FROM gamepoint AS g";
    sql += " LEFT JOIN user as u ON u.userId = g.gameId";
    sql += " ORDER BY g.points DESC";
    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

/*
* BLOG
*/
exports.sqlFindAllBlog = function (offset, limit, query) {
    var sql = "";
    sql += "SELECT * FROM blog";
    sql += " WHERE active = 1";
    sql += " ORDER BY blogId DESC";
    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

exports.sqlFindAllBlogForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM blog";

    query(sql);
}

exports.sqlFindBlog = function (blogId, query) {
    var sql = "";
    sql += "SELECT * FROM blog";
    sql += " WHERE blogId = '" + blogId + "'";

    query(sql);
}

exports.sqlUpdateBlog = function (params, query) {
    var sql = "";
    sql += "UPDATE blog";
    sql += " SET";
    if (params.blogTitle != "")
        sql += " blogTitle = '" + params.blogTitle + "'";
    if (params.blogDescription != "")
        sql += " blogDescription = '" + params.blogDescription + "'";
    if (params.blogContent != "")
        sql += " blogContent = '" + params.blogContent + "'";
    if (params.blogImage != "")
        sql += " blogImage = '" + params.blogImage + "'";
    if (params.blogSource != "")
        sql += " source = '" + params.blogSource + "'";
    sql += " WHERE";
    sql += " blogId = '" + params.blogId + "'";

    query(sql);
}

exports.sqlUpdateImageBlog = function (params, query) {
    var sql = "";
    sql += "UPDATE blog";
    sql += " SET";
    sql += " blogImage = '" + params.imageName + "'";
    sql += " WHERE";
    sql += " blogId = '" + params.blogId + "'";

    query(sql);
}

exports.sqlInsertBlog = function (params, query) {
    var sql = "";
    sql += "INSERT INTO blog";
    sql += " (blogTitle, blogDescription, blogContent, blogImage, source)";
    sql += " VALUES";
    sql += " ('" + params.blogTitle + "', '" + params.blogDescription + "', '" + params.blogContent + "', '" + params.blogImage + "', '" + params.blogSource + "')";
    query(sql);
}

exports.sqlUpdateActiveBlog = function (params, query) {
    var sql = "";
    sql += "UPDATE blog";
    sql += " SET";
    sql += " active = '" + params.active + "'";
    sql += " WHERE";
    sql += " blogId = '" + params.blogId + "'";

    query(sql);
}

/*
* SERVICE
*/
exports.sqlFindAllService = function (query) {
    var sql = "";
    sql += "SELECT * FROM service";
    sql += " WHERE active = 1";

    query(sql);
}

exports.sqlFindAllServiceForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM service";

    query(sql);
}

exports.sqlFindService = function (serviceId, query) {
    var sql = "";
    sql += "SELECT * FROM service";
    sql += " WHERE serviceId = '" + serviceId + "'";

    query(sql);
}

exports.sqlUpdateActiveService = function (params, query) {
    var sql = "";
    sql += "UPDATE service";
    sql += " SET";
    sql += " active = '" + params.active + "'";
    sql += " WHERE";
    sql += " serviceId = '" + params.serviceId + "'";

    query(sql);
}

exports.sqlInsertService = function (params, query) {
    var sql = "";
    sql += "INSERT INTO service";
    sql += " (serviceTitle, serviceContent, serviceImage)";
    sql += " VALUES";
    sql += " ('" + params.serviceTitle + "', '" + params.serviceContent + "', '" + params.serviceImage + "')";
    query(sql);
}

exports.sqlUpdateService = function (params, query) {
    var sql = "";
    sql += "UPDATE service";
    sql += " SET";
    if (params.serviceTitle != "")
        sql += " serviceTitle = '" + params.serviceTitle + "'";
    if (params.serviceContent != "")
        sql += " serviceContent = '" + params.serviceContent + "'";
    if (params.serviceImage != "")
        sql += " serviceImage = '" + params.serviceImage + "'";
    sql += " WHERE";
    sql += " serviceId = '" + params.serviceId + "'";

    query(sql);
}

exports.sqlUpdateImageService = function (params, query) {
    var sql = "";
    sql += "UPDATE service";
    sql += " SET";
    sql += " serviceImage = '" + params.imageName + "'";
    sql += " WHERE";
    sql += " serviceId = '" + params.serviceId + "'";

    query(sql);
}

/*
* CATEGORY
*/
exports.sqlFindAllCategory = function (query) {
    var sql = "";
    sql += "SELECT * FROM category";
    sql += " WHERE active = 1"
    sql += " ORDER BY categoryId ASC";

    query(sql);
}

exports.sqlFindAllCategoryForAdmin = function (query) {
    var sql = "";
    sql += "SELECT * FROM category";
    sql += " ORDER BY categoryId ASC";

    query(sql);
}

exports.sqlUpdateCategory = function (params, query) {
    var sql = "";
    sql += "UPDATE category";
    sql += " SET";
    sql += " categoryName = '" + params.categoryName + "'";
    sql += " WHERE";
    sql += " categoryId = '" + params.categoryId + "'";

    query(sql);
}

exports.sqlInsertCategory = function (params, query) {
    var sql = "";
    sql += "INSERT INTO category";
    sql += " (categoryName)";
    sql += " VALUES";
    sql += " ('" + params.categoryName + "')";

    query(sql);
}

exports.sqlDeleteCategory = function (id, query) {
    var sql = "";
    sql += "DELETE FROM category";
    sql += " WHERE";
    sql += " categoryId = '" + id + "'";

    query(sql);
}

exports.sqlUpdateActiveCategory = function (params, query) {
    var sql = "";
    sql += "UPDATE category";
    sql += " SET";
    sql += " active = '" + params.active + "'";
    sql += " WHERE";
    sql += " categoryId = '" + params.categoryId + "'";

    query(sql);
}

/*
* ADMIN
*/
exports.sqlFindListProduct = function (offset, limit, query) {
    var sql = "";
    sql += "SELECT p.*, pri.*, pro.*, flash.*, poin.*, vou.*, amoun.*, shi.*";
    sql += " FROM product as p";
    sql += " LEFT JOIN price as pri ON p.productId = pri.priceId";
    sql += " LEFT JOIN promotion as pro ON p.promotionId = pro.promotionId";
    sql += " LEFT JOIN flashsale as flash ON p.flashsaleId = flash.flashsaleId";
    sql += " LEFT JOIN point as poin ON p.pointId = poin.pointId";
    sql += " LEFT JOIN voucher as vou ON p.voucherId = vou.voucherId";
    sql += " LEFT JOIN amount as amoun ON p.productId = amoun.amountId";
    sql += " LEFT JOIN ship as shi ON p.shipId = shi.shipId";

    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

exports.sqlCheckProductSn = function (sn, query) {
    var sql = "";
    sql += "SELECT productId FROM product";
    sql += " WHERE";
    sql += " productSn = '" + sn + "'";

    query(sql);
}

exports.sqlInsertProduct = function (params, query) {
    var sql = "";
    sql += " INSERT INTO product";
    sql += " (productSn, productName, description, shipId, categoryId";
    if (params.promotionId != "") {
        sql += ", promotionId"
    }
    if (params.flashsaleId != "") {
        sql += ", flashsaleId"
    }
    if (params.voucherId != "") {
        sql += ", voucherId"
    }
    if (params.pointId != "") {
        sql += ", pointId"
    }
    sql += ")";
    sql += " VALUES";
    sql += " ('" + params.productSn + "', '" + params.productName + "', '" + params.productEditor + "', '" + params.productShip + "', '" + params.productCategory + "'";
    if (params.promotionId != "") {
        sql += ", '" + params.promotionId + "'";
    }
    if (params.flashsaleId != "") {
        sql += ", '" + params.flashsaleId + "'";
    }
    if (params.voucherId != "") {
        sql += ", '" + params.voucherId + "'";
    }
    if (params.pointId != "") {
        sql += ", '" + params.pointId + "'";
    }
    sql += ")";

    query(sql);
}

exports.sqlInsertPrice = function (productId, buy, sell, query) {
    var sql = "";
    sql += " INSERT INTO price";
    sql += " (priceId, buy, sell)";
    sql += " VALUES";
    sql += " ('" + productId + "', '" + buy + "', '" + sell + "')";

    query(sql);
}

exports.sqlInsertAmount = function (productId, amount, query) {
    var sql = "";
    sql += " INSERT INTO amount";
    sql += " (amountId, amountBuy)";
    sql += " VALUES";
    sql += " ('" + productId + "', '" + amount + "')";

    query(sql);
}

exports.sqlInsertImage = function (productId, image1, image2, image3, image4, image5, query) {
    var sql = "";
    sql += " INSERT INTO image";
    sql += " (imageId, image1, image2, image3, image4, image5)";
    sql += " VALUES";
    sql += " ('" + productId + "', '" + image1 + "', '" + image2 + "', '" + image3 + "', '" + image4 + "', '" + image5 + "')";

    query(sql);
}

exports.sqlInsertYoutube = function (productId, yt1, yt2, yt3, query) {
    var sql = "";
    sql += " INSERT INTO youtube";
    sql += " (ytId, yt1, yt2, yt3)";
    sql += " VALUES";
    sql += " ('" + productId + "', '" + yt1 + "', '" + yt2 + "', '" + yt3 + "')";

    query(sql);
}

exports.sqlUpdateActiveProduct = function (params, query) {
    var sql = "";
    sql += "UPDATE product";
    sql += " SET";
    sql += " active = '" + params.active + "'";
    sql += " WHERE";
    sql += " productId = '" + params.productId + "'";

    query(sql);
}

/*
* DISCOUNT
*/
exports.sqlFindAllPromotion = function (query) {
    var sql = "";
    sql += "SELECT *";
    sql += " FROM promotion";
    sql += " WHERE now() >= start AND now() < end";

    query(sql);
}

exports.sqlFindAllFlashsale = function (query) {
    var sql = "";
    sql += "SELECT *";
    sql += " FROM flashsale";
    sql += " WHERE now() >= start AND now() < end";

    query(sql);
}

exports.sqlFindAllVoucher = function (query) {
    var sql = "";
    sql += "SELECT *";
    sql += " FROM voucher";
    sql += " WHERE now() >= start AND now() < end";

    query(sql);
}

exports.sqlFindAllShip = function (query) {
    var sql = "";
    sql += "SELECT *";
    sql += " FROM ship";

    query(sql);
}

exports.sqlFindAllPoint = function (query) {
    var sql = "";
    sql += "SELECT *";
    sql += " FROM point";
    sql += " WHERE now() >= start AND now() < end";

    query(sql);
}


exports.sqlFindProductId = function (productSn, query) {
    var sql = "";
    sql += "SELECT productId";
    sql += " FROM product";
    sql += " WHERE productSn = '" + productSn + "'";

    query(sql);
}

exports.sqlUpdateProduct = function (params, query) {
    var sql = "";
    sql += "UPDATE product";
    sql += " SET";

    if (params.productSn !== "") {
        sql += " productSn = '" + params.productSn + "'";
    }

    if (params.productName !== "") {
        sql += " productName = '" + params.productName + "'";
    }

    if (params.productDescription !== "") {
        sql += " description = '" + params.productDescription + "'";
    }

    if (params.promotionId !== "") {
        sql += " promotionId = '" + params.promotionId + "'";
    }

    if (params.voucherId !== "") {
        sql += " voucherId = '" + params.voucherId + "'";
    }

    if (params.flashsaleId !== "") {
        sql += " flashsaleId = '" + params.flashsaleId + "'";
    }

    if (params.pointId !== "") {
        sql += " pointId = '" + params.pointId + "'";
    }

    if (params.shipId !== "") {
        sql += " shipId = '" + params.shipId + "'";
    }

    if (params.categoryId !== "") {
        sql += " categoryId = '" + params.categoryId + "'";
    }

    sql += " WHERE";
    sql += " productId = '" + params.productId + "'";

    query(sql);
}

exports.sqlUpdateImage = function (params, query) {
    var sql = "";
    sql += "UPDATE image";
    sql += " SET";
    sql += " image" + params.position + " = '" + params.imageName + "'";
    sql += " WHERE";
    sql += " imageId = '" + params.productId + "'";

    query(sql);
}

exports.sqlUpdateVideo = function (params, query) {
    var sql = "";
    sql += "UPDATE youtube";
    sql += " SET";
    sql += " yt" + params.position + " = '" + params.idVideo + "'";
    sql += " WHERE";
    sql += " ytId = '" + params.productId + "'";

    query(sql);
}

exports.sqlUpdatePrice = function (params, query) {
    var sql = "";
    sql += "UPDATE price";
    sql += " SET";

    if (params.priceBuy != "") {
        sql += " buy = '" + params.priceBuy + "'";
    }

    if (params.priceSell != "") {
        sql += " sell = '" + params.priceSell + "'";
    }

    sql += " WHERE";
    sql += " priceId = '" + params.productId + "'";

    query(sql);
}

exports.sqlUpdateAmount = function (params, query) {
    var sql = "";
    sql += "UPDATE amount";
    sql += " SET";

    if (params.amountBuy != "") {
        sql += " amountBuy = '" + params.amountBuy + "'";
    }

    if (params.amountSell != "") {
        sql += " amountSell = '" + params.amountSell + "'";
    }

    sql += " WHERE";
    sql += " amountId = '" + params.productId + "'";

    query(sql);
}

exports.sqlFindProductBySn = function (productSn, query) {
    var sql = "";
    sql += "SELECT p.*, img.image1, pri.*, amoun.*";
    sql += " FROM product as p";

    sql += " LEFT JOIN image as img ON p.productId = img.imageId";
    sql += " LEFT JOIN price as pri ON p.productId = pri.priceId";
    sql += " LEFT JOIN amount as amoun ON p.productId = amoun.amountId";

    sql += " WHERE productSn = '" + productSn + "'";

    query(sql);
}

exports.sqlFindAllTransactionByStatus = function (status, offset, limit, query) {
    var sql = "";
    sql += "SELECT *, count(transactionId) as totalProduct";
    sql += " FROM transactions";

    if (status.length == 1) {
        sql += " WHERE status = '" + status[0] + "'";
    } else {
        sql += " WHERE status = '" + status[0] + "' OR status = '" + status[1] + "'";
    }
    sql += " GROUP BY transactionId";
    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

exports.sqlFindAllTransactionByDate = function (from, to, offset, limit, query) {
    var sql = "";
    sql += "SELECT *, count(transactionId) as totalProduct";
    sql += " FROM transactions";

    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";
    sql += " GROUP BY transactionId";

    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

//chua viet
exports.sqlFindAllRevenueByDate = function (from, to, offset, limit, query) {
    var sql = "";
    sql += "SELECT *, count(transactionId) as totalProduct";
    sql += " FROM transactions";

    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";
    sql += " GROUP BY transactionId";

    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

//Chua viet
exports.sqlFindAllProfitByDate = function (from, to, offset, limit, query) {
    var sql = "";
    sql += "SELECT *, count(transactionId) as totalProduct";
    sql += " FROM transactions";

    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";
    sql += " GROUP BY transactionId";

    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

exports.sqlFindTransactionDetail = function (transactionId, query) {
    var sql = "";
    sql += "SELECT trans.*, receive.*, p.productSn, p.productName, img.image1, gif.*";
    sql += " FROM transactions as trans";
    sql += " LEFT JOIN receiver as receive ON trans.receiverId = receive.receiverId"
    sql += " LEFT JOIN product as p ON trans.productId = p.productId"
    sql += " LEFT JOIN image as img ON trans.productId = img.imageId"
    sql += " LEFT JOIN gift as gif ON trans.giftId = gif.giftId"
    sql += " WHERE transactionId = '" + transactionId + "'";

    query(sql);
}

exports.sqlUpdateTransactionStatus = function (params, query) {
    var sql = "";
    sql += "UPDATE transactions";
    sql += " SET";

    sql += " status = '" + params.transactionStatus + "'";

    sql += " WHERE";
    sql += " transactionId = '" + params.transactionId + "'";

    query(sql);
}


exports.sqlFindRevenue = function (status, from, to, query) {
    var sql = "";
    sql += "SELECT count(transactionId) as amountTransaction, sum(trans.totalFee) as totalRevenue, sum(pri.buy) as totalBuy";
    sql += " FROM transactions as trans";
    sql += " LEFT JOIN price as pri";
    sql += " ON trans.productId = pri.priceId";
    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";
    if (status.length > 0) {
        sql += " AND (status = '" + status[0] + "' OR status = '" + status[1] + "')";
    }

    query(sql);
}

exports.sqlCountTransaction = function (from, to, query) {
    var sql = "";
    sql += "SELECT count(transactionId) as totalTransaction";
    sql += " FROM transactions";

    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";

    query(sql);
}

/*
* TRACKING
*/
exports.sqlCountLogin = function (from, to, query) {
    var sql = "";
    sql += "SELECT count(loginId) as totalLogin";
    sql += " FROM login";

    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";

    query(sql);
}

exports.sqlCountSignup = function (from, to, query) {
    var sql = "";
    sql += "SELECT count(userId) as totalNewUser";
    sql += " FROM user";

    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";

    query(sql);
}

exports.sqlCountOpenApp = function (from, to, query) {
    var sql = "";
    sql += "SELECT count(openId) as totalOpen";
    sql += " FROM open";

    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";

    query(sql);
}

// Chua su dung
exports.sqlFindAllOpenApp = function (from, to, offset, limit, query) {
    var sql = "";
    sql += "SELECT *, count(openId) as totalOpen";
    sql += " FROM open";

    sql += " WHERE time >= '" + from + " 00:00:00' AND time <= '" + to + " 23:59:59'";

    sql += " LIMIT " + offset + ", " + limit;

    query(sql);
}

exports.sqlCheckOpenId = function (id, query) {
    var sql = "";
    sql += "SELECT openId FROM open";
    sql += " WHERE";
    sql += " openId = '" + id + "'";

    query(sql);
}

exports.sqlInsertOpenApp = function (params, query) {
    var sql = "";
    sql += " INSERT INTO open";
    sql += " (openId, platform, mobile)";
    sql += " VALUES";
    sql += " ('" + params.openId + "', '" + params.platform + "', '" + params.mobile + "')";

    query(sql);
}

exports.sqlUpdateOpenApp = function (params, query) {
    var sql = "";
    sql += "UPDATE open";
    sql += " SET";
    sql += " time = now()";
    sql += " WHERE";
    sql += " openId = '" + params.openId + "'";

    query(sql);
}