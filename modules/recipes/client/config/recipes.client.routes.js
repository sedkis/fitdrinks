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
        abstract: true,
        template: '<ui-view/>'
      })
      .state('recipes.listing', {
        url: '/listing',
        templateUrl: '/modules/recipes/client/views/recipes.listing.html',
        controller: 'RecipesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Recipes'
        }
      })
      .state('recipes.details', {
        url: '/details',
        templateUrl: '/modules/recipes/client/views/recipes.details.html',
        controller: 'RecipesDetailsController',
        controllerAs: 'vm',
        params: {
          recipe: null
        },
        data: {
          pageTitle: '{{ 2 + 2 }}'
        }
      });
  }
}());
