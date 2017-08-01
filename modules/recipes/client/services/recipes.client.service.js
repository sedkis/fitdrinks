(function () {
  'use strict';

  // Authentication service for user variables

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
