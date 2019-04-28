var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./video.db', (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log("Connected to database");
});

//var table = "product";
var table = "tracking";

exports.create = function () {
    db.run("CREATE TABLE " + table + " (id INTEGER PRIMARY KEY AUTOINCREMENT, sn TEXT, name TEXT, price INT, cate TEXT, video TEXT, day TEXT)", function (err) {
        if (err)
            console.log(err);
        else
            console.log("Create OK");
    });
}

exports.newColume = function () {
    db.run("ALTER TABLE " + table + " ADD COLUMN " + "chau" + " INT", function (err) {
        if (err)
            console.log(err);
        else
            console.log("New OK");
    });
}


exports.insert = function () {
    var sql = "INSERT into " + table + " (sn, name, price, cate, video, day) values ('K6702','Tám', 800, 'Cá sấu điều khiển', 'https://www.youtube.com/embed/DIwHdBNG0Lk', '28/12/2019')";
    db.run(sql, function (err) {
        if (err)
            console.log(err);
        else
            console.log("Insert OK");
    });
}

exports.delete = function () {
    var sql = "DELETE FROM " + table;
    db.run(sql, function (err) {
        if (err)
            console.log(err);
        else
            console.log("Delete OK");
    });
}

exports.insertProduct = function (params, callback) {
    db.all("SELECT * FROM " + table + " WHERE sn = '" + params.sn + "'", function (err, allRow) {
        console.log(JSON.stringify(allRow));
        if (allRow.length > 0) {
            callback({ insert: 2 });
        } else {
            var sql = "INSERT into " + table + " (sn, name, price, cate, video, day) values ('" + params.sn + "', '" + params.name + "', '" + params.price + "', '" + params.cate + "', '" + params.video + "', '" + params.day + "')";
            db.run(sql, function (err) {
                if (!err)
                    callback({ insert: 1 });

                else
                    callback({ insert: 0 });
            });
        }
    });
}

exports.deleteProduct = function (params, callback) {
    db.all("DELETE FROM " + table + " WHERE sn = '" + params.sn + "'", function (err, allRow) {
        if (!err)
            callback({ delete: 1 });
        else
            callback({ delete: 0 });
    });
}


exports.updateProduct = function (params, callback) {
    var sql = "UPDATE " + table + " SET (name, price, cate, video, day) = ('" + params.name + "', '" + params.price + "', '" + params.cate + "', '" + params.video + "', '" + params.day + "') WHERE sn = '" + params.sn + "'";
    console.log(sql);
    db.run(sql, function (err) {
        if (!err)
            callback({ insert: 1 });

        else
            callback({ insert: 0 });
    });
}


exports.selectProductBySn = function (sn, callback) {
    db.all("SELECT * FROM " + table + " WHERE sn = '" + sn + "'", function (err, allRow) {
        callback(allRow);
    });
}

exports.selectAllProductByCateory = function (cate, callback) {
    db.all("SELECT * FROM " + table + " WHERE cate = '" + cate + "' ORDER BY day DESC", function (err, allRow) {
        callback(allRow);
    });
}

exports.selectAllProductLikeCateory = function (cate, callback) {
    db.all("SELECT * FROM " + table + " WHERE cate like '%" + cate + "%' ORDER BY day DESC", function (err, allRow) {
        callback(allRow);
    });
}

exports.selectAllCateory = function (callback) {
    db.all("SELECT * FROM " + table + " GROUP BY cate", function (err, allRow) {
        callback(allRow);
    });
}

exports.selectAllSn = function (callback) {
    db.all("SELECT * FROM " + table + " GROUP BY sn", function (err, allRow) {
        callback(allRow);
    });
}

exports.selectAllProduct = function (callback) {
    db.all("SELECT * FROM " + table + " ORDER BY day DESC", function (err, allRow) {
        callback(allRow);
    });
}



exports.createTracking = function () {
    db.run("CREATE TABLE " + "tracking" + " (id INT, platform TEXT, sn TEXT, video TEXT, date TEXT)", function (err) {
        if (err)
            console.log(err);
        else
            console.log("Create OK");
    });
}

exports.insertTracking = function (params) {
    db.run("INSERT into " + "tracking" + " (id, platform, sn, video, date) values ('" + params.id + "', '" + params.platform + "', '" + params.sn + "', '" + params.video + "', '" + params.date + "')")
}