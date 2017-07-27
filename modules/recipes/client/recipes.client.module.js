(function (app) {
  'use strict';

  app.registerModule('recipes', ['core', 'ui.grid']);
  app.registerModule('recipes.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
