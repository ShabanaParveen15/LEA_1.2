GLET.controller('VersionController', function ($rootScope, $scope, $location, $window, authService, $timeout, localStorageService, sessionService, $http, appSetting) {
    $rootScope.login = false;
   
   $scope.openLink = function () {
        $window.open('../views/Version.html', '_blank');
    };
})