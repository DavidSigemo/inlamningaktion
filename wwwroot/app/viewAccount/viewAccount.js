'use strict';

var app = angular.module('myApp.viewAccount', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/viewSignup/', {
            templateUrl: 'viewAccount/viewSignup.html',
            controller: 'viewAccountCtrl'
        })
        .when('/viewLogin/', {
            templateUrl: 'viewAccount/viewLogin.html',
            controller: 'viewAccountCtrl'
        })
        .when('/viewAdminLogin/', {
            templateUrl: 'viewAccount/viewAdminLogin.html',
            controller: 'viewAccountCtrl'
        });
}]);

app.controller('viewAccountCtrl', function($rootScope, $scope, UserService, $location) {
    var vm = this;
    vm.newUser = {}
    vm.loginUser = {}
    vm.loginAdmin = {}
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

    var tryLogin = function(userData) {
        var loginPromise = UserService.tryLogin(userData);

        loginPromise.then(function(response) {

            var userData = UserService.getUserById(response.id);
            userData.then(function(userResponse) {
                vm.currentUserData = userResponse;
                window.history.back();
            });

        });

    }

    var tryAdminLogin = function(userData) {
        var loginPromise = UserService.tryAdminLogin(userData);

        loginPromise.then(function(response) {

            var userData = UserService.getUserById(response.id);
            userData.then(function(userResponse) {
                vm.currentUserData = userResponse;
                window.history.back();
            });

        });

    }

    vm.login = function() {
        var userData = {
            email: vm.loginUser.emailInput,
            password: vm.loginUser.passWordInput
        }
        tryLogin(userData);
    }

    vm.loginAdmin = function(){
        var userData = {
            email: vm.loginAdmin.emailInput,
            password: vm.loginAdmin.passWordInput
        }
        tryAdminLogin(userData);
    }

    var getUserData = function(userId) {
        var userData = UserService.getUserById(userId);
        userData.then(function(response) {
            return response.data;
        });
    }

    vm.reset = function() {
        vm.newUser = angular.copy(vm.formMaster);
    };

    vm.createUser = function() {
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
            tryLogin(loginUserData);
        });
    }
})