GLET.controller('EditLegalEntityController', function ($scope, $q, $location, $rootScope, localStorageService, sessionService, constant, $timeout, $uibModal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $routeParams, $compile, $window, appSetting, $log) {
    //$rootScope.userDetails = JSON.parse(sessionService.get('user'));  //Get userDetails
    if (localStorage.getItem('role_id') != 'ADMIN') {
        $location.path("LegalEntity");
    }
    $rootScope.fname = localStorage.getItem('FNAME');
    $rootScope.lname = localStorage.getItem('LNAME');
    //$scope.Updated_By = localStorage.getItem('UserName');
    //try {
    //    if (localStorage.getItem('role_id') == 'ADMIN') {
    //        $rootScope.role = true;
    //    }
    //    else {
    //        $rootScope.role = false;
    //    }
    //}
    //catch (ex) {
    //    $rootScope.role = false;
    //}
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
        $("[name='my-checkbox']").bootstrapSwitch();

    }, 1000);
    $rootScope.login = true;


    $scope.apiURL = constant;
    $scope.readonly = true;
    $scope.clickflag = 0;
    $scope.HFMjs = '';
    $scope.BUcomments = { comment: '' };
    $scope.ownercomments = { comment: '' };
    var commentHtml, percentageHtmls
    $scope.init = function () {

        var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=" + (($routeParams.id) ? $routeParams.id : "") + "&hfm_id=";

        simpleFactory.getData(Url).then(function (re) {
            $scope.periodData = re;
            for (var i = 0; i < re.length; i++) {
                if (re[i].code === $routeParams.periodId) {
                    $scope.periodvalue = re[i];
                }
            }
            $scope.newLE_ID = 0;
            var leid = (($routeParams.id) ? $routeParams.id : $scope.newLE_ID);
            $scope.bindLEUnit(leid, $scope.periodvalue.code);
        })

    }


    $scope.OwnerDetails = function (ownerData) {
        var deferred = $q.defer();
        deferred.resolve(ownerData);
        return deferred.promise;
    }
    $scope.HFMDetails = function (HFMData) {
        var deferred = $q.defer();
        deferred.resolve(HFMData);
        return deferred.promise;
    }

    $scope.bindLEUnit = function (leid, period) {
        //var ATUrl = appSetting.ServerPath + "apiGet/LegalEntity/GetAttributes";
        //simpleFactory.getData(ATUrl).then(function (response) {
        //    $scope.attributes = JSON.parse(response.configJSON);
        //    $scope.attrObj = {};            
        //})
        if ($routeParams.id) {
            if ($scope.dtOwnership != "undefined")
                delete $scope.dtOwnership;
            $scope.edit = true;
            $scope.viewTabs = true;
            $scope.Url = appSetting.ServerPath + "apiGet/LegalEntity/GetLegalEntityByID?le_id=" + leid + "&Period_id=" + period;
            simpleFactory.getData($scope.Url).then(function (re) {
                $scope.legalentity = re;
                var s = $scope.legalentity;
                //var s = $scope.legalentity;
                if (s.miscellaneous != "") {
                    $scope.miscellaneous = JSON.parse(s.miscellaneous);
                }
                else {
                    $scope.miscellaneous = [];
                }
                if (s.dynamicField.configJSON != "") {
                    $scope.attributes = JSON.parse(s.dynamicField.configJSON);
                }
                else {
                    $scope.attributes = [];
                }


                $scope.attrObj = {};
                //console.log($scope.miscellaneous)
                $scope.LE_Name = s.le_name;
                $scope.comments = s.comments;
                $scope.Address = s.address1;
                $scope.Address2 = s.address2;
                $scope.City = s.city;
                $scope.State = s.state;
                $scope.Region = s.region_name;
                $scope.Postal_Code = s.zip;
                $scope.strIncorporated_Dt = s.strincorporated_dt;
                $scope.strAcquisition_Dt = s.stracquisition_dt;
                $scope.strDisposition_Dt = s.strdisposition_dt;
                $scope.strLiquidated_Dt = s.strliquidated_dt;
                $scope.strMerge_Dt = s.strmerge_dt;
                $scope.addressID = s.address_id;
                $scope.displayHierarchy = s.displayHierarchy;
                $scope.Updated_By = $scope.Updated_By;
                if ($scope.miscellaneous != null) {
                    $.each($scope.attributes, function (akey, avalue) {
                        $scope.attrObj[akey] = $scope.miscellaneous[akey];
                    })
                }
                // $scope.obj.fvalue = '';
            
                ownerLEData = re.ownership;
                if (ownerLEData != null)
                    $scope.dtOwnership = DTOptionsBuilder.fromFnPromise($scope.OwnerDetails(ownerLEData)).withOption('createdRow', createdRow).withOption('sScrollX', false);

                leHFMData = re.lehfm;
                if (leHFMData != null)
                    $scope.dtHFMUnit = DTOptionsBuilder.fromFnPromise($scope.HFMDetails(leHFMData)).withOption('scrollCollapse', false).withOption('createdRow', createdRow);
                $scope.binddd(leid, period);
            })


            $scope.parent = '';

        }

        else {
            $scope.edit = false;
            if ($routeParams.id && leid != 0) {
                $scope.viewTabs = false;
            }


            $scope.Url = appSetting.ServerPath + "apiGet/LegalEntity/GetLegalEntityByID?le_id=" + leid + "&Period_id=" + period;
            simpleFactory.getData($scope.Url).then(function (re) {

                $scope.legalentity = re;
                var s = $scope.legalentity;

                $scope.LE_Name = s.le_name;
                $scope.comments = s.comments;
                $scope.Address = s.address1;
                $scope.Address2 = s.address2;
                $scope.City = s.city;
                $scope.State = s.state;
                $scope.Region = s.region_name;
                $scope.Postal_Code = s.zip;
                $scope.strIncorporated_Dt = s.strincorporated_dt;
                $scope.strAcquisition_Dt = s.stracquisition_dt;
                $scope.strDisposition_Dt = s.strdisposition_dt;
                $scope.strLiquidated_Dt = s.strliquidated_dt;
                $scope.strMerge_Dt = s.strmerge_dt;
                $scope.addressID = s.address_id;
                $scope.Updated_By = $scope.Updated_By

                if (s.dynamicField.configJSON != "" && s.dynamicField.configJSON != null) {
                    $scope.attributes = JSON.parse(s.dynamicField.configJSON);
                }
                else {
                    $scope.attributes = [];
                }
                $scope.attrObj = {};
                $.each($scope.attributes, function (key, value) {
                    if ($scope.attributes[key]['FieldType'] == 'Toggle') {
                        $scope.attributes[key]['FieldType'] == 'Toggle';
                        $("[name='my-checkbox']").bootstrapSwitch();
                    }
                })


                ownerLEData = re.ownership;
                if (ownerLEData != null)
                    $scope.dtOwnership = DTOptionsBuilder.fromFnPromise($scope.OwnerDetails(ownerLEData)).withOption('createdRow', createdRow).withOption('sScrollX', false);

                leHFMData = re.lehfm;
                if (leHFMData != null)
                    $scope.dtHFMUnit = DTOptionsBuilder.fromFnPromise($scope.HFMDetails(leHFMData)).withOption('scrollCollapse', false).withOption('createdRow', createdRow);

            })



            $scope.leLookups = appSetting.ServerPath + "apiGet/Lookup/GetAllLELookups?LE_ID=" + leid + "&PERIOD_ID=" + period;
            simpleFactory.getData($scope.leLookups).then(function (response) {
                if (leid != 0) {
                    for (var i = 0; i < response.statuses.length; i++) {

                        if (response.statuses[i].description === $scope.legalentity.le_status) {
                            $scope.status = response.statuses[i];

                        }

                    }
                    for (var i = 0; i < response.gaaptypes.length; i++) {

                        if (response.gaaptypes[i].description === $scope.legalentity.gaap_type) {
                            $scope.gaap = response.gaaptypes[i];

                        }

                    }
                    for (var i = 0; i < response.types.length; i++) {

                        if (response.types[i].description === $scope.legalentity.le_type) {
                            $scope.letype = response.types[i];

                        }

                    }
                    for (var i = 0; i < response.jurisdictions.length; i++) {

                        if (response.jurisdictions[i].country_code === $scope.legalentity.country_code) {
                            $scope.country = response.jurisdictions[i];

                        }
                    }

                    for (var i = 0; i < response.users.length; i++) {

                        if (response.users[i].user_name === $scope.legalentity.finance_contact) {
                            $scope.fl = response.users[i];

                        }
                    }
                    for (var i = 0; i < response.users.length; i++) {

                        if (response.users[i].user_name === $scope.legalentity.regional_tax_manager) {
                            $scope.rtm = response.users[i];

                        }
                    }
                }

                $scope.unmappedLEs = response.unmappedowners;

                $scope.unmappedHFMs = response.unmappedhfms;
                $scope.leStatusData = response.statuses;
                $scope.GAAPTypeData = response.gaaptypes;
                $scope.leTypes = response.types;
                $scope.countries = response.jurisdictions;
                $scope.users1 = response.users;
                $scope.users2 = response.users;
            })

        }


    }
    //save the data
    $scope.binddd = function (leid, period) {

        $scope.leLookups = appSetting.ServerPath + "apiGet/Lookup/GetAllLELookups?LE_ID=" + leid + "&PERIOD_ID=" + period;
        simpleFactory.getData($scope.leLookups).then(function (response) {


            $scope.unmappedLEs = response.unmappedowners;
            //alert(JSON.stringify($scope.unmappedLEs));

            $scope.unmappedHFMs = response.unmappedhfms;
            for (var i = 0; i < response.statuses.length; i++) {

                if (response.statuses[i].description === $scope.legalentity.le_status) {
                    $scope.status = response.statuses[i];

                }

            }
            for (var i = 0; i < response.gaaptypes.length; i++) {

                if (response.gaaptypes[i].description === $scope.legalentity.gaap_type) {
                    $scope.gaap = response.gaaptypes[i];

                }

            }
            for (var i = 0; i < response.types.length; i++) {

                if (response.types[i].description === $scope.legalentity.le_type) {
                    $scope.letype = response.types[i];

                }

            }
            for (var i = 0; i < response.jurisdictions.length; i++) {

                if (response.jurisdictions[i].country_code === $scope.legalentity.country_code) {
                    $scope.country = response.jurisdictions[i];

                }
            }

            for (var i = 0; i < response.users.length; i++) {

                if (response.users[i].user_name === $scope.legalentity.finance_contact) {
                    $scope.fl = response.users[i];

                }
            }
            for (var i = 0; i < response.users.length; i++) {

                if (response.users[i].user_name === $scope.legalentity.regional_tax_manager) {
                    $scope.rtm = response.users[i];

                }
            }
            $scope.leStatusData = response.statuses;
            $scope.GAAPTypeData = response.gaaptypes;
            $scope.leTypes = response.types;
            $scope.countries = response.jurisdictions;
            $scope.users1 = response.users;
            $scope.users2 = response.users;
        })
    }
    $scope.save = function () {
        var Url = appSetting.ServerPath + 'api/LegalEntity/UpdateLegalEntity';
        if ($('#lename').val() == "") {
            $scope.err = true;
            $scope.errMessage = 'Please enter LE Name.';
            return;
        }
        $.each($scope.attributes, function (key, value) {
            if ($scope.attributes[key]['FieldType'] == 'Toggle') {
                $scope.attrObj[key] = $('#switcher').bootstrapSwitch('state');
                console.log($('#switcher').bootstrapSwitch('state'));
            }
        })

        $scope.data = {

            "le_id": $routeParams.id,
            "le_name": $scope.LE_Name,
            "le_type": (($scope.letype) ? $scope.letype.le_type_code : null),
            "le_status": (($scope.status) ? $scope.status.le_status_code : null),
            "period_id": (($scope.periodvalue) ? $scope.periodvalue.code : null),
            "gaap_type": (($scope.gaap) ? $scope.gaap.gaap_type_code : null),
            "address_id": $scope.addressID,
            "address1": $('#address1').val(),
            "address2": $('#address2').val(),
            "city": $('#city').val(),
            "state": $('#state').val(),
            "zip": $('#postalCode').val(),
            "country_code": (($scope.country) ? $scope.country.country_code : null),
            "disposition_dt": (($scope.strDisposition_Dt) ? $('#Disposition_Dt').val() : null),
            "liquidated_dt": (($scope.strLiquidated_Dt) ? $('#Liquidated_Dt').val() : null),
            "merge_dt": (($scope.strMerge_Dt) ? $('#Merge_Dt').val() : null),
            "incorporated_dt": (($scope.strIncorporated_Dt) ? $('#Incorporated_Dt').val() : null),
            "acquisition_dt": (($scope.strAcquisition_Dt) ? $('#Acquisition_Dt').val() : null),
            "regional_tax_manager": (($scope.rtm) ? $scope.rtm.user_id : null),
            "finance_contact": (($scope.fl) ? $scope.fl.user_id : null),
            "comments": $('#comments').val(),
            "region_name": $('#Region').val(),
            "updated_by": $scope.updated_by,
            "miscellaneous": JSON.stringify($scope.attrObj)
        };

        $http({
            method: 'POST',
            url: Url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {
            $scope.leSuccess = 'Legal entity saved successfully.';
            $scope.succ = true;
            $window.scrollTo(0, 0);
            //Comment: To scroll page to Top  //Author :Sajid
            if ($scope.dtOwnership != "undefined")
                delete $scope.dtOwnership;

            if ($scope.dtHFMUnit != "undefined")
                delete $scope.dtHFMUnit;

            $scope.bindLEUnit($routeParams.id, $scope.periodvalue.code);
        })
           .catch(function (err) {
               console.log(err);

           })


    }
    $scope.add = function () {
        var Url = appSetting.ServerPath + 'api/LegalEntity/UpdateLegalEntity';
        var name = $('#lename').val();
        if ($.trim(name) == "") {
            $scope.err = true;
            $scope.succ = false;
            $scope.errMessage = 'Please enter LE Name.';
            return;
        }
        $.each($scope.attributes, function (key, value) {
            if ($scope.attributes[key]['FieldType'] == 'Toggle') {
                $scope.attrObj[key] = $('#switcher').bootstrapSwitch('state');
                console.log($('#switcher').bootstrapSwitch('state'));
            }
        })
        debugger;
        $scope.data = {

            "le_name": $('#lename').val(),
            "le_type": (($scope.letype) ? $scope.letype.le_type_code : null),
            "le_status": (($scope.status) ? $scope.status.le_status_code : null),
            "period_id": (($scope.periodvalue) ? $scope.periodvalue.code : null),
            "gaap_type": (($scope.gaap) ? $scope.gaap.gaap_type_code : null),
            "address1": $('#address1').val(),
            "address2": $('#address2').val(),
            "city": $('#city').val(),
            "state": $('#state').val(),
            "zip": $('#postalCode').val(),
            "country_code": (($scope.country) ? $scope.country.country_code : null),
            "disposition_dt": $('#Disposition_Dt').val(),
            "liquidated_dt": $('#Liquidated_Dt').val(),
            "merge_dt": $('#Merge_Dt').val(),
            "incorporated_dt": $('#Incorporated_Dt').val(),
            "acquisition_dt": $('#Acquisition_Dt').val(),
            "regional_tax_manager": (($scope.rtm) ? $scope.rtm.user_id : null),
            "finance_contact": (($scope.fl) ? $scope.fl.user_id : null),
            "comments": $('#comments').val(),
            "region_name": $('#Region').val(),
            "updated_by": $scope.updated_by,
            "miscellaneous": JSON.stringify($scope.attrObj)

        };
        $http({

            method: 'POST',
            url: Url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {
            $scope.newLE_ID = res.data.lE_ID;

            if ($scope.newLE_ID.match(/^\d+$/)) {
                $scope.viewTabs = true;
                $scope.succ = true;
                $scope.err = false;
                $scope.leSuccess = 'Legal entity added successfully.';
                var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=" + $scope.newLE_ID + "&hfm_id=";

                simpleFactory.getData(Url).then(function (re) {
                    $scope.periodData = re;
                    $scope.periodvalue = re[0];

                    s
                    $scope.bindLEUnit($scope.newLE_ID, $scope.periodvalue.code);
                })
            }
            else {
                $scope.err = true;
                $scope.succ = false;
                $scope.errMessage = res.data.LE_ID;
            }
            $window.scrollTo(0, 0);   //Comment: To scroll page to Top  //Author :Sajid

        })
           .catch(function (err) {
               console.log(err);
           })


    }

    // Initialising the data table for Ownership Table
    $scope.dtColumnsOwnership = [
   DTColumnBuilder.newColumn('s_no').withTitle('S.No').withClass('text-center').withOption('width', '85px'),
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
   DTColumnBuilder.newColumn('streffective_dt').withTitle('Effective Date').withClass('text-center'),
   DTColumnBuilder.newColumn('updated_by').withTitle('Updated By').withClass('text-center').withOption('width', '85px'),
   DTColumnBuilder.newColumn('strupdated_dt').withTitle('Updated Date').withClass('text-center').withOption('width', '85px'),

    DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().withClass('text-center').withOption('width', '115px')
        .renderWith(actionsHtml)


    ];
    $scope.dtInstanceOwnership = {};

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(data, type, full, meta) {
        return '<div class="text-center" ><img ng-click="editOwner($event)" class="cursor" src="images/edit.png" /><img ng-click="saveOwner($event,' + data.parent_id + ')"  class="ng-hide pull-left" src="../images/savee.png" style="margin-left:10px;cursor:pointer"/> <img ng-click="cancel($event)"  class="ng-hide" src="../images/cancell.png" style="margin-left:10px;cursor:pointer"/>   <img class="cursor" ng-show="{{' + data.displayHierarchy + '}}"  ng-click="openHierarchy(' + data.parent_id + ')" class="pull-left" src="../images/hierarchy.png" /  style="margin-left:10px;" > <img class="cursor" ng-click="deleteOwner((' + data.parent_id + '))"    src="../images/delete.png" style="margin-left:10px;" /  > </div>';
    }

    // Initialising the data table for HFMUnit Table
    $scope.dtColumnsHFMUnit = [
    DTColumnBuilder.newColumn('s_no').withTitle('S.No').withClass('text-center'),
    DTColumnBuilder.newColumn('hfm_label').withTitle('Business Unit').withClass('text-center'),

    DTColumnBuilder.newColumn('segment').withTitle('Segment').withClass('text-center'),
    DTColumnBuilder.newColumn('comments').withTitle('Comments')

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
     DTColumnBuilder.newColumn(null).withTitle('Action').notSortable()
        .renderWith(actionHtml)


    ];
    $scope.dtInstanceHFMUnit = {};

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }



    function actionHtml(data, type, full, meta) {
        return '<div class="text-center" > <a > <img class="cursor" ng-click="deleteHFM(' + data.hfm_id + ')"    src="../images/delete.png" /  > </a></div>';
    }



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

    $scope.addDOwner = function (le, per, comm) {
        if ($('#textOwner').val() !== le.lE_Name || $('#percentage').val() !== per) {
            $scope.er = true;
            $scope.suc = false;
            $scope.error = 'Please select LE and percentage';
            return;
        }

        if (le === undefined || per === undefined) {
            $scope.er = true;
            $scope.suc = false;
            $scope.error = 'Please enter LE and percentage';
        }
        var strEffective_Dt = $('#Effective_Dt').val();
        var Url = appSetting.ServerPath + "api/LegalEntity/UpdateOwnership";
        $scope.data = {
            "le_id": (($routeParams.id) ? $routeParams.id : $scope.newLE_ID),
            "parent_id": le.lE_ID,
            "period_id": $scope.periodvalue.code,
            "effective_dt": strEffective_Dt,
            "ownership": per,
            "comments": ((comm) ? comm : ''),
            "updated_by": $scope.updated_by

        };

        $http({

            method: 'POST',
            url: Url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {

            $scope.ownercomments = { comment: '' };
            var dataUrlOwnership = '';

            if ($routeParams.id)
                $scope.newLE_ID = $routeParams.id;
            else
                $scope.newLE_ID = $scope.newLE_ID;

            if ($scope.dtOwnership != "undefined")
                delete $scope.dtOwnership;

            if (res.data.Success === true) {
                $scope.suc = true;
                $scope.er = false;
                $scope.success = 'LE Owner Added/Updated Successfully.';
                $scope.HFMJSON = '';

                $('#textOwner').val('');
                $('#percentage').val('');
                $('#comments_owner').val('');
                $('#Effective_Dt').val('');
                $scope.strEffective_Dt = '';
            }
            if (res.data.Success === false) {
                $scope.er = true;
                $scope.suc = false;
                $scope.error = 'Percentage exceeds 100%.';
            }

            $scope.bindLEUnit($scope.newLE_ID, $scope.periodvalue.code);



        })
           .catch(function (err) {
               console.log(err);

           })

    }
    $scope.addHFM = function (hfm, com, strhfmEffective_Dt) {

        if ($('#location').val() !== hfm.hfm_label) {
            $scope.er = true;
            $scope.suc = false;
            $scope.error = 'Please select Business label';
            return;
        }


        $scope.customHFMSelected = '';
        if (hfm === undefined) {
            $scope.er = true;
            $scope.suc = false;
            $scope.error = 'Please select Business label';
        }
        var strEffective_Dt = $('#HFM_Effective_Dt').val();
        var URl = appSetting.ServerPath + "api/LegalEntity/UpdateLEHfm";
        $scope.data = {
            "le_id": (($routeParams.id) ? $routeParams.id : $scope.newLE_ID),
            "hfm_id": hfm.hfm_id,
            "period_id": $scope.periodvalue.code,
            "effective_dt": strEffective_Dt,
            "comments": ((com) ? com : ''),
            "updated_by": $scope.updated_by

        };
        console.log(JSON.stringify($scope.data))
        $http({

            method: 'POST',
            url: URl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {
            var dataUrlHFMUnit = '';



            if ($routeParams.id)
                $scope.newLE_ID = $routeParams.id;
            else
                $scope.newLE_ID = $scope.newLE_ID;

            if ($scope.dtHFMUnit != "undefined")
                delete $scope.dtHFMUnit;

            $scope.BUcomments = { comment: '' };

            $scope.bindLEUnit($scope.newLE_ID, $scope.periodvalue.code);


            $scope.BUcomments = { comment: '' };

            $('#location').val('');
            $('#comments_bu').val('');
            $('#HFM_Effective_Dt').val('');
            hfm = undefined;
            com = '';
            $scope.suc = true;
            $scope.er = false;
            $scope.success = 'Business Added Successfully.';

        })
           .catch(function (err) {
               console.log(err);
           })
    }
    $scope.deleteHFM = function (HFM_ID) {
        var URl = appSetting.ServerPath + "api/LegalEntity/DeleteLEHFM";
        $scope.data = {
            "hfm_id": HFM_ID,
            "le_id": (($routeParams.id) ? $routeParams.id : $scope.newLE_ID),
            "period_id": $scope.periodvalue.code

        };
        $http({

            method: 'POST',
            url: URl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {

            if ($routeParams.id)
                $scope.newLE_ID = $routeParams.id;
            else
                $scope.newLE_ID = $scope.newLE_ID;

            if ($scope.dtHFMUnit != "undefined")
                delete $scope.dtHFMUnit;

            $scope.bindLEUnit($scope.newLE_ID, $scope.periodvalue.code);

            $scope.suc = true;
            $scope.er = false;
            $scope.success = 'Business Deleted Successfully';
        })
           .catch(function (err) {
               console.log(err);
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

    $scope.editOwner = function (event) {
        event.target.className = "ng-hide ";
        event.target.nextElementSibling.className = "ng-show ";
        event.target.nextElementSibling.nextElementSibling.className = "ng-show ";  // For cancel button
        event.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.className = "ng-hide ";  // For cancel button

        var row = event.target.parentElement.parentElement.parentElement;

        $.each(row.cells, function (index, cell) {
            var text = cell.textContent;

            if (index == 2) {
                percentageHtmls = cell.innerHTML;
                cell.innerHTML = '<input id="percentage" value="' + text + '" class="form-control" type="text" placeholder="Enter Percentage..." required>';
            }
            else if (index == 3) {
                commentHtml = cell.innerHTML;
                cell.innerHTML = '<input id="comments_owner" class="form-control" value="' + text + '" type="text" placeholder="Enter Comments..." required>';
            }

        });



    }

    $scope.cancel = function (event) {

        event.target.className = "ng-hide ";
        event.target.nextElementSibling.nextElementSibling.className = "ng-show ";  // For cancel button
        event.target.previousElementSibling.previousElementSibling.className = "ng-show ";
        event.target.previousElementSibling.className = "ng-hide ";


        var row = event.target.parentElement.parentElement.parentElement;

        $.each(row.cells, function (index, cell) {

            if (index == 4)
                return false;

            else if (index == 2) {
                cell.innerHTML = percentageHtmls;
            }
            else if (index == 3) {
                cell.innerHTML = commentHtml;
            }


        });
    }

    $scope.saveOwner = function (event, LE_parent_id) {
        event.target.className = "ng-hide ";
        event.target.previousSibling.className = "ng-show ";
        event.target.nextElementSibling.className = "ng-hide";
        event.target.nextElementSibling.nextElementSibling.nextElementSibling.className = "ng-show";

        var row = event.target.parentElement.parentElement.parentElement;

        $.each(row.cells, function (index, cell) {

            if (index == 2) {
                var text = cell.firstChild.value;
                cell.innerHTML = text;
                var percent = text;
                var p1 = percent.split("%");
                var percentag = p1[0];
                $scope.LE_percentage = percentag;
            }
            else if (index == 4) {
                var text = cell.innerHTML;
                if (text !== "") {
                    $scope.Effective_Dt = null;
                }
                else {
                    $scope.Effective_Dt = text;
                }
                cell.innerHTML = text;

            }
            else if (index == 3) {
                var text = cell.firstChild.value;
                cell.innerHTML = text;
                $scope.LE_New_comments = text;
            }

        });


        var Url = appSetting.ServerPath + "api/LegalEntity/UpdateOwnership";
        $scope.data = {
            "le_id": (($routeParams.id) ? $routeParams.id : $scope.newLE_ID),
            "parent_id": LE_parent_id,
            "period_id": $scope.periodvalue.code,
            "effective_dt": (($scope.Effective_Dt) ? $scope.Effective_Dt : null),
            "ownership": $scope.LE_percentage,
            "comments": $scope.LE_New_comments,
            "updated_by": $scope.updated_by

        };

        $http({

            method: 'POST',
            url: Url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data

        }).then(function (res) {

            console.log(JSON.stringify(res));

            if ($routeParams.id)
                $scope.newLE_ID = $routeParams.id;
            else
                $scope.newLE_ID = $scope.newLE_ID;

            if ($scope.dtOwnership != "undefined")
                delete $scope.dtOwnership;


            $scope.bindLEUnit($scope.newLE_ID, $scope.periodvalue.code);

            if (res.data.Success === true) {
                $scope.suc = true;
                $scope.er = false;
                $scope.success = 'LE Owner Added/Updated Successfully.';
            }
            if (res.data.Success === false) {
                $scope.er = true;
                $scope.suc = false;
                $scope.error = 'Percentage exceeds 100%.';
            }


        })
           .catch(function (err) {
               console.log(err);
           })
    }

    $scope.deleteOwner = function (parent_ID) {
        var Url = appSetting.ServerPath + 'api/LegalEntity/DeleteLEOwnership';
        $scope.data = {
            "le_id": (($routeParams.id) ? $routeParams.id : $scope.newLE_ID),
            "parent_id": parent_ID,
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
            if ($routeParams.id)
                $scope.newLE_ID = $routeParams.id;
            else
                $scope.newLE_ID = $scope.newLE_ID;

            if ($scope.dtOwnership != "undefined")
                delete $scope.dtOwnership;


            $scope.bindLEUnit($scope.newLE_ID, $scope.periodvalue.code);

            $scope.suc = true;
            $scope.er = false;
            $scope.success = 'LE Owner Deleted Successfully';
        })
           .catch(function (err) {
               console.log(err);
           })

    }
    $scope.today = function () {
        $scope.dt = new Date();
    };


    //Initialising the auto complete drop down

    $scope.selected = undefined;

    $scope.changeData = function (period) {
        //clearing the alert messages
        $scope.succ = false;
        $scope.err = false;
        $scope.er = false;
        $scope.suc = false;

        if ($routeParams.id) {

            if ($scope.dtOwnership != "undefined")
                delete $scope.dtOwnership;
            if ($scope.dtHFMUnit != "undefined")
                delete $scope.dtHFMUnit;


        }

        $scope.bindLEUnit($routeParams.id, period.code);


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

