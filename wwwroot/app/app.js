'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.viewAuctions',
  'myApp.viewSuppliers',
  'myApp.viewAuctionDetails',
  'myApp.viewSupplierDetails',
  'myApp.viewSignup'
]);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/viewAuctions'
  });
});

app.controller('appCtrl', function($rootScope, $scope, $http, UserService) {
  var vm = this;
  $rootScope.navbarSwitch = "0";

  vm.currentUserName = "error";
  vm.currentUserData = {}


  vm.login = function() {
    var userData = {
      email: vm.emailInput,
      password: vm.passWordInput
    }
    tryLogin(userData);
  }

  vm.LogOutUser = function() {
    vm.navbarSwitch = "0";
  }

  var tryLogin = function(userData) {
    var loginPromise = UserService.tryLogin(userData);

    loginPromise.then(function(response) {

      var userData = UserService.getUserById(response.id);
      userData.then(function(userResponse) {
        vm.navbarSwitch = "1";
        vm.currentUserData = userResponse;
        console.log(vm.currentUserData);
        vm.currentUserName = vm.currentUserData.firstName + " " + vm.currentUserData.lastName;
      });

    });

  }

  var getUserData = function(userId) {
    var userData = UserService.getUserById(userId);
    userData.then(function(response) {
      console.log(response);
      return response.data;
    });
  }

});