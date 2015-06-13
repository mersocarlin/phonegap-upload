/**
 *
 */

var rsvp = require('rsvp');
var Promise = rsvp.Promise;


var serviceUrl = 'api/v1/image';


var ImageService = function(options) {
  this.api = options.api;
};


ImageService.prototype.fetchAll = function(baseUrl, accessToken) {
  var options = { baseUrl: baseUrl, accessToken: accessToken, url: serviceUrl };
  return this.api.get(options);
};

ImageService.prototype.create = function (baseUrl, accessToken, payload) {
  var options = { baseUrl: baseUrl, accessToken: accessToken, url: serviceUrl, data: payload};
  return this.api.post(options);
};

ImageService.prototype.upload = function (baseUrl, accessToken, payload) {

  var createdFiles = rsvp.all(payload.filesToCreate.map(function(fileToCreate) {

    return new rsvp.Promise(function(resolve, reject) {
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = this.api.guid() + ".jpg";
      options.mimeType="image/jpeg";
      options.chunkedMode = false;
      // var params = new Object();
      // params.value1 = "test";
      // params.value2 = "param";
      // options.params = params;

      var ft = new FileTransfer();
      ft.upload(fileToCreate.url, encodeURI(baseUrl + serviceUrl), function(response) {

        var parseResponse = JSON.parse(response.response);
        var objResponse = {
          hash: parseResponse[0].name,
          path: parseResponse[0].path
        };

        // var strResponse =
        //   "Code = " + response.responseCode + "\n" +
        //   "Response = " + response.response  + "\n" +
        //   "Sent = " + response.bytesSent;
        //
        resolve(objResponse);
      }, function(err) {
        alert("reject " + err.code);
        reject("An error has occurred: Code = " + err.code);
      }, options);
    }.bind(this));

  }.bind(this)));

  return rsvp.hash({
    createdFiles: createdFiles,
    //deletedFiles: deletedPreviousFiles,
    //singleFile: payload.singleFile
  });

};

module.exports = ImageService;
