GLET.controller('ChangePasswordController', function ($scope, $timeout, localStorageService, sessionService, constant, $rootScope, $http, $location, appSetting) {
   
    $scope.islengthZero = true;
    $scope.changepassword = function ()
    {
        $rootScope.fname = localStorage.getItem('FNAME');
        $rootScope.lname = localStorage.getItem('LNAME');
        $scope.passwordE=Sha256.hash($scope.password);
        var Url = appSetting.ServerPath + "apiGet/UserManagement/ChangePassword?UserID=" + $rootScope.User_ID + "&Password=" + $scope.passwordE;
        $http.get(Url)
               .success(function (data, status, headers, config) {
                   if (data == true)
                   {

                       $scope.showalert();
                       $location.path('/');
                   }
               })
               .error(function (data, status, header, config) {
                   $scope.showalert1();
               });
      
       
    }
    $scope.reset = function () {
        $scope.requiredField = '';
    };
    $scope.showalert = function () {
        $scope.savesuccess = true;
        $timeout(function () {
            $scope.savesuccess = false;
        }, 3000);
    };

    $scope.changePassword = function(field)
    {
        
        if (($scope.password.length > 0) && ($scope.confirmpassword.length > 0))
        {
            $scope.islengthZero = false;
        }
        else
        {
            $scope.islengthZero = true;
        }
       
           
        
    }

    $scope.showalert1 = function () {
        $scope.savefailure = true;
        $timeout(function () {
            $scope.savefailure = false;
        }, 3000);
    };
    $scope.isClicked = true;
   
    $scope.hjy = false;
    $scope.checkFocus=function()
    {
        $scope.hjy = true;
    }
    $scope.checkClicked=function()
    {
        $scope.isClicked = false;
    }
    $(document).ready(function () {

        //you have to use keyup, because keydown will not catch the currently entered value
        
        $('input[type=password]').keyup(function () {

            // set password variable
            var pswd = $(this).val();

            //validate the length
            if (pswd.length < 8) {
                $('#length').removeClass('valid').addClass('invalid');
            } else {
                $('#length').removeClass('invalid').addClass('valid');
            }

            //validate letter
            if (pswd.match(/[a-z]/)) {
                $('#letter').removeClass('invalid').addClass('valid');
            } else {
                $('#letter').removeClass('valid').addClass('invalid');
            }

            //validate uppercase letter
            if (pswd.match(/[A-Z]/)) {
                $('#capital').removeClass('invalid').addClass('valid');
            } else {
                $('#capital').removeClass('valid').addClass('invalid');
            }

            //validate number
            if (pswd.match(/\d/)) {
                $('#number').removeClass('invalid').addClass('valid');
            } else {
                $('#number').removeClass('valid').addClass('invalid');
            }
            //validate special charecter 
            if (pswd.match(/[!@#$%\^&*(){}[\]<>?/|\-]/)) {
                $('#special').removeClass('invalid').addClass('valid');
            } else {
                $('#special').removeClass('valid').addClass('invalid');
            }
        }).focus(function () {
            $('#pswd_info').show();
        }).blur(function () {
            $('#pswd_info').hide();
        }).focus(function () {
            $('#arrow_box').show();
        }).blur(function () {
            $('#arrow_box').hide();
        });

    });
    
});