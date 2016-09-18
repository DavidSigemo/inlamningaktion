'use strict';

var app = angular.module('myApp.viewAuctionDetails', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewAuctionDetails/:id', {
    templateUrl: 'viewAuctionDetails/viewAuctionDetails.html',
    controller: 'viewAuctionDetailsCtrl'
  });
}]);

app.controller('viewAuctionDetailsCtrl', function($scope, $routeParams, AuctionService) {
  var vm = this;
  vm.auctionId = $routeParams.id;
  console.log(vm.auctionId);
});