app.factory('UserService', function($http, $rootScope, $location, $cookies) {
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
        $cookies.remove('currentUserId');
        $cookies.remove('userIsAdmin');
        $location.path('/viewAuctions');
    }

    if (typeof($cookies.getObject('currentUserId')) == 'number')  {
        console.log("getting cookies");
        $rootScope.currentUserId = $cookies.getObject('currentUserId');
        console.log($cookies.getAll());

        $rootScope.userIsAdmin = $cookies.getObject('userIsAdmin');
        if ($rootScope.userIsAdmin == "false") {
            $rootScope.navbarSwitch = "1";
        } else {
            $rootScope.navbarSwitch = "2";
        }

        var url = "http://nackademiska.azurewebsites.net/api/customer/".concat($rootScope.currentUserId);
        $http.get(url).then(function(response) {
            if (response.status === 200) {
                $rootScope.currentUserId = response.data.id;
                $rootScope.currentUser = response.data;
                return response.data;
            }
        });
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
                        $cookies.put('userIsAdmin', "false");
                        $cookies.putObject('currentUserId', $rootScope.currentUserId);
                        return response.data;
                    }
                }, function(response) {
                    return response;
                });
        },

        tryAdminLogin: function(userData) {
            var url = "http://nackademiska.azurewebsites.net/api/account/admin/login";

            return $http.post(url, JSON.stringify(userData))
                .then(function(response) {
                    if (response.status === 200) {
                        $rootScope.currentUserId = response.data.id;
                        $rootScope.navbarSwitch = "2"
                        $rootScope.userIsAdmin = true;
                        $cookies.put('userIsAdmin', "true");
                        $cookies.putObject('currentUserId', $rootScope.currentUserId);
                        return response.data;
                    }
                }, function(response) {
                    return response;
                });
        },

        getUserById: function(userId) {
            var url = "http://nackademiska.azurewebsites.net/api/customer/".concat(userId);
            return $http.get(url)
                .then(function(response) {
                    if (response.status === 200) {
                        $rootScope.currentUserId = response.data.id;
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