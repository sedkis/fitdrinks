(function (app) {
  'use strict';

  app.registerModule('recipes');
  app.registerModule('recipes.listing');
  app.registerModule('recipes.details');
  app.registerModule('recipes.add');
  app.registerModule('recipes.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
