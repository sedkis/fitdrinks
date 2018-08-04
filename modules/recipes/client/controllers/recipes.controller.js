(function() {
  'use strict';

  angular
    .module('recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = [
    '$http',
    '$scope',
    '$state',
    'RecipesService',
    'Notification'
  ];

  function RecipesController(
    $http,
    $scope,
    $state,
    RecipesService,
    Notification
  ) {
    var vm = this;

    vm.loadNextStep = function() {
      $state.go('recipes.protein');
    };

  }
})();
