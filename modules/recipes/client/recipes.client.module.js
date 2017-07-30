(function (app) {
  'use strict';

  app.registerModule('recipes');
  app.registerModule('recipes.listing', ['ui.grid', 'ui.grid.selection']);
  app.registerModule('recipes.details');
  app.registerModule('recipes.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
