(function() {
  'use strict';

  angular
    .module('recipes.protein')
    .controller('ProteinController', ProteinController);

  ProteinController.$inject = [
    'RecipesService'
  ];

  function ProteinController(
    RecipesService
  ) {
    var vm = this;
    vm.filters = RecipesService.filters;
  }
})();
