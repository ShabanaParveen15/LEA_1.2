GLET.controller('ViewHFMUnitController', function ($scope, $q, $timeout, $rootScope, sessionService, localStorageService,constant, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $routeParams, $location, appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
    }, 1000);

    $rootScope.fname = localStorage.getItem('FNAME');
    $rootScope.lname = localStorage.getItem('LNAME');

    //$rootScope.role = (sessionService.get('role') === "true");   // ADD edit dependency on role
    $rootScope.role = localStorage.getItem('role_id');   // ADD edit dependency on role// ADD edit dependency on role

    $scope.apiURL = constant;
   
    $rootScope.login = true;

    $scope.init = function () {

        var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=" + (($routeParams.id) ? $routeParams.id : '');

        simpleFactory.getData(Url).then(function (re) {
            $scope.periodData = re;
            //$scope.periodvalue = re[1];
            angular.forEach(re, function (ele, i) {

                if (ele.code === $routeParams.periodId) {
                    if (ele.is_current) {
                        $scope.showEdit = true;
                    }
                    $scope.periodvalue = ele;

                }
            })
            $scope.bindViewlegalentity();

        })

    }

    $scope.workbookDetails = function (workbookData) {
        var deferred = $q.defer();
        deferred.resolve(workbookData);
        return deferred.promise;
    }
  
    $scope.bindViewlegalentity = function () {
        var Url = appSetting.ServerPath + "apiGet/HFMUnit/GetHFMUnitByID?HFM_ID=" + $routeParams.id + "&Period_id=" + $scope.periodvalue.code;
        simpleFactory.getData(Url).then(function (re) {
            $scope.hfmunit = re;
            $scope.leData = re.lehfm;
            if ($scope.hfmunit.country_code !== null) {
                $scope.country_flag = ($scope.hfmunit.country_code).toLowerCase();
            }
           
            workbookData = re.hfmworkbook;
            $scope.dtHFMWorkbook = DTOptionsBuilder.fromFnPromise($scope.workbookDetails(workbookData)).withOption('responsive', true)

        })

        $scope.dtColumnsHFMWorkbook = [
           DTColumnBuilder.newColumn('workbook_num').withTitle('Workbook Number').withClass('text-center'),
             DTColumnBuilder.newColumn('branch').withTitle('Branch').withClass('text-center')
         .renderWith(function (data, type, full, meta) {

             if (data === true) {
                 return 'Yes';
             }
             else {
                 return 'No';
             }

         }),
           DTColumnBuilder.newColumn('branch_jur_iso').withTitle('Branch Jurisdiction').withClass('text-center'),
            DTColumnBuilder.newColumn('streffective_dt').withTitle('Effective Date').withClass('text-center'),
           DTColumnBuilder.newColumn('comments').withTitle('Comments')
           .renderWith(function (data, type, full, meta) {
               var fixeddata = '';
               if (data) {
                   fixeddata = data.substring(0, 50);
               }
               return ' <p  title="' + data + '" >' + fixeddata + '</p>'

           }),

           DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withClass('text-center'),
           DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center')


        ];
        $scope.dtInstanceHFMWorkbook = {};



    }
  



   
    $scope.edit = function () {
        $scope.hid = $routeParams.id;
        $location.path("EditHFMUnit/" + $scope.hid + "/" + $scope.periodvalue.code);
    }
    $scope.changeData = function (period) {


       
        if ($scope.dtHFMWorkbook != "undefined")
            delete $scope.dtHFMWorkbook;

        $scope.bindViewlegalentity();
       
        if (period.is_current == true) {

            $scope.showEdit = true;
        }
        else {
            $scope.showEdit = false;
        }

    }



});

GLET.factory('simpleFactory', function ($http, $q, $log) {
    return {
        getData: function (url) {
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        }
    }
});