
GLET.controller('TimelineController', function ($scope, $rootScope, constant, localStorageService, sessionService, $timeout, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, simpleFactory, $routeParams, $compile, appSetting) {
    $timeout(function () {
        $('.buttons-copy').attr('title', 'Copy');
        $('.buttons-print').attr('title', 'Print');
        $('.buttons-excel ').attr('title', 'Export');
    }, 1000);

    $rootScope.fname = localStorage.getItem('FNAME');
    $rootScope.lname = localStorage.getItem('LNAME');

    //$rootScope.username = localStorage.getItem('UserName');
    $scope.init = function () {
        $rootScope.login = true;


        $scope.apiURL = constant;   // Global var URL
        $scope.hfmtableheader = {}
        $scope.HEN = {};
        $scope.HS = {};
        $scope.HJD = {};
        $scope.HC = {};
        $scope.ERP = {}
        $scope.HLC = {};
        $scope.HUPB = {};
        $scope.HUPD = {};
        $scope.HFMW = {};
        $scope.tableheader = {};
        $scope.Incp = {}
        $scope.Acquisition = {}
        $scope.Disposition = {}
        $scope.Merged = {}

        $scope.tableJSON = {}
        $scope.LEN = {};
        $scope.LES = {};
        $scope.JD = {};
        $scope.ET = {};
        $scope.GT = {};
        $scope.LC = {};
        $scope.UPB = {};
        $scope.UPD = {};
        $scope.Adr = {};
        $scope.Ownsh = {};
        $scope.HFMR = {};

        var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllTimelineLookups";
        simpleFactory.getData(Url).then(function (re) {
            // alert(JSON.stringify(re));
            $scope.ledropdown = re.legalentities;

            $scope.HFMdropdown = re.hfms;

        })
        $scope.loadperiodData1 = function ($item, $model, $label, $event) {
            var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=" + $item.lE_ID + "&hfm_id=";
            $scope.multipleDemo = {};
            simpleFactory.getData(Url).then(function (re) {
                $scope.availableColors1 = re;

            })
        }
        $scope.loadperiodData2 = function ($item, $model, $label, $event) {
            var Url = appSetting.ServerPath + "apiGet/Lookup/GetAllPeriods?le_id=&hfm_id=" + $item.hfm_id;
            $scope.hfmMultiplePeriod = {};
            simpleFactory.getData(Url).then(function (re) {
                $scope.availableColors2 = re;

            })
        }

    }
    $scope.showTimeLine = function (le, pid, value) {
        $('#periodh').css("border", "1px solid #ccc");
        $('#hfm').css("border", "none");
        $('#periods').css("border", "1px solid #ccc");
        $('#le').css("border", "none");

        $scope.color = ['#B7D57B', '#F1B4AF', '#99D4E6', '#888888']
        $('#startgroup').css('border', 'none');
        $('#endgroup').css('border', 'none');
        $('#starthfmgroup').css('border', 'none');
        $('#endhfmgroup').css('border', 'none');
        var start = $('#start_date').val(),
         starthfm = $('#hfm_start_date').val(),
          endhfm = $('#hfm_end_date').val(),
            end = $('#end_date').val();


        var rand = $scope.color[Math.floor(Math.random() * $scope.color.length)];

        //        $scope.periodidarray = []
        //angular.forEach(pid, function (ele, i) {
        //    $scope.periodidarray.push("'"+String(ele.code+"'"))
        //    $scope.periodISC=$scope.periodidarray.join()

        //})

        if (value === 1) {
            if (starthfm == '' && endhfm == '') {
                $('#starthfmgroup').css('border', '1px solid red');
                $('#endhfmgroup').css('border', '1px solid red');

                return false;
            }
            if (starthfm == '') {
                $('#starthfmgroup').css('border', '1px solid red');
                return false;
            }
            if (endhfm == '') {
                $('#endhfmgroup').css('border', '1px solid red');
                return false;
            }
            //if (typeof pid === 'undefined' && typeof le === 'undefined' ||( le == '' && pid.length == 0)) {
            //    $('#periodh').css("border", "1px solid red");
            //    $('#hfm').css("border", "1px solid red");
            //    return false;
            //}
            //if (typeof pid === 'undefined' || pid.length == 0) {
            //    $('#periodh').css("border", "1px solid red");
            //    return false;
            //}

            if (typeof le === 'undefined' || le == '') {
                $('#hfm').css("border", "1px solid red");
                return false;
            }
            var start = $('#hfm_start_date').val(),
              end = $('#hfm_end_date').val();
            var val = $('#reporttype').val();

            var Hfm = le.hfm_id
            var Url = appSetting.ServerPath + "apiGet/HFMUnit/GetHFMTimeline?hfm_id=" + Hfm + "&start_date=" + start + "&end_date=" + end;
            console.log(Url)
            //var Url = appSetting.ServerPath + "apiGet/HFMUnit/GetHFMTimeline?hfm_id=" + Hfm + "&period_id=" + $scope.periodISC;
        }
        if (value === 2) {
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
            //if (typeof pid === 'undefined' && typeof le === 'undefined'||(le==''&&pid.length==0)) {
            //    $('#periods').css("border", "1px solid red");
            //    $('#le').css("border", "1px solid red");
            //    return false;
            //}
            //if (typeof pid === 'undefined' || pid.length == 0) {
            //    $('#periods').css("border", "1px solid red");
            //    return false;
            //}

            if (typeof le === 'undefined' || le == '') {
                $('#le').css("border", "1px solid red");
                return false;
            }
            var start = $('#start_date').val(),
               end = $('#end_date').val();
            var val = $('#reporttype').val();

            var lE_ID = le.lE_ID;
            var Url = appSetting.ServerPath + "apiGet/LegalEntity/GetLETimeline?le_id=" + lE_ID + "&start_date=" + start + "&end_date=" + end;
            console.log(Url)
            // var Url = appSetting.ServerPath + "apiGet/LegalEntity/GetLETimeline?le_id=" + lE_ID + "&period_id=" + $scope.periodISC;
        }

        simpleFactory.getData(Url).then(function (res) {
            $scope.lentity = [];
            $scope.hfmunit = [];
            res.legalentities.forEach(function (object) {
                // var opt = h[key];
                var found = $scope.lentity.some(function (el) {
                    return object.strupdated_dt === el.strupdated_dt;
                });
                if (!found) { $scope.lentity.push(object); }
            });
            res.legalentities = $scope.lentity;
            res.hfms.forEach(function (object) {
                // var opt = h[key];
                var found = $scope.hfmunit.some(function (el) {
                    return object.strupdated_dt === el.strupdated_dt;
                });
                if (!found) { $scope.hfmunit.push(object); }
            });
            res.hfms = $scope.hfmunit;

            if (res.legalentities.length) {

                $scope.LEsuc = false;
                $scope.tableheader = [{ "header": '', "color": '#888888 !important' }];
                $scope.tableJSON = []
                //variables for Legal Entity Tileline
                $scope.LEN = [{ "Lname": "Legal Entity Name" }];
                $scope.LES = [{ "Lstatus": "Legal Entity Status" }];
                $scope.JD = [{ "LJD": "Jurisdiction" }];
                $scope.ET = [{ "LET": "Entity Type" }];
                $scope.GT = [{ "LGT": "GAAP Type" }];
                $scope.LC = [{ "LCM": "LE Comments" }];
                $scope.UPB = [{ "LUB": "Updated By" }];
                $scope.UPD = [{ "LUD": "Updated Date" }];
                $scope.Adr = [{ "Adress": "Address" }];
                $scope.Ownsh = [{ "LOS": "Ownership" }];
                $scope.HFMR = [{ "LHFM": "Business Unit Reporting" }];
                angular.forEach(res.legalentities, function (obj, i) {
                    if (obj.jurisdiction == null) {
                        var imgstr = '';
                        obj.jurisdiction = '';
                    }
                    else {
                        var imgstr = obj.jurisdiction.substring(obj.jurisdiction.lastIndexOf("(") + 1, obj.jurisdiction.lastIndexOf(")"));
                    }
                    var date = new Date(obj.updated_dt)
                    var quarter = date.getFullYear() + '-Q' + Math.floor((date.getMonth() / 3));
                    $scope.tableheader.push({ "header": obj.strupdated_dt, "color": $scope.color[Math.floor(Math.random() * $scope.color.length)] })
                    $scope.LEN.push({ "Lname": obj.le_name });
                    $scope.LES.push({ "Lstatus": obj.le_status });
                    $scope.JD.push({ "LJD": obj.jurisdiction, "code": imgstr });
                    $scope.ET.push({ "LET": obj.le_type });
                    $scope.GT.push({ "LGT": obj.gaap_type });
                    $scope.LC.push({ "LCM": obj.comments });
                    $scope.UPB.push({ "LUB": obj.updated_by });
                    $scope.UPD.push({ "LUD": obj.strupdated_dt });
                    $scope.Adr.push({ "Adress": obj.address });
                    $scope.Ownsh.push({ "LOS": obj.ownership });
                    $scope.HFMR.push({ "LHFM": obj.lehfm })


                })
                $timeout(function () {

                    letablestyling();
                });
            }
            if (res.hfms.length) {

                $scope.suc = false;
                //variables for HFM Tileline
                $scope.hfmtableheader = [{ "hfmheader": "", "color": '#888888' }]
                $scope.HEN = [{ "Hname": "Business Unit Name" }];
                $scope.HS = [{ "Hsegement": "Business Unit segment" }];
                $scope.HJD = [{ "HJD": "Jurisdiction" }];
                $scope.HC = [{ "HFC": "currency" }];
                $scope.ERP = [{ "HERP": "ERP" }]
                $scope.HLC = [{ "HCM": "Business Unit Comments" }];
                $scope.HUPB = [{ "HLUB": "Updated by " }];
                $scope.HUPD = [{ "HFLUD": "Updated Date" }];
                $scope.HFMW = [{ "HFMWOB": "Business Unit Workbooks" }];
                angular.forEach(res.hfms, function (obj, i) {
                    if (obj.jurisdiction != null) {
                        var imgstr = obj.jurisdiction.substring(obj.jurisdiction.lastIndexOf("(") + 1, obj.jurisdiction.lastIndexOf(")"));
                    }
                    var datehfm = new Date(obj.strupdated_dt)
                    var quarterhfm = datehfm.getFullYear() + '-Q' + Math.floor((datehfm.getMonth() / 3));
                    $scope.hfmtableheader.push({ "hfmheader": obj.strupdated_dt, "color": '#' + Math.floor(Math.random() * 16777215).toString(16) })
                    // $scope.hfmtableheader.push({ "hfmheader": obj.period_id, "color": '#' + Math.floor(Math.random() * 16777215).toString(16) })
                    $scope.HEN.push({ "Hname": obj.hfm_label });
                    $scope.HS.push({ "Hsegement": obj.segment });
                    $scope.HJD.push({ "HJD": obj.jurisdiction, "code": imgstr });
                    $scope.HC.push({ "HFC": obj.currency });
                    $scope.ERP.push({ "HERP": obj.erp })

                    $scope.HLC.push({ "HCM": obj.bu_comments });
                    $scope.HUPB.push({ "HLUB": obj.updated_by });
                    $scope.HUPD.push({ "HFLUD": obj.strupdated_dt });
                    $scope.HFMW.push({ "HFMWOB": obj.hfmworkbook });

                })
                $timeout(function () {

                    hfmtablestyling();
                });
            }

            if (res.hfms.length === 0) {
                $scope.Success = 'No Data TO Display ';
                $scope.suc = true;
                $scope.LESuccess = '';
                $scope.LEsuc = false;

            }
            if (res.legalentities.length === 0) {
                $scope.LESuccess = 'No Data TO Display ';
                $scope.LEsuc = true;
                $scope.Success = '';
                $scope.suc = false;

            }


        })


    }
    $scope.multipleDemo = {};
    $scope.hfmMultiplePeriod = {};

    function actionsHtml(data, type, full, meta) {
        return '<div> <img ng-click="edit($event)"  class="ng-show pull-left" src="../images/edit.png" style="margin-left:20px;cursor:pointer" /><img ng-click="save($event)"  class="ng-hide pull-left" src="../images/save.jpg" style="margin-left:10px;cursor:pointer"/><img ng-click="cancel($event)" class="ng-hide pull-left" src="../images/cancel.jpg" style="margin-left:10px;cursor:pointer" />  </div>';

    }
    $timeout(function () {
        var select = $('.ui-select-match')[1];
        $(select.nextElementSibling).width($(select.parentNode.parentNode).width());
    })


    function hfmtablestyling() {
        $('#hfmtable').attr("style", " border-collapse:inherit !important");
        var heads = $('#hfmtable thead tr> th');
        var rows = $('#hfmtable tbody tr');
        var cells = [];
        $.each(rows, function (index, row) {
            if (index == 2) {
                $(row).height('35px');
            }
            $(row.cells[0]).height($(row).height());
            var color = $(row).css("background-color");
            $(row.cells[0]).css("line-height", $(row.cells[0]).height() + "px");
            $(row.cells[0]).css("background-color", color);
            if (index == 8) {
                $(row.cells[0]).attr("style", "line-height:" + $(row.cells[0]).height() + "px;border-bottom:1px solid #ddd !important;height:" + $(row).height() + "px;background-color:" + color);
            }
            if (index % 2) {
                $(row).css("background-color", "#fff");
                $(row.cells[0]).css("background-color", "#fff");

            }
            else {
                $(row).css("background-color", "#f9f9f9");
                $(row.cells[0]).css("background-color", "#f9f9f9");

            }
            $.each(row.cells, function (index2, cell) {
                if (row.cells.length > 2) {
                    if (index2 > 1) {
                        if (row.cells[index2].textContent !== row.cells[index2 - 1].textContent) {
                            $(row.cells[index2]).css("background-color", "#DAF1FF");
                            $(row.cells[index2].previousElementSibling).css("background-color", "#DAF1FF");
                        }
                    }
                }
            })

        });
        $.each(heads, function (index, head) {
            if (index == 0) {
                $(head).attr("style", "background-color:#888888 !important;height:34px;")

            }
            else if (index % 2)
                $(head).attr("style", "background-color:#B7D57B !important")
            else
                $(head).attr("style", "background-color:#F1B4AF !important")

        });
    }
    function letablestyling() {
        $('#letable').attr("style", " border-collapse:inherit !important");

        var heads = $('#letable thead tr> th');
        var rows = $('#letable tbody tr');
        $.each(rows, function (index, row) {
            if (index == 2) {
                $(row).height('35px');
            }
            $(row.cells[0]).height($(row).height());
            var color = $(row).css("background-color");
            $(row.cells[0]).css("line-height", $(row.cells[0]).height() + "px");
            $(row.cells[0]).css("background-color", color);
            if (index == 10) {
                $(row.cells[0]).attr("style", "line-height:" + $(row.cells[0]).height() + "px;border-bottom:1px solid #ddd !important;height:" + $(row).height() + "px;background-color:" + color);
            }
            if (index % 2) {
                $(row).css("background-color", "#fff");
                $(row.cells[0]).css("background-color", "#fff");

            }
            else {
                $(row).css("background-color", "#f9f9f9");
                $(row.cells[0]).css("background-color", "#f9f9f9");

            }
            $.each(row.cells, function (index2, cell) {
                if (row.cells.length > 2) {
                    if (index2 > 1) {
                        if (row.cells[index2].textContent !== row.cells[index2 - 1].textContent) {
                            $(row.cells[index2]).css("background-color", "#DAF1FF");
                            $(row.cells[index2].previousElementSibling).css("background-color", "#DAF1FF");
                        }
                    }
                }
            })
        });
        $.each(heads, function (index, head) {
            if (index == 0) {
                $(head).attr("style", "background-color:#888888 !important;height:34px;")

            }
            else if (index % 2)
                $(head).attr("style", "background-color:#B7D57B !important")
            else
                $(head).attr("style", "background-color:#F1B4AF !important")

        });

    }

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
