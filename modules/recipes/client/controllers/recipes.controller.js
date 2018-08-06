(function() {
  'use strict';

  angular
    .module('recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = [
    'RecipesService'
  ];

  function RecipesController(RecipesService) {
    var vm = this;

    vm.filters = RecipesService.filters;

    vm.visible = !!vm.filters.ingredients;

  }
})();
