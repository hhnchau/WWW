const db = require('./db');
const table = 'film';

exports.createTable = function () {
    try {
        var sql = "CREATE TABLE " + table + " (sn VARCHAR(30) NOT NULL , name VARCHAR(255) NOT NULL , link TEXT NULL, cate VARCHAR(255) NOT NULL , des TEXT NULL, img VARCHAR(100) NOT NULL DEFAULT 'maxresdefault.jpg', date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (sn)) ENGINE = InnoDB;";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Create Table " + err);
            } else {
                console.log("Create Table OK");
            }
        });
    } catch (ex) {
        console.log("Create Table " + ex);
    }
}

exports.deleteTable = function () {
    try {
        var sql = "DROP TABLE " + table;
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Delete Table " + err);
            } else {
                console.log("Delete Table OK");
            }
        });
    } catch (ex) {
        console.log("Delete Table " + ex);
    }
}

exports.insert = function () {
    try {
        var sql = "INSERT INTO " + table + " (sn, name, link, cate) VALUES ('9slfi0HFmGU','Xe xếp hình','link','Xe');";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Insert " + err);
            } else {
                console.log("Insert OK");
            }
        });
    } catch (ex) {
        console.log("Insert " + ex);
    }
}

exports.select = function () {
    try {
        var sql = "SELECT * FROM " + table + " WHERE sn = ''";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Select " + err);
            } else {
                console.log("Select OK");
                console.log(JSON.stringify(data));
            }
        });
    } catch (ex) {
        console.log("Select " + ex);
    }
}

exports.update = function () {
    try {
        var sql = "UPDATE " + table + " SET sn = '-6t40do3ADY', name = 'Súng', link = 'link', cate = 'Súng' WHERE sn = '9slfi0HFmGU'";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Update " + err);
            } else {
                console.log("Update OK");
            }
        });
    } catch (ex) {
        console.log("Update " + ex);
    }
}

exports.delete = function () {
    try {
        var sql = "DELETE FROM " + table + " WHERE sn = '-6t40do3ADY'";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Delete " + err);
            } else {
                console.log("Delete OK");
            }
        });
    } catch (ex) {
        console.log("Delete " + ex);
    }
}


////////--SITE--////////
exports.selectAllCate = function (callback) {
    try {
        var sql = "SELECT * FROM " + table + " GROUP BY cate";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Select " + err);
            } else {
                //console.log(JSON.stringify(data));
                callback(data);
            }
        });
    } catch (ex) {
        console.log("Select " + ex);
    }
}

exports.selectAllSn = function (callback) {
    try {
        var sql = "SELECT * FROM " + table + " GROUP BY sn";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Select " + err);
            } else {
                //console.log(JSON.stringify(data));
                callback(data);
            }
        });
    } catch (ex) {
        console.log("Select " + ex);
    }
}

exports.selectAllProduct = function (callback) {
    try {
        var sql = "SELECT * FROM " + table + " ORDER BY date DESC";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Select " + err);
            } else {
                //console.log(JSON.stringify(data));
                callback(data);
            }
        });
    } catch (ex) {
        console.log("Select " + ex);
    }
}

exports.selectProductBySn = function (sn, callback) {
    try {
        var sql = "SELECT * FROM " + table + " WHERE sn = '" + sn + "'";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Select " + err);
            } else {
                //console.log(JSON.stringify(data));
                callback(data);
            }
        });
    } catch (ex) {
        console.log("Select " + ex);
    }
}

exports.selectProductLikeTitle = function (filter, callback) {
    try {
        var sql = "SELECT * FROM " + table + " WHERE name like '%" + filter + "%' ORDER BY date DESC";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Select " + err);
            } else {
                //console.log(JSON.stringify(data));
                callback(data);
            }
        });
    } catch (ex) {
        console.log("Select " + ex);
    }
}

exports.selectProductLikeCate = function (cate, callback) {
    try {
        var sql = "SELECT * FROM " + table + " WHERE cate like '%" + cate + "%' ORDER BY date DESC";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Select " + err);
            } else {
                //console.log(JSON.stringify(data));
                callback(data);
            }
        });
    } catch (ex) {
        console.log("Select " + ex);
    }
}


////////--ADMIN--////////
exports.insertProduct = function (params, callback) {
    try {
        var titl = params.name.replace(/'/g, "`");
        var desc = params.des.replace(/'/g, "`");
        var sql = "INSERT into " + table + " (sn, name, link, cate, des) values ('" + params.sn + "', '" + titl + "', '" + params.link + "', '" + params.cate + "', '" + desc + "')";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log(err);
                callback({ insert: 0 });
            } else {
                callback({ insert: 1 });
            }
        });
    } catch (ex) {
        console.log("InsertProduct " + ex);
    }
}


exports.updateProduct = function (params, callback) {
    try {
        var sql = "UPDATE " + table + " SET name = '" + params.name + "', link = '" + params.link + "', img = '" + params.img +"', cate = '" + params.cate + "' WHERE sn = '" + params.sn + "'";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log(err);
                callback({ insert: 0 });
            } else {
                callback({ insert: 1 });
            }
        });
    } catch (ex) {
        console.log("UpdateProduct " + ex);
    }
}


exports.deleteProduct = function (params, callback) {
    try {
        var sql = "DELETE FROM " + table + " WHERE sn = '" + params.sn + "'";
        db.execute(sql, function (data, err) {
            if (err) {
                callback({ delete: 0 });
            } else {
                callback({ delete: 1 });
            }
        });
    } catch (ex) {
        console.log("UpdateProduct " + ex);
    }
}


////////--TRACKING--////////
const tracking = 'filmtracking';

exports.createTracking = function () {
    try {
        var sql = "CREATE TABLE " + tracking + " (id INT NOT NULL , platform VARCHAR(30) NULL , sn VARCHAR(30) NULL , date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE = InnoDB;";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Create Table " + err);
            } else {
                console.log("Create Table OK");
            }
        });
    } catch (ex) {
        console.log("Create Table " + ex);
    }
}

exports.deleteTableTracking = function () {
    try {
        var sql = "DROP TABLE " + tracking;
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Delete Table " + err);
            } else {
                console.log("Delete Table OK");
            }
        });
    } catch (ex) {
        console.log("Delete Table " + ex);
    }
}

exports.insertTracking = function (params, callback) {
    try {
        var sql = "INSERT into " + tracking + " (id, platform, sn) values ('" + params.id + "', '" + params.platform + "', '" + params.sn + "')";
        db.execute(sql, function (data, err) {
        });
    } catch (ex) {
        console.log("InsertProduct " + ex);
    }
}

exports.selectTracking = function (callback) {
    try {
        var sql = "SELECT * FROM " + tracking + " WHERE DATE(date) = CURDATE() ORDER BY date DESC";
        db.execute(sql, function (data, err) {
            if (err) {
                console.log("Select " + err);
            } else {
                console.log(JSON.stringify(data));
                callback(data);
            }
        });
    } catch (ex) {
        console.log("Select " + ex);
    }
}