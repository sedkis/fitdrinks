(function () {
  'use strict';

  // Holds temporary Recipes Data so not lost on state switch
  angular
    .module('recipes')
    .factory('RecipesService', RecipesService);

  RecipesService.$inject = ['$window'];

  function RecipesService() {
    var data = [];
    var filters = {
      ingredients: [],
      protein: {},
      fat: {},
      carbs: {}
    };

    return {
      data: data,
      filters: filters
    };
  }
}());
