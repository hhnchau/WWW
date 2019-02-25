var Models = function (data) {
this.data = data;
}

Models.prototype.data = {}

Models.prototype.FormResult = function (status, message, FormGame) {
      this.data.status = status;
      this.data.message = message;
      this.data.FormGame = FormGame;
}

var FormGame = {};

module.exports = Models;
