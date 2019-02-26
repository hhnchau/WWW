var request = require('request');
var log = require('./log');


exports.send = function (phone, code) {
    sendToTopic(phone, code);
}

//Email: chau7283@MediaList.com
//App: AnalyticsKingpes
function sendToTopic(phone, code) {
    var options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=AIzaSyASs-iUTFQT41NBONQUpDEGn1afJSpIntI" //Cloud Messae/Legacy server key
        },
        json: {
            "to": "/topics/Kingpes",
            "data":{
                "action": "1",
                "id": 0,
                "phone": phone,
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