var mysql = require('mysql');
var settings = require('./settings');

var dbConnect = mysql.createConnection(settings.dbConfig);

dbConnect.connect(function(err){
  if (!!err) {
      console.log("Connect DB ERROR!!!")
  }else{
      console.log("Connect DB OK!!!")
  }
});

exports.execute = function(sql, callback){
      try{
        dbConnect.query(sql, function(err, rows, fields){
          if (err) {
            return callback(null, err);
          }
          callback(rows);
        });
      }catch(ex){
          console.log("DB EXCEPTION!!!")
      }
}
