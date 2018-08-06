(function() {
  'use strict';

  angular
    .module('recipes.listing')
    .controller('RecipesListingController', Controller);

  Controller.$inject = [
    '$http',
    '$scope',
    '$state',
    'RecipesService',
    'Notification',
    'RecipesResource',
  ];

  function Controller(
    $http,
    $scope,
    $state,
    RecipesService,
    Notification,
    RecipesResource
  ) {
    var vm = this;

    vm.filters = RecipesService.filters;

    RecipesResource.recipes().find();

    vm.startOver = function() {
      RecipesService.resetFilters();
      $state.go('recipes.home');
    };

    if (RecipesService.isFiltersEmpty()) {
      // display notification too?
      alert('please select at least one option');
      vm.startOver();
    }

  }
})();
