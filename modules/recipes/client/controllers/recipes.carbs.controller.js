(function() {
  'use strict';

  angular
    .module('recipes.carbs')
    .controller('CarbsController', CarbsController);

  CarbsController.$inject = [
    '$http',
    '$scope',
    '$state',
    'RecipesService',
    'Notification'
  ];

  function CarbsController(
    $http,
    $scope,
    $state,
    RecipesService,
    Notification
  ) {
    var vm = this;

    vm.loadNextStep = function() {
      $state.go('recipes.results');
    };

  }
})();
