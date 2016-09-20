app.factory('AuctionService', function($http) {
    return {
        getAll: function() {
            var url = "http://nackademiska.azurewebsites.net/api/auction";
            return $http.get(url)
                .then(function(response) {
                    if (response.status === 200) {
                        return response.data;
                    }
                });
        },

        getById: function(auctionId) {
            var url = "http://nackademiska.azurewebsites.net/api/auction/".concat(auctionId);
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        },

        getAllCategories: function() {
            var url = "http://nackademiska.azurewebsites.net/api/category";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        },

        getBids: function(auctionId) {
            var url = "http://nackademiska.azurewebsites.net/api/bid/".concat(auctionId);
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
});