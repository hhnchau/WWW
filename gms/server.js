var http = require('http');
var url = require('url');
var route = require('./route');
var settings = require('./settings');
var find = require('./find');
var log = require('./log');
var controller = require('./controller');

var push = require('./push');
push.send("091", "999");

http.createServer(function(req, res){
  var device = req.headers['device'];

  switch (req.url) {

    /*
    *Admin Page
    */
    case route.adminPage:
        if(req.method === 'POST'){
          var reqBody  = "";
          req.on("data", function (data) {
            reqBody  += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (reqBody.length > 1e6) req.connection.destroy();
          });
          req.on("end", function () {
            controller.adminPage(req, res, reqBody);
          });
        }
        break;

    /*
    * Get Info User Balloon Pop
    */
    case route.getBalloonPop:
        if (req.method === 'POST') {
          find.findByDevice(device, route.tbl_balloon_pop, function(result){
            if (result){
              //Exist - Return Ranking
              controller.sendRanking(req, res, route.tbl_balloon_pop, device);

            }else{
              //Not Exist - Request Infomation
              controller.requestUser(req, res);
            }
          });
        }
        break;

    /*
    * Update Info Balloon Pop
    */
    case route.postInfoBalloonPop:
        if (req.method === 'POST') {
          var reqBody  = "";
          req.on("data", function (data) {
            reqBody  += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (reqBody.length > 1e6) req.connection.destroy();
          });
          req.on("end", function () {
            controller.registerUser(req, res, reqBody, route.tbl_balloon_pop, device);
          });
        }
        break;

    /*
    *Update Score Balloon Pop
    */
    case route.postScoreBalloonPop:
        if (req.method === 'POST') {
          var reqBody  = "";
          req.on("data", function (data) {
            reqBody  += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (reqBody.length > 1e6) req.connection.destroy();
          });
          req.on("end", function () {
            controller.updateScore(req, res, reqBody, route.tbl_balloon_pop, device);
          });
        }
        break;

    /*
    * Get Info User Faster Game
    */
    case route.getFasterEyes:
        if (req.method === 'POST') {
          find.findByDevice(device, route.tbl_faster_eyes, function(result){
            if (result){
              //Exist - Return Ranking
              controller.sendRanking(req, res, route.tbl_faster_eyes, device);

            }else{
              //Not Exist - Request Infomation
              controller.requestUser(req, res);
            }
          });
        }
        break;

    /*
    * Update Info Faster Game
    */
    case route.postInfoFasterEyes:
        if (req.method === 'POST') {
          var reqBody  = "";
          req.on("data", function (data) {
            reqBody  += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (reqBody.length > 1e6) req.connection.destroy();
          });
          req.on("end", function () {
            controller.registerUser(req, res, reqBody, route.tbl_faster_eyes, device);
          });
        }
        break;

    /*
    * Update Score Faster Game
    */
    case route.postScoreFasterEyes:
        if (req.method === 'POST') {
          var reqBody  = "";
          req.on("data", function (data) {
            reqBody  += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (reqBody.length > 1e6) req.connection.destroy();
          });
          req.on("end", function () {
            controller.updateScore(req, res, reqBody, route.tbl_faster_eyes, device);
          });
        }
        break;

    /*
    * Get Info User New Game
    */
    case route.getNewGame:
        break;

    /*
    * Update Info New Game
    */
    case route.postInfoNewGame:
        break;

    /*
    * Update Score New Game
    */
    case route.postScoreNewGame:
        break;
  }
}).listen(process.env.PORT || settings.listenPort, function(){
  log.write("Server is listening at port", settings.listenPort + " <-----");
});
