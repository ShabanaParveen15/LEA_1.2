GLET.controller('ReportsController', function ($scope, $timeout, $q, constant, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $rootScope, localStorageService, sessionService, $http, simpleFactory, $routeParams, appSetting) {
    
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');

        $rootScope.fname = localStorage.getItem('FNAME');
        $rootScope.lname = localStorage.getItem('LNAME');

        //$rootScope.username = localStorage.getItem('UserName');
    $scope.showreports();   //Comment: Header Tabs active issue (When type in url)
    $scope.apiURL = constant;
   
    $scope.clickflag = 0;
    $rootScope.login = true;

    $scope.init = function () {

      
        var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=";
        simpleFactory.getData(Url).then(function (re) {
            $scope.periodData = re;
            for (var i = 0; i < re.length; i++) {
                if (re[i].is_current==true) {
                    $scope.periodvalue = re[i];
                }
            }
        })


    }
    $scope.newLegalentities = function (leData) {
        var deferred = $q.defer();
        deferred.resolve(leData);
        return deferred.promise;
    }
    $scope.updatedLegalentities = function (updatedLEData) {
        var deferred = $q.defer();
        deferred.resolve(updatedLEData);
        return deferred.promise;
    }
    $scope.newHFM = function (hfmData) {
        var deferred = $q.defer();
        deferred.resolve(hfmData);
        return deferred.promise;
    }
    $scope.updatedHFM = function (updatedHFMData) {
        var deferred = $q.defer();
        deferred.resolve(updatedHFMData);
        return deferred.promise;
    }

    $scope.runReport = function () {
        $('#startgroup').css('border', 'none');
        $('#endgroup').css('border', 'none');
        var start = $('#start_date').val(),
  end = $('#end_date').val();
        if (start == '' && end == '') {
            $('#startgroup').css('border', '1px solid red');
            $('#endgroup').css('border', '1px solid red');

            return false;
        }
        if (start == '') {
            $('#startgroup').css('border', '1px solid red');
            return false;
        }
        if (end == '') {
            $('#endgroup').css('border', '1px solid red');
            return false;
        }
        if ($scope.clickflag != 0) {

           delete $scope.dtOptions3// = DTOptionsBuilder.fromFnPromise($scope.newLegalentities(leData));
           delete $scope.dtOptions4 //= DTOptionsBuilder.fromFnPromise($scope.updatedLegalentities(updatedLEData));
           delete $scope.dtOptions //= DTOptionsBuilder.fromFnPromise($scope.newHFM(hfmData));
           delete $scope.dtOptions2// = DTOptionsBuilder.fromFnPromise($scope.updatedHFM(updatedhfmData))
        }
        bindReports();
 

        $scope.clickflag = 1;
    }
    bindReports = function () {
        var start = $('#start_date').val(),
end = $('#end_date').val();
        var val = $('#reporttype').val();
        var leUrl = appSetting.ServerPath + "apiGet/LegalEntity/GetLEReport?start_date=" + start + "&end_date=" + end;
        var hfmUrl = appSetting.ServerPath + "apiGet/HFMUnit/GetHFMReport?start_date=" + start + "&end_date=" + end;


        if (val == 0) {
            $scope.viewle = true;
            $scope.viewhfm = false;

        }
        else {
            $scope.viewhfm = true;
            $scope.viewle = false;

        }
        var leData, updatedLEData, hfmData, updatedhfmData;
        simpleFactory.getData(leUrl).then(function (re) {
            leData = re.legalentities;
            updatedLEData = re.changelogs;
            $scope.dtOptions3 = DTOptionsBuilder.fromFnPromise($scope.newLegalentities(leData)).withOption('scrollCollapse', false)
              .withOption('lengthChange', false)
              .withDOM('<"tableheader"<"#table3">>rt<"bottom"p>')
              .withButtons([
                  'copy',
                   'print',
                   'excel'
              ]);

            $scope.dtColumns3 = [

     DTColumnBuilder.newColumn('le_name').withTitle('LE Name').withOption('width', '180px'),
     DTColumnBuilder.newColumn('le_status').withTitle('LE Status').withClass('text-center'),
     DTColumnBuilder.newColumn('jurisdiction').withTitle('Jurisdiction').withOption('width', '12%')
         .renderWith(function (data, type, full, meta) {
             if (data != null) {
                 var imgstr = data.substring(data.lastIndexOf("(") + 1, data.lastIndexOf(")"))
                 return ' <div class="flag flag-' + imgstr.toLowerCase() + '"></div>' + ' ' + data;
             }
             else {
                 
                 return '';
             }
               
         }),
     DTColumnBuilder.newColumn('le_type').withTitle('LE Type').withClass('text-center').withOption('width', '12%'),

     DTColumnBuilder.newColumn('comments').withTitle('LE Comments')

     .renderWith(function (data, type, full, meta) {
         var fixeddata = '';
         if (data) {
             fixeddata = data.substring(0, 50);
         }
         return ' <p  title="' + data + '" >' + fixeddata + '</p>'

     }),

     DTColumnBuilder.newColumn('hfmsinle').withTitle('BU Count').withClass('text-center'),
     DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withClass('text-center').withOption('width', '100px'),
     DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center').withOption('width', '100px')

            ];
            $scope.dtInstance3 = {};

            $scope.dtOptions4 = DTOptionsBuilder.fromFnPromise($scope.updatedLegalentities(updatedLEData)).withOption('scrollCollapse', false)
               .withOption('lengthChange', false)
               .withDOM('<"tableheader"<"#table4">>rt<"bottom"p>')
               .withButtons([
                   'copy',
                    'print',
                    'excel'
               ]);
            $scope.dtColumns4 = [

DTColumnBuilder.newColumn('le_name').withTitle('LE Name').withClass('text-left'),
DTColumnBuilder.newColumn('field_name').withTitle('Field').withClass('text-center'),
DTColumnBuilder.newColumn('strupdated_dt').withTitle('Edit Date').withClass('text-center').withOption('width', '150px'),
DTColumnBuilder.newColumn('updated_by').withTitle('User').withClass('text-center').withOption('width', '110px'),
DTColumnBuilder.newColumn('old_value').withTitle('Old Value').withClass('text-center').withOption('width', '150px'),
DTColumnBuilder.newColumn('new_value').withTitle('New Value').withClass('text-center').withOption('width', '150px'),
            ];
            $scope.dtInstance4 = {};
            $timeout(function () {
                $('.buttons-copy').attr('title', 'Copy');
                $('.buttons-print').attr('title', 'Print');
                $('.buttons-excel ').attr('title', 'Export');
            }, 1000);
        })

        simpleFactory.getData(hfmUrl).then(function (re) {
            hfmData = re.hfms;
            updatedhfmData = re.changelogs;
            $scope.dtOptions = DTOptionsBuilder.fromFnPromise($scope.newHFM(hfmData)).withOption('scrollCollapse', false)
            .withOption('lengthChange', false)
            .withDOM('<"tableheader"<"#table1">>rt<"bottom"p>')
            .withButtons([
                'copy',
                 'print',
                 'excel'
            ]);

            $scope.dtColumns = [

         DTColumnBuilder.newColumn('hfm_label').withTitle('Business Unit').withOption('width', '180px').withClass('text-left'),
         DTColumnBuilder.newColumn('segment').withTitle('Segment').withClass('text-center'),
         DTColumnBuilder.newColumn('bu_comments').withTitle('Business Unit Comments').withClass('text-center'),
         DTColumnBuilder.newColumn('erp').withTitle('ERP').withClass('text-center').withOption('width', '150px'),
         DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withClass('text-center').withOption('width', '150px'),
         DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center').withOption('width', '150px')
            ];

            $scope.dtInstance = {};
            $scope.dtOptions2 = DTOptionsBuilder.fromFnPromise($scope.updatedHFM(updatedhfmData)).withOption('scrollCollapse', false)
            .withOption('lengthChange', false)
            .withDOM('<"tableheader"<"#table2">>rt<"bottom"p>')
            .withButtons([
                'copy',
                 'print',
                 'excel'
            ]);

            $scope.dtColumns2 = [
         DTColumnBuilder.newColumn('hfm_name').withTitle('Business Unit').withClass('text-left'),
         DTColumnBuilder.newColumn('field_name').withTitle('Field').withClass('text-center'),
         DTColumnBuilder.newColumn('strupdated_dt').withTitle('Edit Date').withClass('text-center'),
         DTColumnBuilder.newColumn('updated_by').withTitle('User').withClass('text-center'),
         DTColumnBuilder.newColumn('old_value').withTitle('Old Value').withClass('text-center').withOption('width', '150px'),
         DTColumnBuilder.newColumn('new_value').withTitle('New Value').withClass('text-center')
            ];

            $scope.dtInstance2 = {};
            $timeout(function () {
                $('.buttons-copy').attr('title', 'Copy');
                $('.buttons-print').attr('title', 'Print');
                $('.buttons-excel ').attr('title', 'Export');
            }, 1000);
        })
    }
    $scope.header = function () {
       
    };
    $scope.today = function () {
        $scope.dt = new Date();
    };


    //Initialising the auto complete drop down

    $scope.selected = undefined;


    //Initialising the date picker components

    $scope.today();

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.open = function ($event, status) {
        status.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.format = 'dd-MMM-yy';
    $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
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
})