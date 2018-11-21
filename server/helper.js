var db = require('./db');
var log = require('./log');
exports.findUser = function (username, password, callback) {
    try {
        var sql = "SELECT * FROM user WHERE nickname = '" + username + "' AND password = '" + password + "'";
        db.execute(sql, function (user, err) {
            if (err) {
                log.error("findUser", err);
                callback(null);
            } else {
                if (user[0]) {
                    //Exist
                    log.write("findUser: ", JSON.stringify(user[0]));
                    callback(user[0]);
                } else {
                    //Not Exist
                    log.write("findUser: ", '0');
                    callback(null);
                }
            }
        });
    } catch (ex) {
        log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
        callback(null);
    }
}

exports.findUserById = function (id, callback) {
    try {
        //var sql = "SELECT * FROM user WHERE userId = '" + id + "'";
        var sql = "";
        sql += "SELECT u.*, g.*";
        sql += " FROM user AS u";
        sql += " LEFT JOIN gift as g ON u.giftId = g.giftId";
        sql += " WHERE u.userId = '" + id + "'";

        db.execute(sql, function (user, err) {
            if (err) {
                log.error("findUserById", err);
                callback(null);
            } else {
                if (user[0]) {
                    //Exist
                    log.write("findUserById: ", JSON.stringify(user[0]));
                    callback(user[0]);
                } else {
                    //Not Exist
                    log.write("findUserById: ", '0');
                    callback(null);
                }
            }
        });
    } catch (ex) {
        log.write("Execute Sql Query", "---------->Exception<---------- " + ex);
        callback(null);
    }
}


