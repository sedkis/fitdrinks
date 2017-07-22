(function (app) {
  'use strict';

  app.registerModule('recipes', ['core']);
  app.registerModule('recipes.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
