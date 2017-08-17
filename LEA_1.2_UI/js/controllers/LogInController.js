GLET.controller('LogInController', function ($rootScope, $scope, $location, $window, authService, $timeout, localStorageService, sessionService, $http, appSetting) {
    $rootScope.login = false;
    
    //angular.element('#contentcontainer').removeClass('continer-padding');
    //angular.element('#contentcontainer').removeClass('view-fixer');

    $scope.init = function () {
        $scope.creds = authService.remembered();
        $scope.userinfo = false;
        if ($scope.creds != "nothing"){
            $scope.remember = true;
            $scope.autosignin = localStorageService.get('autosignin');
            $scope.loginData = {
                userName: $scope.creds.username,
                password: $scope.creds.pass
            };
            if ($scope.autosignin) {
                $scope.login()
            }
        }
        else {
            $scope.loginData = {
                userName: "",
                password: ""
            };
        }
       
        $scope.keyupevent = function ($event) {
            if ($event.keyCode == 13) $scope.login()
        }
       
       
        $scope.encryptPassword = function()
        {
            $scope.loginData.password = Sha256.hash($scope.loginData.password);
        }
        $scope.login = function () {
            
             //$scope.loginerror = false;
            if ($scope.loginData.userName == "" || $scope.loginData.password == "") {
                $scope.crederror = true;
                $scope.loginerror = false;

                return;
            }
            $scope.encryptPassword();
            authService.login($scope.loginData, $scope.remember, $scope.autosignin).then(function (response) {
                if (response) {
                   
                    if ($rootScope.returnurl)
                        $location.path($rootScope.returnurl.replace("#", ""))
                    else
                       
                        $location.path('/Dashboard')
                    $rootScope.login = true;
                   
                    localStorage.setItem('UserType', response.RoleID)
                    $rootScope.UserType = localStorage.getItem('UserType')
                    
                    //localStorage.setItem('UserName', response.UserName);
                    //$rootScope.username = localStorage.getItem('UserName');

                    localStorage.setItem('LNAME', response.LNAME);
                    $rootScope.lname = localStorage.getItem('LNAME');

                    localStorage.setItem('USERNAME', response.USERNAME);
                    $rootScope.username = localStorage.getItem('USERNAME');
                    debugger;
                    console.log(response.USERNAME);
                    localStorage.setItem('FNAME', response.FNAME);
                    $rootScope.fname = localStorage.getItem('FNAME');

                        $rootScope.start();
                }


            },
             function (err) {
                
                 //alert(JSON.stringify(err));
                 if (err.error_description == 'Please Change Password On Initial Login.')
                 {
                     $rootScope.User_ID = err.error;
                     $location.path('/ChangePassword')
                 }
                 if (err.error2 == "Your Account Is Expired. Please Contact The Admin.")
                 {

                     $scope.error = err.error2;
                     $scope.crederror = false;
                     $scope.loginerror = true;
                     return;
                 }
                 $scope.error = err.error_description;
               
                 $scope.crederror = false;
                 $scope.loginerror = true;
               
             });
        };
    }

    $scope.checkUser=function()
    {
       
        if ($scope.loginData.userName == null || $scope.loginData.userName == '') {

            $scope.loginerror = true;
            $scope.error = "Please Enter Your Username"
            return;
        }


        var Url = appSetting.ServerPath + "apiGet/UserManagement/CheckUser?username=" + $scope.loginData.userName;
       
        $http.get(Url).success(function (response) {
            
                if (response.username != null)
                {
                    $scope.usernamevalid = true;
                    $scope.isUserNameExist = true;
                    $scope.usernameinvalid = true;
                    $scope.loginerror = false;
                    $scope.isUserNameExist = true;
                    
                }
                else
                {
                    
                    $scope.usernamevalid = false;
                    $scope.isUserNameExist = false;
                    $scope.usernameinvalid = false;
                    $scope.error = 'Invalid Username';
                    $scope.loginerror = true;
                    $scope.isUserNameExist = false;
                    
                }
            });
    }
})