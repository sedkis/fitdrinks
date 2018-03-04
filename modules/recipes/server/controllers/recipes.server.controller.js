'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');

// Helper functions
var lcToStylishFont = function (lcStr) {
  var arr = lcStr.split(' ');
  var newName = '';
  for (var j in arr) {
    if (j !== 0) {
      newName += ' ';
    }
    newName += arr[j].charAt(0).toUpperCase() + arr[j].slice(1);
  }
  return newName;
};

/**
* Find
*/
exports.find = function(req, res) {
  console.log(req.body);
  Recipe.find(
    {
      $or: [
        { flavour: { $regex: req.body.searchText.toLowerCase() } },
        { name: { $regex: req.body.searchText.toLowerCase() } }
      ]
    },
    function(errs, recipes) {
      if (errs) {
        res.status(500).send(errs);
        console.log(errs);
      } else {
        console.log(recipes);
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

/**
 * Insert
 */
exports.insert = function(req, res) {
  var recipe = new Recipe(req.body);

  // make lower case first
  recipe.flavour = recipe.flavour.toLowerCase();
  if (recipe.name) {
    recipe.name = recipe.name.toLowerCase();
  }

  recipe.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      recipe.name = lcToStylishFont(recipe.name);
      res.json(recipe);
    }
  });

};
