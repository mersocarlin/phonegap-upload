var rsvp = require('rsvp');
var Promise = rsvp.Promise;


var serviceUrl = 'api/v1/person';


var PersonService = function(options) {
  this.api = options.api;
};

PersonService.prototype.fetchAll = function(baseUrl, accessToken) {
  var options = { baseUrl: baseUrl, accessToken: accessToken, url: serviceUrl };
  return this.api.get(options);
};

PersonService.prototype.fetchById = function(baseUrl, accessToken, payload) {
  var options = { baseUrl: baseUrl, accessToken: accessToken, url: serviceUrl, data: payload };
  return this.api.get(options);
};

PersonService.prototype.create = function (baseUrl, accessToken, payload) {
  var options = { baseUrl: baseUrl, accessToken: accessToken, url: serviceUrl, data: payload};
  return this.api.post(options);
};

module.exports = PersonService;
