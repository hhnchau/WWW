var log = true;
exports.write = function (tag, s){
  if (log){
    console.log(tag+ ":-----> " + s);
  }
};


exports.error = function (tag, s){
  if (log){
    console.log("==========================>"+tag+ ":-----> " + s);
  }
};
