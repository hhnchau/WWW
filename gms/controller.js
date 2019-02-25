var db = require('./db');
var log = require('./log');
var response = require('./response');
var status = require('./status');
var tools = require('./tools');
var find = require('./find');
Models = require('./models');
var models;

/*
*ADMIN PAGE
*/
exports.adminPage = function(req, res, reqBody){
    try {
      models = new Models({});
      var data = JSON.parse(reqBody);
      if(data){
        log.write("*/*reqBody*/* ", "Object: "+ JSON.stringify(data, null, 2));
          var sql = data.query;
          db.execute(sql, function(object, err){
            if(!err){
              log.write("*/*Controller*/* adminPage", " OK");
              models.FormResult(status.getInfoOk, status.getInfoMessageOk, object);
              response.sendJson(req, res, models.data);
            }else{
              log.write("*/*Controller*/* adminPage", " QUERY INCORRECT");
              models.FormResult(status.internalFail, status.internalMessageFail);
              response.sendJson(req, res, models.data);
            }
          });
        }
  }catch(ex){
    log.write("*/*Controller*/* Execute Sql Query", "---------->Exception<---------- " + ex);
    models.FormResult(status.internalFail, status.internalMessageFail);
    response.sendJson(req, res, models.data);
  };
}
/*
* REQUEST USER
*/
exports.requestUser = function(req, res){
  try {
  models = new Models({});
  log.write("*/*Balloon Pop*/* requestUser", "Start");
  models.FormResult(status.requestUser, status.requestMessageUser);
  response.sendJson(req, res, models.data);
  }catch(ex){
    log.write("*/*Controller*/* requestUser", "---------->Exception<---------- " + ex);
    models.FormResult(status.internalFail, status.internalMessageFail);
    response.sendJson(req, res, models.data);
    };
}


/*
* CREATE USER
*/
exports.registerUser = function(req, res, reqBody, table, device){
  try {
      models = new Models({});
      var data = JSON.parse(reqBody);
        if(data){
          log.write("*/*reqBody*/* ", "Object: "+ JSON.stringify(data, null, 2));
          //Check Device
          find.findByDevice(device, table, function(result){
            if(result){
              //Exist
              log.write("*/*Controller*/* Exist Device ", "fail");
              models.FormResult(status.registerOk, status.registerMessageOk);
              response.sendJson(req, res, models.data);
            }else{
              //Non Exist
              //Check Exist Fullname
              find.findByFullname(data.fullname, table, function(result){
              if (result){
                //Exist - Return User Input Again'
                log.write("*/*Controller*/* Exist Fullname ", "fail");
                models.FormResult(status.existFullname, status.existMessageFullname);
                response.sendJson(req, res, models.data);

              }else{
                //Not Exist - Create Ok - Return Continues
                //CHECK PARAMS NICKNAME NULL
                if (!data.fullname) {
                  log.write("*/*Balloon Pop*/* Fullname", "null");
                  models.FormResult(status.nullNickname, status.nullMessageNickname);
                  response.sendJson(req, res, models.data);
                  return;
                }

                //CHECK LENGTH NICKNAME
                if (data.fullname.length < 6 || data.fullname.length >20){
                  //LENGTH NICKNAME < 6
                  log.write("*/*Balloon Pop*/* Length Fullname is", data.fullname.length);
                  models.FormResult(status.lengthInvalid, status.lengthMessageInvalid);
                  response.sendJson(req, res, models.data);
                  return;
                }

                //CHECK FORMAT NICKNAME
                //if (!tools.checkNickname(data.fullname)) {
                      // FORMAT ERROR
                //  log.write("*/*Balloon Pop*/* Check format Fullname", "false");
                //  models.FormResult(status.formatInvalid, status.formatMessageInvalid);
                //  response.sendJson(req, res, models.data);
                //  return;
                //}

                //FORMAT OK
                //INSERT DATABASE
                var currentDate = tools.getCurrentDate();
                //var currentDay = tools.splitString(tools.getCurrentDate(), "-");
                var currentDay = "0";
                var sql = "INSERT INTO " + table + " (device, fullname, address, avatar, score, event, day, platform, time, version, game)";
                    sql += "VALUES ('" + device + "','" + data.fullname + "','" + data.address +"','" + data.avatar + "', 0, 0, '" + currentDay[2] + "','" + data.platform + "','" + currentDate + "','" + data.version + "','" + data.game +"')";
                log.write("*/*Controller*/* Query: ", sql);
                db.execute(sql, function(data, err){
                    if (err) {
                      //INSERT FAIL
                      log.write("*/*Balloon Pop*/* Insert Database", "---------->FAIL<----------");
                      models.FormResult(status.internalFail, status.internalMessageFail);
                      response.sendJson(req, res, models.data);

                    }else{
                      //INSERT OK
                      log.write("*/*Balloon Pop*/* Execute Sql Query", "---------->OK<----------");
                      models.FormResult(status.registerOk, status.registerMessageOk);
                      response.sendJson(req, res, models.data);
                  }
                });
              }
            });
          }
        });
      //Parse Json Error
      }else{
        log.write("*/*Controller*/* Parse Json ", "fail");
        models.FormResult(status.internalFail, status.internalMessageFail);
        response.sendJson(req, res, models.data);
      }
    }catch(ex){
      log.write("*/*reqBody*/* ", "---------->Exception<----------"+ ex);
      models.FormResult(status.internalFail, status.internalMessageFail);
      response.sendJson(req, res, models.data);
    };
  }


