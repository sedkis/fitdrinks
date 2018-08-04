(function (app) {
  'use strict';

  app.registerModule('recipes');
  app.registerModule('recipes.home');
  app.registerModule('recipes.protein');
  app.registerModule('recipes.fat');
  app.registerModule('recipes.carbs');
  app.registerModule('recipes.ingredients');
  app.registerModule('recipes.listing');
  app.registerModule('recipes.details');
  app.registerModule('recipes.admin');
  app.registerModule('recipes.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
