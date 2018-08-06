(function() {
  'use strict';

  angular
    .module('recipes.listing')
    .controller('RecipesListingController', RecipesController);

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
  }
})();
