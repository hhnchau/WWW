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


/*
* API_SETTINGS_FORM
*/
Models.prototype.ApiSettingsForm = function (ApiSettingsForm) {
    this.data.ApiSettingsForm = ApiSettingsForm;
}
var ApiSettingsForm = {}


/*
* PRODUCT_FORM
*/
Models.prototype.ProductForm = function (ProductForm) {
    this.data.ProductForm = ProductForm;
}
var ProductForm = {}


/*
* RESULT_FORM
*/
Models.prototype.ResultForm = function (ResultForm) {
    this.data.ResultForm = ResultForm;
}
var ResultForm = {}

module.exports = Models;