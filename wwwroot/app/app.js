'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.viewAuctions',
  'myApp.viewSuppliers',
  'myApp.viewAuctionDetails',
  'myApp.viewSupplierDetails',
  'myApp.viewAccount',
  'myApp.viewAdminPanel'
]);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/viewAuctions'
  });
});

app.controller('appCtrl', function($rootScope, $scope, $http, UserService) {
  var vm = this;

  

});