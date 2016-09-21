
'use strict';

var app = angular.module('myApp.viewSupplierDetails', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewSupplierDetails/:supplierId', {
    templateUrl: 'viewSupplierDetails/viewSupplierDetails.html'//,
    //controller: 'viewSupplierDetailsCtrl'
  });
}]);

app.controller('viewSupplierDetailsCtrl', function($routeParams, SupplierService) {
  var vm = this;
  vm.supplierId = $routeParams.supplierId;
  vm.supplierData = {}
  initSupplierDetails(vm.supplierId);

  function initSupplierDetails(supplierId) {
    var getAllSupplierDetailData = SupplierService.getById(supplierId);
    getAllSupplierDetailData.then(function(response) {

      vm.supplierData = response;
      console.log(response);
    });
  }
})