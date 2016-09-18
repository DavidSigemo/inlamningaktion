'use strict';

var app = angular.module('myApp.viewSuppliers', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewSuppliers', {
    templateUrl: 'viewSuppliers/viewSuppliers.html',
    controller: 'viewSuppliersCtrl'
  });
}]);

app.controller('viewSuppliersCtrl', [function() {

}]);