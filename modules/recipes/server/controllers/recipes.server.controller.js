'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');

/**
* Find
*/
exports.find = function(req, res) {
  Recipe.find({}, function(errs, recipes) {
    if (errs)
      res.status(500).send(errs);
    else
      res.status(200).json(recipes);
  });
};

/**
 * Insert
 */
exports.insert = function(req, res) {
  var recipe = new Recipe(req.body);
  recipe.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(recipe);
    }
  });
};
