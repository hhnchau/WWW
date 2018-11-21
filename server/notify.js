var request = require('request');
var settings = require('./settings');
var log = require('./log');

exports.smsVerify = function (phone, code) {
    pushVerify(phone, code);
}

exports.smsResetPassword = function (phone, username, password) {
    pushResetPassword(phone, username, password);
}

exports.newOrder = function (transactionId) {
    pushOrder(transactionId);
}

exports.newRaiting = function (rateId) {
    pushRating(rateId);
}

exports.newComment = function (commentId) {
    pushComment();
}

exports.newError = function (err) {
    pushError(err);
}

/*
* ADMIN
*/
function pushVerify(phone, code) {
    var options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=AIzaSyD5eccLwyvAXMia-GFdn8MoHNGdUBiQSuU"
        },
        json: {
            "to": "/topics/Kingpes",
            "data":{
                "action":settings.notify_verify,
                "id": 0,
                "phone":phone,
                "title":"Kingpes",
                "message":"Mã số xác thực của bạn: " + code,
                "time": new Date()
            }
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            log.write("SendSmsVerify: ", 'Phone:' + phone + ' / Code: ' + code + ' / Message_Id: ' + JSON.stringify(body));
        } else {
            log.write("SendSmsVerify Fail: ", error);
        }
    });
}

function pushResetPassword(phone, username, password) {
    var options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=AIzaSyD5eccLwyvAXMia-GFdn8MoHNGdUBiQSuU"
        },
        json: {
            "to": "/topics/Kingpes",
            "data":{
                "action": settings.notify_reset,
                "id": 0,
                "phone": phone,
                "title":"Kingpes",
                "message":"Tên đăng nhập và mật khẩu của bạn: " + username + " / " + password,
                "time": new Date()
            }
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            log.write("SendSmsResetPassword:", 'Phone: ' + phone + ' / Username: ' + username + ' / Password: '+ password + ' / Message_Id: ' + JSON.stringify(body));
        } else {
            log.write("SendSmsResetPassword Fail: ", error);
        }
    });
}

function pushOrder(transactionId) {
    var options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=AIzaSyD5eccLwyvAXMia-GFdn8MoHNGdUBiQSuU"
        },
        json: {
            "to": "/topics/Kingpes",
            //"to": "cNgtI8fHvhQ:APA91bH0j792_t6AJQBntP5DwAFqvTzywIZXM4mCGeTLhsSYlMndATgIMbL8l3QnlKooEweGRWg1S2ozh-e1zRLfAYOBWB5Got3x1nv3uGimgkZ0KS4JgoDicJxJCa_x9UZ9lB8zgb_N-ewBVdgOroaU_jJ3b8dcng",
            "data":{
                "action":settings.notify_bought,
                "id":transactionId,
                "phone": "",
                "title":"Kingpes",
                "message":"Bạn có một đơn hàng mới.",
                "time": new Date()
            }
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            log.write("pushOrder: ", JSON.stringify(body));
        } else {
            log.write("pushOrder Fail: ", error);
        }
    });
}

function pushRating(rateId) {
    var options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=AIzaSyD5eccLwyvAXMia-GFdn8MoHNGdUBiQSuU"
        },
        json: {
            "to": "/topics/Kingpes",
            "data":{
                "action":settings.notify_raiting,
                "id":rateId,
                "phone": "",
                "title":"Kingpes",
                "message":"Bạn có một raiting mới.",
                "time": new Date()
            }
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            log.write("pushRaiting:", JSON.stringify(body));
        } else {
            log.write("pushRaiting Fail:", error);
        }
    });
}

function pushComment(commentId) {
    var options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=AIzaSyD5eccLwyvAXMia-GFdn8MoHNGdUBiQSuU"
        },
        json: {
            "to": "/topics/Kingpes",
            "data":{
                "action":settings.notify_comment,
                "id":commentId,
                "phone": "",
                "title":"Kingpes",
                "message":"Bạn có một comment mới.",
                "time": new Date()
            }
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            log.write("pushComment:", JSON.stringify(body));
        } else {
            log.write("pushComment Fail:", error);
        }
    });
}

function pushError(err) {
    var options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=AIzaSyD5eccLwyvAXMia-GFdn8MoHNGdUBiQSuU"
        },
        json: {
            "to": "/topics/Kingpes",
            "data":{
                "action":settings.notify_error,
                "err":err,
                "phone": "",
                "title":"Kingpes",
                "message":"Hệ thống lỗi.",
                "time": new Date()
            }
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            log.write("pushError: ", JSON.stringify(body));
        } else {
            log.write("pushError Fail: ", error);
        }
    });
}

/*
* USER
*/
function pushAllUser(){

}