/*
* UPDATE SCORE
*/
exports.updateScore = function(req, res, reqBody, table, device){
    try {
      models = new Models({});
      var data = JSON.parse(reqBody);
      var currentDate = tools.getCurrentDate();
      if(data){
        log.write("*/*reqBody*/* ", "Object: "+ JSON.stringify(data, null, 2));
      //Check New Day
      find.checkNewDay(table, function(result){
        if (result) {
          find.findCurrentScore(device, table, function(scores){
            if(scores != false && data.score > scores || scores == 0){
              var sql = "UPDATE "+ table + " SET score = '" + data.score + "', event = event + 1, time = '" + currentDate + "' WHERE device = '" + device +"'";
              db.execute(sql, function(){
                log.write("*/*Controller*/* updateScore", " OK");
                models.FormResult(status.updateInfoOk, status.updateInfoMessageOk);
                response.sendJson(req, res, models.data);
              });
            }
          });
        }
      });
    }
  }catch(ex){
    log.write("*/*Controller*/* Execute Sql Query", "---------->Exception<---------- " + ex);
  };
}


/*
* GET RANK INFO
*/
exports.sendRanking = function(req, res, table, device){
  try {
    models = new Models({});
          //GET TOP RANKING
          var sql = "SELECT device, fullname, address, avatar, score, version, FIND_IN_SET(score, (SELECT GROUP_CONCAT(score ORDER BY score DESC) FROM " + table + ")) AS rank FROM " + table + " ORDER BY score DESC LIMIT " + tools.getLimitFindData();
          db.execute(sql, function(topRank, err){
            log.write("*/*Controller*/* Execute Sql Query - Top Ranking", "---------->OK<----------1");
            //GET MY RANKING
            var sql = "SELECT device, fullname, address, avatar, score, version, FIND_IN_SET(score, (SELECT GROUP_CONCAT(score ORDER BY score DESC) FROM " + table + ")) AS rank FROM " + table + " WHERE device = '" + device + "'";
            db.execute(sql, function(myRank, err){
              log.write("*/*Controller*/* Execute Sql Query - My Ranking", "---------->OK<----------2");
              //CHECK EXIST
              var index = topRank.findIndex(id => id.device === myRank[0].device);
              if (index <= -1){
                //NotExist
                topRank.push(myRank[0]);
              }
              //SEND TO USER
              log.write("*/*Controller*/* Execute Sql Query", "---------->OK<----------3");
              models.FormResult(status.getInfoOk, status.getInfoMessageOk, topRank);
              response.sendJson(req, res, models.data);
            });
          });
  }catch(ex){
    log.write("*/*Controller*/* Execute Sql Query", "---------->Exception<---------- " + ex);
    models.FormResult(status.internalFail, status.internalMessageFail);
    response.sendJson(req, res, models.data);
    };
}
