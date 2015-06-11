/**
 *
 */

var APIClient = require('./api-client'),
    services = require('./services');


var SDK = function() {
  this.api = new APIClient({ baseUrl: null });
  this.services = services({ api: this.api });
};


module.exports = new SDK();
