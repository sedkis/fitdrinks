(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['Authentication'];

  function HomeController(authentication) {
    var vm = this;
    if (authentication.user) {
      vm.userName = authentication.user.username;
    }
  }
}());
