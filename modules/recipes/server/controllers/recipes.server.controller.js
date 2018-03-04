'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  XLSX = require('xlsx'),
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

exports.seed = function(req, res) {
  console.log('attempting to seed collection...');
  var worksheet = XLSX.readFile('./recipes_database.xlsx').Sheets.Sheet1;
  var worksheetArray = XLSX.utils.sheet_to_json(worksheet);

  var Recipe = mongoose.model('Recipe');
  Recipe.remove({}).exec(); // Clears all entries
  console.log('Wiped collection...');

  var rowCount = 0,
    processedCount = 0,
    errorCount = 0;
  worksheetArray.forEach(function(row) {
    rowCount++;
    try {
      var recipe = new Recipe();
      recipe.flavour = row.flavour;
      recipe.name = row.name;
      recipe.ingredients = row.ingredients;
      recipe.nutritional = row.nutritional;

      recipe.save(function(error, data) {
        if (error) {
          console.log('ERROR: ' + error);
          errorCount++;
        } else {
          processedCount++;
        }

      });
    } catch (e) {
      console.log('Error while seeding row: ' + row + '\n' + e);
    }

  });

  console.log('Seed completed, total rows: ' + rowCount + '\nrows processed: ' + processedCount + '\nnum errors: ' + errorCount);
  res.status(200).json({
    totalRows: rowCount,
    processed: processedCount,
    errors: errorCount
  });
};
