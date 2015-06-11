/**
 *
 */

var errors = module.exports = {};

// Create a new object, that prototypally inherits from the Error constructor.
function NotFound (res) {
  this.name = 'NotFound';
  this.res = res;
}

NotFound.prototype = new Error();
NotFound.prototype.constructor = NotFound;

errors.NotFound = NotFound;
