(function () {
  'use strict';

  // Holds temporary Recipes Data so not lost on state switch
  angular
    .module('recipes')
    .factory('RecipesService', RecipesService);

  RecipesService.$inject = [];

  function RecipesService() {

    var results = [];

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

    // We don't want to lose sort settings on state switch
    var sortFilters = {
      sortType: 'name',
      sortDirection: 'desc'
    };

    return {
      sortFilters: sortFilters,
      results: results,
      filters: angular.copy(filters),
      resetFilters: resetFilters,
      isFiltersEmpty: isFiltersEmpty
    };
  }
}());
