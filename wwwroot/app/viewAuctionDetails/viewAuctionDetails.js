(function() {
  'use strict';

  var app = angular.module('myApp.viewAuctionDetails', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/viewAuctionDetails/:id', {
      templateUrl: 'viewAuctionDetails/viewAuctionDetails.html'//,
      //controller: 'viewAuctionDetailsCtrl'
    });
  }]);

  app.controller('viewAuctionDetailsCtrl', function($scope, $routeParams, AuctionService, SupplierService) {
    var vm = this;
    vm.auctionId = $routeParams.id;
    vm.auctionDetails = {};
    vm.auctionBids = {};
    vm.supplierId;
    vm.supplierDetails = {};
    vm.highestBid;

    (function() {
      console.log("min funktion");
      var GetAuctionDetailsData = AuctionService.getById(vm.auctionId);
      GetAuctionDetailsData.then(function(response) {
        vm.auctionDetails = response;
      })
      GetAuctionDetailsData.then(function(response) {
        var supplierId = response.supplierId;
        var GetSupplierDetailsData = SupplierService.getById(supplierId);
        GetSupplierDetailsData.then(function(response) {
          vm.supplierDetails = response;
        })
      })
      GetAuctionDetailsData.then(function(response) {
      var GetAuctionBidsData = AuctionService.getBids(vm.auctionId);
      GetAuctionBidsData.then(function(response) {
          vm.auctionBids = response;
          console.log(vm.auctionBids);
          
          vm.highestBid = Math.max.apply(Math,response.map(function(o){return o.bidPrice;}));

        })
      })

    })();
  });
})();