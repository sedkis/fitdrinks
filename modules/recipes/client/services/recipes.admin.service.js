(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('recipes.admin')
    .factory('RecipesAdminService', RecipesAdminService);

  RecipesAdminService.$inject = ['$window'];

  function RecipesAdminService() {
    var recipeData = [];

    return {
      data: recipeData
    };
  }
}());
