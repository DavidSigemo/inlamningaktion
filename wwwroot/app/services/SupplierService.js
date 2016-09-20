app.factory('SupplierService', function($http) {
    return {
        getAll: function() {
            var url = "http://nackademiska.azurewebsites.net/api/supplier";
            return $http.get(url)
                .then(function(response) {
                    if (response.status === 200) {
                        return response.data;
                    }
                });
        },

        getById: function(supplierId) {
            var url = "http://nackademiska.azurewebsites.net/api/supplier/".concat(supplierId);
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
});