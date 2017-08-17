GLET.controller('WithTableToolsCtrl', function ($scope,$timeout,localStorageService, sessionService, $rootScope, $uibModal, $compile, $rootScope, constant, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $location, $window,appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
    }, 1000);

    $rootScope.fname = localStorage.getItem('FNAME');
    $rootScope.lname = localStorage.getItem('LNAME');

    //$rootScope.username = localStorage.getItem('UserName');
    //$rootScope.role = (sessionService.get('role') === "true");   // ADD edit dependency on role
    try {
        if (localStorage.getItem('role_id') == 'ADMIN') {
            $rootScope.role = true;
        }
        else {
            $rootScope.role = false;
        }
    }
    catch (ex) {
        $rootScope.role = false;
    }
    $scope.showLegalEntity();   //Comment: Header Tabs active issue (When type in url)
    $scope.init = function () {
    }
    $rootScope.login = true;
   
    $scope.apiURL = constant;    // Global var URL
    $scope.periodvalue = {};

    var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=";
    simpleFactory.getData(Url).then(function (re) {
        $scope.periodData = re;
        angular.forEach($scope.periodData, function (obj, i) {
            if (obj.is_current == true) {
                $scope.periodvalue = obj;
                $scope.bindLegalentity();    // Comment : Call bind function after completion of period ID
            }
        })
    })

    //Comment : Initaialize DT on root of the controller first , to avoid buttons error
    var dataUrl = appSetting.ServerPath + "apiGet/LegalEntity/GetLegalEntityDashboard?Period_id=" + $scope.periodvalue.code;
   
    $scope.dtOptions = DTOptionsBuilder.fromSource(dataUrl)

    // Comment : Funtion to bind data to table 
    $scope.bindLegalentity = function () {
        
        var dataUrl = appSetting.ServerPath + "apiGet/LegalEntity/GetLegalEntityDashboard?Period_id=" + $scope.periodvalue.code;
        $scope.dtOptions = DTOptionsBuilder.fromSource(dataUrl).withOption('scrollCollapse', false)
            .withOption('createdRow', createdRow)
            .withDOM('<"top"lf>rt<"bottom"pi>')
                 .withPaginationType('full_numbers')
                 .withButtons([
                     'copy',
                     'print',
                     'excel'
                 ])
    }

    $scope.addNew = function (New) {
        $location.path("EditLegalEntity/"+ $scope.periodvalue.code);
    }
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }

    $scope.dtColumns = [
       DTColumnBuilder.newColumn(null).withTitle('Legal Entity Name').withOption('width', '184px')
           .renderWith(function (data, type, full, meta) {
              return '<div class="left band" style="background-color: ' + data.le_color + '"></div><a class="left"  style="margin-left:8px;" ng-href="#/ViewLegalEntity/' + data.le_id + "/" + $scope.periodvalue.code + '">' + data.le_name + ' </a>';
       }),
       DTColumnBuilder.newColumn('le_status').withTitle('Status').withOption('width', '59px'),
       DTColumnBuilder.newColumn('jurisdiction').withTitle('Jurisdiction').withOption('width', '151px')
           .renderWith(function (data, type, full, meta) {
               var imgstr = "";
               if (data !== null) {
                   imgstr = data.substring(data.lastIndexOf("(") + 1, data.lastIndexOf(")"))
                   return '<div style="float:left" class="flag flag-' + imgstr.toLowerCase() + '"></div><div style="float:left;margin-left:5px;">' + data + '</div>';
               } else {
                   return '<div></div>';
               }
       }), 
       DTColumnBuilder.newColumn('le_type').withTitle('Reporting Type').withOption('width', '96px'),
       DTColumnBuilder.newColumn('gaap_type').withTitle('GAAP Type').withOption('width', '94px'),
       DTColumnBuilder.newColumn('hfmsinle').withTitle('BU Count').withClass('text-center').withOption('width', '95px'),
       DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withOption('width', '70px'),
       DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center').withOption('width', '85px'),
       DTColumnBuilder.newColumn(null).withTitle('Action').withClass('text-center').withOption('width', '65px').notSortable()
       .renderWith(function (data, type, full, meta) {
           if ($rootScope.role == false) {
               return '<div class="text-center" > <img ng-click="openHierarchy(' + data.le_id + ')" ng-show="{{' + data.displayHierarchy + '}}" class="" src="../images/hierarchy.png" /  " > </div>';
           }
           else {
               return '<div class="text-center"> <a ng-href="#/EditLegalEntity/' + data.le_id + '/' + $scope.periodvalue.code + '" href="#/EditLegalEntity/' + data.le_id + '/' + $scope.periodvalue.code + '"><img  class="pull-left" id="hide"  src="../images/edit.png" /></a> ' + '  ' + ' <img ng-click="openHierarchy(' + data.le_id + ')" ng-show="{{' + data.displayHierarchy + '}}" class="pull-right" src="../images/hierarchy.png" /  " > </div>';
           }
       })
    ];
    $scope.dtInstance = {};
    //Comment : Function for period change
    $scope.changeData = function (period) {
        $scope.bindLegalentity();  // Comment : Call web service
    };

    $scope.openHierarchy = function (pid) {
        var id = ((pid) ? pid : $routeParams.id);
        var Url = appSetting.ServerPath + "apiget/hierarchytool/gethierarchychart?le_id=" + id + "&periodid=" + $scope.periodvalue.code + "&Percentage=";
        simpleFactory.getData(Url).then(function (re) {
            itemdata = re;
            itemid = id;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
            });
        })

        period = $scope.periodvalue.code;
        var url = appSetting.ServerPath + "apiGet/Lookup/GetHierarchyLELookup?PERIOD_ID=" + $scope.periodvalue.code;
        simpleFactory.getData(url).then(function (data) {
            legalentities = data.legalentities;
            jurisdictions = data.jurisdictions;
        });
    }
});

