(function() {
  'use strict';

  angular
    .module('recipes.fat')
    .controller('FatController', FatController);

  FatController.$inject = [
    'RecipesService'
  ];

  function FatController(
    RecipesService
  ) {
    var vm = this;
    vm.filters = RecipesService.filters;
    vm.visible = vm.filters.fat.moreThan || vm.filters.fat.lessThan;
  }
})();
