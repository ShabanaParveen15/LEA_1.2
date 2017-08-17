GLET.controller('ViewLegalEntityController', function ($scope, $rootScope, $timeout, localStorageService, sessionService, DTOptionsBuilder, constant, $q, $uibModal, DTColumnBuilder, $compile, DTColumnDefBuilder, $http, simpleFactory, $routeParams, $location, $window, appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
    }, 1000);

    $rootScope.lname = localStorage.getItem('LNAME');
    $rootScope.fname = localStorage.getItem('FNAME');

  //  $rootScope.role = (sessionService.get('role') === "true");   // ADD edit dependency on role
    $rootScope.role = localStorage.getItem('role_id');   // ADD edit dependency on role
    $rootScope.login = true;


    $scope.apiURL = constant;   // Global var URL
    $scope.periodvalue = {};
    $scope.init = function () {
        //$scope.userDetails = JSON.parse($window.localStorage.getItem('user'));
        //$rootScope.roleId = $scope.userDetails.role_id;
        var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=" + (($routeParams.id) ? $routeParams.id : "") + "&hfm_id=";
        simpleFactory.getData(Url).then(function (re) {
            $scope.periodData = re;

            angular.forEach(re, function (ele, i) {

                if (ele.code === $routeParams.periodId) {
                    if (ele.is_current) {
                        $scope.showEdit = true;
                    }
                    $scope.periodvalue = ele;

                }
            })

        })
    }

    $scope.ownertable = function (ownership) {
        var deferred = $q.defer();
        deferred.resolve(ownership);
        return deferred.promise;
    }
    $scope.hfmtable = function (HFM) {
        var deferred = $q.defer();
        deferred.resolve(HFM);
        return deferred.promise;
    }

    //Comment : Initaialize DT on root of the controller first , to avoid buttons error
    //var dataurl = ''
    //$scope.dtownership = dtoptionsbuilder.fromsource(dataurl)
    //$scope.dthfmunit = dtoptionsbuilder.fromsource(dataurl)

    //Comment : Main function
    $scope.bindViewlegalentity = function () {

        if (typeof $scope.dtOwnership != 'undefined')
            delete $scope.dtOwnership;
        if (typeof $scope.dtHFMUnit != 'undefined')
            delete $scope.dtHFMUnit;
        if ($scope.periodvalue.code == '' || $scope.periodvalue.code == null) {
            $scope.periodvalue.code = $routeParams.periodId;
        }

        $scope.attrObj = {};

        var ATUrl = appSetting.ServerPath + "apiGet/LegalEntity/GetAttributes";
        simpleFactory.getData(ATUrl).then(function (response) {
            if (response.configJSON != null) {
                $scope.attributes = JSON.parse(response.configJSON);
            }
            else {
                $scope.attributes = [];
            }
        })
        $scope.Url = appSetting.ServerPath + "apiGet/LegalEntity/GetLegalEntityByID?le_id=" + $routeParams.id + "&Period_id=" + $scope.periodvalue.code;
        simpleFactory.getData($scope.Url).then(function (re) {
            $scope.legalentity = re;
            var s = $scope.legalentity;
            if (s.miscellaneous != "" && s.miscellaneous!=null) {
                $scope.miscellaneous = JSON.parse(s.miscellaneous);
            }
            else {
                $scope.miscellaneous = [];
            }
            // $scope.attributes = JSON.parse(re.dynamicField.configJSON);
            if ($scope.miscellaneous == []) {
                $scope.attrObj = $scope.attributes;
            } else {
                $.each($scope.attributes, function (akey, avalue) {
                    $scope.attrObj[akey] = $scope.miscellaneous[akey];
                })
            }
            if ($scope.legalentity.country_code !== null) {
                $scope.country_flag = ($scope.legalentity.country_code).toLowerCase();
            }
            else {
                $scope.country_flag = null;
            }
            console.log(JSON.stringify($scope.miscellaneous))
            var ownership = re.ownership,
                     HFM = re.lehfm;
            $scope.dtOwnership = DTOptionsBuilder.fromFnPromise($scope.ownertable(ownership)).withOption('responsive', true).withOption('createdRow', createdRow);
            $scope.dtHFMUnit = DTOptionsBuilder.fromFnPromise($scope.hfmtable(HFM)).withOption('scrollCollapse', false)
        })
    }
    $scope.bindViewlegalentity();



    $scope.dtColumnsOwnership = [
       DTColumnBuilder.newColumn('s_no').withTitle('S.No').withClass('text-center').withOption('width', '53px'),
       DTColumnBuilder.newColumn('le_parent_name').withTitle('Owner').withClass('text-center').withOption('width', '300px'),
       DTColumnBuilder.newColumn('ownership').withTitle('Percentage').withClass('text-center').withOption('width', '75px'),
       DTColumnBuilder.newColumn('comments').withTitle('Comments').withOption('width', '100px')

       .renderWith(function (data, type, full, meta) {
           var fixeddata = '';
           if (data) {
               fixeddata = data.substring(0, 40);
           }
           return ' <p  title="' + data + '" >' + fixeddata + '</p>'

       }),

       DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withClass('text-center').withOption('width', '85px'),
       DTColumnBuilder.newColumn('streffective_dt').withTitle('Effective Date').withClass('text-center'),
       DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center').withOption('width', '85px'),
       DTColumnBuilder.newColumn(null).withTitle('Action').withClass('text-center').withOption('width', '115px').notSortable()
             .renderWith(actionsHtml)


    ];
    $scope.dtInstanceOwnership = {};
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(data, type, full, meta) {
        if ($scope.flag == 1) {

            return '<div class="text-center" > <img class="cursor" ng-show="{{' + data.displayHierarchy + '}}"  ng-click="openHierarchy(' + data.parent_id + ')"  src="../images/hierarchy.png" /  "  > </div>';
        }
        else {

            return '<div class="text-center"> <img class="cursor" ng-show="{{' + data.displayHierarchy + '}}"  ng-click="openHierarchy(' + data.parent_id + ')"  src="../images/hierarchy.png"  /> </div>';
        }
    }

    // Initialising the data table for HFMUnit Table

    $scope.dtColumnsHFMUnit = [
       DTColumnBuilder.newColumn('s_no').withTitle('S.No').withClass('text-center'),
       DTColumnBuilder.newColumn('hfm_label').withTitle('HFM Unit').withClass('text-center'),
       //.renderWith(function (data, type, full, meta) {
       //    return '<div> <img ng-click="openworkbook() class="pull-left" src="../images/edit.png" /  style="margin-left:10px;"  > ' + data + '</div>';

       //}),
       DTColumnBuilder.newColumn('segment').withTitle('Segment').withClass('text-center'),
       DTColumnBuilder.newColumn('comments').withTitle('BU/HFM Comment')

       .renderWith(function (data, type, full, meta) {
           var fixeddata = '';
           if (data) {
               fixeddata = data.substring(0, 50);
           }
           return ' <p  title="' + data + '" >' + fixeddata + '</p>'

       }),
       DTColumnBuilder.newColumn('erp').withTitle('ERP').withClass('text-center'),
           DTColumnBuilder.newColumn('streffective_dt').withTitle('Effective Date').withClass('text-center'),

       DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withClass('text-center'),

       DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center'),


    ];
    $scope.dtInstanceHFMUnit = {};

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

    $scope.openworkbook = function () {

        $scope.dtWorkbook = DTOptionsBuilder.fromSource($scope.dataUrlWorkbook).withOption('scrollCollapse', false);
        $scope.dtColumnsdtWorkbook = [
           DTColumnBuilder.newColumn('S_NO').withTitle('S.No').withClass('text-center'),
           DTColumnBuilder.newColumn('Workbook Number').withTitle('Workbook Number').withClass('text-center'),
           DTColumnBuilder.newColumn('Branch').withTitle('IsBranch').withClass('text-center'),
           DTColumnBuilder.newColumn('Jurisdiction').withTitle('Branch Jurisdiction').withClass('text-center'),
           DTColumnBuilder.newColumn('Updated_By').withTitle('Updated By').withClass('text-center'),
           DTColumnBuilder.newColumn('strUpdated_DT').withTitle('Updated Date').withClass('text-center'),


        ];
        $scope.dtInstanceWorkbook = {};

    };

    //tahseen

    $scope.edit = function () {
        $scope.LE_ID = $routeParams.id;
        $location.path("EditLegalEntity/" + $scope.LE_ID + "/" + $scope.periodvalue.code);
    }

    $scope.changeData = function (period) {

        if ($scope.dtOwnership != "undefined")
            delete $scope.dtOwnership;

        if ($scope.dtHFMUnit != "undefined")
            delete $scope.dtHFMUnit;

        $scope.bindViewlegalentity();

        // tahseen 22-01-2016
        //if (period.is_current == true && $rootScope.roleId == "ADMIN") {
        if (period.is_current == true) {
            $scope.showEdit = true;
            console.log($scope.showEdit)
        }
        else {
            $scope.showEdit = false;
        }
        // tahseen 22-01-2016
        //if (period.Period_ID == "2015Q4" && $rootScope.roleId == "ADMIN") {
        //    $scope.flag = 1;
        //}
        //if (period.Period_ID == "2016Q1" && $rootScope.roleId == "ADMIN") {
        //    $scope.flag = 2;
        //}
        if (period.Period_ID == "2015Q4") {
            $scope.flag = 1;
        }
        if (period.Period_ID == "2016Q1") {
            $scope.flag = 2;
        }
    };
    //tahseen

});










