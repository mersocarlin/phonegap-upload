/**
 *
 */

var ImageService = require('./image');
    //GroupsService = require('./groups');


module.exports = function(options) {
  return {
    image: new ImageService(options),
    //groups: new GroupsService(options)
  }
};
