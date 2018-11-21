var log = require('./log');
var path = require('path');

exports.sendResource = function (req, res) {
    try {
        var string = req.params.id;
        string = string.split(":").map(val => val);
        var id = string[1].split("|").map(val => val);
        log.write("File Resource ID:", id[1]);
        if (id[0] == "css") {
            res.sendFile(path.resolve("../views/css/" + id[1]));
        } else {
            res.sendFile(path.resolve("../views/js/" + id[1]));
        }
    } catch (ex) {
        log.write("---------->EXCEPTION<----------", ex);
    }
}

exports.sendImage = function (req, res) {
    try {
        var string = req.params.id;
        string = string.split(":").map(val => val);
        var id = string[1].split("|").map(val => val);
        log.write("File Image ID:", id[1]);
        if (id[0] == "icon") {
            res.sendFile(path.resolve("../views/images/icon/" + id[1]));
        } else {
            res.sendFile(path.resolve("../views/images/product/" + id[1]));
        }
    } catch (ex) {
        log.write("---------->EXCEPTION<----------", ex);
    }
}

exports.deleteFile = function (imageName, callback) {
    try {
        var fs = require('fs');
        var filePath = '../public/upload/' + imageName;
        log.write("File Image Delete:", filePath);
        fs.unlink(filePath, (err) => {
            callback(err);
        });
    } catch (ex) {
        log.write("---------->EXCEPTION<----------", ex);
    }
}
