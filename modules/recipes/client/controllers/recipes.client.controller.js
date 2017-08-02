(function() {
  'use strict';

  angular
    .module('recipes.listing', ['ui.grid', 'ui.grid.selection'])
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['$http', '$scope', '$state', 'RecipesService'];

  var buildList = function(str) {
    return str.split('\n');
  };

  function RecipesController($http, $scope, $state, RecipesService) {
    var vm = this;

    var loadRecipeDetails = function (rowEntity) {
      $state.go('recipes.details', { recipe: rowEntity });
    };

    vm.resultsGrid = {
      data: RecipesService.data,
      enableFullRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,
      columnDefs: [
        { field: 'name' },
        {
          field: 'flavour',
          width: '35%'
        },
        {
          field: 'calories',
          width: '20%'
        }
      ]
    };
    vm.resultsGrid.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, function(row) {
        loadRecipeDetails(row.entity);
      });
    };

    vm.search = function () {
      $http(
        {
          url: '/api/recipes/find',
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
        if (response) {
          RecipesService.data = response.data;
          vm.resultsGrid.data = response.data;
        }
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
