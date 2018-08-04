(function() {
  'use strict';

  angular
    .module('recipes.fat')
    .controller('FatController', FatController);

  FatController.$inject = [
    '$http',
    '$scope',
    '$state',
    'RecipesService',
    'Notification'
  ];

  function FatController(
    $http,
    $scope,
    $state,
    RecipesService,
    Notification
  ) {
    var vm = this;

    vm.loadNextStep = function() {
      $state.go('recipes.carbs');
    };

  }
})();
