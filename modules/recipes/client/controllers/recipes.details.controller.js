(function() {
  'use strict';

  angular
    .module('recipes.details')
    .controller('RecipesDetailsController', RecipesDetailsController);

  RecipesDetailsController.$inject = ['$http', '$scope', '$state'];

  function RecipesDetailsController($http, $scope, $state) {
    var vm = this;
    vm.details = $state.params.recipe;

    $scope.$back = function() {
      window.history.back();
    }

  }

}());
