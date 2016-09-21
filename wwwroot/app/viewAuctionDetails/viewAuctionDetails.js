(function() {
  'use strict';

  var app = angular.module('myApp.viewAuctionDetails', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/viewAuctionDetails/:id', {
        templateUrl: 'viewAuctionDetails/viewAuctionDetails.html' //,
          //controller: 'viewAuctionDetailsCtrl'
      })
      .when('/viewAuctionBid/:id', {
        templateUrl: 'viewAuctionDetails/viewAuctionBid.html'
      });
  }]);

  app.controller('viewAuctionDetailsCtrl', function($scope, $routeParams, $location, $rootScope, AuctionService, SupplierService) {
    var vm = this;
    vm.auctionId = $routeParams.id;
    vm.auctionDetails = {};
    vm.auctionBids = {};
    vm.supplierId;
    vm.supplierDetails = {};
    vm.highestBid;
    vm.bidAmountInput;

    if ($location.path().split('/')[1] === 'viewAuctionBid' && !$rootScope.currentUser.hasOwnProperty('id')) {
      $location.path('/viewLogin/');
    }


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
        })
      })
      GetAuctionDetailsData.then(function(response) {
        var GetAuctionBidsData = AuctionService.getBids(vm.auctionId);
        GetAuctionBidsData.then(function(response) {
          vm.auctionBids = response;

          vm.highestBid = Math.max.apply(Math, response.map(function(o) {
            return o.bidPrice;
          }));

          vm.bidAmountInput = vm.highestBid + 100;

        })
      })

    })();

    vm.submitBid = function() {
      var newBidData = {
        auctionId: parseInt(vm.auctionId),
        customerId:  parseInt($rootScope.currentUserId),
        bidPrice:  parseInt(vm.bidAmountInput)
      }

      var SendAuctionBid = AuctionService.newBid(newBidData);
      SendAuctionBid.then(function(response) {
        if (response.status !== 400) {
          GetAuctionDetailsData.then(function(response) {
            var GetAuctionBidsData = AuctionService.getBids(vm.auctionId);
            GetAuctionBidsData.then(function(response) {
              vm.auctionBids = response;

              vm.highestBid = Math.max.apply(Math, response.map(function(o) {
                return o.bidPrice;
              }));

              vm.bidAmountInput = vm.highestBid + 100;

            })
          })
        }
      })
    }
  });
})();