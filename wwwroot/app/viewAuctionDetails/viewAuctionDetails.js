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
    vm.highestBid = {};
    vm.bidAmountInput;
    vm.auctionExpired = false;

    if ($location.path().split('/')[1] === 'viewAuctionBid' && !$rootScope.currentUser.hasOwnProperty('id')) {
      $location.path('/viewLogin/');
    }


    (function() {
      var GetAuctionDetailsData = AuctionService.getById(vm.auctionId);
      GetAuctionDetailsData.then(function(response) {
        vm.auctionDetails = response;
        if (moment(response.endTime) < Date.now()){
          vm.auctionExpired = true;
        }
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


          var highestBidId = 0;
          $.each(response, function(key, bid) {
            if (bid.bidPrice > highestBidId) highestBidId = bid.id;
          })

          vm.highestBid = $.grep(response, function(e) {
            return e.id === highestBidId;
          });

          vm.highestBid = vm.highestBid[0];

          vm.bidAmountInput = vm.highestBid.bidPrice + 100;

        })
      })

    })();

    vm.submitBid = function() {
      var newBidData = {
        auctionId: vm.auctionId,
        customerId: $rootScope.currentUserId,
        bidPrice: vm.bidAmountInput
      }

      var SendAuctionBid = AuctionService.newBid(newBidData);
      SendAuctionBid.then(function(response) {
        if (response.status !== 400) {

          var GetAuctionBidsData = AuctionService.getBids(vm.auctionId);
          GetAuctionBidsData.then(function(response) {
            vm.auctionBids = response;

            var highestBidId = 0;
            $.each(response, function(key, bid) {
              if (bid.bidPrice > highestBidId) highestBidId = bid.id;
            })

            vm.highestBid = $.grep(response, function(e) {
              return e.id === highestBidId;
            });

            vm.highestBid = vm.highestBid[0];

            vm.bidAmountInput = vm.highestBid.bidPrice + 100;
          })
        }
      })
    }

    vm.buyAction = function(){
      var newBuyData = {
        auctionId: vm.auctionId,
        customerId: $rootScope.currentUserId
      }
      var SendAuctionBuy = AuctionService.buyAction(newBuyData);
      SendAuctionBuy.then(function(response){
        if (response.status !== 400) {
          vm.auctionDetails.sold = true;
        }
      })
    }
  });
})();