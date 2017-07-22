'use strict';

/**
* Export Module
*/
module.exports = function(app){
  // Add dependency
  var recipes = require('../controllers/recipes.server.controller')

  // Setting up the Recipes API
  app.route('/api/recipes/getRecipe').get(recipes.find);

}
