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
      })
      // Admin routes
      .state('recipes.add', {
        url: '/add',
        templateUrl: '/modules/recipes/client/views/recipes.add.html',
        controller: 'RecipesAddController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Add New Recipe'
        },
        roles: [
          'admin'
        ]
      })
      .state('recipes.edit', {
        url: '/edit',
        templateUrl: '/modules/recipes/client/views/recipes.edit.html',
        controller: 'RecipesEditController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Edit existing'
        },
        roles: [
          'admin'
        ]
      });
  }
}());
