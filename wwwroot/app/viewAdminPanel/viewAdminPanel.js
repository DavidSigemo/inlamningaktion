
'use strict';

var app = angular.module('myApp.viewAdminPanel', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewAdminPanel/', {
    templateUrl: 'viewAdminPanel/viewAdminPanel.html'//,
    //controller: 'viewAdminPanelCtrl'
  });
}]);

app.controller('viewAdminPanelCtrl', function($routeParams, $location, $rootScope, UserService) {
  var vm = this;
  vm.allowAccess = false;

  if(!$rootScope.userIsAdmin){
      vm.allowAccess = false;
  }
  if(!$rootScope.currentUser.hasOwnProperty('id')){
    $location.path('/viewAdminLogin/');
  }
})