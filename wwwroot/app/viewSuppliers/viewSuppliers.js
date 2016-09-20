
'use strict';

var app = angular.module('myApp.viewSuppliers', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewSuppliers', {
    templateUrl: 'viewSuppliers/viewSuppliers.html',
    controller: 'viewSuppliersCtrl'
  });
}]);

app.controller('viewSuppliersCtrl', function(SupplierService) {
  var vm = this;

  vm.allSuppliers = {}
  initSuppliers();

  function initSuppliers() {
    var getAllSupplierData = SupplierService.getAll();
    getAllSupplierData.then(function(response) {

      vm.allSuppliers = response;
      console.log(response);
    });
  }
})