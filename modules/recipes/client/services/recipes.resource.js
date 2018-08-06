(function () {
  'use strict';

  // Recipes service used for communicating with the users REST endpoint
  angular
    .module('recipes')
    .factory('RecipesResource', RecipesResource);

  RecipesResource.$inject = ['$resource'];

  function RecipesResource($resource) {
    var recipes = function () {
      $resource(
      '/api/recipes', {},
        {
          find: {
            url: '/find',
            method: 'POST'
          }
        }
    );
    };

    return {
      recipes: recipes
    };
  }

})();
