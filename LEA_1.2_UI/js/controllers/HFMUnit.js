GLET.controller('WithTableToolsCtrlHFM', function ($scope, $timeout, $rootScope, localStorageService, sessionService, $q, constant, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $location, appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
    }, 1000);
    //$rootScope.username = localStorage.getItem('UserName');
    $rootScope.fname = localStorage.getItem('FNAME');
    $rootScope.lname = localStorage.getItem('LNAME');
    try
    {
        if (localStorage.getItem('role_id') == 'ADMIN')
        {
            $rootScope.role = true;
        }
        else
        {
            $rootScope.role = false;
        }
    }
    catch(ex)
    {
        $rootScope.role = false;
    }
   
    
    $scope.showHFMUnit();   //Comment: Header Tabs active issue (When type in url)
    $rootScope.login = true;
   

    $scope.apiURL = constant;
    $scope.init = function () {
        
    }
    $scope.hfmperiodvalue = {};

    var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=";
    simpleFactory.getData(Url).then(function (re) {
        $scope.hfmperiodData = re;
        angular.forEach($scope.hfmperiodData, function (obj, i) {
            if (obj.is_current == true) {
                $scope.hfmperiodvalue = obj;
                $scope.bindHfm();  // Comment : Call main funtion on page load and on period change
            }
        })
        
    })
    //Comment :Redirect to edit Hfm
    $scope.addNew = function (New) {
        $location.path("EditHFMUnit/" + $scope.hfmperiodvalue.code);
    }
    //Comment : Dummy call 
    var Url = appSetting.ServerPath + "apiGet/HFMUnit/GetHFMUnitDashboard?Period_id=" + $scope.hfmperiodvalue.code;
    $scope.dtOptions = DTOptionsBuilder.fromSource(Url).withOption('scrollCollapse', false)
    //Comment : Main function
    $scope.bindHfm = function () {
        var Url = appSetting.ServerPath + "apiGet/HFMUnit/GetHFMUnitDashboard?Period_id=" + $scope.hfmperiodvalue.code;
        $scope.dtOptions = DTOptionsBuilder.fromSource(Url).withOption('scrollCollapse', false)
       .withDOM('<"top"lf>rt<"bottom"pi>')
                  .withPaginationType('full_numbers')
                  .withButtons([
                      'copy',
                      'print',
                      'excel'
                  ])
    }  
    $scope.dtColumns = [
       DTColumnBuilder.newColumn(null).withTitle('Business Unit').withOption('width', '180px')
           .renderWith(function (data, type, full, meta) {
               return '<a ng-href="#/ViewHFMUnit" href="#/ViewHFMUnit/' + data.hfm_id + '/' + $scope.hfmperiodvalue.code + '">' + data.hfm_label + ' </a>';
           }),
       DTColumnBuilder.newColumn('segment').withTitle('Segment').withClass('text-center'),
       DTColumnBuilder.newColumn('bu_comments').withTitle('Business Unit Comments')
       .renderWith(function (data, type, full, meta) {
           var fixeddata = '';
           if (data) {
               fixeddata = data.substring(0, 50);
           }
           return ' <p  title="' + data + '" >' + fixeddata + '</p>'
       }),
       DTColumnBuilder.newColumn('erp').withTitle('ERP').withClass('text-center').withOption('width', '150px'),
       DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withClass('text-center'),
       DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center'),
       DTColumnBuilder.newColumn(null).withTitle('Action').withClass('text-center').withOption('width', '7%').notSortable()
       .renderWith(function (data, type, full, meta) {
           if ($rootScope.role == false) {
               return '<div></div>';
           }
           else {
               return '<div class="text-center">' + '  ' + ' <a ng-href="#/EditHFMUnit/' + data.hfm_id + '/' + $scope.hfmperiodvalue.code + '" href="#/EditHFMUnit/' + data.hfm_id + '/' + $scope.hfmperiodvalue.code + '"><img ng-show="role" class="" src="../images/edit.png" /></a> </div>';
           }
       })
    ];
    $scope.dtInstance = {};

    $scope.bindPeriod = function (period) {
        $scope.bindHfm();  // Comment : Call main function in the end
    }

});
