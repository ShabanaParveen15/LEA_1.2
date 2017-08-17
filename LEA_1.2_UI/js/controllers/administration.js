GLET.controller('administrationController', function ($scope, $filter, localStorageService, authService, sessionService, $compile, $timeout, $uibModal, $rootScope, sessionService, $q, constant, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $location, WebAPIService, appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
        //$("[name='enabledisable']").bootstrapSwitch();
    }, 1000);

    $rootScope.lname = localStorage.getItem('LNAME');
    $rootScope.fname = localStorage.getItem('FNAME');

    var ATUrl = appSetting.ServerPath + "apiGet/LegalEntity/GetAttributes";
    simpleFactory.getData(ATUrl).then(function (response) {
        $rootScope.rootAttributes = JSON.parse(response.configJSON);

    })


    //$rootScope.role = (sessionService.get('role') === "true");   // ADD edit dependency on role
    //Comment: Header Tabs active issue (When type in url)
    // $scope.apiURL = constant;
    //$scope.init = function () {
    //    $rootScope.login = true;
    //}
    //authService.authenticate();
    //var authData = localStorageService.get('authorizationData');
    //alert(JSON.stringify(authData.access_token));

    var Url = appSetting.ServerPath + "apiGet/UserManagement/GetUserList";
    //WebAPIService.getData(Url).then(function (re) {
    //    $scope.UserList = re;
    //    console.log($scope.UserList)

    //})


    $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
        var promise = $http.get(Url).then(function (response) {

            $scope.UserList = response.data;
            $scope.modifiedList = response.data;

            angular.forEach($scope.modifiedList, function (value, option) {
                if (value.isactive) {
                    value.isactive = "Yes";

                } else {
                    value.isactive = "No";
                }

            })
            return $scope.modifiedList;
        })
        return promise;
    }).withOption('scrollCollapse', false)
        .withDOM('<"top"lf>rt<"bottom"pi>')
        .withOption('createdRow', createdRow)
        .withPaginationType('full_numbers')
        .withButtons([
            'copy',
            'print',
            'excel'
        ])
    $rootScope.login = true;
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('username').withTitle('User Name').withOption(),
        DTColumnBuilder.newColumn('fname').withTitle('First Name').withClass('text-center'),
        DTColumnBuilder.newColumn('lname').withTitle('Last Name').withOption(),
        DTColumnBuilder.newColumn('email').withTitle('Email').withClass('text-center').withOption(),
        DTColumnBuilder.newColumn('phone').withTitle('Mobile No').withClass('text-center').withOption(),
        DTColumnBuilder.newColumn('lastlogin').withTitle('Last Login').withClass('text-center').renderWith(function (data, type) {
            return $filter('date')(data, 'dd/MM/yyyy');
        }),
        DTColumnBuilder.newColumn('isactive').withTitle('Active').withClass('text-center').withOption().notSortable(),

        DTColumnBuilder.newColumn('rolE_ID').withTitle('Role').withOption().notSortable().withClass('text-center'),
        DTColumnBuilder.newColumn(null).withTitle('Action').withOption().notSortable().withClass('text-center')
            .renderWith(actionsHtml)

    ];
    $scope.dtFieldColumns = [
        DTColumnBuilder.newColumn('username').withTitle('User Name').withOption(),
        DTColumnBuilder.newColumn('fname').withTitle('First Name').withClass('text-center'),
        DTColumnBuilder.newColumn('lname').withTitle('Last Name').withOption(),
        DTColumnBuilder.newColumn('email').withTitle('Email').withClass('text-center').withOption(),
        DTColumnBuilder.newColumn('phone').withTitle('Mobile No').withClass('text-center').withOption(),
        DTColumnBuilder.newColumn('lastlogin').withTitle('Last Login').withClass('text-center').renderWith(function (data, type) {
            return $filter('date')(data, 'dd/MM/yyyy');
        }),
        DTColumnBuilder.newColumn('isactive').withTitle('Active').withClass('text-center').withOption().notSortable(),

        DTColumnBuilder.newColumn('rolE_ID').withTitle('Role').withOption().notSortable().withClass('text-center'),
        DTColumnBuilder.newColumn(null).withTitle('Action').withOption().notSortable().withClass('text-center')
            .renderWith(actionsHtml)

    ];

    $scope.newPromise = newPromise;
    $scope.reloadData = reloadData;
    $scope.dtInstance = {};
    function createdRow(row, data, dataIndex) {
        $compile(angular.element(row).contents())($scope);
    }

    function newPromise() {
        var promise = $http.get(Url).then(function (response) {
            console.log(response);
            $scope.UserList = response.data;
            $scope.modifiedList1 = response.data;
            angular.forEach($scope.modifiedList1, function (value, option) {
                if (value.isactive) {
                    value.isactive = "Yes";

                } else {
                    value.isactive = "No";
                }

            })
            return $scope.modifiedList1;
        })
        return promise;
    }

    function reloadData() {
        var resetPaging = true;
        $scope.dtInstance.reloadData(callback, resetPaging);
    }

    function callback(json) {
        console.log(json);
    }


    function actionsHtml(data, type, full, meta) {
        return '<div> <img ng-click="edit($event)"  class="pull-left" src="../images/edit.png" style="margin-left:20px;cursor:pointer" /><img ng-click="save($event)"  class="ng-hide pull-left" src="../images/savee.png" style="margin-left:8px;cursor:pointer"/><img ng-click="cancel($event)" class="ng-hide pull-left" src="../images/cancell.png" style="margin-left:8px;cursor:pointer" />  </div>';
        '<div> </div>';
    }

    var row;

    $scope.edit = function (event) {
        event.target.className = "ng-hide pull-left";
        event.target.nextSibling.className = "pull-left";
        event.target.nextSibling.nextSibling.className = "pull-left";
        row = event.target.parentElement.parentElement.parentElement;
        $.each(row.cells, function (index, cell) {
            var text = cell.textContent;

            if (index == 0) {
                UserName = cell.innerHTML;
                $scope.username = $filter('filter')($scope.UserList, { username: UserName }, true)[0].UserName;
                $scope.useR_ID = $filter('filter')($scope.UserList, { username: UserName }, true)[0].useR_ID;
            }
            if (index == 1) {
                firstname = cell.innerHTML;

                cell.innerHTML = '<input type="text" id="firstname" class="form-control" value="' + text + '"/>';

            }
            else if (index == 2) {

                lastname = cell.innerHTML;
                cell.innerHTML = '<input type="text" class="form-control" value="' + text + '"/>';
            }
            else if (index == 3) {

                email = cell.innerHTML;
                cell.innerHTML = '<input type="text" class="form-control" value="' + text + '"/>';
            }
            else if (index == 4) {

                mobileno = cell.innerHTML;
                cell.innerHTML = '<input type="text" class="form-control" value="' + text + '"/>';
            }
            else if (index == 6) {

                active = cell.innerHTML;
                cell.innerHTML = '<input type="checkbox" id="switcher" name="my-checkbox" data-on-text="NO" data-off-text="YES" >';

            }
            else if (index == 7) {
                role = cell.innerHTML;
                cell.innerHTML = '<select  class="form-control"><option id="admin">ADMIN</option><option id="edit">EDITUSER</option><option id="readonly">READONLY</option></select>';

            }
            $("[name='my-checkbox']").bootstrapSwitch();

        });

        //console.log(row)
    }
    $scope.fieldEdit = function (event, key) {
        event.target.className = "ng-hide ";
        event.target.nextSibling.className = "";
        event.target.nextSibling.nextSibling.className = "ng-show";
        event.target.nextSibling.nextSibling.nextSibling.nextSibling.className = "ng-show ";
        row = event.target.parentElement.parentElement.parentElement;
        console.log(event);
        console.log(row);
        $.each(row.cells, function (index, cell) {
            var text = cell.textContent;

            if (index === 0) {
                $scope.FieldName = cell.innerText

            }
            if (index === 1) {

                $scope.FieldType = cell.firstChild.value;

            }
            if (index === 2) {
                if (key != undefined) {
                    $scope.attributeisactive1 = $rootScope.rootAttributes[key]['IsActive'];
                    if ($scope.attributeisactive1) {
                        cell.innerHTML = '<input type="checkbox" id="switcher1" checked="true" name="field-checkbox" data-on-text="YES" data-off-text="NO" >';
                    } else {
                        cell.innerHTML = '<input type="checkbox" id="switcher1" name="field-checkbox" data-on-text="YES" data-off-text="NO" >';
                    }
                }
                $scope.IsActive = $('#switcher1').bootstrapSwitch('state');
                $scope.attributes[key]["IsActive"] = $scope.IsActive;

            }
            if (index === 3) {
                $scope.Options = cell.firstChild.value
            }


            $("[name='field-checkbox']").bootstrapSwitch();


        });

        //console.log(row)
    }

    $scope.save = function (event) {
        row = event.target.parentElement.parentElement.parentElement;
        $.each(row.cells, function (index, cell) {

            if (index === 0) {
                $scope.username = cell.firstChild.value

            }
            if (index === 1) {

                $scope.firstname = cell.firstChild.value;

            }
            if (index === 2) {

                $scope.lastname = cell.firstChild.value;

            }
            if (index === 3) {
                $scope.email = cell.firstChild.value
            }
            if (index === 4) {
                $scope.mobileno = cell.firstChild.value

            }
            if (index === 6) {

                return false;
            }
            if (index === 7) {
                $scope.role = cell.firstChild.value;
                return false;
            }

        });

        $scope.active = $('#switcher').bootstrapSwitch('state');
        $scope.role = row.cells[7].firstChild.value
        var data = {
            "USERNAME": $scope.username,
            "FNAME": $scope.firstname,
            "LNAME": $scope.lastname,
            "EMAIL": $scope.email,
            "PHONE": $scope.mobileno,
            "ROLE_ID": $scope.role,
            "USER_ID": $scope.useR_ID,
            "ISACTIVE": $scope.active
        }



        $http({
            method: 'POST',
            url: appSetting.ServerPath + 'api/Register/Register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data

        }).then(function (response, status, headers, config) {

            if (response.data == true) {
                $scope.dtInstance.changeData($scope.newPromise);
                $scope.showalert();
            }
            else {
                $scope.showalert1();
            }
        })
    }

    $scope.customRefreshDT = function () {
        $scope.dtInstance.changeData($scope.newPromise);
        //$rootScope.$emit("CallCustomRefreshMethod", {});
    }

    $rootScope.$on("CallCustomRefreshMethod", function () {
        $scope.customRefreshDT();
    });
    $scope.cancel = function (event) {

        event.target.className = "ng-hide pull-left";

        event.target.previousSibling.className = "ng-hide pull-left";
        event.target.previousSibling.previousSibling.className = "ng-show pull-left";

        var row = event.target.parentElement.parentElement.parentElement;

        $.each(row.cells, function (index, cell) {
            if (index == 0) {
                cell.innerHTML = UserName;
            }
            else if (index == 1) {
                cell.innerHTML = firstname;
            }
            else if (index == 2) {
                cell.innerHTML = lastname;
            }
            else if (index == 3) {
                cell.innerHTML = email;
            }

            else if (index == 4) {
                cell.innerHTML = mobileno;
            }

            else if (index == 6) {

                cell.innerHTML = active;

            }
            else if (index == 7) {

                cell.innerHTML = role;

            }
        });
    }

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'AddUserModal.html',
            controller: 'ModalInstanceCtrl',
            size: 'md',
        });

        modalInstance.result.then(function () {
            $scope.reloadData();

        }, function () {

        });

    };
    $scope.showalert = function () {
        $scope.savesuccess = true;
        $timeout(function () {
            $scope.savesuccess = false;
        }, 3000);
    };
    $scope.showalert1 = function () {
        $scope.savefailure = true;
        $timeout(function () {
            $scope.savefailure = false;
        }, 3000);
    };
});

