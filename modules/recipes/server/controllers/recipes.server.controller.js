'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'
  )),
  mongoose = require('mongoose'),
  XLSX = require('xlsx'),
  Recipe = mongoose.model('Recipe');

/**
 * Returns all documents matching the search parameters
 *
 * TODO: Change Recipe Models into DTOs
 * TODO: Put repository methods in a repository class
 *
 * @param req request object.  Does not accept blank search.  Throws a 400 error
 * @param res returns all matching Recipe models.
 */
exports.find = function(req, res) {
  if (!req.body.searchText)
    return res.status(400).json({ error: 'Enter search criteria' });

  console.log(new Date() + " query: " + req.body.searchText);
  // TODO:
  // needs a more optimized query.  this is an expensive search that runs
  // two regex against two fields
  Recipe.find(
    {
      $or: [
        { flavour: new RegExp(req.body.searchText, 'i') },
        { name: new RegExp(req.body.searchText, 'i') }
      ]
    },
    function(errs, recipes) {
      if (errs) {
        res.status(500).send(errs);
        console.log(errs);
      } else {
        console.log("recipes found: " + recipes.length);
        res.status(200).json(recipes);
      }
    }
  );
};

/**
 * Inserts a recipe document into the Recipe collection.
 *
 * TODO: Send this to a "pending" table, which is approved by a "manager"
 * TODO:
 *
 * @param req contains the recipe information
 * @param res response object
 * @return res returns the newly inserted document model
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

/**
 * Upon being seeded, the database will destroy all current documents in the 'Recipe' collection
 * and re-initialize it with documents from the on server .xlsx
 *
 * TODO: add Admin only privileges
 *
 * @param req we don't actually use this.  in the future, can extract admin info from it
 * @param res
 * @return res information on number of rows that were looked at, added it, and errors.
 */
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
      recipe.ingredients = row.ingredients.split('\r\n');
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

  console.log(
    'Seed completed, total rows: ' +
      rowCount +
      '\nrows processed: ' +
      processedCount +
      '\nnum errors: ' +
      errorCount
  );
  res.status(200).json({
    totalRows: rowCount,
    processed: processedCount,
    errors: errorCount
  });
};
