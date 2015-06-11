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

ImageService.prototype.create2 = function (baseUrl, accessToken, payload) {
  var options = { baseUrl: baseUrl, accessToken: accessToken, url: serviceUrl + "/test", data: payload};
  return this.api.post(options);
};

// ImageService.prototype.publish = function(baseUrl, accessToken, payload) {
//   var url = [ serviceUrl, payload.id, 'publish' ].join('/');
//   var options = { baseUrl: baseUrl, accessToken: accessToken, url: url, data: { published: payload.published } };
//   return this.api.put(options);
// };
//
// ImageService.prototype.create = function(baseUrl, accessToken, payload) {
//   var data = {
//     name: payload.name,
//     description: payload.description,
//     author: payload.author,
//     images: payload.images,
//     android: payload.android,
//     ios: payload.ios,
//     webapp: payload.webapp,
//     groups: payload.groups,
//     featured: payload.featured
//   };
//   var options = { baseUrl: baseUrl, accessToken: accessToken, url: serviceUrl, data: data};
//   return this.api.post(options);
// };
//
// ImageService.prototype.update = function(baseUrl, accessToken, payload) {
//   var url = [ serviceUrl, payload._id ].join('/');
//   var data = {
//     name: payload.name,
//     description: payload.description,
//     author: payload.author,
//     images: payload.images,
//     android: payload.android,
//     ios: payload.ios,
//     webapp: payload.webapp,
//     groups: payload.groups,
//     featured: payload.featured
//   };
//   var options = { baseUrl: baseUrl, accessToken: accessToken, url: url, data: data};
//   return this.api.put(options);
// };
//
// ImageService.prototype.findById = function(baseUrl, accessToken, payload) {
//   var url = [ serviceUrl, payload._id ].join('/');
//   var options = { baseUrl: baseUrl, accessToken: accessToken, url: url};
//   return this.api.get(options);
// };
//
// ImageService.prototype.handleFiles = function(baseUrl, accessToken, payload) {
//   if(!payload.filesToCreate)
//     payload.filesToCreate = [];
//
//   if(!payload.filesToDelete)
//     payload.filesToDelete = [];
//
//   var createdFiles = rsvp.all(payload.filesToCreate.map(function(fileToCreate) {
//
//     if(fileToCreate.uploaded)
//       return fileToCreate;
//
//     //console.log("----------> SENDING FILE ----------> ", "[", fileToCreate.inputName, "]", fileToCreate.name);
//
//     var formData = new FormData();
//     formData.append("file", fileToCreate);
//
//     var options = {
//       baseUrl: baseUrl,
//       accessToken: accessToken,
//       url: "/file",
//       data: formData,
//       headers: { 'x-original-filename': fileToCreate.name }
//     };
//
//     return this.api.post(options).then(function(result) {
//       var createdFile = result.data;
//       createdFile.inputName = fileToCreate.inputName;
//
//       //console.log("----------> SAVED FILE ----------> ", "[", createdFile.inputName, "]", createdFile.name, createdFile.hash);
//
//       return createdFile;
//     });
//   }.bind(this)));
//
//   var deletedPreviousFiles = rsvp.all(payload.filesToDelete.map(function(fileToDelete) {
//     //console.log("----------> DELETING FILE ----------> ", "[", fileToDelete.inputName, "]", fileToDelete.name, fileToDelete.hash);
//
//     var formData = new FormData();
//     formData.append("file", fileToDelete);
//
//     var options = {
//       baseUrl: baseUrl,
//       accessToken: accessToken,
//       url: "/file/" + fileToDelete.hash,
//       data: formData,
//       headers: { 'x-original-filename': fileToDelete.hash }
//     };
//
//     return this.api.delete(options);
//   }.bind(this)));
//
//   return rsvp.hash({
//     createdFiles: createdFiles,
//     deletedFiles: deletedPreviousFiles,
//     singleFile: payload.singleFile
//   });
// };

module.exports = ImageService;
