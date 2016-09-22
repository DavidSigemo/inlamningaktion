'use strict';

var app = angular.module('myApp.viewAdminPanel', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewAdminPanel/', {
    templateUrl: 'viewAdminPanel/viewAdminPanel.html' //,
      //controller: 'viewAdminPanelCtrl'
  });
}]);

app.controller('viewAdminPanelCtrl', function($routeParams, $location, $rootScope, UserService, AuctionService, SupplierService) {
  var vm = this;
  vm.allowAccess = false;
  vm.currentTab = 'finishedTab';
  vm.allSoldAuctions = {}
  vm.highestBidData = {}
  vm.auctionList = []
  if (!$rootScope.userIsAdmin) {
    vm.allowAccess = false;
  }
  if (!$rootScope.currentUser.hasOwnProperty('id')) {
    //$location.path('/viewAdminLogin/');
  }

  vm.changeTab = function(newActiveTab) {
    $('#adminTabs li').removeClass('active');
    $('#' + newActiveTab).addClass('active');
    vm.currentTab = newActiveTab;
  }

  initAdminPanel();


  function initAdminPanel() {
    var getAllAuctionData = AuctionService.getAll();
    getAllAuctionData.then(function(response) {
        var tempData = {};
        for (var index in response) {
          if (response[index].sold === true) {
            tempData[index] = response[index];
          }
        }
        vm.allSoldAuctions = tempData; //Alla auktioner som sålts direkt, visa BuyNowPrice på dessa
        angular.forEach(vm.allSoldAuctions, function(value, key) {
          var tempObj = {
            id: value.id,
            name: value.name,
            imageUrl: value.imageUrl,
            sellingPrice: value.buyNowPrice,
            supplierId: value.supplierId,
            moneyEarned: 0
          }
          vm.auctionList.push(tempObj);
        })

        tempData = {};
        for (var index in response) {
          if ((response[index].sold === false) && moment(response[index].endTime) < moment()) {
            tempData[index] = response[index];
          }
        }
        vm.allUnSoldExpiredAuctions = tempData; //Alla auktioner som EJ sålts direkt, hämta bud för dessa och visa högsta budet

        angular.forEach(vm.allUnSoldExpiredAuctions, function(value, key) { //Hämtar alla bud för auktioner där det är relevant och räknar ut max budpris

          var getAllBidData = AuctionService.getBids(value.id); //API-anrop i en loop följer ej best-practice, dock finns inget alternativ med nuvarande API
          getAllBidData.then(function(bidsResponse) {
            if (bidsResponse.length > 0) {
              var highestBid = 0;
              $.each(bidsResponse, function(key, bid) {
                if (bid.bidPrice > highestBid) {
                  highestBid = bid.bidPrice;
                };
              })
              var tempObj = {
                id: value.id,
                name: value.name,
                imageUrl: value.imageUrl,
                sellingPrice: highestBid,
                supplierId: value.supplierId,
                moneyEarned: 0
              }
              vm.auctionList.push(tempObj);
            }
          })

        })
      })
      .then(function(response) { //Hämtar leverantörer och räknar och hur mycket pengar som tjänats
        var getAllSupplierData = SupplierService.getAll();
        getAllSupplierData.then(function(response) {
          angular.forEach(vm.auctionList, function(auktion, auktionKey) {
            angular.forEach(response, function(supplier, supplierKey) {
              if(auktion.supplierId === supplier.id){
                auktion.moneyEarned = auktion.sellingPrice * (1 - supplier.commission);
              }
            })
          })
        })
      })
  }

})