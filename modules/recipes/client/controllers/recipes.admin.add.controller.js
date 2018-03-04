 (function() {
  'use strict';

  angular
    .module('recipes.admin', ['ui-notification'])
    .controller('RecipesAddController', RecipesAddController);

  RecipesAddController.$inject = ['$http', '$scope', '$state', 'RecipesResource', 'Notification'];

  var buildList = function(str) {
    return str ? str.split(',') : null;
  };

  function RecipesAddController($http, $scope, Notification) {
    var vm = this;

    vm.insert = function () {
      var data = {
        flavour: $scope.form.flavour,
        type: $scope.form.type,
        name: $scope.form.name,
        calories: $scope.form.calories,
        ingredients: buildList($scope.form.ingredients)
      };
      $http(
        {
          method: 'post',
          url: '/api/recipes/new',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(
        function(response) {
          if (response)
            $scope.form = {};
          Notification.success('Successfully added: ' + response.data.name);
        },
        function(error) {
          Notification.error(error);
        }
      );
    };

  }

}());
