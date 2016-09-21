'use strict';

var app = angular.module('myApp.viewAuctions', ['ngRoute', 'angular-toArrayFilter']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewAuctions', {
    templateUrl: 'viewAuctions/viewAuctions.html' //,
      //controller: 'viewAuctionsCtrl'
  });
}]);

app.controller('viewAuctionsCtrl', function($scope, $filter, AuctionService) {
  var vm = this;

  vm.allAuctions = {}
  vm.allCategories = {};
  vm.date = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  initAuctions();


  function initAuctions() {
    var getAllAuctionData = AuctionService.getAll();
    getAllAuctionData.then(function(response) {
      var tempData = {};
      for (var index in response) {
        if (response[index].endTime > vm.date) {
          tempData[index] = response[index];
        }
      }
      vm.allAuctions = tempData;
    })
    getAllAuctionData.then(function(response) {
      var getAllCategoriesData = AuctionService.getAllCategories();
      getAllCategoriesData.then(function(response) {
        vm.allCategories = response;
      })
    })
  }
});