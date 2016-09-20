app.factory('UserService', function($http, $rootScope) {
    vm = this;
    $rootScope.currentUser = {}
    $rootScope.navbarSwitch = "0";
    $rootScope.userIsAdmin = false;
    return {
        tryLogin: function(userData) {
            var url = "http://nackademiska.azurewebsites.net/api/account/login";

            return $http.post(url, JSON.stringify(userData))
                .then(function(response) {
                    console.log(response);
                    if (response.status === 200) {
                        $rootScope.currentUser = response.data;
                        $rootScope.navbarSwitch = "1";
                        $rootScope.userIsAdmin = false;
                        return response.data;
                    }
                });
        },

        tryAdminLogin: function(userData) {
            var url = "http://nackademiska.azurewebsites.net/api/account/admin/login";

            return $http.post(url, JSON.stringify(userData))
                .then(function(response) {
                    console.log(response);
                    if (response.status === 200) {
                        $rootScope.currentUser = response.data;
                        $rootScope.navbarSwitch = "2"
                        $rootScope.userIsAdmin = true;
                        return response.data;
                    }
                });
        },

        getUserById: function(userId) {
            var url = "http://nackademiska.azurewebsites.net/api/customer/".concat(userId);
            return $http.get(url)
                .then(function(response) {
                    if (response.status === 200) {
                        return response.data;
                    }
                });
        },

        createUser: function(userData) {
            var url = "http://nackademiska.azurewebsites.net/api/customer";
            return $http.post(url, JSON.stringify(userData))
                .then(function(response) {
                    return response;
                });
        }
    }
});