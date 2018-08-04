(function() {
  'use strict';

  angular
    .module('recipes.listing', ['ui.grid', 'ui.grid.selection'])
    .controller('RecipesListingController', RecipesController);

  RecipesController.$inject = [
    '$http',
    '$scope',
    '$state',
    'RecipesService',
    'Notification'
  ];

  var buildList = function(str) {
    return str.split('\n');
  };

  function RecipesController(
    $http,
    $scope,
    $state,
    RecipesService,
    Notification
  ) {
    var vm = this;

    var loadRecipeDetails = function(rowEntity) {
      $state.go('recipes.details', { recipe: rowEntity });
    };

    vm.resultsGrid = {
      data: RecipesService.data,
      enableFullRowSelection: true,
      enableRowHeaderSelection: false,
      enableRowSelection: true,
      multiSelect: false,
      columnDefs: [
        { field: "name",      name: "Name",         visible: true, width: '40%' },
        { field: "calories",  name: "Calories",     visible: true,  type: 'number' },
        { field: "protein",   name: 'Protein (g)',  visible: true,  type: 'number' },
        { field: "carbs",     name: 'Carbs (g)',    visible: true,  type: 'number' },
        { field: "fat",       name: 'Fat (g)',      visible: true,  type: 'number' },
        { 
          field: "null",
          name: " ",
          cellTemplate: "<div> > </div>",
          width: "5%",
          enableColumnMenu: false
        }
      ] 
    };
    vm.resultsGrid.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, function(row) {
        loadRecipeDetails(row.entity);
      });
    };

    vm.toggleVisibleRow = function(columnName){
      var indexes = vm.columnMap[columnName].index;
      indexes.forEach(index => vm.resultsGrid.columnDefs[index].visible = vm.columnMap[columnName].visibility);
      $scope.gridApi.core.refresh();
    };

    function columnMapIndex(name, index, visibility) {
      return {
        name: name,
        index: index,
        visibility: visibility
      };
    }
    vm.columnMap = {
      name: new columnMapIndex("name", [0], true),
      calories: new columnMapIndex("calories", [1], true),
      macros: new columnMapIndex("macros", [2,3,4], true),
    };

    vm.search = function() {
      $http({
        url: '/api/recipes/find',
        method: 'post',
        data: {
          searchText: vm.searchText ? vm.searchText : '',
          searchOptions: vm.searchOptions
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        response => {
          if (response && response.data && response.data.length > 0) {
            RecipesService.data = response.data;
            vm.resultsGrid.data = response.data;
          } else {
            RecipesService.data = [];
            vm.resultsGrid.data = [];
            Notification.error('Please refine search criteria');
          }
        },
        err => {
          Notification.error('Enter Search Criteria');
          console.log(err);
        }
      );
    };

    vm.insert = function() {
      var data = {
        flavour: vm.flavour,
        type: vm.type,
        name: vm.name,
        calories: vm.calories,
        ingredients: buildList(vm.ingredients)
      };
      $http({
        method: 'post',
        url: '/api/recipes/new',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        function(response) {
          if (response) vm.searchResults = response.data;
        },
        function(error) {
          console.log(error);
        }
      );
    };

    vm.searchOptions = {
      'lowCal': false,
      'lowCarb': false,
      'highProtein': false,
      'highFat': false,
      'lowFat': false
    };

  }
})();
