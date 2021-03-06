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
  if (!req.body ||
  (!req.body.ingredients &&
    !req.body.protein.moreThan &&
    !req.body.protein.lessThan &&
    !req.body.fat.moreThan &&
    !req.body.fat.lessThan &&
    !req.body.carbs.moreThan &&
    !req.body.carbs.lessThan)) {
    return res.status(200).json({ error: 'Enter search criteria' });
  }

  var query = { $and: [] };

  if (req.body.ingredients) {
    query.$and.push({ ingredients: new RegExp(req.body.ingredients, 'i') });
  }

  if (req.body.protein && req.body.protein.moreThan)
    query.$and.push({ protein: { $gt: req.body.protein.moreThan } });
  if (req.body.protein && req.body.protein.lessThan)
    query.$and.push({ protein: { $lt: req.body.protein.lessThan } });

  if (req.body.fat && req.body.fat.moreThan)
    query.$and.push({ fat: { $gt: req.body.fat.moreThan } });
  if (req.body.fat && req.body.fat.lessThan)
    query.$and.push({ fat: { $lt: req.body.fat.lessThan } });

  if (req.body.carbs && req.body.carbs.moreThan)
    query.$and.push({ carbs: { $gt: req.body.carbs.moreThan } });
  if (req.body.carbs && req.body.carbs.lessThan)
    query.$and.push({ carbs: { $lt: req.body.carbs.lessThan } });

  Recipe.find(query,
    function(errs, recipes) {
      if (errs) {
        res.status(500).send('internal error');
        console.log(errs);
      } else {

        // todo: convert outgoing to a DTO

        console.log('recipes found: ' + recipes.length);
        res.status(200).json(recipes);
      }
    }
  ).limit(6);
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
  var workbook = XLSX.readFile('./recipes.xlsx').Sheets;
  var worksheet = workbook.All;
  var worksheetArray = XLSX.utils.sheet_to_json(worksheet);

  var Recipe = mongoose.model('Recipe');
  Recipe.remove({}).exec(); // Clears all entries
  console.log('Wiped collection....');

  var rowCount = 0,
    processedCount = 0,
    errorCount = 0;
  worksheetArray.forEach(function(row) {
    rowCount++;
    try {
      var recipe = new Recipe();
      recipe.name = row.name;
      recipe.ingredients = row.ingredients.split(',');
      recipe.fat = row.fat || 0;
      recipe.protein = row.protein || 0;
      recipe.carbs = row.carbs || 0;
      recipe.calories = (recipe.fat * 9) + (recipe.protein * 4) + (recipe.carbs * 4);

      recipe.save(function(error, data) {
        if (error) {
          console.log('ERROR: ' + error);
          errorCount++;
        } else {
          processedCount++;
        }
      });
    } catch (e) {
      console.log('Error while seeding row: '); console.log(row); console.log('\n' + e);
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
