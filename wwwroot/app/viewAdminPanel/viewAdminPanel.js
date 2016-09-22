
'use strict';

var app = angular.module('myApp.viewAdminPanel', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewAdminPanel/', {
    templateUrl: 'viewAdminPanel/viewAdminPanel.html'//,
    //controller: 'viewAdminPanelCtrl'
  });
}]);

app.controller('viewAdminPanelCtrl', function($routeParams, $location, $rootScope, UserService, AuctionService) {
  var vm = this;
  vm.allowAccess = false;
  vm.currentTab = 'finishedTab';
  vm.allSoldAuctions = {}
  if(!$rootScope.userIsAdmin){
      vm.allowAccess = false;
  }
  if(!$rootScope.currentUser.hasOwnProperty('id')){
    //$location.path('/viewAdminLogin/');
  }

  vm.changeTab = function(newActiveTab){
    $('#adminTabs li').removeClass('active');
    $('#' + newActiveTab).addClass('active');
    vm.currentTab = newActiveTab;
  }

  initAuctions();


  function initAuctions() {
    var getAllAuctionData = AuctionService.getAll();
    getAllAuctionData.then(function(response) {
      var tempData = {};
      for (var index in response) {
        if (response[index].sold === true) {
          tempData[index] = response[index];
        }
      }
      vm.allSoldAuctions = tempData;
      console.log(vm.allSoldAuctions);
    })
    getAllAuctionData.then(function(response) {
      var getAllCategoriesData = AuctionService.getAllCategories();
      getAllCategoriesData.then(function(response) {
        vm.allCategories = response;
      })
    })
  }
})