(function () {
  'use strict';

  angular
    .module('recipes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('recipes', {
        url: '/recipes',
        templateUrl: '/modules/recipes/client/views/recipes.client.landing.html',
        data: {
          roles: ['user'],
          pageTitle: 'Recipes'
        }
      });
  }
}());
