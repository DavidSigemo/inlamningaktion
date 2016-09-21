app.factory('UserService', function($http, $rootScope, $location) {
    vm = this;
    $rootScope.currentUserId = 0;
    $rootScope.currentUser = {}
    $rootScope.navbarSwitch = "0";
    $rootScope.userIsAdmin = false;

    $rootScope.logout = function() {
        $rootScope.currentUserId = 0;
        $rootScope.currentUser = {}
        $rootScope.navbarSwitch = "0";
        $rootScope.userIsAdmin = false;
        $location.path('/viewAuctions');
    }


    return {
        tryLogin: function(userData) {
            var url = "http://nackademiska.azurewebsites.net/api/account/login";

            return $http.post(url, JSON.stringify(userData))
                .then(function(response) {
                    if (response.status === 200) {
                        $rootScope.currentUserId = response.data.id;
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
                        $rootScope.currentUserId = response.data.id;
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
                        $rootScope.currentUser = response.data;
                        return response.data;
                    }
                });
        },

        createUser: function(userData) {
            var url = "http://nackademiska.azurewebsites.net/api/customer";
            return $http.post(url, JSON.stringify(userData))
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        }
    }
});