(function () {
  'use strict';

  // Holds temporary Recipes Data so not lost on state switch
  angular
    .module('recipes')
    .factory('RecipesService', RecipesService);

  RecipesService.$inject = [];

  function RecipesService() {

    var data = [];

    const filters = {
      ingredients: '',
      protein: {},
      fat: {},
      carbs: {}
    };

    function resetFilters() {
      this.filters = angular.copy(filters);
    }

    function isFiltersEmpty() {
      return _.isEqual(this.filters, filters);
    }

    return {
      data: data,
      filters: angular.copy(filters),
      resetFilters: resetFilters,
      isFiltersEmpty: isFiltersEmpty
    };
  }
}());
