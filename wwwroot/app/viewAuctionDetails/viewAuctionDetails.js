(function() {
  'use strict';

  var app = angular.module('myApp.viewAuctionDetails', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/viewAuctionDetails/:id', {
      templateUrl: 'viewAuctionDetails/viewAuctionDetails.html',
      controller: 'viewAuctionDetailsCtrl'
    });
  }]);

  app.controller('viewAuctionDetailsCtrl', function($scope, $routeParams, AuctionService, SupplierService) {
    var vm = this;
    vm.auctionId = $routeParams.id;
    vm.auctionDetails = {};
    vm.auctionBids = {};
    vm.supplierId;
    vm.supplierDetails = {};


    (function() {
      var GetAuctionDetailsData = AuctionService.getById(vm.auctionId);
      GetAuctionDetailsData.then(function(response) {
        vm.auctionDetails = response;
      })
      GetAuctionDetailsData.then(function(response) {
        var supplierId = response.supplierId;
        var GetSupplierDetailsData = SupplierService.getById(supplierId);
        GetSupplierDetailsData.then(function(response) {
          vm.supplierDetails = response;
          console.log(response);
        })
      })
      GetAuctionDetailsData.then(function(response) {
      var GetAuctionBidsData = AuctionService.getBids(vm.auctionId);
      GetAuctionBidsData.then(function(response) {
          vm.auctionBids = response;
        })
        //console.log(response.supplierId);
      })
    })();
  });
})();