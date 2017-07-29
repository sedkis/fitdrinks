(function() {
  'use strict';

  angular
    .module('recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['$http', '$scope'];

  var buildList = function(str) {
    return str.split('\n');
  };

  function RecipesController($http, $scope) {
    var vm = this;

    vm.resultsGrid = {
      data: vm.data,
      enableFullRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,
      columnDefs: [
        { field: 'flavour' },
        { field: 'name' },
        { field: 'type' },
        { field: 'calories' },
        { field: 'ingredients' }
      ]
    };
    vm.resultsGrid.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, function(row) {
        var msg = 'row selected ' + row.isSelected;
        console.log(row.entity);
      });
    };

    vm.search = function () {
      $http(
        {
          url: 'api/recipes/find',
          method: 'post',
          data: {
            searchText: vm.searchText ? vm.searchText : ''
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(function(response) {
        if (response)
          vm.resultsGrid.data = response.data;
      });
    };

    vm.insert = function () {
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
