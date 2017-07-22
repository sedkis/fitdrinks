'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');

/**
* Find
*/
exports.find = function(req,res) {
  res.status(200).send("hello world!");
}
