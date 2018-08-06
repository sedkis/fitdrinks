(function() {
  'use strict';

  angular
    .module('recipes.carbs')
    .controller('CarbsController', CarbsController);

  CarbsController.$inject = [
    'RecipesService'
  ];

  function CarbsController(
    RecipesService
  ) {
    var vm = this;
    vm.filters = RecipesService.filters;
  }
})();
