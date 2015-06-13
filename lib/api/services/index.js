
var ImageService = require('./image'),
    PersonService = require('./person');


module.exports = function(options) {
  return {
    image : new ImageService(options),
    person: new PersonService(options)
  }
};
