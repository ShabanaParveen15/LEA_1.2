GLET.controller('TaxWorkbookController', function ($scope, sessionService,$timeout,localStorageService, constant, $uibModal, DTOptionsBuilder, $rootScope, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $routeParams, $compile,appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
    }, 1000);
    $rootScope.lname = localStorage.getItem('LNAME');
    $rootScope.fname = localStorage.getItem('FNAME');
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

    //$rootScope.role = (sessionService.get('role') === "true");   // ADD edit dependency on role
    $rootScope.userDetails = JSON.parse(sessionService.get('user'));  //Get userDetails
    $rootScope.login = true;

    $rootScope.show = false;
    $rootScope.fail = "";
    $rootScope.showp = false;
    $rootScope.pass = "";
    $scope.init = function () {
        $scope.apiURL = constant;   // Global var URL
        $rootScope.apiURL = constant;
       

        wrbknumhtml = "";
        commenthtml = "";
        $scope.workbookid = "";
        jurhtml = "";
        branchhtml = "";
        $scope.btnEdit = true;
        var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=";
        simpleFactory.getData(Url).then(function (re) {

            $scope.periodData = re;
            angular.forEach($scope.periodData, function (obj, i) {
                if (obj.is_current == true) {

                    $scope.periodvalue = obj;
                    bindWorkbook();
                }

            })
            ;
            simpleFactory.getData(appSetting.ServerPath + "apiGet/Lookup/GetAllWorkbookLookups").then(function (re) {

                $rootScope.jurisdictions = re.jurisdictions;


            })


        })
    }


    bindWorkbook = function () {
        $scope.dataUrltaxWorkbook = appSetting.ServerPath + "apiGet/Workbook/GetWorkbookDashboard?Period_id=" + $scope.periodvalue.code;
        // Initialising the data table for HFMWorkbook Table
        $scope.dttaxWorkbook = DTOptionsBuilder.fromSource($scope.dataUrltaxWorkbook).withOption('responsive', true).withOption('fnRowCallback', rowCallback).withOption('createdRow', createdRow)
        .withDOM('<"top"lf>rt<"bottom"pi>')
                    .withPaginationType('full_numbers')
                    .withButtons([
                        'copy',
                        'print',
                        'excel'

                    ])
        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            return nRow;
        }
        $scope.newSource = $scope.dataUrltaxWorkbook;
        $scope.reloadData = function () {
            var resetPaging = false;
            $scope.dtInstancetaxWorkbook.reloadData();
        }
        $scope.callback = function (json) {
            console.log(json);
        }
       
        $scope.dtColumnstaxWorkbook = [
           DTColumnBuilder.newColumn('workbook_num').withTitle('Workbook Number').withClass('text-center'),
           DTColumnBuilder.newColumn('branch').withTitle('Branch').withClass('text-center'),
           DTColumnBuilder.newColumn('branch_jur_iso_description').withTitle('Branch Jurisdiction').withClass('text-center'),

           DTColumnBuilder.newColumn(null).withTitle('Comments')
           .renderWith(function (data, type, full, meta) {
               var fixeddata = '';
               if (data.comments) {
                   fixeddata = data.comments.substring(0, 50);
               }
               return ' <p id="' + data.workbook_id + '" title="' + data.comments + '">' + fixeddata + '</p>'

           }),

           DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withClass('text-center'),
           DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center'),
           DTColumnBuilder.newColumn(null).withTitle('Action').withOption('width', '7%').notSortable().withClass('text-center')

           .renderWith(actionsHtml)

        ];
        $scope.dtInstancetaxWorkbook = {};

    }
    function actionsHtml(data, type, full, meta) {

        if ($rootScope.role == true) {
            return '<div> <img ng-click="edit($event)"  class="pull-left" src="../images/edit.png" style="margin-left:20px;cursor:pointer" /><img ng-click="save($event)"  class="ng-hide pull-left" src="../images/savee.png" style="margin-left:8px;cursor:pointer"/><img ng-click="cancel($event)" class="ng-hide pull-left" src="../images/cancell.png" style="margin-left:8px;cursor:pointer" />  </div>';
        } else {
            return '<div> </div>';

        }
    }
    $scope.edit = function (event) {
      
        event.target.className = "ng-hide pull-left";

        event.target.nextSibling.className = "pull-left";
        event.target.nextSibling.nextSibling.className = "pull-left";

        var row = event.target.parentElement.parentElement.parentElement;

        $.each(row.cells, function (index, cell) {
            var text = cell.textContent;

            if (index == 4)
                return false;
            else if (index == 0) {
                wrbknumhtml = cell.innerHTML;
                cell.innerHTML = '<input type="text" id="wbn" class="form-control" value="' + text + '"/>';
            }
            else if (index == 1) {
                branchhtml = cell.innerHTML;
                cell.innerHTML = '<select  class="form-control"><option id="Yes">Yes</option><option id="No">No</option></select>';
                var option = document.getElementById(text);
                option.selected = "true";
            }
            else if (index == 2) {
                jurhtml = cell.innerHTML;
                var html = '<select id="jur" class="form-control" value="' + jurhtml + '" > <option disabled id="-1" selected> -- select an option -- </option>'
                $.each($rootScope.jurisdictions, function (index, jur) {
                    if (jurhtml == jur.description)
                        html += '<option id=' + jur.country_code + ' selected="true">' + jur.description + '</option>';
                    else
                        html += '<option id=' + jur.country_code + '>' + jur.description + '</option>';

                })
                html += '</select>';
                cell.innerHTML = html;
                if ($("#jur option[value='" + text + "']").length > 0) {
                    $("#jur option[value='" + text + "']").prop('selected', true);
                }
               
            }
            else if (index == 3) {
                $scope.workbookid = cell.childNodes[1].id;
                commenthtml = cell.innerHTML;
                cell.innerHTML = '<input type="text" class="form-control" value="' + text + '"/>';
            }


        });
    }
    $scope.save = function (event) {
      

        var row = event.target.parentElement.parentElement.parentElement;

        $.each(row.cells, function (index, cell) {

            if (index === 0) {
                $scope.WBN = cell.firstChild.value

            }
            if (index === 1) {
                if (cell.firstChild.value == "Yes")
                    $scope.isBranch = true;
                else
                    $scope.isBranch = false;

            }
            if (index === 2) {
                
                    $scope.branchJ = cell.firstChild[cell.firstChild.selectedIndex].id
                

                if ($scope.branchJ == "") {
                    $scope.branchJ = null;
                }
                else if($scope.branchJ=="-1")
                    $scope.branchJ = null;

               
            }
            if (index === 3) {
                $scope.commt = cell.firstChild.value
            }
            if (index === 4) {
                $scope.updatedby = cell.firstChild.value

            }
            if (index === 5) {
                $scope.WupdatedDate = cell.firstChild.value;
                return false;
            }
         

        });
        if ($scope.WBN == "") {
            document.getElementById("wbn").style.borderColor = "red";
            return false;
        }
        var data = {
            "workbook_id": $scope.workbookid,
            "workbook_num": $scope.WBN,
            "period_id": $scope.periodvalue.code,
            "is_branch": $scope.isBranch,
            "branch_jur_iso": $scope.branchJ,
            "comments": $scope.commt,
            "updated_by": $rootScope.userDetails.user_name
        }
       
        $http({

            method: 'POST',
            url: appSetting.ServerPath + 'api/Workbook/UpdateWorkbook',

            headers: {

                'Content-Type': 'application/json'

            },

            data: data

        }).then(function (response, status, headers, config) {
            
            if (response.data.WORKBOOK_ID == "A Workbook with the same workbook number exists for this quarter.") {
                $rootScope.show = true;
                $rootScope.showp = false;
                $rootScope.fail = response.data.WORKBOOK_ID;
            }else {
                $rootScope.showp = true;
                $rootScope.show = false;
                $rootScope.pass = "Workbook updated successfully";
                $scope.reloadData();
            }
            
           
        })


    }
    $scope.closealert = function () {
        $rootScope.show = false;
    }
    $scope.closealert2 = function () {
        $rootScope.showp = false;
    }
    $scope.cancel = function (event) {
      
        event.target.className = "ng-hide pull-left";

        event.target.previousSibling.className = "ng-hide pull-left";
        event.target.previousSibling.previousSibling.className = "ng-show pull-left";

        var row = event.target.parentElement.parentElement.parentElement;

        $.each(row.cells, function (index, cell) {
            if (index == 4)
                return false;
            else if (index == 0) {
                cell.innerHTML = wrbknumhtml;
            }
            else if (index == 1) {
                cell.innerHTML = branchhtml;
            }
            else if (index == 2) {
                cell.innerHTML = jurhtml;
            }
            else if (index == 3) {
                cell.innerHTML = commenthtml;
            }
            else {
                var text = cell.firstChild.value;
                cell.innerHTML = text;
            }

        });
    }

    $scope.changeData = function (period) {
        bindWorkbook();

    }
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT

        $compile(angular.element(row).contents())($scope);
    }

    $scope.open = function (size) {

        $rootScope.periodvalue = $scope.periodvalue;
        simpleFactory.getData(appSetting.ServerPath + "apiGet/Lookup/GetAllWorkbookLookups").then(function (re) {

            $rootScope.jurisdictions = re.jurisdictions;
            $rootScope.branch = [{ "Branch_id": 1, "Description": "Yes" }, { "Branch_id": 0, "Description": "NO" }]
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'AddModal.html',
                controller: 'ModalInstanceCtrl',
                size: 'md'

            });

            modalInstance.result.then(function () {
                $scope.reloadData();

            }, function () {
                //alert('Cancel');
            });
        })
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

});
GLET.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $rootScope, simpleFactory, $http, DTOptionsBuilder, $window) {

    $scope.ok = function () {
        var ok = 0;
        document.getElementById("wn").style.border = "none";
        

        if ($scope.wrkbksrch == '' || !($scope.wrkbksrch)) {
            document.getElementById("wn").style.border = "1px solid red";
            ok++;
        }



        if (ok == 0) {

         if (typeof $scope.Bch=="undefined") {
            $scope.Bch = true
        }

            if ($scope.Bch.Branch_id == "Yes") {

                $scope.Bch = true
            }
            
            else {
                $scope.Bch = false
            }

            if (typeof $scope.Jurisdiction == "undefined") {
                $scope.Jurisdiction = '';
            }
            if (typeof $scope.comments == "undefined") {
                $scope.comments = '';
            }
          

            var data = {
                "workbook_num": $scope.wrkbksrch,
                "period_id": $rootScope.periodvalue.code,
                "is_branch": $scope.Bch,
                "branch_jur_iso": $scope.Jurisdiction.country_code,
                "comments": $scope.comments,
                "updated_by": $rootScope.userDetails.user_name
            }
            $http({

                method: 'POST',
                url: $rootScope.apiURL + 'api/Workbook/UpdateWorkbook',

                headers: {

                    //'Authorization': 'Basic dGVzdDp0ZXN0',
                    'Content-Type': 'application/json'

                },

                data: data

            }).then(function (response, status, headers, config) {

                $scope.wrkbksrch = "";
                $scope.Bch = {};
                $scope.Jurisdiction = {};
                $scope.comments = '';
                if (response.data.WORKBOOK_ID == "A Workbook with the same workbook number exists for this quarter.") {
                    $rootScope.show = true;
                    $rootScope.showp = false;
                    $rootScope.fail = response.data.WORKBOOK_ID;
                } else {
                    $rootScope.showp = true;
                    $rootScope.show = false;
                    $rootScope.pass = "Workbook added successfully";
                }
                $uibModalInstance.close();

            })
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});








