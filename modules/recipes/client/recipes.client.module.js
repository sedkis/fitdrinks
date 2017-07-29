(function (app) {
  'use strict';

  app.registerModule('recipes', ['core', 'ui.grid', 'ui.grid.selection']);
  app.registerModule('recipes.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
