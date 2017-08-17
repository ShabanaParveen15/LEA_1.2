GLET.controller('EditHFMUnitController', function ($scope, $q, $timeout, $rootScope, localStorageService, sessionService, constant, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $routeParams, $compile, $window, appSetting) {
    //$rootScope.userDetails = JSON.parse(sessionService.get('user'));  //Get userDetails
    //if ($rootScope.userDetails.role_id != 'ADMIN') {
    //    $location.path("HFMUnit");
    //}
    //$rootScope.username = localStorage.getItem('UserName');
    if (localStorage.getItem('role_id') != 'ADMIN') {
        $location.path("HFMUnit");
    }
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
    }, 1000);
    $rootScope.login = true;
    $rootScope.fname = localStorage.getItem('FNAME');
    $rootScope.lname = localStorage.getItem('LNAME');

    $scope.apiURL = constant;
    $scope.workComments = { comment: '' };

    $scope.init = function () {
 
        var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=" + (($routeParams.id) ? $routeParams.id : '');

        simpleFactory.getData(Url).then(function (re) {
            $scope.periodData = re;
            for (var i = 0; i < re.length; i++) {

                if (re[i].code === $routeParams.periodId) {
                    $scope.periodvalue = re[i];

                }
            }
            $scope.newHFM_ID = 0;
            var hfmid = (($routeParams.id) ? $routeParams.id : $scope.newHFM_ID);
            $scope.bindHFMUnit(hfmid, $scope.periodvalue.code);
        })
       
    }
    $scope.closealert = function () {
        $scope.suc = false;
    }
    $scope.closealert2 = function () {
        $scope.succ = false;
    }
     $scope.closealert3 = function () {
        $scope.err = false;
     }
     $scope.closealert4 = function () {
         $scope.er = false;
     }
    $scope.workbookDetails = function (workbookData) {
        var deferred = $q.defer();
        deferred.resolve(workbookData);
        return deferred.promise;
    }

    $scope.bindHFMUnit = function (hfmid,period) {

        if ($routeParams.id) {
            $scope.pagehead = "Edit";
            $scope.edit = true;
            $scope.viewTabs = true;

            var Url = appSetting.ServerPath + "apiGet/HFMUnit/GetHFMUnitByID?HFM_ID=" + hfmid + "&Period_id=" + period;

            simpleFactory.getData(Url).then(function (re) {
                
                $scope.hfmunit = re;
                $scope.leData = re.lehfm;
                var s = $scope.hfmunit, l = $scope.leData;
                $scope.HFM_LABEL = s.hfm_label;
                $scope.periodId = s.period_id;
                $scope.BU_COMMENTS = s.bu_comments;
                $scope.ERP = s.erp;
                $scope.Effective_Dt = s.streffective_dt;
                $scope.strHFM_Updated_DT = s.strupdated_dt;
                
                $scope.region = s.region_name;
              
                $scope.strIncorporated_Dt = s.strhfm_incorporated_dt;
                $scope.strAcquisition_Dt = s.strhfm_acquisition_dt;
                $scope.strDisposition_Dt = s.strhfm_disposition_dt;
                $scope.strMerge_Dt = s.strhfm_merge_dt;
                $scope.Updated_By = s.updated_by;

                workbookData = re.hfmworkbook;
                if(workbookData!=null)
                $scope.dtOwnership = DTOptionsBuilder.fromFnPromise($scope.workbookDetails(workbookData)).withOption('scrollCollapse', false).withOption('createdRow', createdRow);

                $scope.bindDropDown();
            })

            // Comment: Bind dropdowns here
            $scope.bindDropDown=function(){

                $scope.hfmLookups = appSetting.ServerPath + "apiGet/Lookup/GetAllHFMLookups?HFM_ID=" + hfmid + "&Period_id=" + period;
            simpleFactory.getData($scope.hfmLookups).then(function (response) {
               

                $scope.unmappedWorkbooks = response.workbooks;
                for (var i = 0; i < response.segments.length; i++) {

                    if (response.segments[i].description === $scope.hfmunit.segment) {
                        $scope.Segment = response.segments[i];

                    }
                }
                for (var i = 0; i < response.jurisdictions.length; i++) {

                    if (response.jurisdictions[i].description === $scope.hfmunit.country) {
                        $scope.country = response.jurisdictions[i];

                    }
                }

                for (var i = 0; i < response.users.length; i++) {

                    if (response.users[i].user_name === $scope.hfmunit.finance_contact) {
                        $scope.fl = response.users[i];

                    }
                }
                for (var i = 0; i < response.users.length; i++) {

                    if (response.users[i].user_name === $scope.hfmunit.Regional_Tax_Manager) {
                        $scope.rtm = response.users[i];

                    }
                }
                for (var i = 0; i < response.users.length; i++) {

                    if (response.users[i].user_name === $scope.hfmunit.updated_by) {
                        $scope.hupdatedBy = response.users[i];

                    }
                }
                $scope.segments = response.segments;
                $scope.countries = response.jurisdictions;
                $scope.fusers = response.users;
                $scope.rusers = response.users;
                $scope.husers = response.users;


            })
            }           // Comment: Bind dropdown ends

        }

        else {
            $scope.pagehead = "Add";
            $scope.edit = false;
            if ($routeParams.id && hfmid != 0) {
                $scope.viewTabs = false;
            }
           
            $scope.hfmLookups = appSetting.ServerPath + "apiGet/Lookup/GetAllHFMLookups?HFM_ID=" + hfmid + "&Period_id=" + period;
            simpleFactory.getData($scope.hfmLookups).then(function (response) {
                if(hfmid!==0){      
             for (var i = 0; i < response.segments.length; i++) {

                    if (response.segments[i].description === $scope.hfmunit.segment) {
                        $scope.Segment = response.segments[i];

                    }
                }
                for (var i = 0; i < response.jurisdictions.length; i++) {

                    if (response.jurisdictions[i].description === $scope.hfmunit.country) {
                        $scope.country = response.jurisdictions[i];

                    }
                }

                for (var i = 0; i < response.users.length; i++) {

                    if (response.users[i].user_name === $scope.hfmunit.finance_contact) {
                        $scope.fl = response.users[i];

                    }
                }
                for (var i = 0; i < response.users.length; i++) {

                    if (response.users[i].user_name === $scope.hfmunit.Regional_Tax_Manager) {
                        $scope.rtm = response.users[i];

                    }
                }
                for (var i = 0; i < response.users.length; i++) {

                    if (response.users[i].user_name === $scope.hfmunit.updated_by) {
                        $scope.hupdatedBy = response.users[i];

                    }
                }}
                $scope.unmappedWorkbooks = response.workbooks;
                $scope.segments = response.segments;
                $scope.countries = response.jurisdictions;
                $scope.fusers = response.users;
                $scope.rusers = response.users;
                $scope.husers = response.users;
            })
            var Url = appSetting.ServerPath + "apiGet/HFMUnit/GetHFMUnitByID?HFM_ID=" + hfmid + "&Period_id=" + period;
           
            simpleFactory.getData(Url).then(function (re) {
                console.log(JSON.stringify(re))

                $scope.hfmunit = re;
                $scope.leData = re.lehfm;
                var s = $scope.hfmunit, l = $scope.leData;
                $scope.HFM_LABEL = s.hfm_label;
                $scope.periodId = s.period_id;
                $scope.BU_COMMENTS = s.bu_comments;
                $scope.ERP = s.erp;
                $scope.region = s.region_name;
                $scope.Effective_Dt = s.streffective_dt;
                $scope.strHFM_Updated_DT = s.strupdated_dt;
              
                $scope.strIncorporated_Dt = s.strhfm_incorporated_dt;
                $scope.strAcquisition_Dt = s.strhfm_acquisition_dt;
                $scope.strDisposition_Dt = s.strhfm_disposition_dt;
                $scope.strMerge_Dt = s.strhfm_merge_dt;
                $scope.Updated_By = s.updated_by;

                workbookData = re.hfmworkbook;
                if (workbookData != null)
                    $scope.dtOwnership = DTOptionsBuilder.fromFnPromise($scope.workbookDetails(workbookData)).withOption('scrollCollapse', false).withOption('createdRow', createdRow);

            })

        }
    }
   
    
    $scope.dtColumnsOwnership = [
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
         DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center'),
          DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().withClass('text-center')
               .renderWith(actionsHtml)
    ];
    $scope.dtInstanceOwnership = {};

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(data, type, full, meta) {
        return '<div class="text-center" > <a > <img class="cursor" ng-click="deleteWorkbook(' + data.workbook_id + ')"    src="../images/delete.png" /  > </a></div>';
    }

    $scope.deleteWorkbook = function (workbookId)
    {
        var Url = appSetting.ServerPath + "api/HFMUnit/DeleteHFMWorkbook";
        $scope.data = {
            "hfm_id": (($routeParams.id) ? $routeParams.id : $scope.newHFM_ID),
            "workbook_id": workbookId,
            "period_id": $scope.periodvalue.code,
            
            "comments":$('cmnts').val(),
            "updated_by": localStorage.getItem('USERNAME')
        };
        $http({

            method: 'POST',
            url: Url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {
            if ($routeParams.id)
                $scope.newHFM_ID = $routeParams.id;
            else
                $scope.newHFM_ID = $scope.newHFM_ID;

            if ($scope.dtOwnership != "undefined")
                delete $scope.dtOwnership;

            $scope.bindHFMUnit($scope.newHFM_ID, $scope.periodvalue.code);
            
            $scope.suc = true;
            $scope.er = false;
            $scope.success = 'Workbook Deleted Successfully';
        })
           .catch(function (err) {
               console.log(err);
           })

    }
    $scope.addWorkbook = function (workbk, comm) {
        if ($('#textWorkbook').val() !== workbk.workbook_name) {
            $scope.er = true;
            $scope.suc = false;
            $scope.error = 'Please enter workbook name.';
            return;
        }

        if (workbk === undefined ) {
            $scope.er = true;
            $scope.suc = false;
            $scope.error = 'Please enter workbook name.';
        } 
        var strEffective_Dt =  $('#Effective_Dt').val();
       
        var Url = appSetting.ServerPath + "api/HFMUnit/UpdateHFMWorkbook";
        $scope.Updated_By = "1";
        $scope.data = {
            "hfm_id": (($routeParams.id) ? $routeParams.id : $scope.newHFM_ID),
            "workbook_id": workbk.workbook_id,
            "period_id": $scope.periodvalue.code,
            "effective_dt": strEffective_Dt,
            "comments": comm,
            "updated_by": localStorage.getItem('USERNAME')
        };
        $http({

            method: 'POST',
            url:Url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {
          
            $scope.workComments = { comment: '' };
            if ($routeParams.id)
                $scope.newHFM_ID = $routeParams.id;
            else
                $scope.newHFM_ID = $scope.newHFM_ID;

            if ($scope.dtOwnership != "undefined")
                delete $scope.dtOwnership;

            $scope.bindHFMUnit($scope.newHFM_ID, $scope.periodvalue.code);
            $('#textWorkbook').val('');
            $('#cmnts').val('');
            $('#Effective_Dt').val('');
            $scope.suc = true;
            $scope.er = false;
           
            $scope.success = 'Workbook Added Successfully';
        })
           .catch(function (err) {
               console.log(err);
           })

    }

    $scope.add = function () {
        var name = $('#hfmName').val();
        if ($.trim(name) == "") {
             $scope.err = true;
             $scope.errMessage = 'Please enter Business Unit label.';
             return;
        }
       
        var Url = appSetting.ServerPath + "api/HFMUnit/UpdateHFMUnit";
        $scope.data = {
            
            "hfm_label":$('#hfmName').val(),
            "segment":(($scope.Segment) ? $scope.Segment.segment_code : null),
            "jurisdiction":(($scope.country) ? $scope.country.country_code : null) ,
            "erp": $('#erp').val(),
            "hfm_disposition_dt":$('#Disposition_Dt').val(),
            "hfm_merge_dt":$('#Merge_Dt').val(),
            "hfm_incorporated_dt": $('#Incorporated_Dt').val(),
            "hfm_acquisition_dt":$('#Acquisition_Dt').val(),
            "Regional_Tax_Manager":(($scope.rtm) ? $scope.rtm.user_id : null) ,
            "finance_contact": (($scope.fl) ? $scope.fl.user_id : null) ,
            "bu_comments": $('#bucomments').val(),
            "region_name": $('#region').val(),
            "updated_by": localStorage.getItem('USERNAME'),
            "period_id": $scope.periodvalue.code

        };
        $http({

            method: 'POST',
            url: Url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {
           
            $scope.newHFM_ID = res.data.HFM_ID;
            if ($scope.newHFM_ID.match(/^\d+$/)) {
                $scope.viewTabs = true;
                var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=" + $scope.newHFM_ID;

                simpleFactory.getData(Url).then(function (re) {
                    $scope.periodData = re;
                    $scope.periodvalue = re[0];

                    $scope.bindHFMUnit($scope.newHFM_ID, $scope.periodvalue.code);
                })
                // $scope.loadOwner();
                $scope.err = false;
                $scope.succ = true;
                $scope.hfmSuccess = 'Business Unit Added Successfully';
            }
            else {
                $scope.err = true;
                $scope.succ = false;
                $scope.errMessage = res.data.HFM_ID;
            }
          
            
            $window.scrollTo(0, 0);

        })
           .catch(function (err) {
               console.log(err);
           })


    }
    $scope.save = function () {
        if($('#hfmName').val() == ""){
             $scope.err = true;
             $scope.errMessage = 'Please enter Business Unit label.';
             retun;
        }
       
        var Url = appSetting.ServerPath + "api/HFMUnit/UpdateHFMUnit";
        $scope.data = {
            "hfm_id": $routeParams.id,
            "hfm_label": $scope.HFM_LABEL,
            "segment": (($scope.Segment) ? $scope.Segment.segment_code: null) ,
            "jurisdiction": (($scope.country) ? $scope.country.country_code: null),
            "erp": $('#erp').val(),
            "hfm_disposition_dt": (($scope.strDisposition_Dt) ? $('#Disposition_Dt').val(): null),
            "hfm_merge_dt":(($scope.strMerge_Dt) ?  $('#Merge_Dt').val(): '') ,
            "hfm_incorporated_dt":(($scope.strIncorporated_Dt) ?$('#Incorporated_Dt').val(): null) ,
            "hfm_acquisition_dt": (($scope.strAcquisition_Dt) ?$('#Acquisition_Dt').val():null),
            "Regional_Tax_Manager": (($scope.rtm) ?$scope.rtm.user_id: null),
            "region_name": $('#region').val(),
            "finance_contact": (($scope.fl) ?$scope.fl.user_id: null),
            "bu_comments": $('#bucomments').val(),
            "updated_by": localStorage.getItem('USERNAME'),
            "period_id": $scope.periodvalue.code
        };

        

        $http({

            method: 'POST',
            url: Url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {
            $scope.succ = true;
            $scope.err = false;
            $scope.hfmSuccess = 'Business Unit Updated Successfully';
            $scope.bindHFMUnit($routeParams.id, $scope.periodvalue.code);
            
            $window.scrollTo(0, 0);
        })
           .catch(function (err) {
               console.log(err);
           })

    }


    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.changeData = function (period) {

        //clearing the alerts
        $scope.err = false;
        $scope.succ = false;
        $scope.error = false;
        $scope.suc = false;
       $scope.bindHFMUnit($routeParams.id, period.code);

        
        if (period.is_current == true) {
            $scope.showEdit = true;
            console.log($scope.showEdit)
        }
        else {
            $scope.showEdit = false;
        }
       
        if (period.code == "2015Q4") {
            $scope.flag = 1;
        }
        if (period.code == "2016Q1") {
            $scope.flag = 2;
        }
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
});