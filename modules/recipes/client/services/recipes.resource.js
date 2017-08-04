(function () {
  'use strict';

  // Recipes service used for communicating with the users REST endpoint
  angular
    .module('recipes')
    .factory('RecipesResource', RecipesResource);

  RecipesResource.$inject = ['$resource'];

  function RecipesResource($resource) {
    var Recipes = $resource(
      '/api/users', {},
      {
        insert: {
          method: 'PUT'
        },
        updatePassword: {
          method: 'POST',
          url: '/api/users/password'
        }
      }
    );

    return Recipes;
  }

}());
