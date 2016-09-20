'use strict';

var app = angular.module('myApp.viewSignup', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/viewSignup/', {
        templateUrl: 'viewSignup/viewSignup.html',
        controller: 'viewSignupCtrl'
    });
}]);

app.controller('viewSignupCtrl', function($rootScope, $scope, UserService) {
    var vm = this;
    vm.newUser = {}
    vm.formMaster = {
        firstNameInput: "",
        lastNameInput: "",
        adressInput: "",
        postalCodeInput: "",
        cityInput: "",
        phoneInput: "",
        emailInput: "",
        passWordInput: ""
    }

    vm.test = function() {
        console.log(vm.newUser);
    }

    vm.formUser = {}


    vm.reset = function() {
        vm.newUser = angular.copy(vm.formMaster);
    };

    vm.createUser = function() {
        console.log("create");
        var userData = {
            firstName: vm.newUser.firstNameInput,
            lastName: vm.newUser.lastNameInput,
            address: vm.newUser.adressInput,
            postalCode: vm.newUser.postalCodeInput,
            city: vm.newUser.cityInput,
            phone: vm.newUser.phoneInput,
            email: vm.newUser.emailInput,
            password: vm.newUser.passWordInput
        };

        var createNewUser = UserService.createUser(userData);
        createNewUser.then(function(response) {
            var loginUserData = {
                email: userData.email,
                password: userData.password
            }
            console.log(loginUserData);
            tryLogin(loginUserData);
        });

        var tryLogin = function(userData) {
            var loginPromise = UserService.tryLogin(userData);

            loginPromise.then(function(response) {

                var userData = UserService.getUserById(response.id);
                userData.then(function(userResponse) {
                    vm.currentUserData = userResponse;
                    console.log(vm.currentUserData);
                    vm.currentUserName = vm.currentUserData.firstName + " " + vm.currentUserData.lastName;
                });

            });

        }
    }
})