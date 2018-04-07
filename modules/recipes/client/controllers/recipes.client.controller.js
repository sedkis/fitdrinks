(function() {
  'use strict';

  angular
    .module('recipes.listing', ['ui.grid', 'ui.grid.selection'])
    .controller('RecipesController', RecipesController);

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
        { field: "name", visible: true }, 
        { field: "flavour", visible: true },
        { field: "calories", visible: false },
        { 
          field: "null",
          name: "null",
          cellTemplate: "<div> > </div>",
          width: "5%"
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
      vm.resultsGrid.columnDefs[vm.columnMap[columnName].index].visible = vm.columnMap[columnName].visibility; 
      $scope.gridApi.core.refresh();
    }

    var columnMapIndex = function(name, index, visibility) {
      return {
        name: name,
        index: index,
        visibility: visibility
      };
    }
    vm.columnMap = {
      name: new columnMapIndex("name", 0, true),
      flavour: new columnMapIndex("flavour", 1, true),
      calories: new columnMapIndex("calories", 2, false),
    }

    vm.search = function() {
      $http({
        url: '/api/recipes/find',
        method: 'post',
        data: {
          searchText: vm.searchText ? vm.searchText : ''
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        function(response) {
          if (response) {
            RecipesService.data = response.data;
            vm.resultsGrid.data = response.data;
          }
        },
        function(err) {
          Notification.error('Enter Search Criteria');
          console.log(err);
        }
      );
    };

    vm.seed = function() {
      $http({
        url: '/api/recipes/seed',
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        if (response) {
          console.log(response);
        }
      });
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

    vm.searchOptions = [
      {value:"ingredients", name:"Ingredients", checked:true},
      {value:"name", name:"Name", checked:true}
    ];

    vm.filterKeywords = [
      {value:"lowCal", name:"Low Cal"},
      {value:"highProtein", name:"High Protein"}
    ]
    
  }
})();
