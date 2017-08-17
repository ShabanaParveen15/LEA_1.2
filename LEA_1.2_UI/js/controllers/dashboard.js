GLET.controller('DashboardController', function ($scope, constant, $q, $rootScope, $uibModal, $filter, localStorageService, sessionService, DTOptionsBuilder, DTColumnDefBuilder, $compile, $location, $log, $http, DTColumnBuilder, simpleFactory, $window, $timeout, appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
        $('.AdvanceFilter').attr('title', 'Advance Filter');
    }, 1000);
    $rootScope.role = localStorage.getItem('role_id');   // ADD edit dependency on role
    $rootScope.login = true;
    $rootScope.fname = localStorage.getItem('FNAME');
    $rootScope.username = localStorage.getItem('USERNAME');
    $rootScope.lname = localStorage.getItem('LNAME');
    //$rootScope.username = localStorage.getItem('UserName');
    $scope.showdashboard();   //Comment: Header Tabs active issue (When type in url)
   
    $scope.apiURL = constant;   // Global var URL
    $scope.init = function () {
    }

    $scope.Advancefilter = true;
    $scope.Advancefiltershow = false;
    $scope.hideAF = true;
    $scope.AFilter = true;
    $scope.Jurisdiction = {};
    $scope.Status = {}
    $scope.segment = {};
    $scope.HFM = {};
    $scope.Work = {};
    $scope.Bch = {};
    $scope.periodvalue = {};

    $scope.selectedLE = []; 



    var Url = $scope.apiURL + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=";
    simpleFactory.getData(Url).then(function (re) {
        $scope.periodData = re;
        angular.forEach($scope.periodData, function (obj, i) {
            if (obj.is_current == true) {
                $scope.periodvalue = obj;

                $scope.bindDashboard();
            }
        })
    })




    var AFUrl = $scope.apiURL + "apiGet/Lookup/GetAdvancedFilters";
    simpleFactory.getData(AFUrl).then(function (response) {
        $scope.leJurisdiction = response.jurisdictions;
        $scope.leStatus = response.lestatuses;
        $scope.hfmSegment = response.segments;
        $scope.hfmUnit = response.lookuphfms;
        $scope.workbook = response.lookupworkbooks;
        $scope.branch = [{
            "Branch_id": 1,
            "description": "Yes"
        }, {
            "Branch_id": 0,
            "description": "NO"
        }]
    })




    //Comment : Initaialize DT on root of the controller first , to avoid buttons error
    var dataUrl = $scope.apiURL + "apiGet/MappingDashboard/GetMappingDashboardByFilters?jurisdiction=&status=&segment=&branch=&hfmUnit=&workbook=&periodId=" + $scope.periodvalue.code;
    $scope.dtOptions = DTOptionsBuilder.fromSource(dataUrl)

    $scope.bindDashboard = function () {

        if (!$scope.Jurisdiction.country_code) {
            $scope.Jurisdiction.country_code = '';
        } else {
            if ($scope.Jurisdiction.country_code.indexOf("'") < 0) {
                $scope.Jurisdiction.country_code = "'" + $scope.Jurisdiction.country_code + "'";
            }
        }
        if (!$scope.Status.le_status_code) {
            $scope.Status.le_status_code = '';
        } else {
            if ($scope.Status.le_status_code.indexOf("'") < 0) {
                $scope.Status.le_status_code = "'" + $scope.Status.le_status_code + "'";
            }
        }
        if (!$scope.segment.segment_code) {
            $scope.segment.segment_code = '';
        } else {
            if ($scope.segment.segment_code.indexOf("'") < 0) {
                $scope.segment.segment_code = "'" + $scope.segment.segment_code + "'";
            }
        }
        if (!$scope.HFM.hfm_id) {
            $scope.HFM.hfm_id = '';
        }
        else {
        }
        if (!$scope.Work.workbook_id) {
            $scope.Work.workbook_id = '';
        } else {
        }
        if (!($scope.Bch.Branch_id === 1 || $scope.Bch.Branch_id === 0)) {
            $scope.Bch.Branch_id = '';
        } else {
        }

        var dataUrl = $scope.apiURL + "apiGet/MappingDashboard/GetMappingDashboardByFilters?jurisdiction=" + $scope.Jurisdiction.country_code + "&status=" + $scope.Status.le_status_code + "&segment=" + $scope.segment.segment_code + "&branch=" + $scope.Bch.Branch_id + "&hfmUnit=" + $scope.HFM.hfm_id + "&workbook=" + $scope.Work.workbook_id + "&periodId=" + $scope.periodvalue.code;
        $scope.dtOptions = DTOptionsBuilder.fromSource(dataUrl)
             .withOption('createdRow', createdRow)
            .withDOM('<"top"lf>rt<"bottom"pi>')
            .withPaginationType('full_numbers')
            .withButtons([
                'copy',
                'print',
                'excel', {
                    text: '',
                    className: 'AdvanceFilter',
                    key: '1',
                    action: function (e, dt, node, config) {
                        $scope.$apply(function () {
                            if ($scope.Advancefiltershow) {
                                $scope.Advancefiltershow = false;
                                $scope.Advancefilter = true;
                                $scope.AFilter = true;
                            } else {
                                $scope.Advancefiltershow = true;
                                $scope.Advancefilter = false;
                                $scope.AFilter = false;
                            }
                        });
                    }
                }
            ])
    }

    $scope.dtColumns = [
           DTColumnBuilder.newColumn(null).withTitle('Legal Entity Name').withOption('width', '180px')
           .renderWith(function (data, type, full, meta) {
               return '<div class="left band" style="background-color: ' + data.le_color + '"></div><a class="left"  style="margin-left:8px;" ng-href="#/ViewLegalEntity/' + data.le_id + "/" + $scope.periodvalue.code + '">' + data.le_name + ' </a>';
           }),
           DTColumnBuilder.newColumn(null).withTitle('HFM BU Name').withOption('width', '100px')
           .renderWith(function (data, type, full, meta) {
               return '<a ng-href="#/ViewHFMUnit/' + data.hfm_id + "/" + $scope.periodvalue.code + '">' + data.hfm_label + ' </a>';
           }),
           DTColumnBuilder.newColumn('workbook_num').withTitle('Tax Provision Wrbk').withOption('width', '120px'),
           DTColumnBuilder.newColumn('le_status').withTitle('LE Status').withOption('width', '73px'),
           DTColumnBuilder.newColumn('juristriction').withTitle('Jurisdiction').withOption('width', '157px')
           .renderWith(function (data, type, full, meta) {
               var imgstr = "";
               if (data !== null) {
                   imgstr = data.substring(data.lastIndexOf("(") + 1, data.lastIndexOf(")"))
                   return '<div style="float:left" class="flag flag-' + imgstr.toLowerCase() + '"></div><div style="float:left;margin-left:5px;">' + data + '</div>';
               } else {
                   return '<div></div>';
               }
           }),
           DTColumnBuilder.newColumn('segment').withTitle('Segment').withClass('text-center').withOption('width', '54px'),
           DTColumnBuilder.newColumn('branch').withTitle('Branch').withClass('text-center').withOption('width', '42px'),
           DTColumnBuilder.newColumn('strupdated_dt').withTitle('Date Updated').withClass('text-center').withOption('width', '109px'),
           DTColumnBuilder.newColumn(null).withTitle('Chart').notSortable().withClass('text-center').withOption('width', '50px')
           .renderWith(actionsHtml)
    ];
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
    function actionsHtml(data, type, full, meta) {
        return '<div class="text-center" > <a > <img ng-click="edit(' + data.le_id + ')" ng-show="{{' + data.displayHierarchy + '}}" src="../images/hierarchy.png" /  > </a></div>';
    }
    $scope.edit = function (id) {

        var Url = $scope.apiURL + "apiget/hierarchytool/gethierarchychart?le_id=" + id + "&periodid=" + $scope.periodvalue.code + "&Percentage=";
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
        var url = $scope.apiURL + "apiGet/Lookup/GetHierarchyLELookup?PERIOD_ID=" + $scope.periodvalue.code;
        simpleFactory.getData(url).then(function (data) {
            legalentities = data.legalentities;
            jurisdictions = data.jurisdictions;
        });

    }

    $scope.resetAF = function () {
        $scope.Jurisdiction = {};
        $scope.Status = {}
        $scope.segment = {};
        $scope.HFM = {};
        $scope.Work = {};
        $scope.Bch = {};

        $scope.multipleValue = {};
        $scope.multipleValue.data = [];

        $scope.bindDashboard();
    }

    $scope.dtInstance = {};
    $scope.changeData = function (period) {
        $scope.Jurisdiction = {};
        $scope.Status = {};
        $scope.segment = {};
        $scope.HFM = {};
        $scope.Work = {};
        $scope.Bch = {};

        $scope.bindDashboard();  //Comment : Call main function
    };

    // Comment : Multiple LE select addition and deletion 
    $scope.multipleValue = {};
    $scope.multipleValue.data = [];
    $(document).on('click', '.ui-select-match-close', function () {
        $scope.multipleLE();
    });
    $scope.multipleLE = function () {
        var temp = "";
        for (var i = 0; i < $scope.multipleValue.data.length; i++) {
            temp = temp + "'" + $scope.multipleValue.data[i].le_status_code + "',";
        }
        $scope.Status.le_status_code = temp.substring(0, temp.length - 1);
        $scope.bindDashboard();
    }






});
GLET.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, prompt, $rootScope, $location, $anchorScroll, items, simpleFactory) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

GLET.filter('parseJur', function () {
    return function (value) {
        if (!value) return '';
        value = value.substring(value.length - 3, value.length - 1)
        return value.toLowerCase();
    };
});