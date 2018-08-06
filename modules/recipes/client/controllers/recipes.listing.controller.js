(function() {
  'use strict';

  angular
    .module('recipes.listing')
    .controller('RecipesListingController', Controller);

  Controller.$inject = [
    '$http',
    '$state',
    'RecipesService',
    'Notification',
    // 'RecipesResource',
  ];

  function Controller(
    $http,
    $state,
    RecipesService,
    Notification
    // RecipesResource
  ) {
    var vm = this;

    vm.filters = RecipesService.filters;
    vm.results = RecipesService.results;

    var startOver = function() {
      RecipesService.resetFilters();
      $state.go('recipes.home');
    };

    if (RecipesService.isFiltersEmpty()) {
      alert('please select at least one option');
      startOver();
    }

    $http(
      {
        method: 'post',
        url: '/api/recipes/find',
        data: vm.filters,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(
      function(response) {
        if (!response.data || !response.data.length || response.data.length === 0) {
          alert('no results found.  please refine your search criteria.');
          RecipesService.results = [];
          vm.results = RecipesService.results;
          return;
        }

        RecipesService.results = response.data;
        vm.results = RecipesService.results;

        _.forEach(vm.results, function(recipe) {
          recipe.name = _.startCase(_.lowerCase(recipe.name));
        });
      },
      function(error) {
        console.log(error); // todo: remove
        Notification.error(error);
      }
    );

    vm.loadDetails = function (recipe) {
      $state.go('recipes.details', { recipe: recipe });
    };

    vm.startOver = startOver;

  }
})();
