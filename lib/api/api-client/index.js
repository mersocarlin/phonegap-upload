/**
 *
 */

var request = require('axios'),
    Promise = require('rsvp').Promise,
    errors = require('./errors');

var ApiClient = function (config) {
  this.baseUrl = config.baseUrl;
  this.onError = undefined;
  this.oauth2Client = config.oauth2Client;
  this.oauth2Token = config.oauth2Token;
};

ApiClient.errors = errors;

ApiClient.prototype.setAccessToken = function (accessToken) {
  this.oauth2Token = { access_token: accessToken };
};

ApiClient.prototype.setBaseUrl = function (baseUrl) {
  this.baseUrl = baseUrl;
};

ApiClient.prototype.get = function (options) {
  return this.request(options);
};

ApiClient.prototype.put = function (options) {
  options.method = 'PUT';
  return this.request(options);
};

ApiClient.prototype.post = function (options) {
  options.method = 'POST';
  return this.request(options);
};

ApiClient.prototype.delete = function (options) {
  options.method = 'DELETE';
  return this.request(options);
};

ApiClient.prototype.patch = function (options) {
  options.method = 'PATCH';
  return this.request(options);
};

ApiClient.prototype.request = function (options) {
  options.url = (options.baseUrl || this.baseUrl || '') + (options.url || '');
  options.headers = options.headers || {};

  return getAccessToken(this, options).then(function (accessToken) {
    if (accessToken) { options.headers.Authorization = 'Bearer ' + accessToken; }
    return execute.call(this, options);
  }.bind(this));
};

function parseResult(body) {
  try {
    return typeof body === 'string' ? JSON.parse(body) : body;
  } catch (e) {
    return body;
  }
}

function execute(options) {
  var promise = request(options)
    .then(function(response) {
      return parseResult(response);
    }, function(err) {
      throw err;
    });

  if(this.onError) {
    promise.then(undefined, this.onError);
  }

  return promise;
}

module.exports = ApiClient;

/**
  @returns Promise of an accessToken, which might be null
 */

function getAccessToken (globalOptions, options) {
  //console.log(globalOptions, options);
  if (options.headers.Authorization) { return Promise.resolve(); }
  if (options.accessToken) { return Promise.resolve(options.accessToken); }
  if (globalOptions.oauth2Token) { return Promise.resolve(globalOptions.oauth2Token.access_token); }
  if (globalOptions.oauth2Client) {
    return globalOptions.oauth2Client.api.grant.clientCredentials().then(function (token) {
      return token.access_token;
    });
  }

  return Promise.resolve();
}
