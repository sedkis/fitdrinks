(function() {
  'use strict';

  angular
    .module('recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['$http'];

  function RecipesController($http) {
    var vm = this;

    vm.search = function () {
      $http.get('api/recipes/find').then(function(response) {
        if (response)
          vm.data = response.data;
      });
    };

    vm.insert = function () {
      console.log('a');

      var data = {
        flavour: vm.flavour,
        type: vm.type,
        name: vm.name,
        calories: vm.calories,
        ingredients: buildList(vm.ingredients)
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
            vm.searchResults = response.data;
        },
        function(error) {
          console.log(error);
        }
      );
    };

    var buildList = function(str) {
      return str.split('\n');
    };

  }

}());
