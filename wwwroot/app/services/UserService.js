app.factory('UserService', function($http) {
    return {
        tryLogin: function(email, password) {
            var loginData = {
                "email": email,
                "password": password
            };
            var url = "http://nackademiska.azurewebsites.net/api/account/login";


            return $http.post(url, JSON.stringify(loginData))
                .then(function(response) {
                    console.log(response);
                        if (response.status === 200) {
                            return response.data;
                        }
                    });
        }
    }
});