(function() {
  'use strict';

  angular
    .module('recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['$http'];

  var buildList = function(str) {
    return str.split('\n');
  };

  function RecipesController($http) {
    var vm = this;

    vm.resultsGrid = {
      data: vm.data,
      columnDefs: [
        { field: 'flavour' },
        { field: 'name' },
        { field: 'type' },
        { field: 'calories' },
        { field: 'ingredients' }
      ]
    };

    vm.search = function () {
      $http.get('api/recipes/find').then(function(response) {
        if (response)
          vm.resultsGrid.data = response.data;
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

  }

}());
