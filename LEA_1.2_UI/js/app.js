/// <reference path="../views/VersionRelease.html" />
/// <reference path="../views/Version.html" />
/// <reference path="../views/Version.html" />
/// <reference path="../views/Version.html" />
//var GLET = angular.module('GLET', ['ngRoute', 'ui.bootstrap', 'datatables', 'ui.select', 'ngAnimate', 'datatables.fixedcolumns', 'datatables.buttons', 'BasicPrimitives', 'open-vts', 'duScroll', 'panzoom', 'panzoomwidget', 'LocalStorageModule']);

var url = window.location.href;
var arr = url.split("/");
var clientPath = arr[0] + "//" + arr[2] + "//";
var GLET = angular.module('GLET', ['ngRoute', 'ngIdle', 'ui.bootstrap', 'datatables', 'ui.select', 'ngAnimate', 'datatables.fixedcolumns', 'datatables.buttons', 'BasicPrimitives', 'open-vts', 'duScroll', 'panzoom', 'panzoomwidget', 'LocalStorageModule', 'CurrentUserFactoryModule', , 'wj']).constant("appSetting", { ServerPath: 'https://demo-lea-api.azurewebsites.net/', MyName: "Naheed", clientServerPath: clientPath });
GLET.config(function ($routeProvider, $httpProvider, IdleProvider, KeepaliveProvider) {
    
    IdleProvider.idle(5);
    IdleProvider.timeout(5);
    KeepaliveProvider.interval(10);
    IdleProvider.windowInterrupt('focus');

    $('[data-toggle="popover"]').popover();

    /* Naheed Password Match*/
    GLET.directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }]);

    $routeProvider
        .when("/", {
            templateUrl: "../views/LogIn.html",
            controller: "LogInController",
            resolve: {
            }
        })
        .when("/Version", {
            templateUrl: "../views/Version.html",
            controller: "VersionController",
            resolve: {

            }
        })

        .when("/1.0", {
            templateUrl: "../views/VersionRelease.html",
            controller: "VersionReleaseController",
            resolve: {

            }
        })
          .when("/1.1", {
              templateUrl: "../views/VersionRelease1.1.html",
              controller: "VersionRelease1.1",
              resolve: {

              }
          })
        .when("/1.1.1", {
            templateUrl: "../views/VersionRelease1.1.0.1.html",
            controller: "VersionRelease1.1.0.1",
            resolve: {

            }
        })
        .when("/1.1.2", {
            templateUrl: "../views/VersionRelease1.1.0.2.html",
            controller: "VersionRelease1.1.0.2",
            resolve: {

            }
        })
         .when("/1.2", {
             templateUrl: "../views/VersionRelease1.2.html",
             controller: "VersionRelease1.2",
             resolve: {

             }
         })


        .when("/LogIn", {
            templateUrl: "../views/LogIn.html",
            controller: "LogInController",
            resolve: {

            }
        })


    .when("/Error", {
            templateUrl: "../views/error.html",
            controller: "EXController"
        })
        .when("/Dashboard", {
            templateUrl: "../views/legalEntity.html",
            controller: "WithTableToolsCtrl"
        })
        .when("/ViewLegalEntity/:id/:periodId", {
            templateUrl: "../views/viewLegalEntity.html",
            controller: "ViewLegalEntityController"
        }).when("/EditLegalEntity/:id?/:periodId", {
            templateUrl: "../views/editLegalEntity.html",
            controller: "EditLegalEntityController"
        }).when("/HFMUnit", {
            templateUrl: "../views/HFMUnit.html",
            controller: "WithTableToolsCtrlHFM"
        }).when("/ViewHFMUnit/:id/:periodId", {
            templateUrl: "../views/viewHFMUnit.html",
            controller: "ViewHFMUnitController"
        }).when("/EditHFMUnit/:id?/:periodId", {
            templateUrl: "../views/editHFMUnit.html",
            controller: "EditHFMUnitController"
        }).when("/hierarchy", {
            templateUrl: "../views/hierarchy.html",
            controller: "HierarchyController"
        }).when("/taxWorkbook", {
            templateUrl: "../views/taxWorkbook.html",
            controller: "TaxWorkbookController"
        }).when("/Timeline", {
            templateUrl: "../views/Timeline.html",
            controller: "TimelineController"
        }).when("/Reports", {
            templateUrl: "../views/Reports.html",
            controller: "ReportsController"
        }).when("/Logout", {                            // Logout page
            templateUrl: "../views/logout.html",
            controller: "LogoutController"
        })
         .when("/Administration", {
             templateUrl: "../views/administration.html",
             controller: "administrationController"
         })
        .when("/ChangePassword", {
            templateUrl: "../views/changePassword.html",
            controller: "ChangePasswordController"
        })
         .when('/editUser/:id', {
             templateUrl: '../views/editUser.html',
             controller: 'editUserController',
         })

         .when("/TaxReturn", {
             templateUrl: "../views/TaxReturnCompliance.html",
             controller: "TaxReturnController"
         })
        .when("/EditTaxReturnForm", { 
            templateUrl: "../views/EditTaxReturnForm.html",
            controller: "EditTaxReturnFormController"
        })
        .when('/SchedulePForm', {
            templateUrl: '../views/SchedulePUIForm.html',
            controller: 'SchedulePController',
            // activetab: 'ProcessManagement'
        })
        .when('/ScheduleKEditTaxReturnForm', {
            templateUrl: '../views/SchedulKEditTaxReturnForm.html',
            controller: 'ScheduleKEditTaxReturnFormController',
            // activetab: 'ProcessManagement'
        })
        .otherwise({ redirectTo: '/' });
});
/*Naheed Loader*/
GLET.config(['$httpProvider', function ($httpProvider) {
    var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log' , function ($q, $cacheFactory, $timeout, $rootScope, $log) { 


        return { 'request': function (config) {
            $("#myloader").show();
            return config;
        },
           
        'response': function (response) { 
            $("#myloader").hide();
            return response;
        },
            'responseError': function (rejection) {
                $("#myloader").hide()
                return $q.reject(rejection);
            }
        };
    }];
    $httpProvider.interceptors.push(interceptor);
}]);

