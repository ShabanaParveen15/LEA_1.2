
GLET.factory('authService', ['$http', '$q', 'localStorageService', '$location', '$rootScope', '$window', 'constant', 'CurrentUser', 'appSetting', function ($http, $q, localStorageService, $location, $rootScope, $window, constant, CurrentUser, appSetting) {

    var serviceBase = constant;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(appSetting.ServerPath + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };
    var _remembered = function () {
        var authdata = localStorageService.get('jdie234his');
        if (typeof authdata != 'undefined' && authdata != null) {
            var creds = { username: sjcl.decrypt("username", authdata[0]), pass: sjcl.decrypt("password", authdata[1]) }
            return creds;
        }
        else return "nothing"
    }
    var _login = function (loginData, remember, autosignin) {
        var data = "username=" + loginData.userName + "&password=" + loginData.password + "&grant_type=password";
        var deferred = $q.defer();
            $rootScope.loading = true;

        $http.post(appSetting.ServerPath + 'api/authtoken', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                if (response){

                    
                    localStorage.setItem('role_id', response.RoleID);
                    CurrentUser.setProfile('user', response.access_token)
                    localStorageService.set('authorizationData', response);
                    
                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;
                    if (remember) {
                        localStorageService.set('jdie234his', [sjcl.encrypt("username", loginData.userName), sjcl.encrypt("password", loginData.password)]);
                    }
                    if (remember && autosignin) {
                        localStorageService.set('jdie234his', [sjcl.encrypt("username", loginData.userName), sjcl.encrypt("password", loginData.password)]);
                        localStorageService.set('autosignin', true);
                    }
                    deferred.resolve(response);
                }
                else {
                    //alert(response.status)
                    deferred.resolve(response);
                }
                $rootScope.loading = false;
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;

                deferred.resolve(response);

            }).error(function (err, status) {
                //console.log(err);
                //console.log(status);
                deferred.reject(err);
                return;
                $rootScope.loading = false;
                _logOut();
                
            });


        return deferred.promise;

    };

    var _logOut = function (){

        localStorageService.remove('ls.authorizationData');
        localStorageService.remove('processes');

        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('ls.authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }
    var _authenticate = function () {
        var authdata = localStorageService.get('ls.authorizationData');
        if (!authdata) {
            alert(Error)
            $location.path('/LogIn');
           // $rootScope.returnurl = $window.location.hash;
        }
        else {
            $rootScope.displayname = authdata.DisplayName;
        }
    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.authenticate = _authenticate;
    authServiceFactory.remembered = _remembered;

    return authServiceFactory;
}]);