GLET.controller('ModalInstanceCtrl', function ($timeout, $location, $scope, $uibModalInstance, $rootScope, simpleFactory, $http, DTOptionsBuilder, $window, appSetting) {

    $scope.ok = function () {
        $scope.password = Sha256.hash($scope.password);
        $scope.data =
            {
                "USERNAME": $scope.username,
                "FNAME": $scope.firstname,
                "LNAME": $scope.lastname,
                "EMAIL": $scope.email,
                "PASSWORD": $scope.password,
                "ROLE_ID": $scope.role,
                "PHONE": $scope.phone,
                "USER_ID": null
            }




        var Url = appSetting.ServerPath + "api/Register/Register";
        $http.post(Url, $scope.data).success(function (response) {
            if (response == true) {
                $rootScope.$emit("CallCustomRefreshMethod", {});
                $scope.showalert();
                $uibModalInstance.dismiss();
                $location.path('/Administration');

            }
            else {

                $scope.showalert1();

            }
        });

    }
    $scope.showalert = function () {
        $scope.savesuccess = true;
        $timeout(function () {
            $scope.savesuccess = false;
        }, 3000);
    };
    $scope.showalert1 = function () {
        $scope.savefailure = true;
        $timeout(function () {
            $scope.savefailure = false;
        }, 3000);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

GLET.filter('true_false', function () {
    return function (text, length, end) {
        if (text) {
            return 'Yes';
        }
        return 'No';
    }
})

var app = angular.module('dynamicAttribute', []);
GLET.controller('dynamicFields', function ($scope, $http, simpleFactory, appSetting, $uibModal, $route, $rootScope, $interval, $timeout) {
    $("[name='my-checkbox']").bootstrapSwitch();
    $rootScope.rootAttributes = {};
    $scope.choices = [{ id: 0 }];

    $scope.$watch("rootAttributes", function (xx, yy, scope) {
        $timeout(function () {
            $scope.attributes = $rootScope.rootAttributes;
        }, 1000);
    }, true);


    var ATUrl = appSetting.ServerPath + "apiGet/LegalEntity/GetAttributes";
    simpleFactory.getData(ATUrl).then(function (response) {
        $rootScope.rootAttributes = JSON.parse(response.configJSON);
        $scope.attributes = $rootScope.rootAttributes;

    })
    $scope.choices = {
        dynamicField: [
            {
                FieldName: ''
            }
        ]
    }
    $scope.cancelField = function (event, key) {

        event.target.className = "ng-hide ";

        event.target.previousSibling.className = "ng-hide ";
        event.target.previousSibling.previousSibling.className = "ng-hide";

        event.target.previousSibling.previousSibling.previousSibling.previousSibling.className = "ng-show ";

        var row = event.target.parentElement.parentElement.parentElement;

        $.each(row.cells, function (index, cell) {

            if (index == 2) {
                cell.innerHTML = $scope.attributes[key]["IsActive"];
                var active = $scope.attributes[key]["IsActive"];
                if (active) {
                    cell.innerHTML = "Yes";
                }
                else {
                    cell.innerHTML = "No";
                }
            }

        });
    }

    $scope.saveField = function ($event, key) {


        row = event.target.parentElement.parentElement.parentElement;
        $.each(row.cells, function (index, cell) {

            if (index === 0) {
                $scope.FieldName = cell.innerText

            }
            if (index === 1) {

                $scope.FieldType = cell.firstChild.value;

            }
            if (index === 2) {
                $scope.IsActive = $('#switcher1').bootstrapSwitch('state');
                $scope.attributes[key]["IsActive"] = $scope.IsActive;

            }
            if (index === 3) {
                $scope.Options = cell.firstChild.value
            }

        });


        delete $scope.attributes['']
        delete $scope.attributes[' ']
        var dynamicFieldValue = {};
        dynamicFieldValue.configJSON = JSON.stringify($scope.attributes);

        $http({
            method: 'POST',
            url: appSetting.ServerPath + 'api/LegalEntity/DynamicField',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dynamicFieldValue

        }).then(function (response, status, headers, config) {

            if (response.data.success == true) {
                $scope.attributes = JSON.parse(dynamicFieldValue.configJSON);
                //$route.reload();
                // $scope.dtInstance.changeData($scope.newPromise);
                // $scope.showalert();

            }
            else {
                $scope.showalert1();
            }
        })
        $scope.choices = [{ id: 0 }];

        $scope.choices = {
            dynamicField: [
                {
                    FieldName: ''
                }
            ]
        }

    };


    $scope.showalert = function () {
        $scope.savesuccess = true;
        $timeout(function () {
            $scope.savesuccess = false;
        }, 3000);
    };
    $scope.showalert1 = function () {
        $scope.savefailure = true;
        $timeout(function () {
            $scope.savefailure = false;
        }, 3000);
    };

    $scope.addDynamicField = function (index) {
        $rootScope.attributeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'createNewField.html',
            controller: 'dynamicFields'
        });

        if ($scope.choices.dynamicField[index + 1] == null) {
            $scope.choices.dynamicField.push({
                FieldName: ''
            });
        }

    }

    $scope.fcancel = function () {
       // $rootScope.attributeModalInstance.dismiss('cancel');
        $rootScope.attributeModalInstance.close();
    };

    $scope.deleteDynamicField = function (index) {
        if (confirm("Are you sure you want to delete this record") == true) {
            $scope.choices.dynamicField.splice(index, 1);
        }
    }
    $scope.deleteAttribute = function (field) {
       
        if (confirm("Are you sure you want to delete this record") == true) {
            delete $scope.attributes[field];
            var dynamicField = {};
            dynamicField.configJSON = JSON.stringify($scope.attributes);
            var DelURL = appSetting.ServerPath + 'api/LegalEntity/DeleteAttribute';
            $http({
                method: 'POST',
                url: DelURL,

                data: dynamicField

            }).success(function (response) {

                if (response.data == true) {

                    $scope.showalert();
                }
                else {
                    $scope.showalert1();
                }
            })

        }
    }

    $scope.addNewChoice = function () {
        var newItemNo = $scope.choices.length;
        $scope.choices.push({ 'id': newItemNo, 'fieldValue': "" });
        //$scope.choices.push({ 'fieldValue': "" });

    };

    $scope.removeChoice = function () {
        var lastItem = $scope.choices.length - 1;

        $scope.choices.splice(lastItem);
    };

    $scope.uploadOptions = function ($fileContent) {

    }

    $scope.dynamicFieldSave = function () {
        if ($scope.choices.dynamicField["Options"] != undefined && $scope.choices.dynamicField["Options"]!="") {
         var Voptions = $scope.choices.dynamicField["Options"].split(",");
        var dynamicOpts = [];
        Voptions.forEach(function (opt) {
           
            if (dynamicOpts.indexOf(opt) == -1) {
                dynamicOpts.push(opt);
            }
            
        });
        }
       

        $scope.valid = true;
        $rootScope.attributeModalInstance.close();
        for (i = 0; i < $scope.choices.dynamicField.length; i++) {
            if ($scope.attributes == null)
                $scope.attributes = {};
            $scope.attributes[$scope.choices.dynamicField["FieldName"]] = {};
            $scope.attributes[$scope.choices.dynamicField["FieldName"]]["FieldType"] = $scope.choices.dynamicField["FieldType"];
            $scope.attributes[$scope.choices.dynamicField["FieldName"]]["IsActive"] = $('#switcher2').bootstrapSwitch('state');
            if ($scope.choices.dynamicField["Options"] != undefined && ($scope.choices.dynamicField["Options"]).toString() != "") {
                $scope.attributes[$scope.choices.dynamicField["FieldName"]]["Options"] = dynamicOpts;
            }
        }

        delete $scope.attributes['']
        delete $scope.attributes[' ']
        var dynamicFieldValue = {};
        dynamicFieldValue.configJSON = JSON.stringify($scope.attributes);

        $http({
            method: 'POST',
            url: appSetting.ServerPath + 'api/LegalEntity/DynamicField',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dynamicFieldValue

        }).then(function (response, status, headers, config) {

            if (response.data.success == true) {
                $rootScope.rootAttributes = $scope.attributes;
                
            }
            else {
                $scope.showalert1();
            }
        })

    };
});


GLET.directive("fileread", [function () {
    return {
        scope: {
            opts1: '='
        },
        link: function ($scope, $elm, $attrs) {
            $elm.on('change', function (changeEvent) {
                var reader = new FileReader();

                reader.onload = function (evt) {
                    $scope.$apply(function () {
                        var data = evt.target.result;

                        var workbook = XLSX.read(data, { type: 'binary' });

                        var headerNames = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];

                        var data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

                        $scope.opts = [];
                        var key = headerNames[0];
                        data.forEach(function (h) {
                            var opt = h[key];
                            if (opt != '' && opt != undefined) {

                                if ($scope.opts.indexOf(opt) == -1) {
                                    $scope.opts.push(opt);
                                }
                                // $scope.opts.push(h[key]);
                            }
                        });
                        $scope.opts1 = $scope.opts.join(",");

                        // $scope.opts.data = data;
                        //alert($scope.opts1)//
                        // $elm.val(null);
                    });
                };

                reader.readAsBinaryString(changeEvent.target.files[0]);
            });
        }
    }
}]);