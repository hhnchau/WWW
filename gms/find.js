var db = require('./db');
var log = require('./log');
var tools = require('./tools');

/*
* find Device
*/
exports.findByDevice = function(device, table, callback){
    log.write("*/*find*/* findByDevice", "Start");
    try{
        var sql = "SELECT device FROM " +  table + " WHERE device = '" + device + "'";
        db.execute(sql, function(data, err){
          if (err){
            log.write("*/*find*/* findByDevice error", err);
            callback(false);
          }else{
            if (data[0]) {
              log.write("*/*find*/* findByDevice successful", data.length);
              callback(true);
            }else{
              log.write("*/*find*/* findByDevice successful", "null");
              callback(false);
            }
          }
        });
    }catch(ex){
      log.write("*/*find*/* findByDevice exception", ex);
      callback(false);
    }
}

/*
*find nickname
*/
exports.findByFullname = function(fullname, table, callback){
    log.write("*/*find*/* findByFullname", "Start");
    try{
        var sql = "SELECT 1 FROM " + table + " WHERE fullname = '" + fullname + "'";
        db.execute(sql, function(data, err){
          if (err){
            log.write("*/*find*/* findByFullname error", err);
            callback(false);
          }else{
            if (data[0]) {
              log.write("*/*find*/* findByFullname successful", data.length);
              callback(true);
            }else{
              log.write("*/*find*/* findByFullname successful", "null");
              callback(false);
            }
          }
        });
    }catch(ex){
      log.write("*/*find*/* findByFullname exception", ex);
      callback(false);
    }
}

/*
*Check New day
*/
exports.checkNewDay = function(table, callback){
  var currentDate = tools.getCurrentDate();
  var currentDay = tools.splitString(tools.getCurrentDate(), "-");
  log.write("*/*find*/* checkNewDay", "Start");
  try{
      var sql = "SELECT 1 FROM " + table + " WHERE day = '" + currentDay[2] + "'";
      db.execute(sql, function(data, err){
        if (err){
          log.write("*/*find*/* checkNewDay error", err);
          callback(false);
        }else{
          if (data[0]) {
            log.write("*/*find*/* checkNewDay successful", "Old Day");
            callback(true);
          }else{
            log.write("*/*find*/* checkNewDay successful", "null");

            //Backup Event
            var sql = "SELECT day, sum(event) as event FROM " + table;
            db.execute(sql, function(data){
              log.write("*/*find*/* Get Event + Date: ", "OK: ---> " + data[0].day +" "+ data[0].event);
              //Backup
              var d, m, y;
              if (currentDay[2] > data[0].day) {
                d = data[0].day;
                m = currentDay[1];
                y = currentDay[0];
              }else{
                d = data[0].day;
                m = currentDay[1];
                if (currentDay[2] === "01") {
                  m = m -1;
                }

                y = currentDay[0];
                if (currentDay[2] === "01" && currentDay[1] === "01") {
                  m = 12;
                  y = y -1 ;
                }
              }
              var sql = "INSERT INTO " + table +"_statistic" + "( event, day, month, year) VALUES ('" + data[0].event + "', '" + d + "', '" + m + "', '" + y + "')";
              db.execute(sql, function(){
                log.write("*/*find*/* Moving Data: ", "OK: --->");

                //Update New Day
                var sql = "UPDATE "+ table + " SET day = '" + currentDay[2] + "'";
                db.execute(sql, function(){
                  log.write("*/*find*/* Update New Day", "OK");
                  callback(true);
                });
              });
            });
          }
        }
      });
  }catch(ex){
    log.write("*/*find*/* checkNewDay exception", ex);
    callback(false);
  }
}

/*
*find Current Score
*/
exports.findCurrentScore = function(device, table, callback){
  log.write("*/*find*/* findCurrentScore", "Start");
  try{
      var sql = "SELECT score FROM " +  table + " WHERE device = '" + device + "'";
      db.execute(sql, function(score, err){
        if (err){
          log.write("*/*find*/* findCurrentScore error", err);
          callback(false);
        }else{
          if (score[0]) {
            log.write("*/*find*/* findCurrentScore successful", score.length);
            callback(score[0].score);
          }else{
            log.write("*/*find*/* findCurrentScore successful", "null");
            callback(false);
          }
        }
      });
  }catch(ex){
    log.write("*/*find*/* findCurrentScore exception", ex);
    callback(false);
  }
}
