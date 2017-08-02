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
      state: 'recipes',
      type: 'dropdown',
      roles: ['admin']
    });
    menuService.addSubMenuItem('topbar', 'recipes', {
      title: 'Add Recipes',
      state: 'recipes.add'
    });
  }
}());