GLET.run(['authService', function (authService) {
    authService.fillAuthData();
}]);
//GLET.factory('AuthorizationInjector', ["CurrentUser", function (CurrentUser) {
//    var sessionInjector = {
//        request: function (config) {
//            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
//            return config;
//        }
//    }; return sessionInjector;
//}]);
//GLET.config(['$httpProvider', function ($httpProvider) {
//    $httpProvider.interceptors.push('AuthorizationInjector');
//}]);
GLET.controller('LogoutController', function ($scope, sessionService, $location, $window, $timeout) {

})

GLET.controller('MainController', function ($scope, $rootScope, sessionService, $location, $window, $timeout, Idle, Keepalive,$modal) {
    $scope.started = false;
    $rootScope.UserType = localStorage.getItem('UserType');
   
    $rootScope.closeModals = function () {
        if ($scope.warning) {
            console.log('in Closemodal warning');
            $scope.warning.close();
            $scope.warning = null;


        }
        if ($scope.timedout) {

            $scope.warning.close();
            console.log('in Closemodal timedout');
            $scope.timedout = null;
        }
    }
    $scope.$on('IdleStart', function () {
        $rootScope.closeModals();

        $scope.warning = $modal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'
        });
    });
    $scope.$on('IdleEnd', function () {
        $rootScope.closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        //closeModals();
        $rootScope.closeModals();

        //$scope.timedout = $modal.open({
        //    templateUrl: 'timedout-dialog.html',
        //    windowClass: 'modal-danger'
        //});

        $location.path('/');
        //$rootScope.start();
    });

    $rootScope.start = function () {
        //closeModals();
        $rootScope.closeModals();
        Idle.watch();
        $scope.started = true;
    };

    $scope.stop = function () {
        console.log("Stopped");
        // closeModals();
        $rootScope.closeModals();
        Idle.unwatch();
        $scope.started = false;

    };

    //tahseen 22-01-2016

    $scope.events = [];
    $scope.idle = 500;
    $scope.timeout =500;

    $scope.$on('IdleStart', function () {
        addEvent({ event: 'IdleStart', date: new Date() });
    });

    $scope.$on('IdleEnd', function () {
        addEvent({ event: 'IdleEnd', date: new Date() });
    });

    $scope.$on('IdleWarn', function (e, countdown) {
        addEvent({ event: 'IdleWarn', date: new Date(), countdown: countdown });
    });

    $scope.$on('IdleTimeout', function () {
        addEvent({ event: 'IdleTimeout', date: new Date() });
    });

    $scope.$on('Keepalive', function () {
        addEvent({ event: 'Keepalive', date: new Date() });
    });

    function addEvent(evt) {
        $scope.$evalAsync(function () {
            $scope.events.push(evt);
        })
    }

    $scope.reset = function () {
        Idle.watch();
    }

    $scope.$watch('idle', function (value) {
        if (value !== null) Idle.setIdle(value);
    });

    $scope.$watch('timeout', function (value) {
        if (value !== null) Idle.setTimeout(value);
    });
    $rootScope.login = false;
    $rootScope.logOut = function () {
        authService.logOut();
        $window.location.assign('/');
    }
    $rootScope.loading = false;

    $scope.headerDisplay = true;    //Temp Code: Show Header contents
    // var user = { userid: "aCosta", username: "aCosta", role_id: "ADMIN" };   // Comment : User details temporary for Test



    $scope.logout = function () {

        sessionService.destroy('role');   //Comment: Delete values from local storage on logout
        sessionService.destroy('user');

        //alert(JSON.parse(sessionService.get('user')));
        //alert(JSON.parse(sessionService.get('role')))

        var path = $location.path();            // Comment: give the current URL to close
        $window.open(path, '_self', '');
        $window.close();
        $location.path('/');
    }


    //Comment: Check for root page of any inner page and add classes accordingly  //Author : Sajid
    var path = $location.path();
    x = path.split("/");
    
    rootPath = x[1];  //Comment : This will have the current page name
    if ($location.path() === '/' || rootPath == '') {
        $scope.dashboard = true;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    if ($location.path() === '/LegalEntity' || rootPath == 'EditLegalEntity' || rootPath == 'ViewLegalEntity') {
        $scope.dashboard = false;
        $scope.legalEntity = true;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    if ($location.path() === '/HFMUnit' || rootPath == 'EditHFMUnit' || rootPath == 'ViewHFMUnit') {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = true;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    if ($location.path() === '/taxWorkbook') {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = true;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    if ($location.path() === '/Timeline') {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = true;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    if ($location.path() === '/Reports') {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = true;
        $scope.admin = false;
        $scope.taxreturn = false;
    }

    if ($location.path() === '/Administration') {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = true;
        $scope.taxreturn = false;
    }

    //EditTaxReturnForm SchedulePForm ScheduleKEditTaxReturnForm
    if ($location.path() === '/TaxReturn') {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = true;
       
    }
    
    //Comment: Click events of tabs and apply class according to the active tab.
    $scope.showdashboard = function () {
        $scope.dashboard = true;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    $scope.showLegalEntity = function () {
        $scope.dashboard = false;
        $scope.legalEntity = true;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    $scope.showHFMUnit = function () {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = true;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    $scope.showtexWorkbook = function () {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = true;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    $scope.showtimeLine = function () {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = true;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    $scope.showreports = function () {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = true;
        $scope.admin = false;
        $scope.taxreturn = false;
    }
    $scope.showlistofusers = function () {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = true;
        $scope.taxreturn = false;
    }
    //taxreturncomp()

    $scope.showtaxreturncomp = function () {
        $scope.dashboard = false;
        $scope.legalEntity = false;
        $scope.hfmUnit = false;
        $scope.taxWorkbook = false;
        $scope.timeLine = false;
        $scope.reports = false;
        $scope.admin = false;
        $scope.taxreturn = true;
    }

});
//GLET.factory('$exceptionHandler', function () {
//    return function (exception, cause) {
//        console.log(exception.message);
//        exception.message = "Please contact the Help center.";
//    };
//})

GLET.factory('constant', function () {
    //  var apiURL = 'https://localhost:44375/';
    var apiURL = 'https://demo-lea-api.azurewebsites.net/';
    return apiURL;
})

GLET.factory('sessionService', ['$http', function ($http) {
    return {

        set: function (key, value) {
            return localStorage.setItem(key, value);
        },
        get: function (key) {
            return localStorage.getItem(key);
        },
        destroy: function (key) {
            return localStorage.removeItem(key);
        }
    };
}])

/* Naheed Tool-Tip */
GLET.directive('toggle', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (attrs.toggle == "tooltip") {
                $(element).tooltip();

            }
            if (attrs.toggle == "popover") {
                $(element).popover();
            }
        }
    };

})
