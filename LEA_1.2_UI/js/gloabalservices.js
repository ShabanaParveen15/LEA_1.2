GLET.factory('WebAPIService', function ($http, $q, $log, localStorageService, $location, $rootScope, authService) {
    return {
        getData: function (url) {
            $rootScope.loading = true;
            var deferred = $q.defer();
            var authData = localStorageService.get('authorizationData');
            var req = {
                method: 'GET',
                url: url,
                //headers: {
                //   'Authorization': 'Bearer ' + authData.access_token
                //}
            }
            $http(req)
                .success(function (data) {
                    $rootScope.loading = false;
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    $rootScope.loading = false;
                    if (code == 401) {
                        authService.logOut();
                        $location.path('/LogIn');
                    }
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        },
        postData: function (url,data) {
            var deferred = $q.defer();
            $rootScope.loading = true;
            var authData = localStorageService.get('authorizationData');
            var req = {
                method: 'POST',
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + authData.access_token
                },
                data:data
            }
            $http(req)
                .success(function (data) {
                    $rootScope.loading = false;
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    $rootScope.loading = false;
                    if (code == 401) {
                        authService.logOut();
                        $location.path('/LogIn');
                    }
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        }
    }
});