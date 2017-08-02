(function () {
  'use strict';

  // Holds temporary Recipes Data so not lost on state switch
  angular
    .module('recipes')
    .factory('RecipesService', RecipesService);

  RecipesService.$inject = ['$window'];

  function RecipesService() {
    var data = [];

    return {
      data: data
    };
  }
}());
