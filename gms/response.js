var log = require('./log');

exports.sendJson = function(req, res, data){
  res.writeHead(200, {'Conent-Type':'application/json'});
  log.write("*/*httpMsg*/*"+ "sendJson", "status: 200");
  if (data) {
    res.write(JSON.stringify(data));
    log.write("*/*httpMsg*/*"+ " ---///---sendJson:---///--- ", JSON.stringify(data, null, 2));
  }
  res.end();
};
