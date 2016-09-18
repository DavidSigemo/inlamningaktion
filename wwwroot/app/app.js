'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.viewAuctions',
  'myApp.viewSuppliers',
  'myApp.viewAuctionDetails'
]);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/viewAuctions'
  });
});

app.controller('appCtrl', function($scope, $http, UserService, AuctionService) {
  var vm = this;
  vm.navbarSwitch = "0";

  vm.currentUserName = "error";
  vm.currentUserData = {};
  // vm.formMaster = {
  //   firstNameInput = "",
  //   lastNameInput = "",
  //   adressInput = "",
  //   postalCodeInput = "",
  //   cityInput = "",
  //   phoneInput = "",
  //   emailInput = "",
  //   passWordInput = ""
  // }

  // .then(function(response){
  //   console.log(response);
  // }),
  // function(response){
  //   console.log(response);
  // };

  vm.formUser = {}

  vm.reset = function() {
    vm.formUser = angular.copy(vm.master);
  };

  vm.reset();

  vm.tryLogin = function() {

    var loginPromise = UserService.tryLogin(vm.emailInput, vm.passWordInput);

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

  vm.LogOutUser = function() {
    vm.navbarSwitch = "0";
  }

  vm.createUser = function() {
    var userData = {
      firstName: vm.firstNameInput,
      lastName: vm.lastNameInput,
      address: vm.adressInput,
      postalCode: vm.postalCodeInput,
      city: vm.cityInput,
      phone: vm.phoneInput,
      email: vm.emailInput,
      password: vm.passWordInput
    }

    var url = "http://nackademiska.azurewebsites.net/api/customer";
    var validationIsValid = true;

    for (var key in userData) {

      if (key === "" || key === undefined || key === null) {
        validationIsValid = false;
      }
    }
    console.log("validationIsValid: ", validationIsValid);
    // $http.post(url, JSON.stringify(userData))
    // .then(function(data, status, headers, config) {
    //     if (status === 200){
    //       vm.navbarSwitch = "2"
    //     }
    //   });
  }

  var getUserData = function(userId) {
    var userData = UserService.getUserById(userId);
    userData.then(function(response) {
      console.log(response);
      return response.data;
    });
  }

});