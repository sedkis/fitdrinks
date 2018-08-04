(function() {
  'use strict';

  angular
    .module('recipes.protein')
    .controller('ProteinController', ProteinController);

  ProteinController.$inject = [
    '$http',
    '$scope',
    '$state',
    'RecipesService',
    'Notification'
  ];

  function ProteinController(
    $http,
    $scope,
    $state,
    RecipesService,
    Notification
  ) {
    var vm = this;

    vm.loadNextStep = function() {
      $state.go('recipes.fat');
    };

  }
})();
