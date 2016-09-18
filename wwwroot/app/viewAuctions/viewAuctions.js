'use strict';

var app = angular.module('myApp.viewAuctions', ['ngRoute', 'angular-toArrayFilter']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewAuctions', {
    templateUrl: 'viewAuctions/viewAuctions.html',
    controller: 'viewAuctionsCtrl'
  });
}]);

app.controller('viewAuctionsCtrl', function($scope, AuctionService) {
  var vm = this;

  vm.allAuctions = {}
  vm.allCategories = {};
  getCategories();
  initAuctions();

  function getCategories() {
    var getAllCategoriesData = AuctionService.getAllCategories();
    getAllCategoriesData.then(function(response) {
      vm.allCategories = response;
    })
  }

  function initAuctions() {
    var getAllAuctionData = AuctionService.getAll();
    getAllAuctionData.then(function(response) {
      vm.allAuctions = response;
    });
  }



});


function parseDate(input) {
  var parts = input.split('-');
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

app.filter('dateRange', function() {
  return function(items, endDate) {
    var retArray = [];
    if (!endDate) {
      return items;
    }

    angular.forEach(items, function(obj) {
      var receivedDate = obj.date;
      if (moment(receivedDate).isAfter(endDate)) {
        retArray.push(obj);
      }
    });

    return retArray;
  }
});