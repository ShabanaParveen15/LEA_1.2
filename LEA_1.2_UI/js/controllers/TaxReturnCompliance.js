GLET.controller('TaxReturnController', function ($scope, $filter, localStorageService, authService, $timeout, sessionService, $rootScope, $uibModal, $compile, $rootScope, sessionService, $q, constant, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $location, $window, appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
    }, 1000);
    $rootScope.role = (sessionService.get('role') === "true");
    
    $rootScope.fname = localStorage.getItem('FNAME');// ADD edit dependency on role
    $rootScope.lname = localStorage.getItem('LNAME');

   
    $scope.showtaxreturncomp();   //Comment: Header Tabs active issue (When type in url)
    $scope.init = function () {
    }
    $rootScope.login = true;
    $scope.apiURL = constant;
    // Global var URL
   
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
        $location.path("EditLegalEntity/" + $scope.periodvalue.code);
    }
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
    $rootScope.activeTab = [];

    $scope.dtColumns = [
       DTColumnBuilder.newColumn(null).withTitle('Legal Entity Name').withOption()
           .renderWith(function (data, type, full, meta) {
               return '<div class="left band" style="background-color: ' + data.le_color + '"></div><a class="left"  style="margin-left:8px;" ng-href="#/ViewLegalEntity/' + data.le_id + "/" + $scope.periodvalue.code + '">' + data.le_name + ' </a>';
           }),
            DTColumnBuilder.newColumn(null).withTitle('Form 1120 IC-DISC').withOption('width', '225px')
           .renderWith(function (data, type, full, meta) {
               return '<div style="padding-left:25px;padding-right:25px;height: 34px;">	<a ng-click="SetEntityName(row.entity,1)" ng-href="#/EditTaxReturnForm">		<img     tooltip="Edit" tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/edit.png"/>	</a>	<a style="padding-left:40px;cursor:pointer;" ng-click="SetEntityName1(row.entity,0)" ng-href="#/EditTaxReturnForm" ><img  tooltip="Preview"  tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/preview.png"/>	</a>		<a style="padding-left:40px; cursor:pointer;"  >		<img   ng-click="downloadpdf1120()"  tooltip="Download" tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/download.png"/>	</a></div>';
           }),
           DTColumnBuilder.newColumn(null).withTitle('Form 1120 IC-DISC Schedule P').withOption('width', '225px')
           .renderWith(function (data, type, full, meta) {
               return '<div style="padding-left:25px;padding-right:25px;height: 34px;" >	<a  >		<img     tooltip="Edit" tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/disable-edit.png"/>	</a>	<a style="padding-left:40px;cursor:pointer;" ><img  tooltip="Preview"  tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/disable-preview.png"/>	</a>		<a style="padding-left:40px; cursor:pointer;"  >		<img   ng-click="downloadpdfSckP()"  tooltip="Download" tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/download.png"/>	</a></div>';
           }),
           DTColumnBuilder.newColumn(null).withTitle('Form 1120 IC-DISC Schedule K').withOption('width', '225px')
           .renderWith(function (data, type, full, meta) {
               return '<div style="padding-left:25px;padding-right:25px;height: 34px;" >	<a ng-click="grid.appScope.SetEntityName(row.entity)" ng-href="#/ScheduleKEditTaxReturnForm">		<img     tooltip="Edit" tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/edit.png"/>	</a>	<a style="padding-left:40px;cursor:pointer;" ng-click="grid.appScope.preview(row)" ng-href="#/ScheduleKEditTaxReturnForm" ><img  tooltip="Preview"  tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/preview.png"/>	</a>		<a style="padding-left:40px; cursor:pointer;"  >		<img   ng-click="downloadpdfSckK()"  tooltip="Download" tooltip-placement="top"  tooltip-append-to-body="true" src="images/tax_return_compliance/download.png"/>	</a></div>';
           })
    ];
    $rootScope.previewClicked = false;
    $scope.SetEntityName=function(object,index)
    {
      
        $rootScope.activeTab[index] = true;
        // use emit to call pdfPrewiew
        //CallpdfPrewiew
       

    }
    $scope.SetEntityName1 = function (object, index) {

      

        if (index == 0) {
            $rootScope.activeTab[1] = true;
            $rootScope.previewClicked = true;
            
        }
        else
        {
            $rootScope.activeTab[index] = true;
           
        }
    }
  
    $scope.downloadpdfSckK = function()
    {
        var link = window.document.createElement("a");
        link.download = "FORM_1120_IC_DISC_SCHEDULE_K_2_230_1.zip";
        link.href = "../Test/Pdfs/FORM_1120_IC_DISC_SCHEDULE_K_2_230_1.zip";
        link.click();
    }
    $scope.downloadpdf1120 = function () {
        var link = window.document.createElement("a");
        link.download = "FORM_1120-IC-DISC_2_230_1.pdf";
        link.href = "../Test/Pdfs/FORM_1120-IC-DISC_2_230_1_(2)_(2).pdf";
        link.click();
    }
    $scope.downloadpdfSckP = function () {
        var link = window.document.createElement("a");
        link.download = "FORM_1120_IC_DISC_SCHEDULE_P_2-230-1_58.zip";
        link.href = "../Test/Pdfs/FORM_1120_IC_DISC_SCHEDULE_P_2-230-1_58.zip";
        link.click();
    }

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

