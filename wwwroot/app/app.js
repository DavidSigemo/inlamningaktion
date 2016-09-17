'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2'
]);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/view1'
  });
});

app.controller('appCtrl', function($scope, $http, UserService) {
  var vm = this;
  vm.navbarSwitch = "0";

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

      vm.navbarSwitch = "1";

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

});