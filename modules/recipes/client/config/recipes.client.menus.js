(function () {
  'use strict';

  angular
    .module('recipes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Recipes',
      state: 'recipes.listing'
    });
    menuService.addMenuItem('topbar', {
      title: 'Details',
      state: 'recipes.details'
    });
  }
}());
