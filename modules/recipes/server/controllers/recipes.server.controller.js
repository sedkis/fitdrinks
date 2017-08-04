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
  Recipe.find(
    {
      $or: [
        { flavour: { $regex: req.body.searchText.toUpperCase() } },
        { name: { $regex: req.body.searchText.toUpperCase() } }
      ]
    },
    function(errs, recipes) {
      if (errs)
        res.status(500).send(errs);
      else {
        for (var i in recipes) {
          // Convert To This Casing
          if (recipes[i].name) {
            recipes[i].name = lcToStylishFont(recipes[i].name);
          }
          recipes[i].flavour = lcToStylishFont(recipes[i].flavour);
        }
        res.status(200).json(recipes);
      }

    });
};

var lcToStylishFont = function (lcStr) {
  var arr = lcStr.toLowerCase().split(' ');
  var newName= "";
  for (var j in arr) {
    if (j !== 0) {
      newName += ' ';
    }
    newName += ucFirst(arr[j]);
  }
  return newName;
}
var ucFirst = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Insert
 */
exports.insert = function(req, res) {
  var recipe = new Recipe(req.body);

  recipe.flavour = recipe.flavour.toUpperCase();
  if (recipe.name) {
    recipe.name = recipe.name.toUpperCase();
  }


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
