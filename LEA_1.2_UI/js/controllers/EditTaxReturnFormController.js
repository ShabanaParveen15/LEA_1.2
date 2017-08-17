GLET.controller('EditTaxReturnFormController', function ($rootScope, $filter, $compile, sessionService, localStorageService, $route, $scope, WebAPIService, authService, $timeout, constant, dataService, $http, appSetting) {

    $rootScope.login = true;
    
    $scope.showtaxreturncomp();   //Comment: Header Tabs active issue (When type in url)
   $rootScope.role = (sessionService.get('role') === "true");   // ADD edit dependency on role
    //$rootScope.username = localStorage.getItem('UserName');
   $rootScope.fname = localStorage.getItem('FNAME');
   $rootScope.lname = localStorage.getItem('LNAME');
    $scope.pdfshow = false;
    $scope.excelshow = true;
    $scope.active3 = true;
    $rootScope.isAlwaysDisabled = true;
    $scope.JE = {};
    $scope.icDiscObj = {};
    $scope.JESLItems = {};
    $scope.accountListOptionsString = "";
    $scope.journalEntriesOptionsString = "";
  
    $scope.apiURL = constant;
    $scope.pdfPrewiew = function()
    {
        
        $timeout(function () {
            $scope.getDataFromExcel();
            $rootScope.activeTab[0] = true;

        }, 3000);
    }
  
    if ($rootScope.previewClicked)
    {
        $scope.pdfPrewiew();
        //$rootScope.previewClicked = false;
    }
    $scope.icDiscObj = {};
    
    //$scope.icDiscObj.ICDISCCalendarYear = '00';

  
    $scope.isSaved = true;
    $scope.PrintElem = function (elem) {       
        if ($scope.isSaved) {            
            var link = window.document.createElement("a");
            link.download = "Form_1120_IC-DISC.pdf";          
            link.href = appSetting.ServerPath + "apiGet/TaxReturnCompliance/GetPDFByEntityID?EntityID=" + localStorage.getItem('EntityId') + "&YearID=" + localStorage.getItem('YearId') + "&CaseID=" + localStorage.getItem('caseID') + "";
            link.click();
        }
        else {
            alert("Please Save to Download Pdf");
        }
    }
    $scope.loaded = function (s, e) {
      
    };
    $scope.AppearBorder=function()
    {
        this.addClass("input-border");
    }
    $scope.cellEditEnding = function (s, e)
    {        
       
    }
    
    $scope.beginningEdit1 = function (s, e) {
       
       
    }
    $scope.schMLineItemAllowedRows = [];
    $scope.Popup = function (data) {
        var value1 = document.getElementById('xt-pdf-calendarYear').value;
        var value2 = document.getElementById('xt-pdf-icdName').value;
        var value3 = document.getElementById('xt-pdf-addressLine').value;
        var value4 = document.getElementById('xt-pdf-location').value;
        var value5 = document.getElementById('xt-pdf-TaxYearBeginning').value;
        var value6 = document.getElementById('xt-pdf-TaxYearBeginningYear').value;
        var value7 = document.getElementById('xt-pdf-TaxYearEnding').value;
        var value8 = document.getElementById('xt-pdf-TaxYearEndingYear').value;
        var value9 = document.getElementById('datepick').value;
        var value10 = document.getElementById('xt-pdf-EIN').value;
        var value11 = document.getElementById('xt-pdf-DateIncorporated').value;
        var value12 = document.getElementById('xt-pdf-BAC0').value;
        var value13 = document.getElementById('xt-pdf-BAC1').value;
        var value14 = document.getElementById('xt-pdf-BAC2').value;
        var value15 = document.getElementById('xt-pdf-BAC3').value;
        var value16 = document.getElementById('xt-pdf-BAC4').value;
        var value17 = document.getElementById('xt-pdf-BAC5').value;
        var value18 = document.getElementById('xt-pdf-TotalAssets').value;
        var value19 = document.getElementById('xt-pdf-TaxYear').value;
        var value20 = false;
        if ($scope.icDiscObj.ICDISCInitialReturn) {
            value20 = true;
        }

        var value21 = false;
        if ($scope.icDiscObj.ICDISCFinalReturn) {
            value21 = true;
        }

        var value22 = false;
        if ($scope.icDiscObj.ICDISCNameChange) {
            value22 = true;
        }

        var value23 = false;
        if ($scope.icDiscObj.ICDISCAddressChange) {
            value23 = true;
        }

        var value24 = false;
        if ($scope.icDiscObj.ICDISCAmendedReturn) {
            value24 = true;
        }

        var value25 = false;
        if ($scope.icDiscObj.ICDISC50_50) {
            value25 = true;
        }

        var value26 = false;
        if ($scope.icDiscObj.ICDISC4Percent) {
            value26 = true;
        }

        var value27 = false;
        if ($scope.icDiscObj.ICDISCSec482) {
            value27 = true;
        }

        var value28 = false;
        if ($scope.icDiscObj.ICDISCSec994b2) {
            value28 = true;
        }

        var value29 = false;
        if ($scope.icDiscObj.ICDISCSelfEmployed) {
            value29 = true;
        }

        var value30 = document.getElementById('xt-pdf-FirmPhone').value;
        var value31 = document.getElementById('xt-pdf-FirmAddress').value;
        var value32 = document.getElementById('xt-pdf-FirmEIN').value;
        var value33 = document.getElementById('xt-pdf-FirmName').value;
        var value34 = document.getElementById('xt-pdf-PTIN').value;
        var value35 = document.getElementById('xt-pdf-PreparerName').value;
        var value36 = document.getElementById('xt-pdf-val15').value;
        var value37 = document.getElementById('xt-pdf-TaxableIncome8').value;
        var value38 = document.getElementById('xt-pdf-TaxableIncome7').value;
        var value39 = document.getElementById('xt-pdf-TaxableIncome6c').value;
        var value40 = document.getElementById('xt-pdf-TaxableIncome6b').value;
        var value41 = document.getElementById('xt-pdf-TaxableIncome6a').value;
        var value42 = document.getElementById('xt-pdf-TaxableIncome5').value;
        var value43 = document.getElementById('xt-pdf-TaxableIncome4').value;
        var value44 = document.getElementById('xt-pdf-TaxableIncome3').value;
        var value45 = document.getElementById('xt-pdf-TaxableIncome2').value;
        var value46 = document.getElementById('xt-pdf-TaxableIncome1').value;
        var value47 = document.getElementById('xt-pdf-val14').value;
        var value48 = document.getElementById('xt-pdf-val13').value;
        var value49 = document.getElementById('xt-pdf-val12').value;
        var value50 = document.getElementById('xt-pdf-val11').value;
        var value51 = document.getElementById('xt-pdf-val10').value;
        var value52 = document.getElementById('xt-pdf-val9').value;
        var value53 = document.getElementById('xt-pdf-val8').value;
        var value54 = document.getElementById('xt-pdf-val7').value;
        var value55 = document.getElementById('xt-pdf-val6').value;
        var value56 = document.getElementById('xt-pdf-val5').value;
        var value57 = document.getElementById('xt-pdf-val4').value;
        var value58 = document.getElementById('xt-pdf-val3').value;
        var value59 = document.getElementById('xt-pdf-val2').value;
        var value60 = document.getElementById('xt-pdf-val1').value;
        var value61 = false;



        var mywindow = window.open('', 'my div', 'height=786,width=1376');
        mywindow.document.write('<html><head><title>my div</title>');
        /*optional stylesheet*/// mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" media="print" />');
        mywindow.document.write('<style>mydiv {position: relative; } #example { position: absolute; top: 10px;left: 10px; padding: 5px;}@media print {#mydiv{margin-top:-50px}#new-id{ margin-top:155px !important}}</style>');
        mywindow.document.write('</head><body ><div id="mydiv">');
        mywindow.document.write(data);

        mywindow.document.write('</div></body></html>');
        mywindow.document.getElementById('xt-pdf-calendarYear').value = value1;
        mywindow.document.getElementById('xt-pdf-icdName').value = value2;
        mywindow.document.getElementById('xt-pdf-addressLine').value = value3;
        mywindow.document.getElementById('xt-pdf-location').value = value4;

        mywindow.document.getElementById('xt-pdf-TaxYearBeginning').value = value5;
        mywindow.document.getElementById('xt-pdf-TaxYearBeginningYear').value = value6;
        mywindow.document.getElementById('xt-pdf-TaxYearEnding').value = value7;
        mywindow.document.getElementById('xt-pdf-TaxYearEndingYear').value = value8;
        mywindow.document.getElementById('datepick').value = value9;
        mywindow.document.getElementById('xt-pdf-EIN').value = value10;
        mywindow.document.getElementById('xt-pdf-DateIncorporated').value = value11;
        mywindow.document.getElementById('xt-pdf-BAC0').value = value12;
        mywindow.document.getElementById('xt-pdf-BAC1').value = value13;
        mywindow.document.getElementById('xt-pdf-BAC2').value = value14;
        mywindow.document.getElementById('xt-pdf-BAC3').value = value15;
        mywindow.document.getElementById('xt-pdf-BAC4').value = value16;
        mywindow.document.getElementById('xt-pdf-BAC5').value = value17;
        mywindow.document.getElementById('xt-pdf-TotalAssets').value = value18;
        mywindow.document.getElementById('xt-pdf-TaxYear').value = value19;

        mywindow.document.getElementById('xt-pdf-InitialReturn').checked = value20;
        mywindow.document.getElementById('xt-pdf-FinalReturn').checked = value21;
        mywindow.document.getElementById('xt-pdf-NameChange').checked = value22;
        mywindow.document.getElementById('xt-pdf-AddressChange').checked = value23;
        mywindow.document.getElementById('xt-pdf-AmendedReturn').checked = value24;
        mywindow.document.getElementById('xt-pdf-check1').checked = value25;
        mywindow.document.getElementById('xt-pdf-check1').checked = value26;
        mywindow.document.getElementById('xt-pdf-check1').checked = value27;
        mywindow.document.getElementById('xt-pdf-check1').checked = value28;
        mywindow.document.getElementById('xt-pdf-checkSelfEmployed').checked = value29;

        mywindow.document.getElementById('xt-pdf-FirmPhone').value = value30;
        mywindow.document.getElementById('xt-pdf-FirmAddress').value = value31;
        mywindow.document.getElementById('xt-pdf-FirmEIN').value = value32;
        mywindow.document.getElementById('xt-pdf-FirmName').value = value33;
        mywindow.document.getElementById('xt-pdf-PTIN').value = value34;
        mywindow.document.getElementById('xt-pdf-PreparerName').value = value35;
        mywindow.document.getElementById('xt-pdf-val15').value = value36;
        mywindow.document.getElementById('xt-pdf-TaxableIncome8').value = value37;
        mywindow.document.getElementById('xt-pdf-TaxableIncome7').value = value38;
        mywindow.document.getElementById('xt-pdf-TaxableIncome6c').value = value39;
        mywindow.document.getElementById('xt-pdf-TaxableIncome6b').value = value40;
        mywindow.document.getElementById('xt-pdf-TaxableIncome6a').value = value41;
        mywindow.document.getElementById('xt-pdf-TaxableIncome5').value = value42;
        mywindow.document.getElementById('xt-pdf-TaxableIncome4').value = value43;
        mywindow.document.getElementById('xt-pdf-TaxableIncome3').value = value44;
        mywindow.document.getElementById('xt-pdf-TaxableIncome2').value = value45;
        mywindow.document.getElementById('xt-pdf-TaxableIncome1').value = value46;
        mywindow.document.getElementById('xt-pdf-val14').value = value47;
        mywindow.document.getElementById('xt-pdf-val13').value = value48;
        mywindow.document.getElementById('xt-pdf-val12').value = value49;
        mywindow.document.getElementById('xt-pdf-val11').value = value50;
        mywindow.document.getElementById('xt-pdf-val10').value = value51;
        mywindow.document.getElementById('xt-pdf-val9').value = value52;
        mywindow.document.getElementById('xt-pdf-val8').value = value53;
        mywindow.document.getElementById('xt-pdf-val7').value = value54;
        mywindow.document.getElementById('xt-pdf-val6').value = value55;
        mywindow.document.getElementById('xt-pdf-val5').value = value56;
        mywindow.document.getElementById('xt-pdf-val4').value = value57;
        mywindow.document.getElementById('xt-pdf-val3').value = value58;
        mywindow.document.getElementById('xt-pdf-val2').value = value59;
        mywindow.document.getElementById('xt-pdf-val1').value = value60;



        if (document.getElementById('xt-pdf-TaxYear').checked) {
            mywindow.document.getElementById('xt-pdf-TaxYear').checked = true;
        }
        if (document.getElementById('xt-pdf-TaxYear2').checked) {
            mywindow.document.getElementById('xt-pdf-TaxYear2').checked = true;
        }

        if (document.getElementById('xt-pdf-Radio2Val1').checked) {
            mywindow.document.getElementById('xt-pdf-Radio2Val1').checked = true;
        }
        if (document.getElementById('xt-pdf-Radio2Val2').checked) {
            mywindow.document.getElementById('xt-pdf-Radio2Val2').checked = true;
        }

        if (document.getElementById('xt-pdf-RadioVal1').checked) {
            mywindow.document.getElementById('xt-pdf-RadioVal1').checked = true;
        }
        if (document.getElementById('xt-pdf-RadioVal2').checked) {
            mywindow.document.getElementById('xt-pdf-RadioVal2').checked = true;
        }

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        mywindow.print();
        mywindow.close();

        return true;
    }

    // print funftions ---------- end
    $scope.isExcel = true;
   
   
    $scope.UpdateFunc = function (FieldMapIdtemp, modelName) {
        $scope.BackUp[FieldMapIdtemp] = modelName;
        $scope.isSaved = false;
    }
    $scope.UpdateFuncForCheckBox = function (FieldMapIdtemp, modelName) {
        $scope.isSaved = false;
        if (modelName) {
            
            $scope.BackUp[FieldMapIdtemp] = "True";
        }
        else {
            $scope.BackUp[FieldMapIdtemp] = "False";
        }


    }
    $scope.UpdateFuncForRadioButton = function (FieldMapIdtemp1, modelName, FieldMapIdtemp2) {
        $scope.isSaved = false;
        if (modelName=="Yes") {
            $scope.BackUp[FieldMapIdtemp1] = "True";
            $scope.BackUp[FieldMapIdtemp2] = "False";
        }
        else if (modelName == "No") {
            $scope.BackUp[FieldMapIdtemp1] = "False";
            $scope.BackUp[FieldMapIdtemp2] = "True";
        }
    }
    $scope.UpdateFuncForRadioButton1 = function (FieldMapIdtemp1, modelName, FieldMapIdtemp2) {
        $scope.isSaved = false;
        if (modelName == "Yes") {
            $scope.BackUp[FieldMapIdtemp1] = "True";
            $scope.BackUp[FieldMapIdtemp2] = "False";
        }
        else if (modelName == "No") {
            $scope.BackUp[FieldMapIdtemp1] = "False";
            $scope.BackUp[FieldMapIdtemp2] = "True";
        }
        else {
            $scope.BackUp[FieldMapIdtemp1] = "";
            $scope.BackUp[FieldMapIdtemp2] = "";
        }
    }
    
   
    $scope.IsChanged = false;
    
   
    $scope.refreshFunction=function(variable){
        $timeout(function () {
            try {
                // $scope.ManualFormulaCalc();
                variable.grid.startEditing(false, 0, 6, false);
                $timeout(function () {
                    variable.grid.startEditing(false, 0, 5, false);

                })
            } catch (e) {

            }
        }, 300)
    }
    var o = false;

    $scope.ShowExcel = function (index) {
        $rootScope.activeTab[index] = true;
        $scope.isExcel = true;
        if (o) {
            $scope.ctx.excelIOSheet.selectedSheetIndex = 1;

            //$scope.ctx.excelIOSheet.scrollIntoView(100,0);
            $scope.ctx.excelIOSheet.invalidateAll(null);
          //  $scope.ctx.excelIOSheet.refresh(true);
        }
        o = true;

        //  $scope.GetServiceData();
        //$scope.ctx.excelIOSheet.setCellData(6, 2, $scope.icDiscObj.icdName, true);


    }
    $scope.$watch('icDiscObj', function (newVal, oldVal) {
       
        for (var property in $scope.icDiscObj) {
            if ($scope.icDiscObj.hasOwnProperty(property)) {
                if (newVal[property] != oldVal[property]) {
                    newVal.property = newVal.property.replace(/,/g, '');
                }
            }
        }

    }, true);
    
   
    $scope.$watch('BackUp', function (n, v) {
        $scope.chaged = [];
        for (var property in $scope.BackUp) {
                    if ($scope.BackUp.hasOwnProperty(property)) {
                        if (n[property] != v[property]) {
                            obj = {};
                            obj.fieldMapID = property;
                            obj.formValue =n[property];
                            $scope.chaged.push(obj);
                        }
                    }
        }
        $scope.BackUp = {};
       // console.log($scope.chaged)
        //console.log($scope.reversemap[$scope.chaged[$scope.chaged.length-1].fieldMapID]);
        try{
            var map = $scope.reversemap[$scope.chaged[$scope.chaged.length - 1].fieldMapID];
            if ($scope.chaged[$scope.chaged.length-1].fieldMapID==312) {
                $scope.sval1 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(18, 2, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length-1].fieldMapID==313) {
                $scope.sval2 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(19, 2, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }

            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 314) {
                $scope.sval3 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(20, 2, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 315) {
                $scope.sval4 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(21, 2, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }

            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 316) {
                $scope.sval5 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(22, 2, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }

            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 317) {
                $scope.sval6 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(26, 2, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 324) {
                $scope.sval7 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(34, 2, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 331) {
                $scope.sval8 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(34, 4, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 337) {
                $scope.sval19 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(63, 3, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 338) {
                $scope.sval20 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(63, 5, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 339) {
                $scope.sval21 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(64, 3, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 340) {
                $scope.sval22 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(64, 5, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 354) {
                $scope.sval23 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[0].grid.setCellData(69, 3, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 697) {
                $scope.sval9 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(9, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 699) {
                $scope.sval10 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(10, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 701) {
                $scope.sval11 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(11, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 703) {
                $scope.sval12 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(12, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 705) {
                $scope.sval13 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(13, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 707) {
                $scope.sval14 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(14, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 709) {
                $scope.sval15 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(15, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 711) {
                $scope.sval16 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(16, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 713) {
                $scope.sval17 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(17, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            }
            else if ($scope.chaged[$scope.chaged.length - 1].fieldMapID == 719) {
                $scope.sval18 = $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No";
                $scope.ctx.excelIOSheet.sheets[6].grid.setCellData(24, 9, $scope.chaged[$scope.chaged.length - 1].formValue ? "Yes" : "No", true);
            } else
                $scope.ctx.excelIOSheet.sheets[map.worksheeT_INDEX].grid.setCellData(map.x_coordinate, map.y_coordinate, $scope.chaged[$scope.chaged.length-1].formValue,false);
        }
        catch(ex)
        {

        }
        $scope.getDataFromExcel();
    },true)
    $scope.SavePdfToDB1 = function () {
        $("#loader").show();
        try
        {
        $scope.icDiscObj.ICDISCCalendarYear = $scope.ctx.excelIOSheet.getCellValue(13, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(299, $scope.icDiscObj.ICDISCCalendarYear);
        $scope.icDiscObj.ICDISCTaxYearBeginning = $scope.ctx.excelIOSheet.getCellValue(15, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(300, $scope.icDiscObj.ICDISCTaxYearBeginning);
        $scope.icDiscObj.ICDISCTaxYearBeginningYear = $scope.ctx.excelIOSheet.getCellValue(16, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(301, $scope.icDiscObj.ICDISCTaxYearBeginningYear);
        $scope.icDiscObj.ICDISCTaxYearEnding = $scope.ctx.excelIOSheet.getCellValue(15, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(302, $scope.icDiscObj.ICDISCTaxYearEnding);
        $scope.icDiscObj.ICDISCTaxYearEndingYear = $scope.ctx.excelIOSheet.getCellValue(16, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
            $scope.UpdateFunc(303, $scope.icDiscObj.ICDISCTaxYearEndingYear);
        }
        catch (ex) {

        }
            
            $scope.icDiscObj.ICDISCLegalName = $scope.ctx.excelIOSheet.getCellValue(6, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCAddressLine = $scope.ctx.excelIOSheet.getCellValue(7, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCLocation = $scope.ctx.excelIOSheet.getCellValue(8, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        // document.getElementById('datepick').value = new Date();
        $scope.icDiscObj.ICDISCDateOfElection = new Date($scope.ctx.excelIOSheet.getCellValue(7, 5, false, $scope.ctx.excelIOSheet.sheets[0]));
        // $scope.icDiscObj.ICDISCDateOfElection.fieldMapID = 307;
        
        $scope.icDiscObj.ICDISCBAC = [];
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(0, 1));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(1, 2));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(2, 3));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(3, 4));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(4, 5));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(5));
       // $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(6));
        //$scope.icDiscObj.ICDISCBAC.fieldMapID = 308;
        $scope.icDiscObj.ICDISCEIN = $scope.ctx.excelIOSheet.getCellValue(10, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCDateIncorporated = $scope.ctx.excelIOSheet.getCellValue(6, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCTotalAssets = $scope.ctx.excelIOSheet.getCellValue(10, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(311, $scope.icDiscObj.ICDISCTotalAssets);
        if ($scope.ctx.excelIOSheet.getCellValue(18, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(18, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCInitialReturn = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(18, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(18, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.ICDISCInitialReturn = false;
        }
        $scope.UpdateFuncForCheckBox(312, $scope.icDiscObj.ICDISCInitialReturn);
        if ($scope.ctx.excelIOSheet.getCellValue(19, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(19, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCFinalReturn = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(19, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(19, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCFinalReturn = false;
        }
        $scope.UpdateFuncForCheckBox(313, $scope.icDiscObj.ICDISCFinalReturn);
        if ($scope.ctx.excelIOSheet.getCellValue(20, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(20, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCNameChange = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(20, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(20, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCNameChange = false;
        }
        $scope.UpdateFuncForCheckBox(314, $scope.icDiscObj.ICDISCNameChange);
        if ($scope.ctx.excelIOSheet.getCellValue(21, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(21, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCAddressChange = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(21, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(21, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCAddressChange = false;
        }
        $scope.UpdateFuncForCheckBox(315, $scope.icDiscObj.ICDISCAddressChange);
        if ($scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCAmendedReturn = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCAmendedReturn = false;
        }
        $scope.UpdateFuncForCheckBox(316, $scope.icDiscObj.ICDISCAmendedReturn);
        if ($scope.ctx.excelIOSheet.getCellValue(26, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes") {
            $scope.icDiscObj.G1_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(317, $scope.icDiscObj.G1_Yes, 318);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(26, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.G1_Yes = "No";

            $scope.UpdateFuncForRadioButton(317, $scope.icDiscObj.G1_Yes, 318);
        }
        $scope.icDiscObj.G1_Name1 = $scope.ctx.excelIOSheet.getCellValue(29, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(319, $scope.icDiscObj.G1_Name1);
        $scope.icDiscObj.G1_Number1 = $scope.ctx.excelIOSheet.getCellValue(30, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(320, $scope.icDiscObj.G1_Number1);
        $scope.icDiscObj.G1_Address1 = $scope.ctx.excelIOSheet.getCellValue(31, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(321, $scope.icDiscObj.G1_Address1);
        $scope.icDiscObj.G1_VotingStockOwned1 = $scope.ctx.excelIOSheet.getCellValue(32, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(322, $scope.icDiscObj.G1_VotingStockOwned1);
        $scope.icDiscObj.G1_TotalAssets1 = $scope.ctx.excelIOSheet.getCellValue(33, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(323, $scope.icDiscObj.G1_TotalAssets1);

        if ($scope.ctx.excelIOSheet.getCellValue(34, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes") {
            $scope.icDiscObj.G1_ForeignOwnerYes1 = "Yes";
            $scope.UpdateFuncForRadioButton1(324, $scope.icDiscObj.G1_ForeignOwnerYes1, 325);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(34, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.G1_ForeignOwnerYes1 = "No";
            $scope.UpdateFuncForRadioButton1(325, $scope.icDiscObj.G1_ForeignOwnerYes1, 324);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(34, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "") {
            $scope.icDiscObj.G1_ForeignOwnerYes1 = "";
            $scope.UpdateFuncForRadioButton1(325, $scope.icDiscObj.G1_ForeignOwnerYes1, 324);
        }
        $scope.icDiscObj.G1_Name2 = $scope.ctx.excelIOSheet.getCellValue(29, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(326, $scope.icDiscObj.G1_Name2);
        $scope.icDiscObj.G1_Number2 = $scope.ctx.excelIOSheet.getCellValue(30, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(327, $scope.icDiscObj.G1_Number2);
        $scope.icDiscObj.G1_Address2 = $scope.ctx.excelIOSheet.getCellValue(31, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(328, $scope.icDiscObj.G1_Address2);
        $scope.icDiscObj.G1_VotingStockOwned2 = $scope.ctx.excelIOSheet.getCellValue(32, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(329, $scope.icDiscObj.G1_VotingStockOwned2);
       $scope.icDiscObj.G1_TotalAssets2 = $scope.ctx.excelIOSheet.getCellValue(33, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
       $scope.UpdateFunc(330, $scope.icDiscObj.G1_TotalAssets2);
      
        if ($scope.ctx.excelIOSheet.getCellValue(34, 4, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes") {
            $scope.icDiscObj.G1_ForeignOwnerYes2 = "Yes";
            $scope.UpdateFuncForRadioButton1(331, $scope.icDiscObj.G1_ForeignOwnerYes2, 332);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(34, 4, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.G1_ForeignOwnerYes2 = "No";
            $scope.UpdateFuncForRadioButton1(332, $scope.icDiscObj.G1_ForeignOwnerYes2, 331);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(34, 4, false, $scope.ctx.excelIOSheet.sheets[0]) == "") {
            $scope.icDiscObj.G1_ForeignOwnerYes2 = "";
            $scope.UpdateFuncForRadioButton1(332, $scope.icDiscObj.G1_ForeignOwnerYes2, 331);
        }
        $scope.icDiscObj.TaxYearFirstCorp = $scope.ctx.excelIOSheet.getCellValue(36, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(333, $scope.icDiscObj.TaxYearFirstCorp);
        $scope.icDiscObj.IRSServiceCenter1 = $scope.ctx.excelIOSheet.getCellValue(37, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(334, $scope.icDiscObj.IRSServiceCenter1);
        $scope.icDiscObj.TaxYearSecondCorp = $scope.ctx.excelIOSheet.getCellValue(36, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(335, $scope.icDiscObj.TaxYearSecondCorp);
        $scope.icDiscObj.IRSServiceCenter2 = $scope.ctx.excelIOSheet.getCellValue(37, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(336, $scope.icDiscObj.IRSServiceCenter2);
        if ($scope.ctx.excelIOSheet.getCellValue(63, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes") {
            $scope.icDiscObj.ICDISC50_50 = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(63, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.ICDISC50_50 = false;
        }
        $scope.UpdateFuncForCheckBox(337, $scope.icDiscObj.ICDISC50_50);
        if ($scope.ctx.excelIOSheet.getCellValue(64, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes") {
            $scope.icDiscObj.ICDISC4Percent = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(64, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.ICDISC4Percent = false;
        }
        $scope.UpdateFuncForCheckBox(338, $scope.icDiscObj.ICDISC4Percent);
        if ($scope.ctx.excelIOSheet.getCellValue(64, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes") {
            $scope.icDiscObj.ICDISCSec482 = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(64, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.ICDISCSec482 = false;
        }
        $scope.UpdateFuncForCheckBox(339, $scope.icDiscObj.ICDISCSec482);
        if ($scope.ctx.excelIOSheet.getCellValue(63, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes") {
            $scope.icDiscObj.ICDISCSec994b2 = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(63, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.ICDISCSec994b2 = false;
        }
        $scope.UpdateFuncForCheckBox(340, $scope.icDiscObj.ICDISCSec994b2);
        $scope.icDiscObj.ICDISCTaxableIncome1 = $scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(341, $scope.icDiscObj.ICDISCTaxableIncome1);
        $scope.icDiscObj.ICDISCTaxableIncome2 = $scope.ctx.excelIOSheet.getCellValue(9, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(342, $scope.icDiscObj.ICDISCTaxableIncome2);
        $scope.icDiscObj.ICDISCTaxableIncome3 = $scope.ctx.excelIOSheet.getCellValue(10, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(343, $scope.icDiscObj.ICDISCTaxableIncome3);
        $scope.icDiscObj.ICDISCTaxableIncome4 = $scope.ctx.excelIOSheet.getCellValue(11, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(344, $scope.icDiscObj.ICDISCTaxableIncome4);
        $scope.icDiscObj.ICDISCTaxableIncome5 = $scope.ctx.excelIOSheet.getCellValue(12, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(345, $scope.icDiscObj.ICDISCTaxableIncome5);
        $scope.icDiscObj.ICDISCTaxableIncome6a = $scope.ctx.excelIOSheet.getCellValue(13, 3, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(346, $scope.icDiscObj.ICDISCTaxableIncome6a);
        $scope.icDiscObj.ICDISCTaxableIncome6b = $scope.ctx.excelIOSheet.getCellValue(14, 3, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(347, $scope.icDiscObj.ICDISCTaxableIncome6b);
        $scope.icDiscObj.ICDISCTaxableIncome6c = $scope.ctx.excelIOSheet.getCellValue(15, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(348, $scope.icDiscObj.ICDISCTaxableIncome6c);
        $scope.icDiscObj.ICDISCTaxableIncome7 = $scope.ctx.excelIOSheet.getCellValue(16, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(350, $scope.icDiscObj.ICDISCTaxableIncome7);
        $scope.icDiscObj.ICDISCTaxableIncome8 = $scope.ctx.excelIOSheet.getCellValue(17, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.UpdateFunc(351, $scope.icDiscObj.ICDISCTaxableIncome8);
        $scope.icDiscObj.ICDISCPreparerName = $scope.ctx.excelIOSheet.getCellValue(69, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(353, $scope.icDiscObj.ICDISCPreparerName);
        if ($scope.ctx.excelIOSheet.getCellValue(69, 3, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(69, 3, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCSelfEmployed = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(69, 3, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(69, 3, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCSelfEmployed = false;
        }
        $scope.UpdateFuncForCheckBox(354, $scope.icDiscObj.ICDISCSelfEmployed);
        $scope.icDiscObj.ICDISCPTIN = $scope.ctx.excelIOSheet.getCellValue(69, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(355, $scope.icDiscObj.ICDISCPTIN);
        $scope.icDiscObj.ICDISCFirmName = $scope.ctx.excelIOSheet.getCellValue(72, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(356, $scope.icDiscObj.ICDISCFirmName);
        $scope.icDiscObj.ICDISCFirmEIN = $scope.ctx.excelIOSheet.getCellValue(72, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(357, $scope.icDiscObj.ICDISCFirmEIN);
        $scope.icDiscObj.ICDISCFirmAddress = $scope.ctx.excelIOSheet.getCellValue(72, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(358, $scope.icDiscObj.ICDISCFirmAddress);
        $scope.icDiscObj.ICDISCFirmPhone = $scope.ctx.excelIOSheet.getCellValue(69, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(359, $scope.icDiscObj.ICDISCFirmPhone);
        //page 2
        $scope.icDiscObj.ICDISCScheB1a_i_b = $scope.ctx.excelIOSheet.getCellValue(9, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(379, $scope.icDiscObj.ICDISCScheB1a_i_b);
        $scope.icDiscObj.ICDISCScheB1a_i_c = $scope.ctx.excelIOSheet.getCellValue(9, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(380, $scope.icDiscObj.ICDISCScheB1a_i_c);
        $scope.icDiscObj.ICDISCScheB1a_i_d = $scope.ctx.excelIOSheet.getCellValue(9, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(381, $scope.icDiscObj.ICDISCScheB1a_i_d);
        $scope.icDiscObj.ICDISCScheB1a_i_e = $scope.ctx.excelIOSheet.getCellValue(9, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(382, $scope.icDiscObj.ICDISCScheB1a_i_e);
        $scope.icDiscObj.ICDISCScheB1a_ii_b = $scope.ctx.excelIOSheet.getCellValue(10, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(383, $scope.icDiscObj.ICDISCScheB1a_ii_b);
        $scope.icDiscObj.ICDISCScheB1a_ii_c = $scope.ctx.excelIOSheet.getCellValue(10, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(384, $scope.icDiscObj.ICDISCScheB1a_ii_c);
        $scope.icDiscObj.ICDISCScheB1a_ii_d = $scope.ctx.excelIOSheet.getCellValue(10, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(385, $scope.icDiscObj.ICDISCScheB1a_ii_d);
        $scope.icDiscObj.ICDISCScheB1a_ii_e = $scope.ctx.excelIOSheet.getCellValue(10, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(386, $scope.icDiscObj.ICDISCScheB1a_ii_e);
        $scope.icDiscObj.ICDISCScheB1a_iii_b = $scope.ctx.excelIOSheet.getCellValue(11, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(387, $scope.icDiscObj.ICDISCScheB1a_iii_b);
        $scope.icDiscObj.ICDISCScheB1a_iii_c = $scope.ctx.excelIOSheet.getCellValue(11, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(388, $scope.icDiscObj.ICDISCScheB1a_iii_c);
        $scope.icDiscObj.ICDISCScheB1a_iii_d = $scope.ctx.excelIOSheet.getCellValue(11, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(389, $scope.icDiscObj.ICDISCScheB1a_iii_d);
        $scope.icDiscObj.ICDISCScheB1a_iii_e = $scope.ctx.excelIOSheet.getCellValue(11, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(390, $scope.icDiscObj.ICDISCScheB1a_iii_e);
        $scope.icDiscObj.ICDISCScheB1a_iv_b = $scope.ctx.excelIOSheet.getCellValue(12, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(391, $scope.icDiscObj.ICDISCScheB1a_iv_b);
        $scope.icDiscObj.ICDISCScheB1a_iv_c = $scope.ctx.excelIOSheet.getCellValue(12, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(392, $scope.icDiscObj.ICDISCScheB1a_iv_c);
        $scope.icDiscObj.ICDISCScheB1a_iv_d = $scope.ctx.excelIOSheet.getCellValue(12, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(393, $scope.icDiscObj.ICDISCScheB1a_iv_d);
        $scope.icDiscObj.ICDISCScheB1a_iv_e = $scope.ctx.excelIOSheet.getCellValue(12, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(394, $scope.icDiscObj.ICDISCScheB1a_iv_e);
        $scope.icDiscObj.ICDISCScheB1b_i_b = $scope.ctx.excelIOSheet.getCellValue(14, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(395, $scope.icDiscObj.ICDISCScheB1b_i_b);
        $scope.icDiscObj.ICDISCScheB1b_i_c = $scope.ctx.excelIOSheet.getCellValue(14, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(396, $scope.icDiscObj.ICDISCScheB1b_i_c);
        $scope.icDiscObj.ICDISCScheB1b_i_d = $scope.ctx.excelIOSheet.getCellValue(14, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(397, $scope.icDiscObj.ICDISCScheB1b_i_d);
        $scope.icDiscObj.ICDISCScheB1b_i_e = $scope.ctx.excelIOSheet.getCellValue(14, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(398, $scope.icDiscObj.ICDISCScheB1b_i_e);
        $scope.icDiscObj.ICDISCScheB1b_ii_b = $scope.ctx.excelIOSheet.getCellValue(15, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(399, $scope.icDiscObj.ICDISCScheB1b_ii_b);
        $scope.icDiscObj.ICDISCScheB1b_ii_c = $scope.ctx.excelIOSheet.getCellValue(15, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(400, $scope.icDiscObj.ICDISCScheB1b_ii_c);
        $scope.icDiscObj.ICDISCScheB1b_ii_d = $scope.ctx.excelIOSheet.getCellValue(15, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(401, $scope.icDiscObj.ICDISCScheB1b_ii_d);
        $scope.icDiscObj.ICDISCScheB1b_ii_e = $scope.ctx.excelIOSheet.getCellValue(15, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(402, $scope.icDiscObj.ICDISCScheB1b_ii_e);
        $scope.icDiscObj.ICDISCScheB1c_total_b = $scope.ctx.excelIOSheet.getCellValue(16, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(403, $scope.icDiscObj.ICDISCScheB1c_total_b);
        $scope.icDiscObj.ICDISCScheB1c_total_c = $scope.ctx.excelIOSheet.getCellValue(16, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(404, $scope.icDiscObj.ICDISCScheB1c_total_c);
        $scope.icDiscObj.ICDISCScheB1c_total_d = $scope.ctx.excelIOSheet.getCellValue(16, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(405, $scope.icDiscObj.ICDISCScheB1c_total_d);
        $scope.icDiscObj.ICDISCScheB1c_total_e = $scope.ctx.excelIOSheet.getCellValue(16, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(406, $scope.icDiscObj.ICDISCScheB1c_total_e);
        $scope.icDiscObj.ICDISCScheB2a_b = $scope.ctx.excelIOSheet.getCellValue(18, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(407, $scope.icDiscObj.ICDISCScheB2a_b);
        $scope.icDiscObj.ICDISCScheB2a_c = $scope.ctx.excelIOSheet.getCellValue(18, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(408, $scope.icDiscObj.ICDISCScheB2a_c);
        $scope.icDiscObj.ICDISCScheB2a_d = $scope.ctx.excelIOSheet.getCellValue(18, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(409, $scope.icDiscObj.ICDISCScheB2a_d);
        $scope.icDiscObj.ICDISCScheB2a_e = $scope.ctx.excelIOSheet.getCellValue(18, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(410, $scope.icDiscObj.ICDISCScheB2a_e);
        $scope.icDiscObj.ICDISCScheB2b_b = $scope.ctx.excelIOSheet.getCellValue(19, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(411, $scope.icDiscObj.ICDISCScheB2b_b);
        $scope.icDiscObj.ICDISCScheB2b_c = $scope.ctx.excelIOSheet.getCellValue(19, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(412, $scope.icDiscObj.ICDISCScheB2b_c);
        $scope.icDiscObj.ICDISCScheB2b_d = $scope.ctx.excelIOSheet.getCellValue(19, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(413, $scope.icDiscObj.ICDISCScheB2b_d);
        $scope.icDiscObj.ICDISCScheB2b_e = $scope.ctx.excelIOSheet.getCellValue(19, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(414, $scope.icDiscObj.ICDISCScheB2b_e);
        $scope.icDiscObj.ICDISCScheB2c_b = $scope.ctx.excelIOSheet.getCellValue(20, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(415, $scope.icDiscObj.ICDISCScheB2c_b);
        $scope.icDiscObj.ICDISCScheB2c_c = $scope.ctx.excelIOSheet.getCellValue(20, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(416, $scope.icDiscObj.ICDISCScheB2c_c);
        $scope.icDiscObj.ICDISCScheB2c_d = $scope.ctx.excelIOSheet.getCellValue(20, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(417, $scope.icDiscObj.ICDISCScheB2c_d);
        $scope.icDiscObj.ICDISCScheB2c_e = $scope.ctx.excelIOSheet.getCellValue(20, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(418, $scope.icDiscObj.ICDISCScheB2c_e);
        $scope.icDiscObj.ICDISCScheB2d_b = $scope.ctx.excelIOSheet.getCellValue(21, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(419, $scope.icDiscObj.ICDISCScheB2d_b);
        $scope.icDiscObj.ICDISCScheB2d_c = $scope.ctx.excelIOSheet.getCellValue(21, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(420, $scope.icDiscObj.ICDISCScheB2d_c);
        $scope.icDiscObj.ICDISCScheB2d_d = $scope.ctx.excelIOSheet.getCellValue(21, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(421, $scope.icDiscObj.ICDISCScheB2d_d);
        $scope.icDiscObj.ICDISCScheB2d_e = $scope.ctx.excelIOSheet.getCellValue(21, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(422, $scope.icDiscObj.ICDISCScheB2d_e);
        $scope.icDiscObj.ICDISCScheB2e_d = $scope.ctx.excelIOSheet.getCellValue(22, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(423, $scope.icDiscObj.ICDISCScheB2e_d);
        $scope.icDiscObj.ICDISCScheB2e_e = $scope.ctx.excelIOSheet.getCellValue(22, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(424, $scope.icDiscObj.ICDISCScheB2e_e);
        $scope.icDiscObj.ICDISCScheB2f_d = $scope.ctx.excelIOSheet.getCellValue(23, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(425, $scope.icDiscObj.ICDISCScheB2f_d);
        $scope.icDiscObj.ICDISCScheB2f_e = $scope.ctx.excelIOSheet.getCellValue(23, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(426, $scope.icDiscObj.ICDISCScheB2f_e);
        $scope.icDiscObj.ICDISCScheB2g_d = $scope.ctx.excelIOSheet.getCellValue(24, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(427, $scope.icDiscObj.ICDISCScheB2g_d);
        $scope.icDiscObj.ICDISCScheB2g_e = $scope.ctx.excelIOSheet.getCellValue(24, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(428, $scope.icDiscObj.ICDISCScheB2g_e);
        $scope.icDiscObj.ICDISCScheB2h_d = $scope.ctx.excelIOSheet.getCellValue(25, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(429, $scope.icDiscObj.ICDISCScheB2h_d);
        $scope.icDiscObj.ICDISCScheB2h_e = $scope.ctx.excelIOSheet.getCellValue(25, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(430, $scope.icDiscObj.ICDISCScheB2h_e);
        $scope.icDiscObj.ICDISCScheB2i_d = $scope.ctx.excelIOSheet.getCellValue(26, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(431, $scope.icDiscObj.ICDISCScheB2i_d);
        $scope.icDiscObj.ICDISCScheB2i_e = $scope.ctx.excelIOSheet.getCellValue(26, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(432, $scope.icDiscObj.ICDISCScheB2i_e);
        $scope.icDiscObj.ICDISCScheB2j_b = $scope.ctx.excelIOSheet.getCellValue(27, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(433, $scope.icDiscObj.ICDISCScheB2j_b);
        $scope.icDiscObj.ICDISCScheB2j_c = $scope.ctx.excelIOSheet.getCellValue(27, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(434, $scope.icDiscObj.ICDISCScheB2j_c);
        $scope.icDiscObj.ICDISCScheB2j_d = $scope.ctx.excelIOSheet.getCellValue(27, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(435, $scope.icDiscObj.ICDISCScheB2j_d);
        $scope.icDiscObj.ICDISCScheB2j_e = $scope.ctx.excelIOSheet.getCellValue(27, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(436, $scope.icDiscObj.ICDISCScheB2j_e);
        $scope.icDiscObj.ICDISCScheB2k_b = $scope.ctx.excelIOSheet.getCellValue(28, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(437, $scope.icDiscObj.ICDISCScheB2k_b);
        $scope.icDiscObj.ICDISCScheB2k_c = $scope.ctx.excelIOSheet.getCellValue(28, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(438, $scope.icDiscObj.ICDISCScheB2k_c);
        $scope.icDiscObj.ICDISCScheB2k_d = $scope.ctx.excelIOSheet.getCellValue(28, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(439, $scope.icDiscObj.ICDISCScheB2k_d);
        $scope.icDiscObj.ICDISCScheB2k_e = $scope.ctx.excelIOSheet.getCellValue(28, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(440, $scope.icDiscObj.ICDISCScheB2k_e);
        $scope.icDiscObj.ICDISCScheB3a_b = $scope.ctx.excelIOSheet.getCellValue(30, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(441, $scope.icDiscObj.ICDISCScheB3a_b);
        $scope.icDiscObj.ICDISCScheB3a_c = $scope.ctx.excelIOSheet.getCellValue(30, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(442, $scope.icDiscObj.ICDISCScheB3a_c);
        $scope.icDiscObj.ICDISCScheB3a_d = $scope.ctx.excelIOSheet.getCellValue(30, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(443, $scope.icDiscObj.ICDISCScheB3a_d);
        $scope.icDiscObj.ICDISCScheB3a_e = $scope.ctx.excelIOSheet.getCellValue(30, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(444, $scope.icDiscObj.ICDISCScheB3a_e);
        $scope.icDiscObj.ICDISCScheB3b_b = $scope.ctx.excelIOSheet.getCellValue(31, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(445, $scope.icDiscObj.ICDISCScheB3b_b);
        $scope.icDiscObj.ICDISCScheB3b_c = $scope.ctx.excelIOSheet.getCellValue(31, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(446, $scope.icDiscObj.ICDISCScheB3b_c);
        $scope.icDiscObj.ICDISCScheB3b_d = $scope.ctx.excelIOSheet.getCellValue(31, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(447, $scope.icDiscObj.ICDISCScheB3b_d);
        $scope.icDiscObj.ICDISCScheB3b_e = $scope.ctx.excelIOSheet.getCellValue(31, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(448, $scope.icDiscObj.ICDISCScheB3b_e);
        $scope.icDiscObj.ICDISCScheB3c_b = $scope.ctx.excelIOSheet.getCellValue(32, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(449, $scope.icDiscObj.ICDISCScheB3c_b);
        $scope.icDiscObj.ICDISCScheB3c_c = $scope.ctx.excelIOSheet.getCellValue(32, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(450, $scope.icDiscObj.ICDISCScheB3c_c);
        $scope.icDiscObj.ICDISCScheB3c_d = $scope.ctx.excelIOSheet.getCellValue(32, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(451, $scope.icDiscObj.ICDISCScheB3c_d);
        $scope.icDiscObj.ICDISCScheB3c_e = $scope.ctx.excelIOSheet.getCellValue(32, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(452, $scope.icDiscObj.ICDISCScheB3c_e);
        $scope.icDiscObj.ICDISCScheB3d_b = $scope.ctx.excelIOSheet.getCellValue(33, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(453, $scope.icDiscObj.ICDISCScheB3d_b);
        $scope.icDiscObj.ICDISCScheB3d_c = $scope.ctx.excelIOSheet.getCellValue(33, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(454, $scope.icDiscObj.ICDISCScheB3d_c);
        $scope.icDiscObj.ICDISCScheB3d_d = $scope.ctx.excelIOSheet.getCellValue(33, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(455, $scope.icDiscObj.ICDISCScheB3d_d);
        $scope.icDiscObj.ICDISCScheB3d_e = $scope.ctx.excelIOSheet.getCellValue(33, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(456, $scope.icDiscObj.ICDISCScheB3d_e);
        $scope.icDiscObj.ICDISCScheB3e_d = $scope.ctx.excelIOSheet.getCellValue(34, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(457, $scope.icDiscObj.ICDISCScheB3e_d);
        $scope.icDiscObj.ICDISCScheB3e_e = $scope.ctx.excelIOSheet.getCellValue(34, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(458, $scope.icDiscObj.ICDISCScheB3e_e);
        $scope.icDiscObj.ICDISCScheB3f_b = $scope.ctx.excelIOSheet.getCellValue(35, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(459, $scope.icDiscObj.ICDISCScheB3f_b);
        $scope.icDiscObj.ICDISCScheB3f_c = $scope.ctx.excelIOSheet.getCellValue(35, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(460, $scope.icDiscObj.ICDISCScheB3f_c);
        $scope.icDiscObj.ICDISCScheB3f_d = $scope.ctx.excelIOSheet.getCellValue(35, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(461, $scope.icDiscObj.ICDISCScheB3f_d);
        $scope.icDiscObj.ICDISCScheB3f_e = $scope.ctx.excelIOSheet.getCellValue(35, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(462, $scope.icDiscObj.ICDISCScheB3f_e);
        $scope.icDiscObj.ICDISCScheB3g_b = $scope.ctx.excelIOSheet.getCellValue(36, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(463, $scope.icDiscObj.ICDISCScheB3g_b);
        $scope.icDiscObj.ICDISCScheB3g_c = $scope.ctx.excelIOSheet.getCellValue(36, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(464, $scope.icDiscObj.ICDISCScheB3g_c);
        $scope.icDiscObj.ICDISCScheB3g_d = $scope.ctx.excelIOSheet.getCellValue(36, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(465, $scope.icDiscObj.ICDISCScheB3g_d);
        $scope.icDiscObj.ICDISCScheB3g_e = $scope.ctx.excelIOSheet.getCellValue(36, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(466, $scope.icDiscObj.ICDISCScheB3g_e);
        $scope.icDiscObj.ICDISCScheB4_e = $scope.ctx.excelIOSheet.getCellValue(37, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(467, $scope.icDiscObj.ICDISCScheB4_e);
        $scope.icDiscObj.SchedE1a = $scope.ctx.excelIOSheet.getCellValue(42, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(500, $scope.icDiscObj.SchedE1a);
        $scope.icDiscObj.SchedE1b = $scope.ctx.excelIOSheet.getCellValue(43, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(501, $scope.icDiscObj.SchedE1b);
        $scope.icDiscObj.SchedE1c = $scope.ctx.excelIOSheet.getCellValue(44, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(502, $scope.icDiscObj.SchedE1c);
        $scope.icDiscObj.SchedE1d = $scope.ctx.excelIOSheet.getCellValue(45, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(503, $scope.icDiscObj.SchedE1d);
        $scope.icDiscObj.SchedE1e = $scope.ctx.excelIOSheet.getCellValue(46, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(504, $scope.icDiscObj.SchedE1e);
        $scope.icDiscObj.SchedE1f = $scope.ctx.excelIOSheet.getCellValue(47, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(505, $scope.icDiscObj.SchedE1f);
        $scope.icDiscObj.SchedE1g = $scope.ctx.excelIOSheet.getCellValue(48, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(506, $scope.icDiscObj.SchedE1g);
        $scope.icDiscObj.SchedE1h = $scope.ctx.excelIOSheet.getCellValue(49, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(507, $scope.icDiscObj.SchedE1h);
        $scope.icDiscObj.SchedE1i = $scope.ctx.excelIOSheet.getCellValue(50, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(508, $scope.icDiscObj.SchedE1i);
        $scope.icDiscObj.SchedE1j = $scope.ctx.excelIOSheet.getCellValue(51, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(509, $scope.icDiscObj.SchedE1j);
        $scope.icDiscObj.SchedE1k = $scope.ctx.excelIOSheet.getCellValue(52, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(510, $scope.icDiscObj.SchedE1k);
        $scope.icDiscObj.SchedE1l = $scope.ctx.excelIOSheet.getCellValue(53, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(511, $scope.icDiscObj.SchedE1l);
        $scope.icDiscObj.SchedE1m_other = $scope.ctx.excelIOSheet.getCellValue(54, 4, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(512, $scope.icDiscObj.SchedE1m_other);
        $scope.icDiscObj.SchedE1m_other2 = $scope.ctx.excelIOSheet.getCellValue(55, 1, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(513, $scope.icDiscObj.SchedE1m_other2);
        $scope.icDiscObj.SchedE1m = $scope.ctx.excelIOSheet.getCellValue(55, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(514, $scope.icDiscObj.SchedE1m);
        $scope.icDiscObj.SchedE1n = $scope.ctx.excelIOSheet.getCellValue(56, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(515, $scope.icDiscObj.SchedE1n);

        $scope.icDiscObj.SchedE2a = $scope.ctx.excelIOSheet.getCellValue(58, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(516, $scope.icDiscObj.SchedE2a);
        $scope.icDiscObj.SchedE2b = $scope.ctx.excelIOSheet.getCellValue(59, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(517, $scope.icDiscObj.SchedE2b);
        $scope.icDiscObj.SchedE2c = $scope.ctx.excelIOSheet.getCellValue(60, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(518, $scope.icDiscObj.SchedE2c);
        $scope.icDiscObj.SchedE2d = $scope.ctx.excelIOSheet.getCellValue(61, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(519, $scope.icDiscObj.SchedE2d);
        $scope.icDiscObj.SchedE2e = $scope.ctx.excelIOSheet.getCellValue(62, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(520, $scope.icDiscObj.SchedE2e);
        $scope.icDiscObj.SchedE2f = $scope.ctx.excelIOSheet.getCellValue(63, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(521, $scope.icDiscObj.SchedE2f);
        $scope.icDiscObj.SchedE2g_other = $scope.ctx.excelIOSheet.getCellValue(64, 4, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(522, $scope.icDiscObj.SchedE2g_other);
        $scope.icDiscObj.SchedE2g_other2 = $scope.ctx.excelIOSheet.getCellValue(65, 1, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(523, $scope.icDiscObj.SchedE2g_other2);
        $scope.icDiscObj.SchedE2g = $scope.ctx.excelIOSheet.getCellValue(65, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(524, $scope.icDiscObj.SchedE2g);
        $scope.icDiscObj.SchedE2h = $scope.ctx.excelIOSheet.getCellValue(66, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(525, $scope.icDiscObj.SchedE2h);
        $scope.icDiscObj.SchedE3 = $scope.ctx.excelIOSheet.getCellValue(67, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.UpdateFunc(526, $scope.icDiscObj.SchedE3);
        //Page4
        $scope.icDiscObj.SchedJ1 = $scope.ctx.excelIOSheet.getCellValue(6, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(527, $scope.icDiscObj.SchedJ1);
        $scope.icDiscObj.SchedJ2 = $scope.ctx.excelIOSheet.getCellValue(7, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(528, $scope.icDiscObj.SchedJ2);
        $scope.icDiscObj.SchedJ3 = $scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(529, $scope.icDiscObj.SchedJ3);
        $scope.icDiscObj.SchedJ4 = $scope.ctx.excelIOSheet.getCellValue(9, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(530, $scope.icDiscObj.SchedJ4);
        $scope.icDiscObj.SchedJ5 = $scope.ctx.excelIOSheet.getCellValue(10, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(531, $scope.icDiscObj.SchedJ5);
        $scope.icDiscObj.SchedJ6 = $scope.ctx.excelIOSheet.getCellValue(11, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(532, $scope.icDiscObj.SchedJ6);
        $scope.icDiscObj.SchedJ7 = $scope.ctx.excelIOSheet.getCellValue(12, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(533, $scope.icDiscObj.SchedJ7);
        $scope.icDiscObj.SchedJ8 = $scope.ctx.excelIOSheet.getCellValue(13, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(534, $scope.icDiscObj.SchedJ8);
        $scope.icDiscObj.SchedJ9 = $scope.ctx.excelIOSheet.getCellValue(14, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(535, $scope.icDiscObj.SchedJ9);

        $scope.icDiscObj.SchedJ10 = $scope.ctx.excelIOSheet.getCellValue(15, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(536, $scope.icDiscObj.SchedJ10);
        $scope.icDiscObj.SchedJ11 = $scope.ctx.excelIOSheet.getCellValue(16, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(537, $scope.icDiscObj.SchedJ11);
        $scope.icDiscObj.SchedJ12 = $scope.ctx.excelIOSheet.getCellValue(18, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(538, $scope.icDiscObj.SchedJ12);
        $scope.icDiscObj.SchedJ13 = $scope.ctx.excelIOSheet.getCellValue(19, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(539, $scope.icDiscObj.SchedJ13);
        $scope.icDiscObj.SchedJ14 = $scope.ctx.excelIOSheet.getCellValue(20, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(540, $scope.icDiscObj.SchedJ14);
        $scope.icDiscObj.SchedJ15 = $scope.ctx.excelIOSheet.getCellValue(21, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(541, $scope.icDiscObj.SchedJ15);
        $scope.icDiscObj.SchedJ16 = $scope.ctx.excelIOSheet.getCellValue(22, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(542, $scope.icDiscObj.SchedJ16);
        $scope.icDiscObj.SchedJ17a = $scope.ctx.excelIOSheet.getCellValue(24, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(543, $scope.icDiscObj.SchedJ17a);
        $scope.icDiscObj.SchedJ17b = $scope.ctx.excelIOSheet.getCellValue(25, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(544, $scope.icDiscObj.SchedJ17b);
        $scope.icDiscObj.SchedJ18 = $scope.ctx.excelIOSheet.getCellValue(26, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(545, $scope.icDiscObj.SchedJ18);
        $scope.icDiscObj.SchedJ19 = $scope.ctx.excelIOSheet.getCellValue(27, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(546, $scope.icDiscObj.SchedJ19);
        $scope.icDiscObj.SchedJ20 = $scope.ctx.excelIOSheet.getCellValue(28, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(547, $scope.icDiscObj.SchedJ20);
        $scope.icDiscObj.SchedJ21 = $scope.ctx.excelIOSheet.getCellValue(29, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(548, $scope.icDiscObj.SchedJ21);
        $scope.icDiscObj.SchedJ22 = $scope.ctx.excelIOSheet.getCellValue(30, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(549, $scope.icDiscObj.SchedJ22);
        $scope.icDiscObj.SchedJ23 = $scope.ctx.excelIOSheet.getCellValue(31, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(550, $scope.icDiscObj.SchedJ23);
        $scope.icDiscObj.SchedJ24 = $scope.ctx.excelIOSheet.getCellValue(32, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(551, $scope.icDiscObj.SchedJ24);
        $scope.icDiscObj.SchedJPart2_1 = $scope.ctx.excelIOSheet.getCellValue(34, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(552, $scope.icDiscObj.SchedJPart2_1);
        $scope.icDiscObj.SchedJPart2_2 = $scope.ctx.excelIOSheet.getCellValue(35, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(553, $scope.icDiscObj.SchedJPart2_2);
        $scope.icDiscObj.SchedJPart2_3 = $scope.ctx.excelIOSheet.getCellValue(36, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(554, $scope.icDiscObj.SchedJPart2_3);
        $scope.icDiscObj.SchedJPart2_4 = $scope.ctx.excelIOSheet.getCellValue(37, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(555, $scope.icDiscObj.SchedJPart2_4);
        $scope.icDiscObj.SchedJPart2_5 = $scope.ctx.excelIOSheet.getCellValue(38, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(556, $scope.icDiscObj.SchedJPart2_5);
        $scope.icDiscObj.SchedJPart2_6 = $scope.ctx.excelIOSheet.getCellValue(39, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(557, $scope.icDiscObj.SchedJPart2_6);
        $scope.icDiscObj.SchedJPart2_7 = $scope.ctx.excelIOSheet.getCellValue(40, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(558, $scope.icDiscObj.SchedJPart2_7);
        $scope.icDiscObj.SchedJPart3_1 = $scope.ctx.excelIOSheet.getCellValue(42, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(559, $scope.icDiscObj.SchedJPart3_1);
        $scope.icDiscObj.SchedJPart3_2 = $scope.ctx.excelIOSheet.getCellValue(43, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(560, $scope.icDiscObj.SchedJPart3_2);
        $scope.icDiscObj.SchedJPart3_3 = $scope.ctx.excelIOSheet.getCellValue(44, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(561, $scope.icDiscObj.SchedJPart3_3);
        $scope.icDiscObj.SchedJPart4_1 = $scope.ctx.excelIOSheet.getCellValue(46, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(562, $scope.icDiscObj.SchedJPart4_1);
        $scope.icDiscObj.SchedJPart4_2 = $scope.ctx.excelIOSheet.getCellValue(47, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(563, $scope.icDiscObj.SchedJPart4_2);
        $scope.icDiscObj.SchedJPart4_3 = $scope.ctx.excelIOSheet.getCellValue(48, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(564, $scope.icDiscObj.SchedJPart4_3);
        $scope.icDiscObj.SchedJPart4_4a = $scope.ctx.excelIOSheet.getCellValue(50, 3, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(565, $scope.icDiscObj.SchedJPart4_4a);
        $scope.icDiscObj.SchedJPart4_4b = $scope.ctx.excelIOSheet.getCellValue(51, 3, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(566, $scope.icDiscObj.SchedJPart4_4b);
        $scope.icDiscObj.SchedJPart4_4c = $scope.ctx.excelIOSheet.getCellValue(52, 3, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(567, $scope.icDiscObj.SchedJPart4_4c);
        $scope.icDiscObj.SchedJPard4_4d = $scope.ctx.excelIOSheet.getCellValue(53, 3, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(568, $scope.icDiscObj.SchedJPard4_4d);
        $scope.icDiscObj.SchedJPart5_1 = $scope.ctx.excelIOSheet.getCellValue(55, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(569, $scope.icDiscObj.SchedJPart5_1);
        $scope.icDiscObj.SchedJPart5_2 = $scope.ctx.excelIOSheet.getCellValue(56, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(570, $scope.icDiscObj.SchedJPart5_2);
        $scope.icDiscObj.SchedJPart5_3 = $scope.ctx.excelIOSheet.getCellValue(57, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.UpdateFunc(571, $scope.icDiscObj.SchedJPart5_3);
        $scope.icDiscObj.SchedL1a_a = $scope.ctx.excelIOSheet.getCellValue(7, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(572, $scope.icDiscObj.SchedL1a_a);
        $scope.icDiscObj.SchedL1a_b = $scope.ctx.excelIOSheet.getCellValue(7, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(573, $scope.icDiscObj.SchedL1a_b);
        $scope.icDiscObj.SchedL1b_a = $scope.ctx.excelIOSheet.getCellValue(8, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(574, $scope.icDiscObj.SchedL1b_a);
        $scope.icDiscObj.SchedL1b_b = $scope.ctx.excelIOSheet.getCellValue(8, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(575, $scope.icDiscObj.SchedL1b_b);
        $scope.icDiscObj.SchedL1c_a = $scope.ctx.excelIOSheet.getCellValue(9, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(576, $scope.icDiscObj.SchedL1c_a);
        $scope.icDiscObj.SchedL1c_b = $scope.ctx.excelIOSheet.getCellValue(9, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(577, $scope.icDiscObj.SchedL1c_b);
        $scope.icDiscObj.SchedL1d_a = $scope.ctx.excelIOSheet.getCellValue(10, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(578, $scope.icDiscObj.SchedL1d_a);
        $scope.icDiscObj.SchedL1d_b = $scope.ctx.excelIOSheet.getCellValue(10, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(579, $scope.icDiscObj.SchedL1d_b);
        $scope.icDiscObj.SchedL1d_2_a = $scope.ctx.excelIOSheet.getCellValue(11, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(580, $scope.icDiscObj.SchedL1d_2_a);
        $scope.icDiscObj.SchedL1d_2_b = $scope.ctx.excelIOSheet.getCellValue(11, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(581, $scope.icDiscObj.SchedL1d_2_b);
        $scope.icDiscObj.SchedL1e_a = $scope.ctx.excelIOSheet.getCellValue(13, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(582, $scope.icDiscObj.SchedL1e_a);
        $scope.icDiscObj.SchedL1e_b = $scope.ctx.excelIOSheet.getCellValue(13, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(583, $scope.icDiscObj.SchedL1e_b);
        $scope.icDiscObj.SchedL1f_a = $scope.ctx.excelIOSheet.getCellValue(14, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(584, $scope.icDiscObj.SchedL1f_a);
        $scope.icDiscObj.SchedL1f_b = $scope.ctx.excelIOSheet.getCellValue(14, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(585, $scope.icDiscObj.SchedL1f_b);
        $scope.icDiscObj.SchedL1g_a = $scope.ctx.excelIOSheet.getCellValue(15, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(586, $scope.icDiscObj.SchedL1g_a);
        $scope.icDiscObj.SchedL1g_b = $scope.ctx.excelIOSheet.getCellValue(15, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(587, $scope.icDiscObj.SchedL1g_b);
        $scope.icDiscObj.SchedL1h_a = $scope.ctx.excelIOSheet.getCellValue(16, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(588, $scope.icDiscObj.SchedL1h_a);
        $scope.icDiscObj.SchedL1h_b = $scope.ctx.excelIOSheet.getCellValue(16, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(589, $scope.icDiscObj.SchedL1h_b);
        $scope.icDiscObj.SchedL1h_2_a = $scope.ctx.excelIOSheet.getCellValue(17, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(590, $scope.icDiscObj.SchedL1h_2_a);
        $scope.icDiscObj.SchedL1h_2_b = $scope.ctx.excelIOSheet.getCellValue(17, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(591, $scope.icDiscObj.SchedL1h_2_b);
        $scope.icDiscObj.SchedL1i_a = $scope.ctx.excelIOSheet.getCellValue(19, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(592, $scope.icDiscObj.SchedL1i_a);
        $scope.icDiscObj.SchedL1i_b = $scope.ctx.excelIOSheet.getCellValue(19, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(593, $scope.icDiscObj.SchedL1i_b);
        $scope.icDiscObj.SchedL2_Line = $scope.ctx.excelIOSheet.getCellValue(20, 3, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(594, $scope.icDiscObj.SchedL2_Line);
        $scope.icDiscObj.SchedL2_a = $scope.ctx.excelIOSheet.getCellValue(20, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(595, $scope.icDiscObj.SchedL2_a);
        $scope.icDiscObj.SchedL2_b = $scope.ctx.excelIOSheet.getCellValue(20, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(596, $scope.icDiscObj.SchedL2_b);
        $scope.icDiscObj.SchedL3_a = $scope.ctx.excelIOSheet.getCellValue(21, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(597, $scope.icDiscObj.SchedL3_a);
        $scope.icDiscObj.SchedL3_b = $scope.ctx.excelIOSheet.getCellValue(21, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(598, $scope.icDiscObj.SchedL3_b);
        $scope.icDiscObj.SchedL4_a = $scope.ctx.excelIOSheet.getCellValue(22, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(599, $scope.icDiscObj.SchedL4_a);
        $scope.icDiscObj.SchedL4_b = $scope.ctx.excelIOSheet.getCellValue(22, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(600, $scope.icDiscObj.SchedL4_b);
        $scope.icDiscObj.SchedL5_a = $scope.ctx.excelIOSheet.getCellValue(23, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(601, $scope.icDiscObj.SchedL5_a);
        $scope.icDiscObj.SchedL5_b = $scope.ctx.excelIOSheet.getCellValue(23, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(602, $scope.icDiscObj.SchedL5_b);
        $scope.icDiscObj.SchedL6_a = $scope.ctx.excelIOSheet.getCellValue(24, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(603, $scope.icDiscObj.SchedL6_a);
        $scope.icDiscObj.SchedL6_b = $scope.ctx.excelIOSheet.getCellValue(24, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(604, $scope.icDiscObj.SchedL6_b);
        $scope.icDiscObj.SchedL7_a = $scope.ctx.excelIOSheet.getCellValue(25, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(605, $scope.icDiscObj.SchedL7_a);
        $scope.icDiscObj.SchedL7_b = $scope.ctx.excelIOSheet.getCellValue(25, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(606, $scope.icDiscObj.SchedL7_b);
        $scope.icDiscObj.SchedL8_a = $scope.ctx.excelIOSheet.getCellValue(26, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(607, $scope.icDiscObj.SchedL8_a);
        $scope.icDiscObj.SchedL8_b = $scope.ctx.excelIOSheet.getCellValue(26, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(608, $scope.icDiscObj.SchedL8_b);
        $scope.icDiscObj.SchedL9_a = $scope.ctx.excelIOSheet.getCellValue(27, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(609, $scope.icDiscObj.SchedL9_a);
        $scope.icDiscObj.SchedL9_b = $scope.ctx.excelIOSheet.getCellValue(27, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(610, $scope.icDiscObj.SchedL9_b);
        $scope.icDiscObj.SchedL10_a = $scope.ctx.excelIOSheet.getCellValue(28, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(611, $scope.icDiscObj.SchedL10_a);
        $scope.icDiscObj.SchedL10_b = $scope.ctx.excelIOSheet.getCellValue(28, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(612, $scope.icDiscObj.SchedL10_b);
        $scope.icDiscObj.SchedL11_a = $scope.ctx.excelIOSheet.getCellValue(29, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(613, $scope.icDiscObj.SchedL11_a);
        $scope.icDiscObj.SchedL11_b = $scope.ctx.excelIOSheet.getCellValue(29, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(614, $scope.icDiscObj.SchedL11_b);
        $scope.icDiscObj.SchedL12_a = $scope.ctx.excelIOSheet.getCellValue(30, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(615, $scope.icDiscObj.SchedL12_a);
        $scope.icDiscObj.SchedL12_b = $scope.ctx.excelIOSheet.getCellValue(30, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(616, $scope.icDiscObj.SchedL12_b);
        $scope.icDiscObj.SchedL13_a = $scope.ctx.excelIOSheet.getCellValue(31, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(617, $scope.icDiscObj.SchedL13_a);
        $scope.icDiscObj.SchedL13_b = $scope.ctx.excelIOSheet.getCellValue(31, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(618, $scope.icDiscObj.SchedL13_b);
        $scope.icDiscObj.SchedL14_a = $scope.ctx.excelIOSheet.getCellValue(32, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(619, $scope.icDiscObj.SchedL14_a);
        $scope.icDiscObj.SchedL14_b = $scope.ctx.excelIOSheet.getCellValue(32, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(620, $scope.icDiscObj.SchedL14_b);
        $scope.icDiscObj.SchedL15_a = $scope.ctx.excelIOSheet.getCellValue(33, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(621, $scope.icDiscObj.SchedL15_a);
        $scope.icDiscObj.SchedL15_b = $scope.ctx.excelIOSheet.getCellValue(33, 10, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.UpdateFunc(622, $scope.icDiscObj.SchedL15_b);

        $scope.icDiscObj.SchedM1_1 = $scope.ctx.excelIOSheet.getCellValue(5, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(623, $scope.icDiscObj.SchedM1_1);
        $scope.icDiscObj.SchedM1_2 = $scope.ctx.excelIOSheet.getCellValue(6, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(624, $scope.icDiscObj.SchedM1_2);
        $scope.icDiscObj.SchedM1_3_a = $scope.ctx.excelIOSheet.getCellValue(8, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(625, $scope.icDiscObj.SchedM1_3_a);
        $scope.icDiscObj.SchedM1_3_b = $scope.ctx.excelIOSheet.getCellValue(7, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(626, $scope.icDiscObj.SchedM1_3_b);
        $scope.icDiscObj.SchedM1_4_a = $scope.ctx.excelIOSheet.getCellValue(10, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(627, $scope.icDiscObj.SchedM1_4_a);
        $scope.icDiscObj.SchedM1_4_b = $scope.ctx.excelIOSheet.getCellValue(10, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(628, $scope.icDiscObj.SchedM1_4_b);
        $scope.icDiscObj.SchedM1_5 = $scope.ctx.excelIOSheet.getCellValue(11, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(629, $scope.icDiscObj.SchedM1_5);
        $scope.icDiscObj.SchedM1_6_a = $scope.ctx.excelIOSheet.getCellValue(6, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(630, $scope.icDiscObj.SchedM1_6_a);
        $scope.icDiscObj.SchedM1_6_b = $scope.ctx.excelIOSheet.getCellValue(6, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(631, $scope.icDiscObj.SchedM1_6_b);
        $scope.icDiscObj.SchedM1_7_a = $scope.ctx.excelIOSheet.getCellValue(8, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(632, $scope.icDiscObj.SchedM1_7_a);
        $scope.icDiscObj.SchedM1_7_b = $scope.ctx.excelIOSheet.getCellValue(8, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(633, $scope.icDiscObj.SchedM1_7_b);
        $scope.icDiscObj.SchedM1_8 = $scope.ctx.excelIOSheet.getCellValue(9, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(634, $scope.icDiscObj.SchedM1_8);
        $scope.icDiscObj.SchedM1_9 = $scope.ctx.excelIOSheet.getCellValue(10, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(635, $scope.icDiscObj.SchedM1_9);
        $scope.icDiscObj.SchedM2_1 = $scope.ctx.excelIOSheet.getCellValue(13, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(636, $scope.icDiscObj.SchedM2_1);
        $scope.icDiscObj.SchedM2_2_a = $scope.ctx.excelIOSheet.getCellValue(14, 3, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(637, $scope.icDiscObj.SchedM2_2_a);
        $scope.icDiscObj.SchedM2_2_b = $scope.ctx.excelIOSheet.getCellValue(15, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(638, $scope.icDiscObj.SchedM2_2_b);
        $scope.icDiscObj.SchedM2_2_c = $scope.ctx.excelIOSheet.getCellValue(14, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(639, $scope.icDiscObj.SchedM2_2_c);
        $scope.icDiscObj.SchedM2_3 = $scope.ctx.excelIOSheet.getCellValue(16, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(640, $scope.icDiscObj.SchedM2_3);
        $scope.icDiscObj.SchedM2_4 = $scope.ctx.excelIOSheet.getCellValue(17, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(641, $scope.icDiscObj.SchedM2_4);
        $scope.icDiscObj.SchedM2_5 = $scope.ctx.excelIOSheet.getCellValue(13, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(642, $scope.icDiscObj.SchedM2_5);
        $scope.icDiscObj.SchedM2_6_a = $scope.ctx.excelIOSheet.getCellValue(14, 8, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(643, $scope.icDiscObj.SchedM2_6_a);
        $scope.icDiscObj.SchedM2_6_b = $scope.ctx.excelIOSheet.getCellValue(15, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(644, $scope.icDiscObj.SchedM2_6_b);
        $scope.icDiscObj.SchedM2_6_c = $scope.ctx.excelIOSheet.getCellValue(14, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(645, $scope.icDiscObj.SchedM2_6_c);
        $scope.icDiscObj.SchedM2_7 = $scope.ctx.excelIOSheet.getCellValue(16, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(646, $scope.icDiscObj.SchedM2_7);
        $scope.icDiscObj.SchedM2_8 = $scope.ctx.excelIOSheet.getCellValue(17, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(647, $scope.icDiscObj.SchedM2_8);
        $scope.icDiscObj.SchedM3_1 = $scope.ctx.excelIOSheet.getCellValue(19, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(648, $scope.icDiscObj.SchedM3_1);
        $scope.icDiscObj.SchedM3_2 = $scope.ctx.excelIOSheet.getCellValue(20, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(649, $scope.icDiscObj.SchedM3_2);
        $scope.icDiscObj.SchedM3_3_a = $scope.ctx.excelIOSheet.getCellValue(21, 3, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(650, $scope.icDiscObj.SchedM3_3_a);
        $scope.icDiscObj.SchedM3_3_b = $scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(651, $scope.icDiscObj.SchedM3_3_b);
        $scope.icDiscObj.SchedM3_3_c = $scope.ctx.excelIOSheet.getCellValue(23, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(652, $scope.icDiscObj.SchedM3_3_c);
        $scope.icDiscObj.SchedM3_3_d = $scope.ctx.excelIOSheet.getCellValue(21, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(653, $scope.icDiscObj.SchedM3_3_d);
        $scope.icDiscObj.SchedM3_4 = $scope.ctx.excelIOSheet.getCellValue(24, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(654, $scope.icDiscObj.SchedM3_4);
        $scope.icDiscObj.SchedM3_5 = $scope.ctx.excelIOSheet.getCellValue(19, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(655, $scope.icDiscObj.SchedM3_5);
        $scope.icDiscObj.SchedM3_6 = $scope.ctx.excelIOSheet.getCellValue(20, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(656, $scope.icDiscObj.SchedM3_6);
        $scope.icDiscObj.SchedM3_7_a = $scope.ctx.excelIOSheet.getCellValue(21, 8, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(657, $scope.icDiscObj.SchedM3_7_a);
        $scope.icDiscObj.SchedM3_7_b = $scope.ctx.excelIOSheet.getCellValue(22, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(658, $scope.icDiscObj.SchedM3_7_b);
        $scope.icDiscObj.SchedM3_7_c = $scope.ctx.excelIOSheet.getCellValue(21, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(659, $scope.icDiscObj.SchedM3_7_c);
        $scope.icDiscObj.SchedM3_8 = $scope.ctx.excelIOSheet.getCellValue(23, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(660, $scope.icDiscObj.SchedM3_8);
        $scope.icDiscObj.SchedM3_9 = $scope.ctx.excelIOSheet.getCellValue(24, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(661, $scope.icDiscObj.SchedM3_9);
        $scope.icDiscObj.SchedM4_1 = $scope.ctx.excelIOSheet.getCellValue(26, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(662, $scope.icDiscObj.SchedM4_1);
        $scope.icDiscObj.SchedM4_2_a = $scope.ctx.excelIOSheet.getCellValue(27, 3, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(663, $scope.icDiscObj.SchedM4_2_a);
        $scope.icDiscObj.SchedM4_2_b = $scope.ctx.excelIOSheet.getCellValue(28, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(664, $scope.icDiscObj.SchedM4_2_b);
        $scope.icDiscObj.SchedM4_2_c = $scope.ctx.excelIOSheet.getCellValue(27, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(665, $scope.icDiscObj.SchedM4_2_c);
        $scope.icDiscObj.SchedM4_3 = $scope.ctx.excelIOSheet.getCellValue(29, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(666, $scope.icDiscObj.SchedM4_3);
        $scope.icDiscObj.SchedM4_4 = $scope.ctx.excelIOSheet.getCellValue(30, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(667, $scope.icDiscObj.SchedM4_4);
        $scope.icDiscObj.SchedM4_5 = $scope.ctx.excelIOSheet.getCellValue(31, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(668, $scope.icDiscObj.SchedM4_5);
        $scope.icDiscObj.SchedM4_6 = $scope.ctx.excelIOSheet.getCellValue(26, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(669, $scope.icDiscObj.SchedM4_6);
        $scope.icDiscObj.SchedM4_7 = $scope.ctx.excelIOSheet.getCellValue(27, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(670, $scope.icDiscObj.SchedM4_7);
        $scope.icDiscObj.SchedM4_8_a = $scope.ctx.excelIOSheet.getCellValue(28, 8, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(671, $scope.icDiscObj.SchedM4_8_a);
        $scope.icDiscObj.SchedM4_8_b = $scope.ctx.excelIOSheet.getCellValue(29, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(672, $scope.icDiscObj.SchedM4_8_b);
        $scope.icDiscObj.SchedM4_8_c = $scope.ctx.excelIOSheet.getCellValue(28, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(673, $scope.icDiscObj.SchedM4_8_c);
        $scope.icDiscObj.SchedM4_9 = $scope.ctx.excelIOSheet.getCellValue(30, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(674, $scope.icDiscObj.SchedM4_9);
        $scope.icDiscObj.SchedM4_10 = $scope.ctx.excelIOSheet.getCellValue(31, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.UpdateFunc(675, $scope.icDiscObj.SchedM4_10);
        $scope.icDiscObj.SchedN2a = $scope.ctx.excelIOSheet.getCellValue(57, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(680, $scope.icDiscObj.SchedN2a);
        for (var i = 675; i <= 720; i++) {
            try {
                $scope.icDiscObj[$scope.reversemap[i].forM_FILED_COL_VAL] = $scope.ctx.excelIOSheet.getCellValue($scope.reversemap[i].x_coordinate, $scope.reversemap[i].y_coordinate, false, $scope.ctx.excelIOSheet.sheets[$scope.reversemap[i].worksheeT_INDEX]);


                $scope.UpdateFunc(i, $scope.icDiscObj[$scope.reversemap[i].forM_FILED_COL_VAL]);
            } catch (err) {
                //console.log(err);
                continue;
            }
        }
        //$scope.ctx.excelIOSheet.getCellValue(9, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes";

        $scope.icDiscObj.SchedO2a_Yes = 'Yes';
        $scope.icDiscObj.SchedO2a_Yes1 = 'No';

            //$scope.UpdateFuncForRadioButton(697, $scope.icDiscObj.SchedO2a_Yes, 698);
        
        //else if ($scope.ctx.excelIOSheet.getCellValue(9, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
       
        //    $scope.UpdateFuncForRadioButton(697, $scope.icDiscObj.SchedO2a_Yes, 698);
        //}
        $scope.icDiscObj.SchedO2b_Yes1 = "Yes";
        $scope.icDiscObj.SchedO2a_Yes = 'No';


        //if ($scope.ctx.excelIOSheet.getCellValue(10, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
        //    $scope.icDiscObj.SchedO2b_Yes = "Yes";
        //    $scope.UpdateFuncForRadioButton(699, $scope.icDiscObj.SchedO2b_Yes, 700);
        //}
        //else if ($scope.ctx.excelIOSheet.getCellValue(10, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
        //    $scope.icDiscObj.SchedO2b_Yes = "No";
        //    $scope.UpdateFuncForRadioButton(699, $scope.icDiscObj.SchedO2b_Yes, 700);
        //}
        if ($scope.ctx.excelIOSheet.getCellValue(11, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO2c_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(701, $scope.icDiscObj.SchedO2c_Yes, 702);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(11, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO2c_Yes = "No";
            $scope.UpdateFuncForRadioButton(701, $scope.icDiscObj.SchedO2c_Yes, 702);
        }
        if ($scope.ctx.excelIOSheet.getCellValue(12, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO3_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(703, $scope.icDiscObj.SchedO3_Yes, 704);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(12, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO3_Yes = "No";
            $scope.UpdateFuncForRadioButton(703, $scope.icDiscObj.SchedO3_Yes, 704);
        }
        if ($scope.ctx.excelIOSheet.getCellValue(13, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO4_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(705, $scope.icDiscObj.SchedO4_Yes, 706);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(13, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO4_Yes = "No";
            $scope.UpdateFuncForRadioButton(705, $scope.icDiscObj.SchedO4_Yes, 706);
        }
        if ($scope.ctx.excelIOSheet.getCellValue(14, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO5_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(707, $scope.icDiscObj.SchedO5_Yes, 708);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(14, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO5_Yes = "No";
            $scope.UpdateFuncForRadioButton(707, $scope.icDiscObj.SchedO5_Yes, 708);
        }
        if ($scope.ctx.excelIOSheet.getCellValue(15, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO6a_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(709, $scope.icDiscObj.SchedO6a_Yes, 710);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(15, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO6a_Yes = "No";
            $scope.UpdateFuncForRadioButton(709, $scope.icDiscObj.SchedO6a_Yes, 710);
        }
        if ($scope.ctx.excelIOSheet.getCellValue(16, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO6b_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(711, $scope.icDiscObj.SchedO6b_Yes, 712);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(16, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO6b_Yes = "No";
            $scope.UpdateFuncForRadioButton(711, $scope.icDiscObj.SchedO6b_Yes, 712);
        }
        if ($scope.ctx.excelIOSheet.getCellValue(17, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO6c_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(713, $scope.icDiscObj.SchedO6c_Yes, 714);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(17, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO6c_Yes = "No";
            $scope.UpdateFuncForRadioButton(713, $scope.icDiscObj.SchedO6c_Yes, 714);
        }
        if ($scope.ctx.excelIOSheet.getCellValue(24, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO8b_Yes = "Yes";
            $scope.UpdateFuncForRadioButton(719, $scope.icDiscObj.SchedO8b_Yes, 720);
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(24, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO8b_Yes = "No";
            $scope.UpdateFuncForRadioButton(719, $scope.icDiscObj.SchedO8b_Yes, 720);
        }
        $scope.icDiscObj.SchedO7_Amt = $scope.ctx.excelIOSheet.getCellValue(21, 6, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(715, $scope.icDiscObj.SchedO7_Amt);
        $scope.icDiscObj.SchedO8b_a = $scope.ctx.excelIOSheet.getCellValue(25, 3, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(716, $scope.icDiscObj.SchedO8b_a);
        $scope.icDiscObj.SchedO8b_b = $scope.ctx.excelIOSheet.getCellValue(26, 3, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(717, $scope.icDiscObj.SchedO8b_b);
        $scope.icDiscObj.SchedO8b_c = $scope.ctx.excelIOSheet.getCellValue(28, 4, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(718, $scope.icDiscObj.SchedO8b_c);
        //page 6
        $scope.icDiscObj.SchedN1a = $scope.ctx.excelIOSheet.getCellValue(53, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(676, $scope.icDiscObj.SchedN1a);
        $scope.icDiscObj.SchedN1a_percentage = $scope.ctx.excelIOSheet.getCellValue(53, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(677, $scope.icDiscObj.SchedN1a_percentage);
        $scope.icDiscObj.SchedN1b = $scope.ctx.excelIOSheet.getCellValue(54, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(678, $scope.icDiscObj.SchedN1b);
        $scope.icDiscObj.SchedN1b_percentage = $scope.ctx.excelIOSheet.getCellValue(54, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(679, $scope.icDiscObj.SchedN1b_percentage);
        $scope.icDiscObj.SchedN2a = $scope.ctx.excelIOSheet.getCellValue(57, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(680, $scope.icDiscObj.SchedN2a);
        $scope.icDiscObj.SchedN2b = $scope.ctx.excelIOSheet.getCellValue(58, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(681, $scope.icDiscObj.SchedN2b);
        $scope.icDiscObj.SchedN2c = $scope.ctx.excelIOSheet.getCellValue(59, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(682, $scope.icDiscObj.SchedN2c);
        $scope.icDiscObj.SchedN3a = $scope.ctx.excelIOSheet.getCellValue(42, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(683, $scope.icDiscObj.SchedN3a);
        $scope.icDiscObj.SchedN3b = $scope.ctx.excelIOSheet.getCellValue(42, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(684, $scope.icDiscObj.SchedN3b);
        $scope.icDiscObj.SchedN3c = $scope.ctx.excelIOSheet.getCellValue(42, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(685, $scope.icDiscObj.SchedN3c);
        $scope.icDiscObj.SchedN3d = $scope.ctx.excelIOSheet.getCellValue(43, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(686, $scope.icDiscObj.SchedN3d);
        $scope.icDiscObj.SchedN3e = $scope.ctx.excelIOSheet.getCellValue(43, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(687, $scope.icDiscObj.SchedN3e);
        $scope.icDiscObj.SchedN3f = $scope.ctx.excelIOSheet.getCellValue(43, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(688, $scope.icDiscObj.SchedN3f);
        $scope.icDiscObj.SchedN4a = $scope.ctx.excelIOSheet.getCellValue(47, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(689, $scope.icDiscObj.SchedN4a);
        $scope.icDiscObj.SchedN4b = $scope.ctx.excelIOSheet.getCellValue(47, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(690, $scope.icDiscObj.SchedN4b);
        $scope.icDiscObj.SchedN4c = $scope.ctx.excelIOSheet.getCellValue(47, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(691, $scope.icDiscObj.SchedN4c);
        $scope.icDiscObj.SchedN4d = $scope.ctx.excelIOSheet.getCellValue(48, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(692, $scope.icDiscObj.SchedN4d);
        $scope.icDiscObj.SchedN4e = $scope.ctx.excelIOSheet.getCellValue(48, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(693, $scope.icDiscObj.SchedN4e);
        $scope.icDiscObj.SchedN4f = $scope.ctx.excelIOSheet.getCellValue(48, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.UpdateFunc(694, $scope.icDiscObj.SchedN4f);
        $scope.icDiscObj.SchedO1a = $scope.ctx.excelIOSheet.getCellValue(8, 3, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(695, $scope.icDiscObj.SchedO1a);
        $scope.icDiscObj.SchedO1b = $scope.ctx.excelIOSheet.getCellValue(8, 6, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(696, $scope.icDiscObj.SchedO1b);
        $scope.icDiscObj.SchedO7_Amt = $scope.ctx.excelIOSheet.getCellValue(21, 6, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(715, $scope.icDiscObj.SchedO7_Amt);
        $scope.icDiscObj.SchedO8b_a = $scope.ctx.excelIOSheet.getCellValue(25, 3, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(716, $scope.icDiscObj.SchedO8b_a);
        $scope.icDiscObj.SchedO8b_b = $scope.ctx.excelIOSheet.getCellValue(26, 3, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(717, $scope.icDiscObj.SchedO8b_b);
        $scope.icDiscObj.SchedO8b_c = $scope.ctx.excelIOSheet.getCellValue(28, 4, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.UpdateFunc(718, $scope.icDiscObj.SchedO8b_c);
        $scope.SavePdfToDB();
        $scope.SaveJournalEntriesData();
        //Page 3
    }
    $scope.editcell = function () {

    }
   

    
    $scope.getDataFromExcel = function () {
        //ya alert($scope.ctx.excelIOSheet.getCellData(6, 2, true)); 
        //$scope.ManualFormulaCalc();  
    

            $scope.icDiscObj.ICDISCCalendarYear = $scope.ctx.excelIOSheet.getCellValue(13, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
            $scope.icDiscObj.ICDISCTaxYearBeginning = $scope.ctx.excelIOSheet.getCellValue(15, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
      
        $scope.icDiscObj.ICDISCTaxYearBeginningYear = $scope.ctx.excelIOSheet.getCellValue(16, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCTaxYearEnding = $scope.ctx.excelIOSheet.getCellValue(15, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCTaxYearEndingYear = $scope.ctx.excelIOSheet.getCellValue(16, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCLegalName = $scope.ctx.excelIOSheet.getCellValue(6, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCAddressLine = $scope.ctx.excelIOSheet.getCellValue(7, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCLocation = $scope.ctx.excelIOSheet.getCellValue(8, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        // document.getElementById('datepick').value = new Date();
        $scope.icDiscObj.ICDISCDateOfElection = new Date($scope.ctx.excelIOSheet.getCellValue(7, 5, false, $scope.ctx.excelIOSheet.sheets[0]));
        $scope.icDiscObj.ICDISCBAC = [];
        try{
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(0, 1));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(1, 2));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(2, 3));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(3, 4));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(4, 5));
        $scope.icDiscObj.ICDISCBAC.push(($scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[0])).substring(5));
            }
            catch(ex)
            {

            }
        $scope.icDiscObj.ICDISCEIN = $scope.ctx.excelIOSheet.getCellValue(10, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCDateIncorporated = $scope.ctx.excelIOSheet.getCellValue(6, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCTotalAssets = $scope.ctx.excelIOSheet.getCellValue(10, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        if ($scope.ctx.excelIOSheet.getCellValue(18, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(18, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCInitialReturn = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(18, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(18, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.ICDISCInitialReturn = false;
        }
        if ($scope.ctx.excelIOSheet.getCellValue(19, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(19, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCFinalReturn = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(19, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(19, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCFinalReturn = false;
        }
        if ($scope.ctx.excelIOSheet.getCellValue(20, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(20, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCNameChange = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(20, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(20, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCNameChange = false;
        }
        if ($scope.ctx.excelIOSheet.getCellValue(21, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(21, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCAddressChange = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(21, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(21, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCAddressChange = false;
        }
        if ($scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCAmendedReturn = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCAmendedReturn = false;
        }
        if ($scope.ctx.excelIOSheet.getCellValue(63, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(63, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISC50_50 = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(63, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(63, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISC50_50 = false;
        }
        if ($scope.ctx.excelIOSheet.getCellValue(64, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(64, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISC4Percent = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(64, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(64, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISC4Percent = false;
        }
        if ($scope.ctx.excelIOSheet.getCellValue(64, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(64, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCSec482 = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(64, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(64, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCSec482 = false;
        }
        if ($scope.ctx.excelIOSheet.getCellValue(63, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(63, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCSec994b2 = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(63, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(63, 5, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCSec994b2 = false;
        }
        $scope.icDiscObj.ICDISCPreparerName = $scope.ctx.excelIOSheet.getCellValue(69, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        if ($scope.ctx.excelIOSheet.getCellValue(69, 3, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(69, 3, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.ICDISCSelfEmployed = true;
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(69, 3, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(69, 3, false, $scope.ctx.excelIOSheet.sheets[0]) == "no") {
            $scope.icDiscObj.ICDISCSelfEmployed = false;
        }
        $scope.icDiscObj.ICDISCPTIN = $scope.ctx.excelIOSheet.getCellValue(69, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCFirmName = $scope.ctx.excelIOSheet.getCellValue(72, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCFirmEIN = $scope.ctx.excelIOSheet.getCellValue(72, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCFirmAddress = $scope.ctx.excelIOSheet.getCellValue(72, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.ICDISCFirmPhone = $scope.ctx.excelIOSheet.getCellValue(69, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        if ($scope.ctx.excelIOSheet.getCellValue(26, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(26, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.G1_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(26, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(26, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.G1_Yes = "No";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(26, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Please Select" ) {
            $scope.icDiscObj.G1_Yes = "";
        }
        $scope.icDiscObj.G1_Name1 = $scope.ctx.excelIOSheet.getCellValue(29, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.G1_Number1 = $scope.ctx.excelIOSheet.getCellValue(30, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.G1_Address1 = $scope.ctx.excelIOSheet.getCellValue(31, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.G1_VotingStockOwned1 = $scope.ctx.excelIOSheet.getCellValue(32, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.G1_TotalAssets1 = $scope.ctx.excelIOSheet.getCellValue(33, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        if ($scope.ctx.excelIOSheet.getCellValue(34, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(34, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.G1_ForeignOwnerYes1 = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(34, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(34, 2, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.G1_ForeignOwnerYes1 = "No";
        }
        $scope.icDiscObj.G1_Name2 = $scope.ctx.excelIOSheet.getCellValue(29, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.G1_Number2 = $scope.ctx.excelIOSheet.getCellValue(30, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.G1_Address2 = $scope.ctx.excelIOSheet.getCellValue(31, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.G1_VotingStockOwned2 = $scope.ctx.excelIOSheet.getCellValue(32, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.G1_TotalAssets2 = $scope.ctx.excelIOSheet.getCellValue(33, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        if ($scope.ctx.excelIOSheet.getCellValue(34, 4, false, $scope.ctx.excelIOSheet.sheets[0]) == "Yes" || $scope.ctx.excelIOSheet.getCellValue(34, 4, false, $scope.ctx.excelIOSheet.sheets[0]) == "yes") {
            $scope.icDiscObj.G1_ForeignOwnerYes2 = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(34, 4, false, $scope.ctx.excelIOSheet.sheets[0]) == "No" || $scope.ctx.excelIOSheet.getCellValue(34, 4, false, $scope.ctx.excelIOSheet.sheets[0]) == "No") {
            $scope.icDiscObj.G1_ForeignOwnerYes2 = "No";
        }
        $scope.icDiscObj.TaxYearFirstCorp = $scope.ctx.excelIOSheet.getCellValue(36, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.IRSServiceCenter1 = $scope.ctx.excelIOSheet.getCellValue(37, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.TaxYearSecondCorp = $scope.ctx.excelIOSheet.getCellValue(36, 4, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.IRSServiceCenter2 = $scope.ctx.excelIOSheet.getCellValue(37, 4, false, $scope.ctx.excelIOSheet.sheets[0]);

        $scope.icDiscObj.ICDISCTaxableIncome1 = $scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome2 = $scope.ctx.excelIOSheet.getCellValue(9, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome3 = $scope.ctx.excelIOSheet.getCellValue(10, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome4 = $scope.ctx.excelIOSheet.getCellValue(11, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome5 = $scope.ctx.excelIOSheet.getCellValue(12, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome6a = $scope.ctx.excelIOSheet.getCellValue(13, 3, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome6b = $scope.ctx.excelIOSheet.getCellValue(14, 3, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome6c = $scope.ctx.excelIOSheet.getCellValue(15, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome7 = $scope.ctx.excelIOSheet.getCellValue(16, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        $scope.icDiscObj.ICDISCTaxableIncome8 = $scope.ctx.excelIOSheet.getCellValue(17, 5, false, $scope.ctx.excelIOSheet.sheets[3]);
        //page 2
        $scope.icDiscObj.ICDISCScheB1a_i_b = $scope.ctx.excelIOSheet.getCellValue(9, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_i_c = $scope.ctx.excelIOSheet.getCellValue(9, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_i_d = $scope.ctx.excelIOSheet.getCellValue(9, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_i_e = $scope.ctx.excelIOSheet.getCellValue(9, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_ii_b = $scope.ctx.excelIOSheet.getCellValue(10, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_ii_c = $scope.ctx.excelIOSheet.getCellValue(10, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_ii_d = $scope.ctx.excelIOSheet.getCellValue(10, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_ii_e = $scope.ctx.excelIOSheet.getCellValue(10, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_iii_b = $scope.ctx.excelIOSheet.getCellValue(11, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_iii_c = $scope.ctx.excelIOSheet.getCellValue(11, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_iii_d = $scope.ctx.excelIOSheet.getCellValue(11, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_iii_e = $scope.ctx.excelIOSheet.getCellValue(11, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_iv_b = $scope.ctx.excelIOSheet.getCellValue(12, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_iv_c = $scope.ctx.excelIOSheet.getCellValue(12, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_iv_d = $scope.ctx.excelIOSheet.getCellValue(12, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1a_iv_e = $scope.ctx.excelIOSheet.getCellValue(12, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1b_i_b = $scope.ctx.excelIOSheet.getCellValue(14, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1b_i_c = $scope.ctx.excelIOSheet.getCellValue(14, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1b_i_d = $scope.ctx.excelIOSheet.getCellValue(14, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1b_i_e = $scope.ctx.excelIOSheet.getCellValue(14, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1b_ii_b = $scope.ctx.excelIOSheet.getCellValue(15, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1b_ii_c = $scope.ctx.excelIOSheet.getCellValue(15, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1b_ii_d = $scope.ctx.excelIOSheet.getCellValue(15, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1b_ii_e = $scope.ctx.excelIOSheet.getCellValue(15, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1c_total_b = $scope.ctx.excelIOSheet.getCellValue(16, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1c_total_c = $scope.ctx.excelIOSheet.getCellValue(16, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1c_total_d = $scope.ctx.excelIOSheet.getCellValue(16, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB1c_total_e = $scope.ctx.excelIOSheet.getCellValue(16, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2a_b = $scope.ctx.excelIOSheet.getCellValue(18, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2a_c = $scope.ctx.excelIOSheet.getCellValue(18, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2a_d = $scope.ctx.excelIOSheet.getCellValue(18, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2a_e = $scope.ctx.excelIOSheet.getCellValue(18, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2b_b = $scope.ctx.excelIOSheet.getCellValue(19, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2b_c = $scope.ctx.excelIOSheet.getCellValue(19, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2b_d = $scope.ctx.excelIOSheet.getCellValue(19, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2b_e = $scope.ctx.excelIOSheet.getCellValue(19, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2c_b = $scope.ctx.excelIOSheet.getCellValue(20, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2c_c = $scope.ctx.excelIOSheet.getCellValue(20, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2c_d = $scope.ctx.excelIOSheet.getCellValue(20, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2c_e = $scope.ctx.excelIOSheet.getCellValue(20, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2d_b = $scope.ctx.excelIOSheet.getCellValue(21, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2d_c = $scope.ctx.excelIOSheet.getCellValue(21, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2d_d = $scope.ctx.excelIOSheet.getCellValue(21, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2d_e = $scope.ctx.excelIOSheet.getCellValue(21, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2e_d = $scope.ctx.excelIOSheet.getCellValue(22, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2e_e = $scope.ctx.excelIOSheet.getCellValue(22, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2f_d = $scope.ctx.excelIOSheet.getCellValue(23, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2f_e = $scope.ctx.excelIOSheet.getCellValue(23, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2g_d = $scope.ctx.excelIOSheet.getCellValue(24, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2g_e = $scope.ctx.excelIOSheet.getCellValue(24, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2h_d = $scope.ctx.excelIOSheet.getCellValue(25, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2h_e = $scope.ctx.excelIOSheet.getCellValue(25, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2i_d = $scope.ctx.excelIOSheet.getCellValue(26, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2i_e = $scope.ctx.excelIOSheet.getCellValue(26, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2j_b = $scope.ctx.excelIOSheet.getCellValue(27, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2j_c = $scope.ctx.excelIOSheet.getCellValue(27, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2j_d = $scope.ctx.excelIOSheet.getCellValue(27, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2j_e = $scope.ctx.excelIOSheet.getCellValue(27, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2k_b = $scope.ctx.excelIOSheet.getCellValue(28, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2k_c = $scope.ctx.excelIOSheet.getCellValue(28, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2k_d = $scope.ctx.excelIOSheet.getCellValue(28, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB2k_e = $scope.ctx.excelIOSheet.getCellValue(28, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3a_b = $scope.ctx.excelIOSheet.getCellValue(30, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3a_c = $scope.ctx.excelIOSheet.getCellValue(30, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3a_d = $scope.ctx.excelIOSheet.getCellValue(30, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3a_e = $scope.ctx.excelIOSheet.getCellValue(30, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3b_b = $scope.ctx.excelIOSheet.getCellValue(31, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3b_c = $scope.ctx.excelIOSheet.getCellValue(31, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3b_d = $scope.ctx.excelIOSheet.getCellValue(31, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3b_e = $scope.ctx.excelIOSheet.getCellValue(31, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3c_b = $scope.ctx.excelIOSheet.getCellValue(32, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3c_c = $scope.ctx.excelIOSheet.getCellValue(32, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3c_d = $scope.ctx.excelIOSheet.getCellValue(32, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3c_e = $scope.ctx.excelIOSheet.getCellValue(32, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3d_b = $scope.ctx.excelIOSheet.getCellValue(33, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3d_c = $scope.ctx.excelIOSheet.getCellValue(33, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3d_d = $scope.ctx.excelIOSheet.getCellValue(33, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3d_e = $scope.ctx.excelIOSheet.getCellValue(33, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3e_d = $scope.ctx.excelIOSheet.getCellValue(34, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3e_e = $scope.ctx.excelIOSheet.getCellValue(34, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3f_b = $scope.ctx.excelIOSheet.getCellValue(35, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3f_c = $scope.ctx.excelIOSheet.getCellValue(35, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3f_d = $scope.ctx.excelIOSheet.getCellValue(35, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3f_e = $scope.ctx.excelIOSheet.getCellValue(35, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3g_b = $scope.ctx.excelIOSheet.getCellValue(36, 5, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3g_c = $scope.ctx.excelIOSheet.getCellValue(36, 6, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3g_d = $scope.ctx.excelIOSheet.getCellValue(36, 7, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB3g_e = $scope.ctx.excelIOSheet.getCellValue(36, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        $scope.icDiscObj.ICDISCScheB4_e = $scope.ctx.excelIOSheet.getCellValue(37, 8, false, $scope.ctx.excelIOSheet.sheets[1]);
        //Page 3
        $scope.icDiscObj.SchedE1a = "0";
        $scope.icDiscObj.SchedE1b = "0";
        $scope.icDiscObj.SchedE1c = "0";
        $scope.icDiscObj.SchedE1d = "0";
        $scope.icDiscObj.SchedE1e = "0";
        $scope.icDiscObj.SchedE1f = "0";
        $scope.icDiscObj.SchedE1g = "0";
        $scope.icDiscObj.SchedE1h = "0";
        $scope.icDiscObj.SchedE1i = "0";
        $scope.icDiscObj.SchedE1j = "0";
        $scope.icDiscObj.SchedE1k = "0";
        $scope.icDiscObj.SchedE1l = "0";
        $scope.icDiscObj.SchedE1m_other = "0";
        $scope.icDiscObj.SchedE1m_other2 = "0";
        $scope.icDiscObj.SchedE1m = "0";
        $scope.icDiscObj.SchedE1n = "0";
        $scope.icDiscObj.SchedE2a = "0";
        $scope.icDiscObj.SchedE2b = "0";
        $scope.icDiscObj.SchedE2c = "0";
        $scope.icDiscObj.SchedE2d = "0";
        $scope.icDiscObj.SchedE2e = "0";
        $scope.icDiscObj.SchedE2f = "0";
        $scope.icDiscObj.SchedE2g_other = "0";
        $scope.icDiscObj.SchedE2g_other2 = "0";
        $scope.icDiscObj.SchedE2g = "0";
        $scope.icDiscObj.SchedE2h = "0";
        $scope.icDiscObj.SchedE3 = "0";
        //Page4                   
        $scope.icDiscObj.SchedJ1 = $scope.ctx.excelIOSheet.getCellValue(6, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ2 = $scope.ctx.excelIOSheet.getCellValue(7, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ3 = $scope.ctx.excelIOSheet.getCellValue(8, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ4 = $scope.ctx.excelIOSheet.getCellValue(9, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ5 = "0";
        $scope.icDiscObj.SchedJ6 = $scope.ctx.excelIOSheet.getCellValue(11, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ7 = $scope.ctx.excelIOSheet.getCellValue(12, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ8 = $scope.ctx.excelIOSheet.getCellValue(13, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ9 = $scope.ctx.excelIOSheet.getCellValue(14, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ10 = $scope.ctx.excelIOSheet.getCellValue(15, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ11 = $scope.ctx.excelIOSheet.getCellValue(16, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ12 = $scope.ctx.excelIOSheet.getCellValue(18, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ13 = $scope.ctx.excelIOSheet.getCellValue(19, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ14 = $scope.ctx.excelIOSheet.getCellValue(20, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ15 = $scope.ctx.excelIOSheet.getCellValue(21, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ16 = $scope.ctx.excelIOSheet.getCellValue(22, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ17a = $scope.ctx.excelIOSheet.getCellValue(24, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ17b = $scope.ctx.excelIOSheet.getCellValue(25, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ18 = $scope.ctx.excelIOSheet.getCellValue(26, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ19 = $scope.ctx.excelIOSheet.getCellValue(27, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ20 = $scope.ctx.excelIOSheet.getCellValue(28, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ21 = $scope.ctx.excelIOSheet.getCellValue(29, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ22 = $scope.ctx.excelIOSheet.getCellValue(30, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ23 = $scope.ctx.excelIOSheet.getCellValue(31, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJ24 = $scope.ctx.excelIOSheet.getCellValue(32, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart2_1 = $scope.ctx.excelIOSheet.getCellValue(34, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart2_2 = $scope.ctx.excelIOSheet.getCellValue(35, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart2_3 = $scope.ctx.excelIOSheet.getCellValue(36, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart2_4 = $scope.ctx.excelIOSheet.getCellValue(37, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart2_5 = $scope.ctx.excelIOSheet.getCellValue(38, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart2_6 = $scope.ctx.excelIOSheet.getCellValue(39, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart2_7 = $scope.ctx.excelIOSheet.getCellValue(40, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart3_1 = $scope.ctx.excelIOSheet.getCellValue(42, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart3_2 = $scope.ctx.excelIOSheet.getCellValue(43, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart3_3 = $scope.ctx.excelIOSheet.getCellValue(44, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart4_1 = $scope.ctx.excelIOSheet.getCellValue(46, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart4_2 = $scope.ctx.excelIOSheet.getCellValue(47, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart4_3 = $scope.ctx.excelIOSheet.getCellValue(48, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart4_4a = "0";
        $scope.icDiscObj.SchedJPart4_4b = "0";
        $scope.icDiscObj.SchedJPart4_4c = $scope.ctx.excelIOSheet.getCellValue(52, 3, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPard4_4d = "0";
        $scope.icDiscObj.SchedJPart5_1 = $scope.ctx.excelIOSheet.getCellValue(55, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart5_2 = $scope.ctx.excelIOSheet.getCellValue(56, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        $scope.icDiscObj.SchedJPart5_3 = $scope.ctx.excelIOSheet.getCellValue(57, 5, false, $scope.ctx.excelIOSheet.sheets[4]);
        //Page 5
        $scope.icDiscObj.SchedL1a_a = $scope.ctx.excelIOSheet.getCellValue(7, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1a_b = "5000";
        $scope.icDiscObj.SchedL1b_a = $scope.ctx.excelIOSheet.getCellValue(8, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1b_b = "0";
        $scope.icDiscObj.SchedL1c_a = "0";
        $scope.icDiscObj.SchedL1c_b = "1000";
        $scope.icDiscObj.SchedL1d_a = $scope.ctx.excelIOSheet.getCellValue(10, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1d_b = "0";
        $scope.icDiscObj.SchedL1d_2_a = $scope.ctx.excelIOSheet.getCellValue(11, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1d_2_b = "0";
        $scope.icDiscObj.SchedL1e_a = $scope.ctx.excelIOSheet.getCellValue(13, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1e_b = "0";
        $scope.icDiscObj.SchedL1f_a = $scope.ctx.excelIOSheet.getCellValue(14, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1f_b = "";
        $scope.icDiscObj.SchedL1g_a = $scope.ctx.excelIOSheet.getCellValue(15, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1g_b = "0";
        $scope.icDiscObj.SchedL1h_a = $scope.ctx.excelIOSheet.getCellValue(16, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1h_b = "0";
        $scope.icDiscObj.SchedL1h_2_a = $scope.ctx.excelIOSheet.getCellValue(17, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1h_2_b = "0";
        $scope.icDiscObj.SchedL1i_a = $scope.ctx.excelIOSheet.getCellValue(19, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL1i_b = "0";
        $scope.icDiscObj.SchedL2_Line = $scope.ctx.excelIOSheet.getCellValue(20, 3, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL2_a = $scope.ctx.excelIOSheet.getCellValue(20, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL2_b = "0";
        $scope.icDiscObj.SchedL3_a = "5000";
        $scope.icDiscObj.SchedL3_b = "6000";
        $scope.icDiscObj.SchedL4_a = $scope.ctx.excelIOSheet.getCellValue(22, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL4_b = "0";
        $scope.icDiscObj.SchedL5_a = $scope.ctx.excelIOSheet.getCellValue(23, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL5_b = "0";
        $scope.icDiscObj.SchedL6_a = $scope.ctx.excelIOSheet.getCellValue(24, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL6_b = "0";
        $scope.icDiscObj.SchedL7_a = $scope.ctx.excelIOSheet.getCellValue(25, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL7_b = "0";
        $scope.icDiscObj.SchedL8_a = $scope.ctx.excelIOSheet.getCellValue(26, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL8_b = "3000";
        $scope.icDiscObj.SchedL9_a = $scope.ctx.excelIOSheet.getCellValue(27, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL9_b = "0";
        $scope.icDiscObj.SchedL10_a = $scope.ctx.excelIOSheet.getCellValue(28, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL10_b = "165";
        $scope.icDiscObj.SchedL11_a = $scope.ctx.excelIOSheet.getCellValue(29, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL11_b = "0";
        $scope.icDiscObj.SchedL12_a = $scope.ctx.excelIOSheet.getCellValue(30, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL12_b = "0";
        $scope.icDiscObj.SchedL13_a = $scope.ctx.excelIOSheet.getCellValue(31, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL13_b = "0";
        $scope.icDiscObj.SchedL14_a = $scope.ctx.excelIOSheet.getCellValue(32, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL14_b = "0";
        $scope.icDiscObj.SchedL15_a = $scope.ctx.excelIOSheet.getCellValue(33, 7, false, $scope.ctx.excelIOSheet.sheets[2]);
        $scope.icDiscObj.SchedL15_b = "3165";

        $scope.icDiscObj.SchedM1_1 = $scope.ctx.excelIOSheet.getCellValue(5, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_2 = $scope.ctx.excelIOSheet.getCellValue(6, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_3_a = $scope.ctx.excelIOSheet.getCellValue(8, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_3_b = $scope.ctx.excelIOSheet.getCellValue(7, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_4_a = $scope.ctx.excelIOSheet.getCellValue(10, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_4_b = $scope.ctx.excelIOSheet.getCellValue(10, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_5 = $scope.ctx.excelIOSheet.getCellValue(11, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_6_a = $scope.ctx.excelIOSheet.getCellValue(6, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_6_b = $scope.ctx.excelIOSheet.getCellValue(6, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_7_a = $scope.ctx.excelIOSheet.getCellValue(8, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_7_b = $scope.ctx.excelIOSheet.getCellValue(8, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_8 = $scope.ctx.excelIOSheet.getCellValue(9, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM1_9 = $scope.ctx.excelIOSheet.getCellValue(10, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_1 = $scope.ctx.excelIOSheet.getCellValue(13, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_2_a = $scope.ctx.excelIOSheet.getCellValue(14, 3, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_2_b = $scope.ctx.excelIOSheet.getCellValue(15, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_2_c = $scope.ctx.excelIOSheet.getCellValue(14, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_3 = $scope.ctx.excelIOSheet.getCellValue(16, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_4 = "0";
        $scope.icDiscObj.SchedM2_5 = "0";
        $scope.icDiscObj.SchedM2_6_a = $scope.ctx.excelIOSheet.getCellValue(14, 8, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_6_b = $scope.ctx.excelIOSheet.getCellValue(15, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_6_c = $scope.ctx.excelIOSheet.getCellValue(14, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM2_7 = "0";
        $scope.icDiscObj.SchedM2_8 = "0";
        $scope.icDiscObj.SchedM3_1 = $scope.ctx.excelIOSheet.getCellValue(19, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM3_2 = "1000";
        $scope.icDiscObj.SchedM3_3_a = $scope.ctx.excelIOSheet.getCellValue(21, 3, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM3_3_b = $scope.ctx.excelIOSheet.getCellValue(22, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM3_3_c = $scope.ctx.excelIOSheet.getCellValue(23, 2, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM3_3_d = "1000";
        $scope.icDiscObj.SchedM3_4 = $scope.ctx.excelIOSheet.getCellValue(24, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM3_5 = "1000";
        $scope.icDiscObj.SchedM3_6 = "1000";
        $scope.icDiscObj.SchedM3_7_a = "0";
        $scope.icDiscObj.SchedM3_7_b = $scope.ctx.excelIOSheet.getCellValue(21, 8, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM3_7_c = "1000";
        $scope.icDiscObj.SchedM3_8 = $scope.ctx.excelIOSheet.getCellValue(23, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM3_9 = $scope.ctx.excelIOSheet.getCellValue(24, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM4_1 = $scope.ctx.excelIOSheet.getCellValue(26, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM4_2_a = "";
        $scope.icDiscObj.SchedM4_2_b = "1000";
        $scope.icDiscObj.SchedM4_2_c = "0";
        $scope.icDiscObj.SchedM4_3 = $scope.ctx.excelIOSheet.getCellValue(29, 4, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM4_4 = "1000";
        $scope.icDiscObj.SchedM4_5 = "1000";
        $scope.icDiscObj.SchedM4_6 = "1000";
        $scope.icDiscObj.SchedM4_7 = "1000";
        $scope.icDiscObj.SchedM4_8_a = $scope.ctx.excelIOSheet.getCellValue(28, 8, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM4_8_b = $scope.ctx.excelIOSheet.getCellValue(28, 7, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM4_8_c = "0";
        $scope.icDiscObj.SchedM4_9 = $scope.ctx.excelIOSheet.getCellValue(30, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        $scope.icDiscObj.SchedM4_10 = $scope.ctx.excelIOSheet.getCellValue(31, 9, false, $scope.ctx.excelIOSheet.sheets[5]);
        //Page 6
        $scope.icDiscObj.SchedN1a = $scope.ctx.excelIOSheet.getCellValue(53, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN1a_percentage = $scope.ctx.excelIOSheet.getCellValue(53, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN1b = $scope.ctx.excelIOSheet.getCellValue(54, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN1b_percentage = $scope.ctx.excelIOSheet.getCellValue(54, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN2a = $scope.ctx.excelIOSheet.getCellValue(57, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN2b = $scope.ctx.excelIOSheet.getCellValue(58, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN2c = $scope.ctx.excelIOSheet.getCellValue(59, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN3a = $scope.ctx.excelIOSheet.getCellValue(42, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN3b = $scope.ctx.excelIOSheet.getCellValue(42, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN3c = $scope.ctx.excelIOSheet.getCellValue(42, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN3d = $scope.ctx.excelIOSheet.getCellValue(43, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN3e = $scope.ctx.excelIOSheet.getCellValue(43, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN3f = $scope.ctx.excelIOSheet.getCellValue(43, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN4a = $scope.ctx.excelIOSheet.getCellValue(47, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN4b = $scope.ctx.excelIOSheet.getCellValue(47, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN4c = $scope.ctx.excelIOSheet.getCellValue(47, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN4d = $scope.ctx.excelIOSheet.getCellValue(48, 1, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN4e = $scope.ctx.excelIOSheet.getCellValue(48, 2, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedN4f = $scope.ctx.excelIOSheet.getCellValue(48, 5, false, $scope.ctx.excelIOSheet.sheets[0]);
        $scope.icDiscObj.SchedO1a = $scope.ctx.excelIOSheet.getCellValue(8, 3, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.icDiscObj.SchedO1b = $scope.ctx.excelIOSheet.getCellValue(8, 6, false, $scope.ctx.excelIOSheet.sheets[6]);
        if ($scope.ctx.excelIOSheet.getCellValue(9, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes" ) {
            $scope.icDiscObj.SchedO2a_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(9, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No" ) {
            $scope.icDiscObj.SchedO2a_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(10, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO2b_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(10, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO2b_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(11, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO2c_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(11, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO2c_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(12, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO3_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(12, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO3_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(13, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO4_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(13, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO4_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(14, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO5_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(14, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO5_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(15, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO6a_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(15, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO6a_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(16, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO6b_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(16, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO6b_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(17, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO6c_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(17, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO6c_Yes = "No";
        }
        if ($scope.ctx.excelIOSheet.getCellValue(24, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "Yes") {
            $scope.icDiscObj.SchedO8b_Yes = "Yes";
        }
        else if ($scope.ctx.excelIOSheet.getCellValue(24, 9, false, $scope.ctx.excelIOSheet.sheets[6]) == "No") {
            $scope.icDiscObj.SchedO8b_Yes = "No";
        }
        $scope.icDiscObj.SchedO7_Amt = $scope.ctx.excelIOSheet.getCellValue(21, 6, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.icDiscObj.SchedO8b_a = $scope.ctx.excelIOSheet.getCellValue(25, 3, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.icDiscObj.SchedO8b_b = $scope.ctx.excelIOSheet.getCellValue(26, 3, false, $scope.ctx.excelIOSheet.sheets[6]);
        $scope.icDiscObj.SchedO8b_c = $scope.ctx.excelIOSheet.getCellValue(28, 4, false, $scope.ctx.excelIOSheet.sheets[6]);
        
    }
    var obj = {};
    $scope.evaluateFunction = function () {
        var calValue = $scope.ctx.excelIOSheet.evaluate($scope.functionData);
        alert(calValue);
    }

    //$scope.SavePdfToDB = function () {
       
    //    $scope.IsChanged = false;
    //    $scope.warning = "";
    //    $scope.chaged = [];
    //    for (var property in $scope.BackUp) {
    //        if ($scope.BackUp.hasOwnProperty(property)) {
    //            if ($scope.BackUp[property] != $scope.OriginalData[property]) {
    //                obj = {};
    //                obj.fieldMapID = property;
    //                obj.formValue = $scope.BackUp[property];
    //                $scope.chaged.push(obj);
    //            }
    //        }
    //    }
    //    $http.post(constant + 'api/TaxReturnCompliance/UpdateEntityFormValue', JSON.stringify($scope.chaged)
    //        ).success(function () {
    //            alert("Success");
    //            $scope.isSaved = true;
    //        }).error(function () {
    //            alert("error");
    //            $scope.isSaved = false;
    //        });
    //}
    
    $scope.hasError = false;
   
    $scope.ShowPDF = function () {
        //alert("pdf clicked inbuilt");
        $scope.isExcel = false;
        //$scope.IsChanged = true;
        $scope.warning = "Please save the changes";
        $scope.getDataFromExcel();
       
        // $scope.GetServiceData();
    }

    $scope.convert = function () {
        html2canvas(document.getElementById('pdfDiv'),
            {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = { content: [{ image: data, width: 500, }] };
                    pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
                }
            });
    }


    var applyFillColor = false,
        updatingSelection = false,
        updatingWithImport = false,
        pendingAction,
        appliedClass,
        cellStyleApplying;

    $scope.ctx = {
        data: dataService.getData(50),
        sortManager: null,
        flexSheet: null,
        cboFontName: null,
        cboFontSize: null,
        colorPicker: null,
        lbChartTypes: null,
        filterEnable: false,
        undoStack: null,
        chartEngine: null,
        selection: {
            content: '',
            position: '',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '8px'
        },
        selectionFormatState: {},
        columns: [],
        fonts: [{ name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
            { name: 'Arial Black', value: '"Arial Black", Gadget, sans-serif' },
            { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
            { name: 'Courier New', value: '"Courier New", Courier, monospace' },
            { name: 'Georgia', value: 'Georgia, serif' },
            { name: 'Impact', value: 'Impact, Charcoal, sans-serif' },
            { name: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
            { name: 'Lucida Sans Unicode', value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif' },
            { name: 'Palatino Linotype', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
            { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
            { name: 'Segoe UI', value: '"Segoe UI", "Roboto", sans-serif' },
            { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
            { name: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
            { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' }],
        fontSizeList: [{ name: '8', value: '8px' }, { name: '9', value: '9px' }, { name: '10', value: '10px' },
            { name: '11', value: '11px' }, { name: '12', value: '12px' }, { name: '14', value: '14px' },
            { name: '16', value: '16px' }, { name: '18', value: '18px' }, { name: '20', value: '20px' },
            { name: '22', value: '22px' }, { name: '24', value: '24px' }],
        chartTypes: ['Column', 'Bar', 'Scatter', 'Line', 'LineSymbols', 'Area', 'Spline', 'SplineSymbols', 'SplineArea']
    };

    document.body.addEventListener('click', function () {
        // alert("1");
        var lbChartTypes = $scope.ctx.lbChartTypes;
        if (lbChartTypes) {
            lbChartTypes.hostElement.style.display = 'none';
        }
    }, true);

    $scope.loadDataFromDBatTimeOut = function () {

    }

    $scope.initializeExcelIOSheet = function (flexSheet) {
        //alert("2");
        flexSheet.deferUpdate(function () {
            var sheetIdx,
                sheetName,
                colIdx,
                rowIdx;

            // initialize the dataMap for the bound sheet.
            if (flexSheet) {
                for (sheetIdx = 0; sheetIdx < flexSheet.sheets.length; sheetIdx++) {
                    flexSheet.selectedSheetIndex = sheetIdx;
                    sheetName = flexSheet.selectedSheet.name;
                    if (sheetName === 'Country') {
                        initDataMapForBindingSheet(flexSheet);
                    }
                    else if (sheetName === 'EntityReview') {
                        initDataMapForBindingTaxSheet(flexSheet);
                    }
                    else {
                        for (colIdx = 0; colIdx < flexSheet.columns.length; colIdx++) {
                            for (rowIdx = 0; rowIdx < flexSheet.rows.length; rowIdx++) {
                                flexSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                            }
                        }
                    }
                }
                flexSheet.selectedSheetIndex = 0;
            }
        });


        var flexSheet = $scope.ctx.excelIOSheet,

           grids = [],
           reader;

        $scope.loaderDivShowHide = false;
        $("#loader").show();
        $http.get(appSetting.clientServerPath + 'Test/test.xlsx', { responseType: 'arraybuffer' })
            .success(function (data) {

                var file = new Blob([data], { type: 'data:text/csv' });
                flexSheet.load(file);
                $timeout($scope.loadDataFromDBatTimeOut, 0);


            })
        .error(function (data) {
            $("#loader").hide();
        });


    };

    $http.get(appSetting.clientServerPath + 'assets/reverseMap.txt')
            .success(function (data) {

                $scope.reversemap = data;


            })
        .error(function (data) {
            $("#loader").hide();
        });
    
    $scope.SelectedSheetChanged=function(e){
        //alert("invalidate")

        //$scope.ctx.excelIOSheet.initializeExcelIOSheet();
         if ($scope.FirstTimeLoaded) {
        $timeout(function () {
            try {
                // $scope.ManualFormulaCalc();
                $scope.ctx.excelIOSheet.startEditing(false, 0, 5, false);
                $timeout(function () {
                    $scope.ctx.excelIOSheet.startEditing(false, 0, 4, false);

                })
            } catch (e) {

            }
        },300)
           
        }

    }
    $scope.$watch('ctx.excelIOSheet', function () {
        //alert("3");
        var flexSheet = $scope.ctx.excelIOSheet;
        if (typeof flexSheet != "undefined") {
            //alert(flexSheet.getCellData(6, 1, true));

        }


        if (flexSheet) {
            $scope.ctx.undoStack = flexSheet.undoStack;
            $scope.ctx.columns = getColumns();
            // $scope.ctx.chartEngine = new wijmo.grid.sheet.chart.ChartEngine(flexSheet);

            flexSheet.selectedSheetChanged.addHandler(function (sender, args) {

                if (flexSheet.selectedSheet.grid.wj_sheetInfo) {
                    updateFonts(flexSheet.selectedSheet.grid.wj_sheetInfo.fonts);
                }
                $scope.ctx.columns = getColumns();
                if (!$scope.ctx.sortManager) {
                    $scope.ctx.sortManager = flexSheet.sortManager;
                }
                $scope.ctx.filterEnable = !!flexSheet.itemsSource;
                updateSelection(flexSheet.selection);
                safeApply('ctx.sortManager');
            });

            flexSheet.selectionChanged.addHandler(function (sender, args) {
                updateSelection(args.range);
                $scope.ctx.selectionFormatState = flexSheet.getSelectionFormatState();
                safeApply('ctx.selectionFormatState');
            });

            flexSheet.cellEditEnded.addHandler(function (sender, args) {
                updateSelection(args.range);
            });

            flexSheet.undoStack.undoStackChanged.addHandler(function () {
                updateSelection(flexSheet.selection);
                safeApply('ctx.undoStack');
            });

            flexSheet.columns.collectionChanged.addHandler(function () {
                $scope.ctx.columns = getColumns();
                safeApply('ctx.columns');
            });
            flexSheet.loaded.addHandler(function () {

                $scope.ctx.columns = getColumns();
                safeApply('ctx.sortManager');
                if (flexSheet.selectedSheet.grid.wj_sheetInfo) {
                    updateFonts(flexSheet.selectedSheet.grid.wj_sheetInfo.fonts);
                }
                updateSelection(flexSheet.selection);

            });

            flexSheet.beginningEdit.addHandler(function (s, e) {

                var row = s.rows[e.row],
                      col = s.columns[e.col],
                      item = row.dataItem;
                if (col.binding == "er" && item.EditHours == true) {
                    e.cancel = true;
                }
            });

            if (!$scope.ctx.sortManager) {
                $scope.ctx.sortManager = flexSheet.sortManager;
            }
        }
    });

    // initialize the colorPicker control.
    $scope.$watch('ctx.colorPicker', function () {


        //alert("4");
        var colorPicker = $scope.ctx.colorPicker,
            ua = window.navigator.userAgent,
            blurEvt;

        if (colorPicker) {
            // if the browser is firefox, we should bind the blur event. (TFS #124387)
            // if the browser is IE, we should bind the focusout event. (TFS #124500)
            blurEvt = /firefox/i.test(ua) ? 'blur' : 'focusout';
            // Hide the color picker control when it lost the focus.
            colorPicker.hostElement.addEventListener(blurEvt, function () {
                setTimeout(function () {
                    if (!colorPicker.containsFocus()) {
                        applyFillColor = false;
                        colorPicker.hostElement.style.display = 'none';
                    }
                }, 0);
            });

            // Initialize the value changed event handler for the color picker control.
            colorPicker.valueChanged.addHandler(function () {
                if (applyFillColor) {
                    $scope.ctx.excelIOSheet.applyCellsStyle({ backgroundColor: colorPicker.value });
                } else {
                    $scope.ctx.excelIOSheet.applyCellsStyle({ color: colorPicker.value });
                }
            });
        }
    });

    // initialize the cboFontName control.
    $scope.$watch('ctx.cboFontName', function () {
        //alert("5");
        var cboFontName = $scope.ctx.cboFontName;
        if (cboFontName) {
            cboFontName.selectedIndexChanged.addHandler(function () {
                // apply the font family for the selected cells
                if (!updatingWithImport) {
                    if (!updatingSelection) {
                        $scope.ctx.excelIOSheet.applyCellsStyle({ fontFamily: $scope.ctx.cboFontName.selectedItem.value });
                    }
                } else {
                    updatingWithImport = false;
                }
            });
        }
    });

    // initialize the cboFontSize control.
    $scope.$watch('ctx.cboFontSize', function () {
        // alert("6");
        var cboFontSize = $scope.ctx.cboFontSize;
        if (cboFontSize) {
            cboFontSize.selectedIndexChanged.addHandler(function () {
                // apply the font size for the selected cells
                if (!updatingSelection) {
                    $scope.ctx.excelIOSheet.applyCellsStyle({ fontSize: $scope.ctx.cboFontSize.selectedItem.value });
                }
            });
        }
    });

    // initialize the lbChartTypes control.
    $scope.$watch('ctx.lbChartTypes', function () {
        // alert("7");
        var lbChartTypes = $scope.ctx.lbChartTypes;
        if (lbChartTypes) {
            lbChartTypes.hostElement.addEventListener('click', function () {
                var chartType = wijmo.asEnum(lbChartTypes.selectedValue, wijmo.chart.ChartType);
                $scope.ctx.chartEngine.addChart(chartType);
                lbChartTypes.hostElement.style.display = 'none';
            });
        }
    });

    // commit the sorts
    $scope.commitSort = function () {
        $scope.ctx.sortManager.commitSort();
    };

    // cancel the sorts
    $scope.cancelSort = function () {
        $scope.ctx.sortManager.cancelSort();
    };

    // add new sort level
    $scope.addSortLevel = function () {
        $scope.ctx.sortManager.addSortLevel();
    };

    // delete current sort level
    $scope.deleteSortLevel = function () {
        $scope.ctx.sortManager.deleteSortLevel();
    };

    // copy a new sort level by current sort level setting.
    $scope.copySortLevel = function () {
        $scope.ctx.sortManager.copySortLevel();
    };

    // move the sort level
    $scope.moveSortLevel = function (offset) {
        $scope.ctx.sortManager.moveSortLevel(offset);
    };

    // apply style for the selected cells
    $scope.applyCellStyle = function (className, cancelCellStyle) {
        // alert("7");
        if (cancelCellStyle) {
            if (cellStyleApplying) {
                cellStyleApplying = false;
            } else {
                $scope.ctx.excelIOSheet.applyCellsStyle();
            }
        } else {
            if (className) {
                appliedClass = className;
                $scope.ctx.excelIOSheet.applyCellsStyle({ className: className }, undefined, true);
            } else if (appliedClass) {
                $scope.ctx.excelIOSheet.applyCellsStyle({ className: appliedClass });
                appliedClass = '';
                cellStyleApplying = true;
            }
        }
    };

    // apply the text alignment for the selected cells
    $scope.applyCellTextAlign = function (textAlign) {
        $scope.ctx.excelIOSheet.applyCellsStyle({ textAlign: textAlign });
        $scope.ctx.selectionFormatState.textAlign = textAlign;
    };

    // apply the vertical alignment for the selected cells
    $scope.applyCellVerticalAlign = function (verticalAlign) {
        $scope.ctx.excelIOSheet.applyCellsStyle({ verticalAlign: verticalAlign });
    };

    // apply the bold font weight for the selected cells
    $scope.applyBoldStyle = function () {
        $scope.ctx.excelIOSheet.applyCellsStyle({ fontWeight: $scope.ctx.selectionFormatState.isBold ? 'none' : 'bold' });
        $scope.ctx.selectionFormatState.isBold = !$scope.ctx.selectionFormatState.isBold;
    };

    // apply the underline text decoration for the selected cells
    $scope.applyUnderlineStyle = function () {
        $scope.ctx.excelIOSheet.applyCellsStyle({ textDecoration: $scope.ctx.selectionFormatState.isUnderline ? 'none' : 'underline' });
        $scope.ctx.selectionFormatState.isUnderline = !$scope.ctx.selectionFormatState.isUnderline;
    };

    // apply the italic font style for the selected cells
    $scope.applyItalicStyle = function () {
        $scope.ctx.excelIOSheet.applyCellsStyle({ fontStyle: $scope.ctx.selectionFormatState.isItalic ? 'none' : 'italic' });
        $scope.ctx.selectionFormatState.isItalic = !$scope.ctx.selectionFormatState.isItalic;
    };

    // export 
    $scope.exportExcel = function () {
        var flexSheet = $scope.ctx.excelIOSheet;

        flexSheet.save('FlexSheet.xlsx');
    };


    // import
    $scope.importExcel = function (element) {
        // alert("8");
        var flexSheet = $scope.ctx.excelIOSheet,
            grids = [],
            reader;

        if (flexSheet && element.files[0]) {
            flexSheet.load(element.files[0]);
            element.value = '';

        }
    };

    // New flexSheet
    $scope.newFile = function () {
        var flexSheet = $scope.ctx.excelIOSheet;
        if (flexSheet) {
            flexSheet.clear();
        }
    };

    // Update the content of the selected flexSheet cell.
    $scope.updateSelectionContent = function (e) {
        // alert("9");
        var flexSheet = $scope.ctx.excelIOSheet,
            selection = flexSheet.selection;

        if (e.keyCode) {
            if (flexSheet.isFunctionListOpen) {
                switch (e.keyCode) {
                    case 38:
                        flexSheet.selectPreviousFunction();
                        e.preventDefault();
                        return;
                    case 40:
                        flexSheet.selectNextFunction();
                        e.preventDefault();
                        return;
                    case 9:
                    case 13:
                        flexSheet.applyFunctionToCell();
                        e.preventDefault();
                        return;
                    case 27:
                        flexSheet.hideFunctionList();
                        e.preventDefault();
                        return;
                }
            }
            if (e.keyCode !== 13) {
                return;
            }
        }

        if (selection && selection.row > -1 && selection.col > -1) {
            if (flexSheet.isFunctionListOpen) {
                setTimeout(function () {
                    flexSheet.hideFunctionList();
                }, 200);
            } else {
                flexSheet.setCellData(selection.row, selection.col, e.target.value, true);
                if (pendingAction instanceof wijmo.grid.sheet._EditAction && pendingAction.saveNewState()) {
                    flexSheet.undoStack._addAction(pendingAction);
                }
                pendingAction = null;
                flexSheet.refresh(false);
            }
        }
    };

    // Pending the cell edit undo action.
    $scope.pendingCellEditAction = function () {

        // alert("10");
        pendingAction = new wijmo.grid.sheet._EditAction($scope.ctx.excelIOSheet);
    }

    // Open the function list
    $scope.showFunctionList = function (e) {
        // alert("11");
        var flexSheet = $scope.ctx.excelIOSheet;

        if ((e.keyCode && e.keyCode !== 27 && (e.keyCode > 40 || e.keyCode < 32)) || !e.keyCode) {
            flexSheet.showFunctionList(e.target);
        }
    };

    // freeze or unfreeze the columns and rows for the FlexSheet control.
    $scope.freeze = function () {
        // alert("12");
        var flex = $scope.ctx.excelIOSheet;

        if (flex) {
            flex.freezeAtCursor();
        }
    };

    // Show the column filter for the flexSheet control.
    $scope.showFilter = function () {
        // alert("13");
        var flex = $scope.ctx.excelIOSheet;

        if (flex) {
            flex.showColumnFilter();
        }
    };

    // show the color picker control.
    $scope.showColorPicker = function (e, isFillColor) {
        // alert("14");
        var colorPicker = $scope.ctx.colorPicker,
            offset = cumulativeOffset(e.target);

        if (colorPicker) {
            colorPicker.hostElement.style.display = 'inline';
            colorPicker.hostElement.style.left = offset.left + 'px';
            colorPicker.hostElement.style.top = (offset.top + e.target.clientHeight + 2) + 'px';
            colorPicker.hostElement.focus();
        }

        applyFillColor = isFillColor;
    };


    // show the color picker control.
    $scope.showChartTypes = function (e) {
        // alert("15");
        var lbChartTypes = $scope.ctx.lbChartTypes,
            target = e.target,
            offset;

        if (!(target instanceof HTMLButtonElement)) {
            target = target.parentElement;
        }
        offset = cumulativeOffset(target);

        if (lbChartTypes) {
            lbChartTypes.selectedIndex = -1;
            lbChartTypes.hostElement.style.display = 'inline';
            lbChartTypes.hostElement.style.left = offset.left + 'px';
            lbChartTypes.hostElement.style.top = (offset.top + target.clientHeight + 2) + 'px';
            lbChartTypes.hostElement.focus();
        }
    };

    // Merge the selection cell range into one cell.
    $scope.mergeCells = function () {
        // alert("16");
        var flexSheet = $scope.ctx.excelIOSheet;

        flexSheet.mergeRange();
        $scope.ctx.selectionFormatState = flexSheet.getSelectionFormatState();
        safeApply('ctx.selectionFormatState');
    }

    // initialize the flexSheet control when document ready.
    $scope.initialized = function (s) {
        // alert("17");

        s.deferUpdate(function () {
            for (var i = 0; i < s.sheets.length; i++) {
                s.sheets.selectedIndex = i;
                switch (s.sheets[i].name) {
                    case 'Country':
                        initDataMapForBindingSheet(s);
                        break;
                    case 'EntityReview':
                        initDataMapForBindingTaxSheet(s);
                        break;
                    case 'Report':
                        generateUseCaseTemplateSheet(s);
                        break;
                    case 'Formulas':
                        generateFormulasSheet(s);
                        break;
                }
            }
            s.selectedSheetIndex = 0;
        });

        //$scope.importExcel();
        //var x = document.getElementById("loadingExcel");


    };

    // Excutes undo command.
    $scope.undo = function () {
        $scope.ctx.excelIOSheet.undo();
    };

    // Excutes redo command.
    $scope.redo = function () {
        $scope.ctx.excelIOSheet.redo();
    };

    // Hide the popup dialog includes the background color, font color, style and sort dialog.
    $scope.hidePopup = function (e) {
        var colorPicker = $scope.ctx.colorPicker,
            modals = document.querySelectorAll('.modal'),
            i;

        if (e.keyCode === 27) {
            if (colorPicker) {
                colorPicker.hostElement.style.display = 'none';
            }

            if (modals && modals.length > 0) {
                for (i = 0; i < modals.length; i++) {
                    wijmo.removeClass(modals[i], 'in');
                }
            }
        }
    }

    // get the columns with the column header text for the column selection for sort setting.
    function getColumns() {
        // alert("19");
        var columns = [],
            flex = $scope.ctx.excelIOSheet,
            i = 0;

        if (flex) {
            for (; i < flex.columns.length; i++) {
                columns.push('Column ' + wijmo.grid.sheet.FlexSheet.convertNumberToAlpha(i));
            }
        }

        return columns;
    };

    // initialize the dataMap for the bound sheet.
    function initDataMapForBindingSheet(flexSheet) {
        // alert("20");
        var column;

        if (flexSheet) {
            column = flexSheet.columns.getColumn('countryId');
            if (column && !column.dataMap) {
                column.dataMap = buildDataMap(dataService.getCountries());
            }
            column = flexSheet.columns.getColumn('productId');
            if (column && !column.dataMap) {
                column.dataMap = buildDataMap(dataService.getProducts());
            }
        }
    };

    // initialize the dataMap for the bound sheet.
    function initDataMapForBindingTaxSheet(flexSheet) {
        //  alert("21");
        var column;

        if (flexSheet) {
            column = flexSheet.columns.getColumn('Column 1');
            if (column && !column.dataMap) {
                column.dataMap = buildDataMap(dataService.getCountries());
            }
        }
    };

    // build a data map from a string array using the indices as keys
    function buildDataMap(items) {
        // alert("22");
        var map = [];
        for (var i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wijmo.grid.DataMap(map, 'key', 'value');
    };

    // Update the selection object of the scope.
    function updateSelection(sel) {
        // alert("23");
        var flexSheet = $scope.ctx.excelIOSheet,
            row = flexSheet.rows[sel.row],
            rowCnt = flexSheet.rows.length,
            colCnt = flexSheet.columns.length,
            r,
            c,
            cellStyle,
            cellRange,
            rangeSum,
            rangeAvg,
            rangeCnt;

        updatingSelection = true;
        if (sel.row > -1 && sel.col > -1 && rowCnt > 0 && colCnt > 0
                && sel.col < colCnt && sel.col2 < colCnt
                && sel.row < rowCnt && sel.row2 < rowCnt) {
            r = sel.row >= rowCnt ? rowCnt - 1 : sel.row;
            c = sel.col >= colCnt ? colCnt - 1 : sel.col;
            $scope.ctx.selection.content = flexSheet.getCellData(r, c, true);
            $scope.ctx.selection.position = wijmo.grid.sheet.FlexSheet.convertNumberToAlpha(sel.col) + (sel.row + 1);
            cellStyle = flexSheet.selectedSheet.getCellStyle(sel.row, sel.col);
            if (cellStyle) {
                $scope.ctx.cboFontName.selectedIndex = checkFontfamily(cellStyle.fontFamily);
                $scope.ctx.cboFontSize.selectedIndex = checkFontSize(cellStyle.fontSize);

            } else {
                $scope.ctx.cboFontName.selectedIndex = 0;
                $scope.ctx.cboFontSize.selectedIndex = 5;
            }

            if (sel.col !== -1 && sel.col2 !== -1 && sel.row !== -1 && sel.row2 !== -1) {
                cellRange = wijmo.grid.sheet.FlexSheet.convertNumberToAlpha(sel.leftCol) + (sel.topRow + 1) + ':' + wijmo.grid.sheet.FlexSheet.convertNumberToAlpha(sel.rightCol) + (sel.bottomRow + 1);
                rangeSum = flexSheet.evaluate('sum(' + cellRange + ')');
                rangeAvg = flexSheet.evaluate('average(' + cellRange + ')');
                rangeCnt = flexSheet.evaluate('count(' + cellRange + ')');

                $('.status').text(cellRange + ' Average: ' + rangeAvg + ' Count: ' + rangeCnt + ' Sum: ' + rangeSum);
            } else {
                $('.status').text('');
            }
        } else {
            $scope.ctx.selection.content = '';
            $scope.ctx.selection.position = '';
            $('.status').text('');
        }

        safeApply('ctx.selection');
        updatingSelection = false;
    };

    // Safe invoking the $apply function.
    function safeApply(property) {
        // alert("24");
        if (!$scope.$root.$$phase) {
            $scope.$apply(property);
        }
    };

    // Get the absolute position of the dom element.
    function cumulativeOffset(element) {
        // alert("25");
        var top = 0, left = 0;

        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);

        return {
            top: top,
            left: left
        };
    };

    // check font family for the font name combobox of the ribbon.
    function checkFontfamily(fontFamily) {
        //  alert("26");
        var fonts = $scope.ctx.fonts,
            fontIndex = 0,
            font;

        if (!fontFamily) {
            return fontIndex;
        }

        for (; fontIndex < fonts.length; fontIndex++) {
            font = fonts[fontIndex];

            if (font.name === fontFamily || font.value === fontFamily) {
                return fontIndex;
            }
        }

        return 10;
    }

    // check font size for the font size combobox of the ribbon.
    function checkFontSize(fontSize) {
        var sizeList = $scope.ctx.fontSizeList,
            index = 0,
            size;

        if (fontSize == undefined) {
            return 5;
        }

        for (; index < sizeList.length; index++) {
            size = sizeList[index];

            if (size.value === fontSize || size.name === fontSize) {
                return index;
            }
        }

        return 5;
    }

    // update the fonts list with the imported font list.
    function updateFonts(importedFonts) {
        var fonts = $scope.ctx.fonts.slice(),
            fontIndex,
            importedFontIndex,
            font,
            importedFont,
            importedFontExisted;

        if (!importedFonts) {
            return;
        }

        // Reset the fonts list to initial fonts list, before updating the fonts list with the imported font list.
        if (fonts.length > 14) {
            fonts.splice(14, fonts.length - 14);
        }

        for (importedFontIndex = 0; importedFontIndex < importedFonts.length; importedFontIndex++) {
            importedFont = importedFonts[importedFontIndex];
            innerLoop:
                for (fontIndex = 0; fontIndex < fonts.length; fontIndex++) {
                    font = fonts[fontIndex];
                    if (font.name === importedFont || font.value === importedFont) {
                        importedFontExisted = true;
                        break innerLoop;
                    }
                }
            if (!importedFontExisted) {
                fonts.push({
                    name: importedFont,
                    value: importedFont
                });
            }
            importedFontExisted = false;
        }

        updatingWithImport = true;
        $scope.ctx.fonts = fonts;
        $scope.ctx.cboFontName.itemsSource = fonts;
    }

    // Generate the use case template sheet.
    function generateUseCaseTemplateSheet(flexSheet) {
        //  alert("27");
        setContentForUseCaseTemplate(flexSheet);
        applyStyleForUseCaseTemplate(flexSheet);
    }

    // Set content for the use case template sheet.
    function setContentForUseCaseTemplate(flexSheet) {

        flexSheet.setCellData(0, 9, 'For Office Use Only');
        flexSheet.setCellData(1, 1, 'Expense Report');
        flexSheet.setCellData(3, 1, 'PURPOSE:');
        flexSheet.setCellData(3, 2, 'On business');
        flexSheet.setCellData(3, 5, 'Attachment:');
        flexSheet.setCellData(3, 6, 'Yes');
        flexSheet.setCellData(3, 9, 'PAY PERIOD:');
        flexSheet.setCellData(3, 10, 'From');
        flexSheet.setCellData(3, 11, '=Min(B11:B17)');
        flexSheet.setCellData(4, 10, 'To');
        flexSheet.setCellData(4, 11, '=Max(B11:B17)');
        flexSheet.setCellData(5, 1, 'EMPLOYEE IMFORMATION:');
        flexSheet.setCellData(6, 1, 'Name');
        flexSheet.setCellData(6, 2, 'Robert King');
        flexSheet.setCellData(6, 5, 'Position');
        flexSheet.setCellData(6, 6, 'Sales Representative');
        flexSheet.setCellData(6, 9, 'SSN');
        flexSheet.setCellData(6, 10, 'A12345');
        flexSheet.setCellData(7, 1, 'Department');
        flexSheet.setCellData(7, 2, 'Sales');
        flexSheet.setCellData(7, 5, 'Manager');
        flexSheet.setCellData(7, 6, 'Andrew Fuller');
        flexSheet.setCellData(7, 9, 'Employee ID');
        flexSheet.setCellData(7, 10, 'E123456');
        flexSheet.setCellData(9, 1, 'Date');
        flexSheet.setCellData(9, 2, 'Account');
        flexSheet.setCellData(9, 3, 'Description');
        flexSheet.setCellData(9, 4, 'Hotel');
        flexSheet.setCellData(9, 5, 'Transport');
        flexSheet.setCellData(9, 6, 'Fuel');
        flexSheet.setCellData(9, 7, 'Meals');
        flexSheet.setCellData(9, 8, 'Phone');
        flexSheet.setCellData(9, 9, 'Entertainment');
        flexSheet.setCellData(9, 10, 'Misc');
        flexSheet.setCellData(9, 11, 'Total');
        flexSheet.setCellData(17, 1, 'Total');
        flexSheet.setCellData(18, 10, 'Subtotal');
        flexSheet.setCellData(19, 9, 'Cash Advances');
        flexSheet.setCellData(20, 10, 'Total');
        flexSheet.setCellData(20, 1, 'APPROVED:');
        flexSheet.setCellData(20, 5, 'NOTES:');

        setExpenseData(flexSheet);
    }

    // set expense detail data for the use case template sheet.
    function setExpenseData(flexSheet) {
        var rowIndex,
            colIndex,
            value,
            rowAlpha,
            cellRange;

        for (rowIndex = 10; rowIndex <= 17; rowIndex++) {
            for (colIndex = 1; colIndex <= 11; colIndex++) {
                if (rowIndex === 17) {
                    if (colIndex >= 4 && colIndex <= 11) {
                        rowAlpha = wijmo.grid.sheet.FlexSheet.convertNumberToAlpha(colIndex);
                        cellRange = rowAlpha + '11' + ':' + rowAlpha + '17';
                        flexSheet.setCellData(rowIndex, colIndex, '=sum(' + cellRange + ')');
                    }
                } else {
                    if (colIndex === 11) {
                        cellRange = 'E' + (rowIndex + 1) + ':' + 'K' + (rowIndex + 1);
                        flexSheet.setCellData(rowIndex, colIndex, '=sum(' + cellRange + ')');
                    } else if (colIndex >= 4 && colIndex < 11) {
                        value = 200 * Math.random();
                        flexSheet.setCellData(rowIndex, colIndex, value);
                    } else if (colIndex === 3) {
                        flexSheet.setCellData(rowIndex, colIndex, 'Visit VIP customers.');
                    } else if (colIndex === 2) {
                        flexSheet.setCellData(rowIndex, colIndex, '12345678');
                    }
                }
            }
        }
        flexSheet.setCellData(10, 1, new Date('2015/3/1'));
        flexSheet.setCellData(11, 1, new Date('2015/3/3'));
        flexSheet.setCellData(12, 1, new Date('2015/3/7'));
        flexSheet.setCellData(13, 1, new Date('2015/3/11'));
        flexSheet.setCellData(14, 1, new Date('2015/3/18'));
        flexSheet.setCellData(15, 1, new Date('2015/3/21'));
        flexSheet.setCellData(16, 1, new Date('2015/3/27'));
        flexSheet.setCellData(18, 11, '=L21-L20');
        flexSheet.setCellData(19, 11, 1000);
        flexSheet.setCellData(20, 11, '=L18');
    }

    // Apply styles for the use case template sheet.
    function applyStyleForUseCaseTemplate(flexSheet) {
        flexSheet.columns[0].width = 10;
        flexSheet.columns[1].width = 100;
        flexSheet.columns[3].width = 230;
        flexSheet.columns[5].width = 95;
        flexSheet.columns[6].width = 130;
        flexSheet.columns[9].width = 105;
        for (var i = 4; i <= 11; i++) {
            flexSheet.columns[i].format = 'c2';
        }
        flexSheet.rows[1].height = 45;
        flexSheet.applyCellsStyle({
            fontStyle: 'italic',
            backgroundColor: '#E1DFDF'
        }, [new wijmo.grid.CellRange(0, 9, 0, 11)]);
        flexSheet.mergeRange(new wijmo.grid.CellRange(0, 9, 0, 11));
        flexSheet.applyCellsStyle({
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#696964'
        }, [new wijmo.grid.CellRange(1, 1, 1, 3)]);
        flexSheet.mergeRange(new wijmo.grid.CellRange(1, 1, 1, 3));
        flexSheet.applyCellsStyle({
            fontWeight: 'bold',
            color: '#808097'
        }, [new wijmo.grid.CellRange(3, 1, 3, 1),
            new wijmo.grid.CellRange(3, 5, 3, 5),
            new wijmo.grid.CellRange(3, 9, 3, 9),
            new wijmo.grid.CellRange(5, 1, 5, 2)]);
        flexSheet.applyCellsStyle({
            textAlign: 'right'
        }, [new wijmo.grid.CellRange(3, 10, 4, 10),
            new wijmo.grid.CellRange(6, 1, 7, 1),
            new wijmo.grid.CellRange(6, 5, 7, 5),
            new wijmo.grid.CellRange(6, 9, 7, 9)]);
        flexSheet.applyCellsStyle({
            backgroundColor: '#E1DFDF',
            format: 'yyyy-M-d'
        }, [new wijmo.grid.CellRange(3, 11, 4, 11)]);
        flexSheet.mergeRange(new wijmo.grid.CellRange(5, 1, 5, 2));
        flexSheet.applyCellsStyle({
            fontWeight: 'bold',
            backgroundColor: '#FAD9CD'
        }, [new wijmo.grid.CellRange(9, 1, 9, 11),
            new wijmo.grid.CellRange(17, 1, 17, 11)]);
        flexSheet.applyCellsStyle({
            backgroundColor: '#F4B19B'
        }, [new wijmo.grid.CellRange(10, 1, 16, 11)]);
        flexSheet.applyCellsStyle({
            format: 'yyyy-M-d'
        }, [new wijmo.grid.CellRange(10, 1, 16, 1)]);
        flexSheet.applyCellsStyle({
            fontWeight: 'bold',
            textAlign: 'right'
        }, [new wijmo.grid.CellRange(18, 9, 20, 10)]);
        flexSheet.mergeRange(new wijmo.grid.CellRange(19, 9, 19, 10));
        flexSheet.applyCellsStyle({
            fontWeight: 'bold',
            color: '#808097',
            textAlign: 'center'
        }, [new wijmo.grid.CellRange(20, 1, 20, 1),
            new wijmo.grid.CellRange(20, 5, 20, 5)]);
    }

    // Generate the formulas sheet.
    function generateFormulasSheet(flexSheet) {
        setContentForFormulasSheet(flexSheet);

        applyStyleForFormulasSheet(flexSheet);
    }

    // Set data for the formulas sheet.
    function setContentForFormulasSheet(flexSheet) {
        flexSheet.setCellData(0, 0, "1. Basic Operators");
        flexSheet.setCellData(1, 1, "1.1. Positive/Negative Numbers");
        flexSheet.setCellData(2, 1, "Input a Positive/Negative number.");
        flexSheet.setCellData(3, 1, "Sample:");
        flexSheet.setCellData(3, 2, "-1");
        flexSheet.setCellData(3, 3, "Result:");
        flexSheet.setCellData(3, 4, "=-1");
        flexSheet.setCellData(5, 1, "1.2. Add/Subtract Operators");
        flexSheet.setCellData(6, 1, "Calculates add/sub expression.");
        flexSheet.setCellData(7, 1, "Sample:");
        flexSheet.setCellData(7, 2, "1.25 + 2.17");
        flexSheet.setCellData(7, 3, "Result:");
        flexSheet.setCellData(7, 4, "=1.25 + 2.17");
        flexSheet.setCellData(8, 1, "Sample:");
        flexSheet.setCellData(8, 2, "2.23 - 3.51");
        flexSheet.setCellData(8, 3, "Result:");
        flexSheet.setCellData(8, 4, "=2.23 - 3.51");
        flexSheet.setCellData(10, 1, "1.3. Multiplication/Division Operators");
        flexSheet.setCellData(11, 1, "Calculates mul/div expression.");
        flexSheet.setCellData(12, 1, "Sample:");
        flexSheet.setCellData(12, 2, "12 * 17");
        flexSheet.setCellData(12, 3, "Result:");
        flexSheet.setCellData(12, 4, "=12 * 17");
        flexSheet.setCellData(13, 1, "Sample:");
        flexSheet.setCellData(13, 2, "20 / 6");
        flexSheet.setCellData(13, 3, "Result:");
        flexSheet.setCellData(13, 4, "=20 / 6");
        flexSheet.setCellData(15, 1, "1.4. Power Operator");
        flexSheet.setCellData(16, 1, "Calculates power expression.");
        flexSheet.setCellData(17, 1, "Sample:");
        flexSheet.setCellData(17, 2, "2^3");
        flexSheet.setCellData(17, 3, "Result:");
        flexSheet.setCellData(17, 4, "=2^3");
        flexSheet.setCellData(19, 1, "1.5. Bracket");
        flexSheet.setCellData(20, 1, "Indicates calculation priority by the bracket.");
        flexSheet.setCellData(21, 1, "Sample:");
        flexSheet.setCellData(21, 2, "((1+2)*3)/((4-2)*2)");
        flexSheet.setCellData(22, 1, "Result:");
        flexSheet.setCellData(22, 2, "=((1+2)*3)/((4-2)*2)");
        flexSheet.setCellData(24, 1, "1.6. Percentage");
        flexSheet.setCellData(25, 1, "Parse the percentage to float number.");
        flexSheet.setCellData(26, 1, "Sample:");
        flexSheet.setCellData(26, 2, "23%");
        flexSheet.setCellData(26, 3, "Result:");
        flexSheet.setCellData(26, 4, "=23%");
        flexSheet.setCellData(28, 1, "1.7. Scientific Number");
        flexSheet.setCellData(29, 1, "Parse the scientific number to float number.");
        flexSheet.setCellData(30, 1, "Sample:");
        flexSheet.setCellData(30, 2, "1.2556e2");
        flexSheet.setCellData(30, 3, "Result:");
        flexSheet.setCellData(30, 4, "=1.2556e2");
        flexSheet.setCellData(32, 0, "2. Math function");
        flexSheet.setCellData(33, 1, "2.1. Pi");
        flexSheet.setCellData(34, 1, "Returns the value of pi.");
        flexSheet.setCellData(35, 1, "Sample:");
        flexSheet.setCellData(35, 2, "pi()");
        flexSheet.setCellData(35, 3, "Result:");
        flexSheet.setCellData(35, 4, "=pi()");
        flexSheet.setCellData(37, 1, "2.2. Rand");
        flexSheet.setCellData(38, 1, "Returns a random number between 0 and 1.");
        flexSheet.setCellData(39, 1, "Sample:");
        flexSheet.setCellData(39, 2, "rand()");
        flexSheet.setCellData(39, 3, "Result:");
        flexSheet.setCellData(39, 4, "=rand()");
        flexSheet.setCellData(41, 1, "2.3. Abs");
        flexSheet.setCellData(42, 1, "Returns the absolute value of a number.");
        flexSheet.setCellData(43, 1, "Sample:");
        flexSheet.setCellData(43, 2, "abs(-2.73)");
        flexSheet.setCellData(43, 3, "Result:");
        flexSheet.setCellData(43, 4, "=abs(-2.73)");
        flexSheet.setCellData(45, 1, "2.4. Acos");
        flexSheet.setCellData(46, 1, "Returns the arccosine of a number.");
        flexSheet.setCellData(47, 1, "Sample:");
        flexSheet.setCellData(47, 2, "acos(0.35)");
        flexSheet.setCellData(47, 3, "Result:");
        flexSheet.setCellData(47, 4, "=acos(0.35)");
        flexSheet.setCellData(49, 1, "2.5. Asin");
        flexSheet.setCellData(50, 1, "Returns the arcsine of a number.");
        flexSheet.setCellData(51, 1, "Sample:");
        flexSheet.setCellData(51, 2, "asin(0.5)");
        flexSheet.setCellData(51, 3, "Result:");
        flexSheet.setCellData(51, 4, "=asin(0.5)");
        flexSheet.setCellData(53, 1, "2.6. Atan");
        flexSheet.setCellData(54, 1, "Returns the arctangent of a number.");
        flexSheet.setCellData(55, 1, "Sample:");
        flexSheet.setCellData(55, 2, "atan(0.67)");
        flexSheet.setCellData(55, 3, "Result:");
        flexSheet.setCellData(55, 4, "=atan(0.67)");
        flexSheet.setCellData(57, 1, "2.7. Cos");
        flexSheet.setCellData(58, 1, "Returns the cosine of a number.");
        flexSheet.setCellData(59, 1, "Sample:");
        flexSheet.setCellData(59, 2, "cos(0.6)");
        flexSheet.setCellData(59, 3, "Result:");
        flexSheet.setCellData(59, 4, "=cos(0.6)");
        flexSheet.setCellData(61, 1, "2.8. Sin");
        flexSheet.setCellData(62, 1, "Returns the sine of the given angle.");
        flexSheet.setCellData(63, 1, "Sample:");
        flexSheet.setCellData(63, 2, "sin(0.5)");
        flexSheet.setCellData(63, 3, "Result:");
        flexSheet.setCellData(63, 4, "=sin(0.5)");
        flexSheet.setCellData(65, 1, "2.9. Tan");
        flexSheet.setCellData(66, 1, "Returns the tangent of a number.");
        flexSheet.setCellData(67, 1, "Sample:");
        flexSheet.setCellData(67, 2, "tan(0.75)");
        flexSheet.setCellData(67, 3, "Result:");
        flexSheet.setCellData(67, 4, "=tan(0.75)");
        flexSheet.setCellData(69, 1, "2.10. Atan2");
        flexSheet.setCellData(70, 1, "Returns the arctangent from x- and y-coordinates.");
        flexSheet.setCellData(71, 1, "Sample:");
        flexSheet.setCellData(71, 2, "atan2(90, 15)");
        flexSheet.setCellData(71, 3, "Result:");
        flexSheet.setCellData(71, 4, "=atan2(90, 15)");
        flexSheet.setCellData(73, 1, "2.11. Ceiling");
        flexSheet.setCellData(74, 1, "Rounds a number to the nearest integer or to the nearest multiple of significance.");
        flexSheet.setCellData(75, 1, "Sample:");
        flexSheet.setCellData(75, 2, "ceiling(6.03)");
        flexSheet.setCellData(75, 3, "Result:");
        flexSheet.setCellData(75, 4, "=ceiling(6.03)");
        flexSheet.setCellData(77, 1, "2.12. Floor");
        flexSheet.setCellData(78, 1, "Rounds a number down, toward zero.");
        flexSheet.setCellData(79, 1, "Sample:");
        flexSheet.setCellData(79, 2, "floor(7.96)");
        flexSheet.setCellData(79, 3, "Result:");
        flexSheet.setCellData(79, 4, "=floor(7.96)");
        flexSheet.setCellData(81, 1, "2.13. Round");
        flexSheet.setCellData(82, 1, "Rounds a number to a specified number of digits.");
        flexSheet.setCellData(83, 1, "Sample:");
        flexSheet.setCellData(83, 2, "round(7.56, 1)");
        flexSheet.setCellData(83, 3, "Result:");
        flexSheet.setCellData(83, 4, "=round(7.56, 1)");
        flexSheet.setCellData(84, 1, "Sample:");
        flexSheet.setCellData(84, 2, "round(7.54, 1)");
        flexSheet.setCellData(84, 3, "Result:");
        flexSheet.setCellData(84, 4, "=round(7.54, 1)");
        flexSheet.setCellData(86, 1, "2.14. Exp");
        flexSheet.setCellData(87, 1, "Returns e raised to the power of a given number.");
        flexSheet.setCellData(88, 1, "Sample:");
        flexSheet.setCellData(88, 2, "exp(-1)");
        flexSheet.setCellData(88, 3, "Result:");
        flexSheet.setCellData(88, 4, "=exp(-1)");
        flexSheet.setCellData(90, 1, "2.15. Ln");
        flexSheet.setCellData(91, 1, "Returns the natural logarithm of a number.");
        flexSheet.setCellData(92, 1, "Sample:");
        flexSheet.setCellData(92, 2, "ln(15)");
        flexSheet.setCellData(92, 3, "Result:");
        flexSheet.setCellData(92, 4, "=ln(15)");
        flexSheet.setCellData(94, 1, "2.16. Sqrt");
        flexSheet.setCellData(95, 1, "Returns a positive square root.");
        flexSheet.setCellData(96, 1, "Sample:");
        flexSheet.setCellData(96, 2, "sqrt(16)");
        flexSheet.setCellData(96, 3, "Result:");
        flexSheet.setCellData(96, 4, "=sqrt(16)");
        flexSheet.setCellData(98, 1, "2.17. Power");
        flexSheet.setCellData(99, 1, "Returns the result of a number raised to a power.");
        flexSheet.setCellData(100, 1, "Sample:");
        flexSheet.setCellData(100, 2, "power(1.5, 0.5)");
        flexSheet.setCellData(100, 3, "Result:");
        flexSheet.setCellData(100, 4, "=power(1.5, 0.5)");
        flexSheet.setCellData(102, 1, "2.18. Mod");
        flexSheet.setCellData(103, 1, "Returns the remainder from division.");
        flexSheet.setCellData(104, 1, "Sample:");
        flexSheet.setCellData(104, 2, "mod(11, 3)");
        flexSheet.setCellData(104, 3, "Result:");
        flexSheet.setCellData(104, 4, "=mod(11, 3)");
        flexSheet.setCellData(106, 1, "2.19. Rounddown");
        flexSheet.setCellData(107, 1, "Rounds a number down, toward zero.");
        flexSheet.setCellData(108, 1, "Sample:");
        flexSheet.setCellData(108, 2, "rounddown(11.987, 2)");
        flexSheet.setCellData(108, 4, "Result:");
        flexSheet.setCellData(108, 5, "=rounddown(11.987, 2)");
        flexSheet.setCellData(110, 1, "2.20. Roundup");
        flexSheet.setCellData(111, 1, "Rounds a number up, away from zero.");
        flexSheet.setCellData(112, 1, "Sample:");
        flexSheet.setCellData(112, 2, "roundup(11.982, 2)");
        flexSheet.setCellData(112, 4, "Result:");
        flexSheet.setCellData(112, 5, "=roundup(11.982, 2)");
        flexSheet.setCellData(114, 1, "2.21. Trunc");
        flexSheet.setCellData(115, 1, "Truncates a number to an integer.");
        flexSheet.setCellData(116, 1, "Sample:");
        flexSheet.setCellData(116, 2, "trunc(8.9)");
        flexSheet.setCellData(116, 3, "Result:");
        flexSheet.setCellData(116, 4, "=trunc(8.9)");
        flexSheet.setCellData(118, 0, "3. Logical function");
        flexSheet.setCellData(119, 1, "3.1. Compare operators");
        flexSheet.setCellData(120, 1, "Gets boolean result of the compare operators such as (>, <, >=, <=, =, <>).");
        flexSheet.setCellData(121, 1, "Sample:");
        flexSheet.setCellData(121, 2, "1>2");
        flexSheet.setCellData(121, 3, "Result:");
        flexSheet.setCellData(121, 4, "=1>2");
        flexSheet.setCellData(123, 1, "3.2. True");
        flexSheet.setCellData(124, 1, "Returns the logical value TRUE.");
        flexSheet.setCellData(125, 1, "Sample:");
        flexSheet.setCellData(125, 2, "true()");
        flexSheet.setCellData(125, 3, "Result:");
        flexSheet.setCellData(125, 4, "=true()");
        flexSheet.setCellData(127, 1, "3.3. False");
        flexSheet.setCellData(128, 1, "Returns the logical value FALSE.");
        flexSheet.setCellData(129, 1, "Sample:");
        flexSheet.setCellData(129, 2, "false()");
        flexSheet.setCellData(129, 3, "Result:");
        flexSheet.setCellData(129, 4, "=false()");
        flexSheet.setCellData(131, 1, "3.4. And");
        flexSheet.setCellData(132, 1, "Returns TRUE if all of its arguments are TRUE.");
        flexSheet.setCellData(133, 1, "Sample:");
        flexSheet.setCellData(133, 2, "and(true(),1>2)");
        flexSheet.setCellData(133, 3, "Result:");
        flexSheet.setCellData(133, 4, "=and(true(),1>2)");
        flexSheet.setCellData(135, 1, "3.5. Or");
        flexSheet.setCellData(136, 1, "Returns TRUE if any argument is TRUE.");
        flexSheet.setCellData(137, 1, "Sample:");
        flexSheet.setCellData(137, 2, "or(false(),1<2)");
        flexSheet.setCellData(137, 3, "Result:");
        flexSheet.setCellData(137, 4, "=or(false(),1<2)");
        flexSheet.setCellData(139, 1, "3.6. Not");
        flexSheet.setCellData(140, 1, "Reverses the logic of its argument.");
        flexSheet.setCellData(141, 1, "Sample:");
        flexSheet.setCellData(141, 2, "not(1<2)");
        flexSheet.setCellData(141, 3, "Result:");
        flexSheet.setCellData(141, 4, "=not(1<2)");
        flexSheet.setCellData(143, 1, "3.7. If");
        flexSheet.setCellData(144, 1, "Specifies a logical test to perform.");
        flexSheet.setCellData(145, 1, "Sample:");
        flexSheet.setCellData(145, 2, "if(true(), \"true result\", \"false result\")");
        flexSheet.setCellData(146, 1, "Result:");
        flexSheet.setCellData(146, 2, "=if(true(), \"true result\", \"false result\")");
        flexSheet.setCellData(148, 0, "4. Text process function");
        flexSheet.setCellData(149, 1, "4.1. Char");
        flexSheet.setCellData(150, 1, "Returns the character specified by the code number.");
        flexSheet.setCellData(151, 1, "Sample:");
        flexSheet.setCellData(151, 2, "char(65)");
        flexSheet.setCellData(151, 3, "Result:");
        flexSheet.setCellData(151, 4, "=char(65)");
        flexSheet.setCellData(153, 1, "4.2. Code");
        flexSheet.setCellData(154, 1, "Returns a numeric code for the first character in a text string.");
        flexSheet.setCellData(155, 1, "Sample:");
        flexSheet.setCellData(155, 2, "code(\"a\")");
        flexSheet.setCellData(155, 3, "Result:");
        flexSheet.setCellData(155, 4, "=code(\"a\")");
        flexSheet.setCellData(157, 1, "4.3. Concatenate");
        flexSheet.setCellData(158, 1, "Joins several text items into one text item.");
        flexSheet.setCellData(159, 1, "Sample:");
        flexSheet.setCellData(159, 2, "concatenate(\"Hello \", \"World!\")");
        flexSheet.setCellData(160, 1, "Result:");
        flexSheet.setCellData(160, 2, "=concatenate(\"Hello \", \"World!\")");
        flexSheet.setCellData(162, 1, "4.4. Left");
        flexSheet.setCellData(163, 1, "Returns the leftmost characters from a text value.");
        flexSheet.setCellData(164, 1, "Sample:");
        flexSheet.setCellData(164, 2, "left(\"Abcdef\",3)");
        flexSheet.setCellData(164, 3, "Result:");
        flexSheet.setCellData(164, 4, "=left(\"Abcdef\",3)");
        flexSheet.setCellData(166, 1, "4.5. Right");
        flexSheet.setCellData(167, 1, "Returns the rightmost characters from a text value.");
        flexSheet.setCellData(168, 1, "Sample:");
        flexSheet.setCellData(168, 2, "right(\"Abcdef\",3)");
        flexSheet.setCellData(168, 3, "Result:");
        flexSheet.setCellData(168, 4, "=right(\"Abcdef\",3)");
        flexSheet.setCellData(170, 1, "4.6. Mid");
        flexSheet.setCellData(171, 1, "Returns a specific number of characters from a text string starting at the position you specify.");
        flexSheet.setCellData(172, 1, "Sample:");
        flexSheet.setCellData(172, 2, "mid(\"Abcdef\",3,2)");
        flexSheet.setCellData(173, 1, "Result:");
        flexSheet.setCellData(173, 2, "=mid(\"Abcdef\",3,2)");
        flexSheet.setCellData(175, 1, "4.7. Len");
        flexSheet.setCellData(176, 1, "Returns the number of characters in a text string.");
        flexSheet.setCellData(177, 1, "Sample:");
        flexSheet.setCellData(177, 2, "len(\"Abcdef\")");
        flexSheet.setCellData(177, 3, "Result:");
        flexSheet.setCellData(177, 4, "=len(\"Abcdef\")");
        flexSheet.setCellData(179, 1, "4.8. Find");
        flexSheet.setCellData(180, 1, "Finds one text value within another (case-sensitive).");
        flexSheet.setCellData(181, 1, "Sample:");
        flexSheet.setCellData(181, 2, "find(\"Bc\",\"ABcdef\")");
        flexSheet.setCellData(182, 1, "Result:");
        flexSheet.setCellData(182, 2, "=find(\"Bc\",\"ABcdef\")");
        flexSheet.setCellData(184, 1, "4.9. Search");
        flexSheet.setCellData(185, 1, "Finds one text value within another (not case-sensitive).");
        flexSheet.setCellData(186, 1, "Sample:");
        flexSheet.setCellData(186, 2, "search(\"bc\",\"ABcdef\")");
        flexSheet.setCellData(187, 1, "Result:");
        flexSheet.setCellData(187, 2, "=search(\"bc\",\"ABcdef\")");
        flexSheet.setCellData(189, 1, "4.10. Lower");
        flexSheet.setCellData(190, 1, "Converts text to lowercase.");
        flexSheet.setCellData(191, 1, "Sample:");
        flexSheet.setCellData(191, 2, "lower(\"ABCDE\")");
        flexSheet.setCellData(191, 3, "Result:");
        flexSheet.setCellData(191, 4, "=lower(\"ABCDE\")");
        flexSheet.setCellData(193, 1, "4.11. Upper");
        flexSheet.setCellData(194, 1, "Converts text to uppercase.");
        flexSheet.setCellData(195, 1, "Sample:");
        flexSheet.setCellData(195, 2, "upper(\"abcdef\")");
        flexSheet.setCellData(195, 3, "Result:");
        flexSheet.setCellData(195, 4, "=upper(\"abcdef\")");
        flexSheet.setCellData(197, 1, "4.12. Proper");
        flexSheet.setCellData(198, 1, "Capitalizes the first letter in each word of a text value.");
        flexSheet.setCellData(199, 1, "Sample:");
        flexSheet.setCellData(199, 2, "proper(\"abcde\")");
        flexSheet.setCellData(199, 3, "Result:");
        flexSheet.setCellData(199, 4, "=proper(\"abcde\")");
        flexSheet.setCellData(201, 1, "4.13. Trim");
        flexSheet.setCellData(202, 1, "Removes spaces from text.");
        flexSheet.setCellData(203, 1, "Sample:");
        flexSheet.setCellData(203, 2, "trim(\"   abcde   \")");
        flexSheet.setCellData(203, 3, "Result:");
        flexSheet.setCellData(203, 4, "=trim(\"   abcde   \")");
        flexSheet.setCellData(205, 1, "4.14. Replace");
        flexSheet.setCellData(206, 1, "Replaces characters within text.");
        flexSheet.setCellData(207, 1, "Sample:");
        flexSheet.setCellData(207, 2, "replace(\"abcdefg\",2,3,\"wxyz\")");
        flexSheet.setCellData(208, 1, "Result:");
        flexSheet.setCellData(208, 2, "=replace(\"abcdefg\",2,3,\"wxyz\")");
        flexSheet.setCellData(210, 1, "4.15. Substitute");
        flexSheet.setCellData(211, 1, "Substitutes new text for old text in a text string.");
        flexSheet.setCellData(212, 1, "Sample:");
        flexSheet.setCellData(212, 2, "substitute(\"abcabcdabcdef\",\"ab\",\"xy\")");
        flexSheet.setCellData(213, 1, "Result:");
        flexSheet.setCellData(213, 2, "=substitute(\"abcabcdabcdef\",\"ab\",\"xy\")");
        flexSheet.setCellData(215, 1, "4.16. Rept");
        flexSheet.setCellData(216, 1, "Repeats text a given number of times.");
        flexSheet.setCellData(217, 1, "Sample:");
        flexSheet.setCellData(217, 2, "rept(\"abc\",3)");
        flexSheet.setCellData(217, 3, "Result:");
        flexSheet.setCellData(217, 4, "=rept(\"abc\",3)");
        flexSheet.setCellData(219, 1, "4.17. Text");
        flexSheet.setCellData(220, 1, "Formats a number and converts it to text.");
        flexSheet.setCellData(221, 1, "Sample:");
        flexSheet.setCellData(221, 2, "text(1234,\"c2\")");
        flexSheet.setCellData(221, 3, "Result:");
        flexSheet.setCellData(221, 4, "=text(1234,\"c2\")");
        flexSheet.setCellData(223, 1, "4.18. Value");
        flexSheet.setCellData(224, 1, "Converts a text argument to a number.");
        flexSheet.setCellData(225, 1, "Sample:");
        flexSheet.setCellData(225, 2, "value(\"1234\")");
        flexSheet.setCellData(225, 3, "Result:");
        flexSheet.setCellData(225, 4, "=value(\"1234\")");
        flexSheet.setCellData(227, 0, "5. Aggregate function");
        flexSheet.setCellData(228, 1, "sample data:");
        for (var rowIndex = 229; rowIndex <= 232; rowIndex++) {
            for (var colIndex = 1; colIndex <= 8; colIndex++) {
                flexSheet.setCellData(rowIndex, colIndex, Math.random() * 200);
            }
        }
        flexSheet.setCellData(234, 1, "5.1. Sum");
        flexSheet.setCellData(235, 1, "Adds its arguments.");
        flexSheet.setCellData(236, 1, "Sample:");
        flexSheet.setCellData(236, 2, "sum(B230:D232)");
        flexSheet.setCellData(237, 1, "Result:");
        flexSheet.setCellData(237, 2, "=sum(B230:D232)");
        flexSheet.setCellData(238, 1, "Sample:");
        flexSheet.setCellData(238, 2, "sum(1,3,5,7,10,12,13)");
        flexSheet.setCellData(239, 1, "Result:");
        flexSheet.setCellData(239, 2, "=sum(1,3,5,7,10,12,13)");
        flexSheet.setCellData(241, 1, "5.2. Average");
        flexSheet.setCellData(242, 1, "Returns the average of its arguments.");
        flexSheet.setCellData(243, 1, "Sample:");
        flexSheet.setCellData(243, 2, "average(C230:E231)");
        flexSheet.setCellData(244, 1, "Result:");
        flexSheet.setCellData(244, 2, "=average(C230:E231)");
        flexSheet.setCellData(245, 1, "Sample:");
        flexSheet.setCellData(245, 2, "average(2,4,5,7,11,13,19)");
        flexSheet.setCellData(246, 1, "Result:");
        flexSheet.setCellData(246, 2, "=average(2,4,5,7,11,13,19)");
        flexSheet.setCellData(248, 1, "5.3. Count");
        flexSheet.setCellData(249, 1, "Counts how many numbers are in the list of arguments.");
        flexSheet.setCellData(250, 1, "Sample:");
        flexSheet.setCellData(250, 2, "count(B231:E233)");
        flexSheet.setCellData(251, 1, "Result:");
        flexSheet.setCellData(251, 2, "=count(B231:E233)");
        flexSheet.setCellData(252, 1, "Sample:");
        flexSheet.setCellData(252, 2, "count(1,7,8,10,11,16,19)");
        flexSheet.setCellData(253, 1, "Result:");
        flexSheet.setCellData(253, 2, "=count(1,7,8,10,11,16,19)");
        flexSheet.setCellData(255, 1, "5.4. Max");
        flexSheet.setCellData(256, 1, "Returns the maximum value in a list of arguments.");
        flexSheet.setCellData(257, 1, "Sample:");
        flexSheet.setCellData(257, 2, "max(C231:F233)");
        flexSheet.setCellData(258, 1, "Result:");
        flexSheet.setCellData(258, 2, "=max(C231:F233)");
        flexSheet.setCellData(259, 1, "Sample:");
        flexSheet.setCellData(259, 2, "max(100,87,103,54,75,34)");
        flexSheet.setCellData(260, 1, "Result:");
        flexSheet.setCellData(260, 2, "=max(100,87,103,54,75,34)");
        flexSheet.setCellData(262, 1, "5.5. Min");
        flexSheet.setCellData(263, 1, "Returns the minimum value in a list of arguments.");
        flexSheet.setCellData(264, 1, "Sample:");
        flexSheet.setCellData(264, 2, "min(B230:G233)");
        flexSheet.setCellData(265, 1, "Result:");
        flexSheet.setCellData(265, 2, "=min(B230:G233)");
        flexSheet.setCellData(266, 1, "Sample:");
        flexSheet.setCellData(266, 2, "min(74,47,68,99,106,13,51)");
        flexSheet.setCellData(267, 1, "Result:");
        flexSheet.setCellData(267, 2, "=min(74,47,68,99,106,13,51)");
        flexSheet.setCellData(269, 1, "5.6. StDev");
        flexSheet.setCellData(270, 1, "Estimates standard deviation based on a sample.");
        flexSheet.setCellData(271, 1, "Sample:");
        flexSheet.setCellData(271, 2, "stdev(B231:G233)");
        flexSheet.setCellData(272, 1, "Result:");
        flexSheet.setCellData(272, 2, "=stdev(B231:G233)");
        flexSheet.setCellData(273, 1, "Sample:");
        flexSheet.setCellData(273, 2, "stdev(74,47,68,99,106,13,51)");
        flexSheet.setCellData(274, 1, "Result:");
        flexSheet.setCellData(274, 2, "=stdev(74,47,68,99,106,13,51)");
        flexSheet.setCellData(276, 1, "5.7. StDevP");
        flexSheet.setCellData(277, 1, "Calculates standard deviation based on the entire population.");
        flexSheet.setCellData(278, 1, "Sample:");
        flexSheet.setCellData(278, 2, "stdevp(B231:G233)");
        flexSheet.setCellData(279, 1, "Result:");
        flexSheet.setCellData(279, 2, "=stdevp(B231:G233)");
        flexSheet.setCellData(280, 1, "Sample:");
        flexSheet.setCellData(280, 2, "stdevp(74,47,68,99,106,13,51)");
        flexSheet.setCellData(281, 1, "Result:");
        flexSheet.setCellData(281, 2, "=stdevp(74,47,68,99,106,13,51)");
        flexSheet.setCellData(283, 1, "5.8. Var");
        flexSheet.setCellData(284, 1, "Estimates variance based on a sample.");
        flexSheet.setCellData(285, 1, "Sample:");
        flexSheet.setCellData(285, 2, "var(C230:H232)");
        flexSheet.setCellData(286, 1, "Result:");
        flexSheet.setCellData(286, 2, "=var(C230:H232)");
        flexSheet.setCellData(287, 1, "Sample:");
        flexSheet.setCellData(287, 2, "var(74,47,68,99,106,13,51)");
        flexSheet.setCellData(288, 1, "Result:");
        flexSheet.setCellData(288, 2, "=var(74,47,68,99,106,13,51)");
        flexSheet.setCellData(290, 1, "5.9. VarP");
        flexSheet.setCellData(291, 1, "Calculates variance based on the entire population.");
        flexSheet.setCellData(292, 1, "Sample:");
        flexSheet.setCellData(292, 2, "varp(C230:H232)");
        flexSheet.setCellData(293, 1, "Result:");
        flexSheet.setCellData(293, 2, "=varp(C230:H232)");
        flexSheet.setCellData(294, 1, "Sample:");
        flexSheet.setCellData(294, 2, "varp(74,47,68,99,106,13,51)");
        flexSheet.setCellData(295, 1, "Result:");
        flexSheet.setCellData(295, 2, "=varp(74,47,68,99,106,13,51)");
        flexSheet.setCellData(297, 0, "6. Date function");
        flexSheet.setCellData(298, 1, "6.1. Now");
        flexSheet.setCellData(299, 1, "Returns the serial number of the current date and time.");
        flexSheet.setCellData(300, 1, "Sample:");
        flexSheet.setCellData(300, 2, "Now()");
        flexSheet.setCellData(300, 3, "Result:");
        flexSheet.setCellData(300, 4, "=Now()");
        flexSheet.setCellData(302, 1, "6.2. Year");
        flexSheet.setCellData(303, 1, "Converts a serial number to a year.");
        flexSheet.setCellData(304, 1, "Sample:");
        flexSheet.setCellData(304, 2, "Year(E301)");
        flexSheet.setCellData(304, 3, "Result:");
        flexSheet.setCellData(304, 4, "=Year(E301)");
        flexSheet.setCellData(306, 1, "6.3. Month");
        flexSheet.setCellData(307, 1, "Converts a serial number to a month.");
        flexSheet.setCellData(308, 1, "Sample:");
        flexSheet.setCellData(308, 2, "Month(E301)");
        flexSheet.setCellData(308, 3, "Result:");
        flexSheet.setCellData(308, 4, "=Month(E301)");
        flexSheet.setCellData(310, 1, "6.4. Day");
        flexSheet.setCellData(311, 1, "Converts a serial number to a day of the month.");
        flexSheet.setCellData(312, 1, "Sample:");
        flexSheet.setCellData(312, 2, "Day(E301)");
        flexSheet.setCellData(312, 3, "Result:");
        flexSheet.setCellData(312, 4, "=Day(E301)");
        flexSheet.setCellData(314, 0, "7. Lookup & Reference");
        flexSheet.setCellData(315, 1, "7.1. Cell Reference");
        flexSheet.setCellData(316, 1, "Gets value for a specific cell in the flexsheet.");
        flexSheet.setCellData(317, 1, "Sample:");
        flexSheet.setCellData(317, 2, "B317");
        flexSheet.setCellData(317, 3, "Result:");
        flexSheet.setCellData(317, 4, "=B317");
        flexSheet.setCellData(319, 1, "7.2. Choose");
        flexSheet.setCellData(320, 1, "Chooses a value from a list of values.");
        flexSheet.setCellData(321, 1, "Sample:");
        flexSheet.setCellData(321, 2, "choose(2, \"Hello\", \"World\", \"for\", \"test\")");
        flexSheet.setCellData(322, 1, "Result:");
        flexSheet.setCellData(322, 2, "=choose(2, \"Hello\", \"World\", \"for\", \"test\")");
        flexSheet.setCellData(324, 1, "7.3. Column");
        flexSheet.setCellData(325, 1, "Returns the column number of a reference.");
        flexSheet.setCellData(326, 1, "Sample:");
        flexSheet.setCellData(326, 2, "column(E1)");
        flexSheet.setCellData(326, 3, "Result:");
        flexSheet.setCellData(326, 4, "=column(E1)");
        flexSheet.setCellData(328, 1, "7.4. Columns");
        flexSheet.setCellData(329, 1, "Returns the number of columns in a reference.");
        flexSheet.setCellData(330, 1, "Sample:");
        flexSheet.setCellData(330, 2, "columns(B2:D5)");
        flexSheet.setCellData(330, 3, "Result:");
        flexSheet.setCellData(330, 4, "=columns(B2:D5)");
        flexSheet.setCellData(332, 1, "7.5. Row");
        flexSheet.setCellData(333, 1, "Returns the row number of a reference.");
        flexSheet.setCellData(334, 1, "Sample:");
        flexSheet.setCellData(334, 2, "row(B21)");
        flexSheet.setCellData(334, 3, "Result:");
        flexSheet.setCellData(334, 4, "=row(B21)");
        flexSheet.setCellData(336, 1, "7.6. Rows");
        flexSheet.setCellData(337, 1, "Returns the number of rows in a reference.");
        flexSheet.setCellData(338, 1, "Sample:");
        flexSheet.setCellData(338, 2, "rows(B21:E13)");
        flexSheet.setCellData(338, 3, "Result:");
        flexSheet.setCellData(338, 4, "=rows(B21:E13)");
        flexSheet.setCellData(341, 0, "2016v1 added formulas");
        flexSheet.setCellData(342, 0, "1. Date function");
        flexSheet.setCellData(343, 1, "1.1. Today");
        flexSheet.setCellData(344, 1, "Returns the serial number of today's date.");
        flexSheet.setCellData(345, 1, "Sample:");
        flexSheet.setCellData(345, 2, "today()");
        flexSheet.setCellData(345, 3, "Result:");
        flexSheet.setCellData(345, 4, "=today()");
        flexSheet.setCellData(347, 1, "1.2. Date");
        flexSheet.setCellData(348, 1, "Returns the serial number of a particular date.");
        flexSheet.setCellData(349, 1, "Sample:");
        flexSheet.setCellData(349, 2, "date(2015, 11, 26)");
        flexSheet.setCellData(350, 1, "Result:");
        flexSheet.setCellData(350, 2, "=date(2015, 11, 26)");
        flexSheet.setCellData(352, 1, "1.3. Time");
        flexSheet.setCellData(353, 1, "Returns the serial number of a particular time.");
        flexSheet.setCellData(354, 1, "Sample:");
        flexSheet.setCellData(354, 2, "time(11, 28, 33)");
        flexSheet.setCellData(355, 1, "Result:");
        flexSheet.setCellData(355, 2, "=time(11, 28, 33)");
        flexSheet.setCellData(357, 1, "1.4. Hour");
        flexSheet.setCellData(358, 1, "Converts a serial number to an hour.");
        flexSheet.setCellData(359, 1, "Sample:");
        flexSheet.setCellData(359, 2, "hour(C356)");
        flexSheet.setCellData(359, 3, "Result:");
        flexSheet.setCellData(359, 4, "=hour(C356)");
        flexSheet.setCellData(360, 1, "Sample:");
        flexSheet.setCellData(360, 2, "hour(0.65)");
        flexSheet.setCellData(360, 3, "Result:");
        flexSheet.setCellData(360, 4, "=hour(0.65)");
        flexSheet.setCellData(362, 1, "1.5. DateDif");
        flexSheet.setCellData(363, 1, "Calculates the number of days, months, or years between two dates.");
        flexSheet.setCellData(364, 1, "Syntax:");
        flexSheet.setCellData(364, 2, "DateDif(start_date, end_date, unit)");
        flexSheet.setCellData(365, 1, "The unit paratemer can be following values:");
        flexSheet.setCellData(366, 1, "\"Y\"");
        flexSheet.setCellData(366, 2, "The number of complete years in the period.");
        flexSheet.setCellData(367, 1, "\"M\"");
        flexSheet.setCellData(367, 2, "The number of complete months in the period.");
        flexSheet.setCellData(368, 1, "\"D\"");
        flexSheet.setCellData(368, 2, "The number of days in the period.");
        flexSheet.setCellData(369, 1, "\"MD\"");
        flexSheet.setCellData(369, 2, "The difference between the days in start_date and end_date. The months and years of the dates are ignored.");
        flexSheet.setCellData(370, 1, "\"YM\"");
        flexSheet.setCellData(370, 2, "The difference between the months in start_date and end_date. The days and years of the dates are ignored.");
        flexSheet.setCellData(371, 1, "\"YD\"");
        flexSheet.setCellData(371, 2, "The difference between the days of start_date and end_date. The years of the dates are ignored.");
        flexSheet.setCellData(372, 1, "Sample:");
        flexSheet.setCellData(372, 2, "datedif(\"11/26/2012\", \"8/15/2015\", \"Y\")");
        flexSheet.setCellData(373, 1, "Result:");
        flexSheet.setCellData(373, 2, "=datedif(\"11/26/2012\", \"8/15/2015\", \"Y\")");
        flexSheet.setCellData(374, 1, "Sample:");
        flexSheet.setCellData(374, 2, "datedif(\"5/26/2015\", \"11/15/2015\", \"M\")");
        flexSheet.setCellData(375, 1, "Result:");
        flexSheet.setCellData(375, 2, "=datedif(\"5/26/2015\", \"11/15/2015\", \"M\")");
        flexSheet.setCellData(376, 1, "Sample:");
        flexSheet.setCellData(376, 2, "datedif(\"2/26/2014\", \"3/15/2015\", \"D\")");
        flexSheet.setCellData(377, 1, "Result:");
        flexSheet.setCellData(377, 2, "=datedif(\"2/26/2014\", \"3/15/2015\", \"D\")");
        flexSheet.setCellData(378, 1, "Sample:");
        flexSheet.setCellData(378, 2, "datedif(\"3/26/2015\", \"2/15/2016\", \"MD\")");
        flexSheet.setCellData(379, 1, "Result:");
        flexSheet.setCellData(379, 2, "=datedif(\"3/26/2015\", \"2/15/2016\", \"MD\")");
        flexSheet.setCellData(380, 1, "Sample:");
        flexSheet.setCellData(380, 2, "datedif(\"11/26/2015\", \"2/15/2016\", \"YM\")");
        flexSheet.setCellData(381, 1, "Result:");
        flexSheet.setCellData(381, 2, "=datedif(\"11/26/2015\", \"2/15/2016\", \"YM\")");
        flexSheet.setCellData(382, 1, "Sample:");
        flexSheet.setCellData(382, 2, "datedif(\"2/26/2016\", \"2/15/2017\", \"YD\")");
        flexSheet.setCellData(383, 1, "Result:");
        flexSheet.setCellData(383, 2, "=datedif(\"2/26/2016\", \"2/15/2017\", \"YD\")");
        flexSheet.setCellData(385, 0, "2. Aggregate function");
        flexSheet.setCellData(386, 1, "sample data:");
        flexSheet.setCellData(387, 1, "Tree");
        flexSheet.setCellData(387, 2, "Height");
        flexSheet.setCellData(387, 3, "Age");
        flexSheet.setCellData(387, 4, "Yield");
        flexSheet.setCellData(387, 5, "Profit");
        flexSheet.setCellData(387, 6, "Height");
        flexSheet.setCellData(388, 1, "Apple");
        flexSheet.setCellData(388, 2, ">10");
        flexSheet.setCellData(388, 6, "<16");
        flexSheet.setCellData(389, 1, "Pear");
        flexSheet.setCellData(391, 1, "Tree");
        flexSheet.setCellData(391, 2, "Height");
        flexSheet.setCellData(391, 3, "Age");
        flexSheet.setCellData(391, 4, "Yield");
        flexSheet.setCellData(391, 5, "Profit");
        for (var rowIndex = 392; rowIndex <= 401; rowIndex++) {
            for (var colIndex = 1; colIndex <= 5; colIndex++) {
                if (colIndex === 1) {
                    if (rowIndex === 394) {
                        flexSheet.setCellData(rowIndex, colIndex, "Apple");
                    } else {
                        flexSheet.setCellData(rowIndex, colIndex, ["Apple", "Pear", "Cherry", "Orange"][Math.floor(Math.random() * 4)]);
                    }
                } else if (colIndex === 5) {
                    flexSheet.setCellData(rowIndex, colIndex, Math.random() * 300);
                } else {
                    if (rowIndex === 394 && colIndex === 2) {
                        flexSheet.setCellData(rowIndex, colIndex, 15);
                    } else if (rowIndex === 394 && colIndex === 3) {
                        flexSheet.setCellData(rowIndex, colIndex, "N/A");
                    } else {
                        flexSheet.setCellData(rowIndex, colIndex, Math.round(Math.random() * 20));
                    }
                }
            }
        }
        flexSheet.setCellData(403, 1, "2.1. CountA");
        flexSheet.setCellData(404, 1, "Counts how many values are in the list of arguments.");
        flexSheet.setCellData(405, 1, "Sample:");
        flexSheet.setCellData(405, 2, "counta(E388:E402)");
        flexSheet.setCellData(406, 1, "Result:");
        flexSheet.setCellData(406, 2, "=counta(E388:E402)");
        flexSheet.setCellData(408, 1, "2.2. CountBlank");
        flexSheet.setCellData(409, 1, "Counts the number of blank cells within a range.");
        flexSheet.setCellData(410, 1, "Sample:");
        flexSheet.setCellData(410, 2, "countblank(E388:E402)");
        flexSheet.setCellData(411, 1, "Result:");
        flexSheet.setCellData(411, 2, "=countblank(E388:E402)");
        flexSheet.setCellData(413, 1, "2.3. CountIf");
        flexSheet.setCellData(414, 1, "Counts the number of cells within a range that meet the given criteria.");
        flexSheet.setCellData(415, 1, "Syntax:");
        flexSheet.setCellData(415, 2, "countif(range, criteria)");
        flexSheet.setCellData(416, 1, "Sample:");
        flexSheet.setCellData(416, 2, "countif(B393:B402, \"Apple\")");
        flexSheet.setCellData(417, 1, "Result:");
        flexSheet.setCellData(417, 2, "=countif(B393:B402, \"Apple\")");
        flexSheet.setCellData(418, 1, "Sample:");
        flexSheet.setCellData(418, 2, "countif(C393:C402, \">10\")");
        flexSheet.setCellData(419, 1, "Result:");
        flexSheet.setCellData(419, 2, "=countif(C393:C402, \">10\")");
        flexSheet.setCellData(421, 1, "2.4. CountIfs");
        flexSheet.setCellData(422, 1, "Counts the number of cells within a range that meet multiple criteria.");
        flexSheet.setCellData(423, 1, "Syntax:");
        flexSheet.setCellData(423, 2, "countifs(criteria_range1, criteria1, [criteria_range2, criteria2],...)");
        flexSheet.setCellData(424, 1, "Sample:");
        flexSheet.setCellData(424, 2, "countifs(B393:B402, \"Apple\", C393:C402, \">10\")");
        flexSheet.setCellData(425, 1, "Result:");
        flexSheet.setCellData(425, 2, "=countifs(B393:B402, \"Apple\", C393:C402, \">10\")");
        flexSheet.setCellData(427, 1, "2.5. DCount");
        flexSheet.setCellData(428, 1, "Counts the cells that contain numbers in a database.");
        flexSheet.setCellData(429, 1, "Syntax:");
        flexSheet.setCellData(429, 2, "countifs(count_range, field, criteria_range)");
        flexSheet.setCellData(430, 1, "Sample:");
        flexSheet.setCellData(430, 2, "dcount(B392:F402, \"Age\", B388:G390)");
        flexSheet.setCellData(431, 1, "Result:");
        flexSheet.setCellData(431, 2, "=dcount(B392:F402, \"Age\", B388:G390)");
        flexSheet.setCellData(433, 1, "2.6. SumIf");
        flexSheet.setCellData(434, 1, "Adds the cells specified by a given criteria.");
        flexSheet.setCellData(435, 1, "Syntax:");
        flexSheet.setCellData(435, 2, "sumif(range, criteria, [sum_range])");
        flexSheet.setCellData(436, 1, "Remarks:");
        flexSheet.setCellData(436, 2, "If the sum_range argument is omitted, FlexSheet adds the cells that are specified in the range argument.");
        flexSheet.setCellData(437, 1, "Sample:");
        flexSheet.setCellData(437, 2, "sumif(B393:B402, \"Apple\", C393:C402)");
        flexSheet.setCellData(438, 1, "Result:");
        flexSheet.setCellData(438, 2, "=sumif(B393:B402, \"Apple\", C393:C402)");
        flexSheet.setCellData(439, 1, "Sample:");
        flexSheet.setCellData(439, 2, "sumif(C393:C402, \">10\")");
        flexSheet.setCellData(440, 1, "Result:");
        flexSheet.setCellData(440, 2, "=sumif(C393:C402, \">10\")");
        flexSheet.setCellData(442, 1, "2.7. SumIfs");
        flexSheet.setCellData(443, 1, "Adds the cells in a range that meet multiple criteria.");
        flexSheet.setCellData(444, 1, "Syntax:");
        flexSheet.setCellData(444, 2, "sumifs(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2],...)");
        flexSheet.setCellData(445, 1, "Sample:");
        flexSheet.setCellData(445, 2, "sumifs(F393:F402, B393:B402, \"Apple\", C393:C402, \">10\")");
        flexSheet.setCellData(446, 1, "Result:");
        flexSheet.setCellData(446, 2, "=sumifs(F393:F402, B393:B402, \"Apple\", C393:C402, \">10\")");
        flexSheet.setCellData(448, 1, "2.8. Rank");
        flexSheet.setCellData(449, 1, "Returns the rank of a number in a list of numbers.");
        flexSheet.setCellData(450, 1, "Syntax:");
        flexSheet.setCellData(450, 2, "rank(number, ref, [order])");
        flexSheet.setCellData(451, 1, "Remarks:");
        flexSheet.setCellData(451, 2, "If order is 0 (zero) or omitted, FlexSheet ranks number as if ref were a list sorted in descending order.");
        flexSheet.setCellData(452, 2, "If order is any nonzero value, FlexSheet ranks number as if ref were a list sorted in ascending order.");
        flexSheet.setCellData(453, 1, "Sample:");
        flexSheet.setCellData(453, 2, "rank(15, C393:C402)");
        flexSheet.setCellData(454, 1, "Result:");
        flexSheet.setCellData(454, 2, "=rank(15, C393:C402)");
        flexSheet.setCellData(455, 1, "Sample:");
        flexSheet.setCellData(455, 2, "rank(15, C393:C402, 1)");
        flexSheet.setCellData(456, 1, "Result:");
        flexSheet.setCellData(456, 2, "=rank(15, C393:C402, 1)");
        flexSheet.setCellData(458, 1, "2.9. Product");
        flexSheet.setCellData(459, 1, "Multiplies its arguments.");
        flexSheet.setCellData(460, 1, "Sample:");
        flexSheet.setCellData(460, 2, "product(C393:E393)");
        flexSheet.setCellData(461, 1, "Result:");
        flexSheet.setCellData(461, 2, "=product(C393:E393)");
        flexSheet.setCellData(462, 1, "Sample:");
        flexSheet.setCellData(462, 2, "product(1, 2, 3, 4, 5)");
        flexSheet.setCellData(463, 1, "Result:");
        flexSheet.setCellData(463, 2, "=product(1, 2, 3, 4, 5)");
        flexSheet.setCellData(465, 1, "2.10. Subtotal");
        flexSheet.setCellData(466, 1, "Returns a subtotal in a list or database.");
        flexSheet.setCellData(467, 1, "Syntax:");
        flexSheet.setCellData(467, 2, "subtotal(function_num, ref1, [ref2],...)");
        flexSheet.setCellData(468, 1, "Remarks:");
        flexSheet.setCellData(468, 2, "The function_num 1-11 or 101-111 that specifies the function to use for the subtotal.");
        flexSheet.setCellData(469, 2, "1-11 includes manually-hidden rows, while 101-111 excludes them.");
        flexSheet.setCellData(470, 2, "Function_Num");
        flexSheet.setCellData(470, 4, "Function_Num");
        flexSheet.setCellData(470, 6, "Function");
        flexSheet.setCellData(471, 2, "(includes hidden values)");
        flexSheet.setCellData(471, 4, "(ignores hidden values)");
        flexSheet.setCellData(472, 2, "1");
        flexSheet.setCellData(472, 4, "101");
        flexSheet.setCellData(472, 6, "Average");
        flexSheet.setCellData(473, 2, "2");
        flexSheet.setCellData(473, 4, "102");
        flexSheet.setCellData(473, 6, "Count");
        flexSheet.setCellData(474, 2, "3");
        flexSheet.setCellData(474, 4, "103");
        flexSheet.setCellData(474, 6, "CountA");
        flexSheet.setCellData(475, 2, "4");
        flexSheet.setCellData(475, 4, "104");
        flexSheet.setCellData(475, 6, "Max");
        flexSheet.setCellData(476, 2, "5");
        flexSheet.setCellData(476, 4, "105");
        flexSheet.setCellData(476, 6, "Min");
        flexSheet.setCellData(477, 2, "6");
        flexSheet.setCellData(477, 4, "106");
        flexSheet.setCellData(477, 6, "Product");
        flexSheet.setCellData(478, 2, "7");
        flexSheet.setCellData(478, 4, "107");
        flexSheet.setCellData(478, 6, "Stdev");
        flexSheet.setCellData(479, 2, "8");
        flexSheet.setCellData(479, 4, "108");
        flexSheet.setCellData(479, 6, "StdevP");
        flexSheet.setCellData(480, 2, "9");
        flexSheet.setCellData(480, 4, "109");
        flexSheet.setCellData(480, 6, "Sum");
        flexSheet.setCellData(481, 2, "10");
        flexSheet.setCellData(481, 4, "110");
        flexSheet.setCellData(481, 6, "Var");
        flexSheet.setCellData(482, 2, "11");
        flexSheet.setCellData(482, 4, "111");
        flexSheet.setCellData(482, 6, "VarP");
        flexSheet.setCellData(483, 1, "Sample:");
        flexSheet.setCellData(483, 2, "subtotal(3, B388:D390, G388:G391)");
        flexSheet.setCellData(484, 1, "Result:");
        flexSheet.setCellData(484, 2, "=subtotal(3, B388:D390, G388:G391)");
        flexSheet.setCellData(485, 1, "Sample:");
        flexSheet.setCellData(485, 2, "subtotal(6, E393:F393)");
        flexSheet.setCellData(486, 1, "Result:");
        flexSheet.setCellData(486, 2, "=subtotal(6, E393:F393)");
        flexSheet.setCellData(488, 0, "3. Lookup & Reference");
        flexSheet.setCellData(489, 1, "3.1. Index");
        flexSheet.setCellData(490, 1, "Uses an index to choose a value from a reference.");
        flexSheet.setCellData(491, 1, "Syntax:");
        flexSheet.setCellData(491, 2, "index(range,row_num,[col_num])");
        flexSheet.setCellData(492, 1, "Remarks:");
        flexSheet.setCellData(492, 2, "If row_num or column_num to 0, inedx returns the array of values for the entire column or row.");
        flexSheet.setCellData(493, 1, "Sample:");
        flexSheet.setCellData(493, 2, "index(B393:F394, 2, 2)");
        flexSheet.setCellData(494, 1, "Result:");
        flexSheet.setCellData(494, 2, "=index(B393:F394, 2, 2)");
        flexSheet.setCellData(495, 1, "Sample:");
        flexSheet.setCellData(495, 2, "sum(index(C393:D402, 0, 1))");
        flexSheet.setCellData(496, 1, "Result:");
        flexSheet.setCellData(496, 2, "=sum(index(C393:D402, 0, 1))");
        flexSheet.setCellData(498, 1, "3.2. HLookup");
        flexSheet.setCellData(499, 1, "Looks in the top row of an array and returns the value of the indicated cell.");
        flexSheet.setCellData(500, 1, "Syntax:");
        flexSheet.setCellData(500, 2, "hlookup(lookup_value, range, row_index_num, [range_lookup])");
        flexSheet.setCellData(501, 1, "Remarks:");
        flexSheet.setCellData(501, 2, "range_lookup is a logical value that specifies whether you want HLOOKUP to find an exact match or an approximate match.");
        flexSheet.setCellData(502, 2, "If TRUE or omitted, an approximate match is returned.  In other words, if an exact match is not found, the next largest value that is less than lookup_value is returned.");
        flexSheet.setCellData(503, 2, "If FALSE, HLOOKUP will find an exact match.");
        flexSheet.setCellData(504, 2, "If range_lookup is FALSE and lookup_value is text, you can use the wildcard characters, question mark (?) and asterisk (*).");
        flexSheet.setCellData(505, 1, "Sample Data:");
        flexSheet.setCellData(506, 1, "4Test");
        flexSheet.setCellData(506, 2, "Test4");
        flexSheet.setCellData(506, 3, "4Test4");
        flexSheet.setCellData(506, 4, "44Test4");
        flexSheet.setCellData(506, 5, "4Test44");
        flexSheet.setCellData(507, 1, "1");
        flexSheet.setCellData(507, 2, "101");
        flexSheet.setCellData(507, 3, "1001");
        flexSheet.setCellData(507, 4, "5001");
        flexSheet.setCellData(507, 5, "10001");
        flexSheet.setCellData(508, 1, "0.1");
        flexSheet.setCellData(508, 2, "0.2");
        flexSheet.setCellData(508, 3, "0.3");
        flexSheet.setCellData(508, 4, "0.5");
        flexSheet.setCellData(508, 5, "0.8");
        flexSheet.setCellData(509, 1, "Sample:");
        flexSheet.setCellData(509, 2, "hlookup(7500, B508:F509, 2)");
        flexSheet.setCellData(510, 1, "Result:");
        flexSheet.setCellData(510, 2, "=hlookup(7500, B508:F509, 2)");
        flexSheet.setCellData(511, 1, "Sample:");
        flexSheet.setCellData(511, 2, "hlookup(\"?test?\", B507:F509, 3, false)");
        flexSheet.setCellData(512, 1, "Result:");
        flexSheet.setCellData(512, 2, "=hlookup(\"?test?\", B507:F509, 3, false)");
        flexSheet.setCellData(514, 0, "4. Financial");
        flexSheet.setCellData(515, 1, "4.1. Rate");
        flexSheet.setCellData(516, 1, "Returns the interest rate per period of an annuity.");
        flexSheet.setCellData(517, 1, "Syntax:");
        flexSheet.setCellData(517, 2, "rate(nper, pmt, pv, [fv], [type], [guess])");
        flexSheet.setCellData(518, 1, "The rate function syntax has the following arguments:");
        flexSheet.setCellData(519, 2, "nper:");
        flexSheet.setCellData(519, 3, "The total number of payment periods in an annuity.");
        flexSheet.setCellData(520, 2, "pmt:");
        flexSheet.setCellData(520, 3, "The payment made each period and cannot change over the life of the annuity.");
        flexSheet.setCellData(521, 2, "pv:");
        flexSheet.setCellData(521, 3, "The total amount that a series of future payments is worth now.");
        flexSheet.setCellData(522, 2, "fv:");
        flexSheet.setCellData(522, 3, "The future value, or a cash balance you want to attain after the last payment is made.");
        flexSheet.setCellData(523, 2, "type:");
        flexSheet.setCellData(523, 3, "The number 0 or 1 and indicates when payments are due.");
        flexSheet.setCellData(524, 3, "0 or omitted means at the end of the period.");
        flexSheet.setCellData(525, 3, "1 means at the beginning of the period.");
        flexSheet.setCellData(526, 2, "guess:");
        flexSheet.setCellData(526, 3, "Your guess for what the rate will be.  If you omit guess, it is assumed to be 10 percent.");
        flexSheet.setCellData(527, 1, "Sample:");
        flexSheet.setCellData(527, 2, "rate(48, -200, 8000)");
        flexSheet.setCellData(528, 1, "Result:");
        flexSheet.setCellData(528, 2, "=rate(48, -200, 8000)");
    }

    // Apply styles for the formulas sheet.
    function applyStyleForFormulasSheet(flexSheet) {
        flexSheet.rows[0].height = 30;
        flexSheet.rows[32].height = 30;
        flexSheet.rows[102].height = 30;
        flexSheet.rows[132].height = 30;
        flexSheet.rows[211].height = 30;
        flexSheet.applyCellsStyle({
            fontSize: '16px',
            fontWeight: 'bold'
        }, [new wijmo.grid.CellRange(0, 0, 0, 2),
            new wijmo.grid.CellRange(32, 0, 32, 1),
            new wijmo.grid.CellRange(118, 0, 118, 1),
            new wijmo.grid.CellRange(148, 0, 148, 1),
            new wijmo.grid.CellRange(227, 0, 227, 1),
            new wijmo.grid.CellRange(297, 0, 297, 1),
            new wijmo.grid.CellRange(314, 0, 314, 1),
            new wijmo.grid.CellRange(341, 0, 342, 1),
            new wijmo.grid.CellRange(385, 0, 385, 1),
            new wijmo.grid.CellRange(488, 0, 488, 1),
            new wijmo.grid.CellRange(514, 0, 514, 0)]);
        flexSheet.applyCellsStyle({
            fontWeight: 'bold'
        }, [new wijmo.grid.CellRange(1, 1, 1, 2),
            new wijmo.grid.CellRange(5, 1, 5, 2),
            new wijmo.grid.CellRange(10, 1, 10, 2),
            new wijmo.grid.CellRange(15, 1, 15, 2),
            new wijmo.grid.CellRange(19, 1, 19, 2),
            new wijmo.grid.CellRange(24, 1, 24, 2),
            new wijmo.grid.CellRange(28, 1, 28, 1),
            new wijmo.grid.CellRange(33, 1, 33, 1),
            new wijmo.grid.CellRange(37, 1, 37, 1),
            new wijmo.grid.CellRange(41, 1, 41, 1),
            new wijmo.grid.CellRange(45, 1, 45, 1),
            new wijmo.grid.CellRange(49, 1, 49, 1),
            new wijmo.grid.CellRange(53, 1, 53, 1),
            new wijmo.grid.CellRange(57, 1, 57, 1),
            new wijmo.grid.CellRange(61, 1, 61, 1),
            new wijmo.grid.CellRange(65, 1, 65, 1),
            new wijmo.grid.CellRange(69, 1, 69, 1),
            new wijmo.grid.CellRange(73, 1, 73, 1),
            new wijmo.grid.CellRange(77, 1, 77, 1),
            new wijmo.grid.CellRange(81, 1, 81, 1),
            new wijmo.grid.CellRange(86, 1, 86, 1),
            new wijmo.grid.CellRange(90, 1, 90, 1),
            new wijmo.grid.CellRange(94, 1, 94, 1),
            new wijmo.grid.CellRange(98, 1, 98, 1),
            new wijmo.grid.CellRange(102, 1, 102, 1),
            new wijmo.grid.CellRange(106, 1, 106, 1),
            new wijmo.grid.CellRange(110, 1, 110, 1),
            new wijmo.grid.CellRange(114, 1, 114, 1),
            new wijmo.grid.CellRange(119, 1, 119, 1),
            new wijmo.grid.CellRange(123, 1, 123, 1),
            new wijmo.grid.CellRange(127, 1, 127, 1),
            new wijmo.grid.CellRange(131, 1, 131, 1),
            new wijmo.grid.CellRange(135, 1, 135, 1),
            new wijmo.grid.CellRange(139, 1, 139, 1),
            new wijmo.grid.CellRange(143, 1, 143, 1),
            new wijmo.grid.CellRange(149, 1, 149, 1),
            new wijmo.grid.CellRange(153, 1, 153, 1),
            new wijmo.grid.CellRange(157, 1, 157, 1),
            new wijmo.grid.CellRange(162, 1, 162, 1),
            new wijmo.grid.CellRange(166, 1, 166, 1),
            new wijmo.grid.CellRange(170, 1, 170, 1),
            new wijmo.grid.CellRange(175, 1, 175, 1),
            new wijmo.grid.CellRange(179, 1, 179, 1),
            new wijmo.grid.CellRange(184, 1, 184, 1),
            new wijmo.grid.CellRange(189, 1, 189, 1),
            new wijmo.grid.CellRange(193, 1, 193, 1),
            new wijmo.grid.CellRange(197, 1, 197, 1),
            new wijmo.grid.CellRange(201, 1, 201, 1),
            new wijmo.grid.CellRange(205, 1, 205, 1),
            new wijmo.grid.CellRange(210, 1, 210, 1),
            new wijmo.grid.CellRange(215, 1, 215, 1),
            new wijmo.grid.CellRange(219, 1, 219, 1),
            new wijmo.grid.CellRange(223, 1, 223, 1),
            new wijmo.grid.CellRange(234, 1, 234, 1),
            new wijmo.grid.CellRange(241, 1, 241, 1),
            new wijmo.grid.CellRange(248, 1, 248, 1),
            new wijmo.grid.CellRange(255, 1, 255, 1),
            new wijmo.grid.CellRange(262, 1, 262, 1),
            new wijmo.grid.CellRange(269, 1, 269, 1),
            new wijmo.grid.CellRange(276, 1, 276, 1),
            new wijmo.grid.CellRange(283, 1, 283, 1),
            new wijmo.grid.CellRange(290, 1, 290, 1),
            new wijmo.grid.CellRange(298, 1, 298, 1),
            new wijmo.grid.CellRange(302, 1, 302, 1),
            new wijmo.grid.CellRange(306, 1, 306, 1),
            new wijmo.grid.CellRange(310, 1, 310, 1),
            new wijmo.grid.CellRange(315, 1, 315, 1),
            new wijmo.grid.CellRange(319, 1, 319, 1),
            new wijmo.grid.CellRange(324, 1, 324, 1),
            new wijmo.grid.CellRange(328, 1, 328, 1),
            new wijmo.grid.CellRange(332, 1, 332, 1),
            new wijmo.grid.CellRange(336, 1, 336, 1),
            new wijmo.grid.CellRange(343, 1, 343, 1),
            new wijmo.grid.CellRange(347, 1, 347, 1),
            new wijmo.grid.CellRange(352, 1, 352, 1),
            new wijmo.grid.CellRange(357, 1, 357, 1),
            new wijmo.grid.CellRange(362, 1, 362, 1),
            new wijmo.grid.CellRange(366, 1, 371, 1),
            new wijmo.grid.CellRange(403, 1, 403, 1),
            new wijmo.grid.CellRange(408, 1, 408, 2),
            new wijmo.grid.CellRange(413, 1, 413, 1),
            new wijmo.grid.CellRange(421, 1, 421, 1),
            new wijmo.grid.CellRange(427, 1, 427, 1),
            new wijmo.grid.CellRange(433, 1, 433, 1),
            new wijmo.grid.CellRange(442, 1, 442, 1),
            new wijmo.grid.CellRange(448, 1, 448, 1),
            new wijmo.grid.CellRange(458, 1, 458, 1),
            new wijmo.grid.CellRange(465, 1, 465, 1),
            new wijmo.grid.CellRange(470, 2, 471, 6),
            new wijmo.grid.CellRange(489, 1, 489, 1),
            new wijmo.grid.CellRange(498, 1, 498, 1),
            new wijmo.grid.CellRange(515, 1, 515, 1),
            new wijmo.grid.CellRange(519, 2, 526, 2)]);
        flexSheet.applyCellsStyle({
            textAlign: 'right'
        }, [new wijmo.grid.CellRange(3, 1, 3, 1), new wijmo.grid.CellRange(3, 3, 3, 3),
            new wijmo.grid.CellRange(7, 1, 8, 1), new wijmo.grid.CellRange(7, 3, 8, 3),
            new wijmo.grid.CellRange(12, 1, 13, 1), new wijmo.grid.CellRange(12, 3, 13, 3),
            new wijmo.grid.CellRange(17, 1, 17, 1), new wijmo.grid.CellRange(17, 3, 17, 3),
            new wijmo.grid.CellRange(21, 1, 22, 1),
            new wijmo.grid.CellRange(22, 1, 22, 1), new wijmo.grid.CellRange(22, 3, 22, 3),
            new wijmo.grid.CellRange(26, 1, 26, 1), new wijmo.grid.CellRange(26, 3, 26, 3),
            new wijmo.grid.CellRange(30, 1, 30, 1), new wijmo.grid.CellRange(30, 3, 30, 3),
            new wijmo.grid.CellRange(35, 1, 35, 1), new wijmo.grid.CellRange(35, 3, 35, 3),
            new wijmo.grid.CellRange(39, 1, 39, 1), new wijmo.grid.CellRange(39, 3, 39, 3),
            new wijmo.grid.CellRange(43, 1, 43, 1), new wijmo.grid.CellRange(43, 3, 43, 3),
            new wijmo.grid.CellRange(47, 1, 47, 1), new wijmo.grid.CellRange(47, 3, 47, 3),
            new wijmo.grid.CellRange(51, 1, 51, 1), new wijmo.grid.CellRange(51, 3, 51, 3),
            new wijmo.grid.CellRange(55, 1, 55, 1), new wijmo.grid.CellRange(55, 3, 55, 3),
            new wijmo.grid.CellRange(59, 1, 59, 1), new wijmo.grid.CellRange(59, 3, 59, 3),
            new wijmo.grid.CellRange(63, 1, 63, 1), new wijmo.grid.CellRange(63, 3, 63, 3),
            new wijmo.grid.CellRange(67, 1, 67, 1), new wijmo.grid.CellRange(67, 3, 67, 3),
            new wijmo.grid.CellRange(71, 1, 71, 1), new wijmo.grid.CellRange(71, 3, 71, 3),
            new wijmo.grid.CellRange(75, 1, 75, 1), new wijmo.grid.CellRange(75, 3, 75, 3),
            new wijmo.grid.CellRange(79, 1, 80, 1), new wijmo.grid.CellRange(79, 3, 80, 3),
            new wijmo.grid.CellRange(83, 1, 84, 1), new wijmo.grid.CellRange(83, 3, 84, 3),
            new wijmo.grid.CellRange(88, 1, 88, 1), new wijmo.grid.CellRange(88, 3, 88, 3),
            new wijmo.grid.CellRange(92, 1, 92, 1), new wijmo.grid.CellRange(92, 3, 92, 3),
            new wijmo.grid.CellRange(96, 1, 96, 1), new wijmo.grid.CellRange(96, 3, 96, 3),
            new wijmo.grid.CellRange(100, 1, 100, 1), new wijmo.grid.CellRange(100, 3, 100, 3),
            new wijmo.grid.CellRange(104, 1, 104, 1), new wijmo.grid.CellRange(104, 3, 104, 3),
            new wijmo.grid.CellRange(108, 1, 108, 1), new wijmo.grid.CellRange(108, 4, 108, 4),
            new wijmo.grid.CellRange(112, 1, 112, 1), new wijmo.grid.CellRange(112, 4, 112, 4),
            new wijmo.grid.CellRange(116, 1, 116, 1), new wijmo.grid.CellRange(116, 3, 116, 3),
            new wijmo.grid.CellRange(121, 1, 121, 1), new wijmo.grid.CellRange(121, 3, 121, 3),
            new wijmo.grid.CellRange(125, 1, 125, 1), new wijmo.grid.CellRange(125, 3, 125, 3),
            new wijmo.grid.CellRange(129, 1, 129, 1), new wijmo.grid.CellRange(129, 3, 129, 3),
            new wijmo.grid.CellRange(133, 1, 133, 1), new wijmo.grid.CellRange(133, 3, 133, 3),
            new wijmo.grid.CellRange(137, 1, 137, 1), new wijmo.grid.CellRange(137, 3, 137, 3),
            new wijmo.grid.CellRange(141, 1, 141, 1), new wijmo.grid.CellRange(141, 3, 141, 3),
            new wijmo.grid.CellRange(145, 1, 146, 1),
            new wijmo.grid.CellRange(151, 1, 151, 1), new wijmo.grid.CellRange(151, 3, 151, 3),
            new wijmo.grid.CellRange(155, 1, 155, 1), new wijmo.grid.CellRange(155, 3, 155, 3),
            new wijmo.grid.CellRange(159, 1, 160, 1),
            new wijmo.grid.CellRange(164, 1, 164, 1), new wijmo.grid.CellRange(164, 3, 164, 3),
            new wijmo.grid.CellRange(168, 1, 168, 1), new wijmo.grid.CellRange(168, 3, 168, 3),
            new wijmo.grid.CellRange(172, 1, 173, 1),
            new wijmo.grid.CellRange(177, 1, 177, 1), new wijmo.grid.CellRange(177, 3, 177, 3),
            new wijmo.grid.CellRange(181, 1, 182, 1),
            new wijmo.grid.CellRange(186, 1, 187, 1),
            new wijmo.grid.CellRange(191, 1, 191, 1), new wijmo.grid.CellRange(191, 3, 191, 3),
            new wijmo.grid.CellRange(195, 1, 195, 1), new wijmo.grid.CellRange(195, 3, 195, 3),
            new wijmo.grid.CellRange(199, 1, 199, 1), new wijmo.grid.CellRange(199, 3, 199, 3),
            new wijmo.grid.CellRange(203, 1, 203, 1), new wijmo.grid.CellRange(203, 3, 203, 3),
            new wijmo.grid.CellRange(207, 1, 208, 1),
            new wijmo.grid.CellRange(212, 1, 213, 1),
            new wijmo.grid.CellRange(217, 1, 217, 1), new wijmo.grid.CellRange(217, 3, 217, 3),
            new wijmo.grid.CellRange(221, 1, 221, 1), new wijmo.grid.CellRange(221, 3, 221, 3),
            new wijmo.grid.CellRange(225, 1, 225, 1), new wijmo.grid.CellRange(225, 3, 225, 3),
            new wijmo.grid.CellRange(236, 1, 239, 1),
            new wijmo.grid.CellRange(243, 1, 246, 1),
            new wijmo.grid.CellRange(250, 1, 253, 1),
            new wijmo.grid.CellRange(257, 1, 260, 1),
            new wijmo.grid.CellRange(264, 1, 267, 1),
            new wijmo.grid.CellRange(271, 1, 274, 1),
            new wijmo.grid.CellRange(278, 1, 281, 1),
            new wijmo.grid.CellRange(285, 1, 288, 1),
            new wijmo.grid.CellRange(292, 1, 295, 1),
            new wijmo.grid.CellRange(300, 1, 300, 1), new wijmo.grid.CellRange(300, 3, 300, 3),
            new wijmo.grid.CellRange(304, 1, 304, 1), new wijmo.grid.CellRange(304, 3, 304, 3),
            new wijmo.grid.CellRange(308, 1, 308, 1), new wijmo.grid.CellRange(308, 3, 308, 3),
            new wijmo.grid.CellRange(312, 1, 312, 1), new wijmo.grid.CellRange(312, 3, 312, 3),
            new wijmo.grid.CellRange(317, 1, 317, 1), new wijmo.grid.CellRange(317, 3, 317, 3),
            new wijmo.grid.CellRange(321, 1, 322, 1),
            new wijmo.grid.CellRange(326, 1, 326, 1), new wijmo.grid.CellRange(326, 3, 326, 3),
            new wijmo.grid.CellRange(330, 1, 330, 1), new wijmo.grid.CellRange(330, 3, 330, 3),
            new wijmo.grid.CellRange(334, 1, 334, 1), new wijmo.grid.CellRange(334, 3, 334, 3),
            new wijmo.grid.CellRange(338, 1, 338, 1), new wijmo.grid.CellRange(338, 3, 338, 3),
            new wijmo.grid.CellRange(345, 1, 345, 1), new wijmo.grid.CellRange(345, 3, 345, 3),
            new wijmo.grid.CellRange(349, 1, 350, 1),
            new wijmo.grid.CellRange(354, 1, 355, 1),
            new wijmo.grid.CellRange(359, 1, 360, 1), new wijmo.grid.CellRange(359, 3, 360, 3),
            new wijmo.grid.CellRange(364, 1, 364, 1),
            new wijmo.grid.CellRange(366, 1, 383, 1),
            new wijmo.grid.CellRange(405, 1, 406, 1),
            new wijmo.grid.CellRange(410, 1, 411, 1),
            new wijmo.grid.CellRange(415, 1, 419, 1),
            new wijmo.grid.CellRange(423, 1, 425, 1),
            new wijmo.grid.CellRange(429, 1, 431, 1),
            new wijmo.grid.CellRange(435, 1, 440, 1),
            new wijmo.grid.CellRange(444, 1, 446, 1),
            new wijmo.grid.CellRange(450, 1, 451, 1), new wijmo.grid.CellRange(453, 1, 456, 1),
            new wijmo.grid.CellRange(460, 1, 463, 1),
            new wijmo.grid.CellRange(467, 1, 468, 1), new wijmo.grid.CellRange(483, 1, 486, 1),
            new wijmo.grid.CellRange(491, 1, 496, 1),
            new wijmo.grid.CellRange(500, 1, 504, 1), new wijmo.grid.CellRange(509, 1, 512, 1),
            new wijmo.grid.CellRange(517, 1, 517, 1), new wijmo.grid.CellRange(519, 2, 526, 2), new wijmo.grid.CellRange(527, 1, 528, 1)]);
        flexSheet.applyCellsStyle({
            textAlign: 'center',
            fontWeight: 'bold'
        }, [new wijmo.grid.CellRange(387, 1, 387, 6),
            new wijmo.grid.CellRange(391, 1, 391, 5),
            new wijmo.grid.CellRange(506, 1, 506, 5)]);
        flexSheet.mergeRange(new wijmo.grid.CellRange(0, 0, 0, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(1, 1, 1, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(2, 1, 2, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(5, 1, 5, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(6, 1, 6, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(10, 1, 10, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(11, 1, 11, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(15, 1, 15, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(16, 1, 16, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(20, 1, 20, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(21, 2, 21, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(24, 1, 24, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(25, 1, 25, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(28, 1, 28, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(29, 1, 29, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(32, 0, 32, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(34, 1, 34, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(38, 1, 38, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(42, 1, 42, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(46, 1, 46, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(50, 1, 50, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(54, 1, 54, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(58, 1, 58, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(62, 1, 62, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(66, 1, 66, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(70, 1, 70, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(74, 1, 74, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(78, 1, 78, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(82, 1, 82, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(87, 1, 87, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(91, 1, 91, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(95, 1, 95, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(99, 1, 99, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(103, 1, 103, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(106, 1, 106, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(107, 1, 107, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(108, 2, 108, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(110, 1, 110, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(111, 1, 111, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(112, 2, 112, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(115, 1, 115, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(118, 0, 118, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(119, 1, 119, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(120, 1, 120, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(124, 1, 124, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(128, 1, 128, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(132, 1, 132, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(136, 1, 136, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(140, 1, 140, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(144, 1, 144, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(145, 2, 145, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(148, 0, 148, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(150, 1, 150, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(154, 1, 154, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(157, 1, 157, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(158, 1, 158, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(159, 2, 159, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(163, 1, 163, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(167, 1, 167, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(171, 1, 171, 6));
        flexSheet.mergeRange(new wijmo.grid.CellRange(172, 2, 172, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(176, 1, 176, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(180, 1, 180, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(181, 2, 181, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(185, 1, 185, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(186, 2, 186, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(190, 1, 190, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(194, 1, 194, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(198, 1, 198, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(202, 1, 202, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(206, 1, 206, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(207, 2, 207, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(210, 1, 210, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(211, 1, 211, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(212, 2, 212, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(216, 1, 216, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(220, 1, 220, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(224, 1, 224, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(227, 0, 227, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(235, 1, 235, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(236, 2, 236, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(238, 2, 238, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(242, 1, 242, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(243, 2, 243, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(245, 2, 245, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(249, 1, 249, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(250, 2, 250, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(252, 2, 252, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(256, 1, 256, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(257, 2, 257, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(259, 2, 259, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(263, 1, 263, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(266, 2, 266, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(270, 1, 270, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(271, 2, 271, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(273, 2, 273, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(277, 1, 277, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(278, 2, 278, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(280, 2, 280, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(284, 1, 284, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(285, 2, 285, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(287, 2, 287, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(291, 1, 291, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(292, 2, 292, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(294, 2, 294, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(297, 0, 297, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(299, 1, 299, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(300, 4, 300, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(303, 1, 303, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(307, 1, 307, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(311, 1, 311, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(314, 0, 314, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(315, 1, 315, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(316, 1, 316, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(317, 4, 317, 6));
        flexSheet.mergeRange(new wijmo.grid.CellRange(320, 1, 320, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(321, 2, 321, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(325, 1, 325, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(329, 1, 329, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(333, 1, 333, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(337, 1, 337, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(341, 0, 341, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(342, 0, 342, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(344, 1, 344, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(348, 1, 348, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(349, 2, 349, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(353, 1, 353, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(354, 2, 354, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(358, 1, 358, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(363, 1, 363, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(364, 2, 364, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(365, 1, 365, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(366, 2, 366, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(367, 2, 367, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(368, 2, 368, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(369, 2, 369, 8));
        flexSheet.mergeRange(new wijmo.grid.CellRange(370, 2, 370, 8));
        flexSheet.mergeRange(new wijmo.grid.CellRange(371, 2, 371, 7));
        flexSheet.mergeRange(new wijmo.grid.CellRange(372, 2, 372, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(374, 2, 374, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(376, 2, 376, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(378, 2, 378, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(380, 2, 380, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(382, 2, 382, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(385, 0, 385, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(404, 1, 404, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(405, 2, 405, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(408, 1, 408, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(409, 1, 409, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(410, 2, 410, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(414, 1, 414, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(415, 2, 415, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(416, 2, 416, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(418, 2, 418, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(422, 1, 422, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(423, 2, 423, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(424, 2, 424, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(428, 1, 428, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(429, 2, 429, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(430, 2, 430, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(434, 1, 434, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(435, 2, 435, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(436, 2, 436, 7));
        flexSheet.mergeRange(new wijmo.grid.CellRange(437, 2, 437, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(439, 2, 439, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(443, 1, 443, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(444, 2, 444, 6));
        flexSheet.mergeRange(new wijmo.grid.CellRange(445, 2, 445, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(449, 1, 449, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(450, 2, 450, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(451, 2, 451, 7));
        flexSheet.mergeRange(new wijmo.grid.CellRange(452, 2, 452, 7));
        flexSheet.mergeRange(new wijmo.grid.CellRange(453, 2, 453, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(455, 2, 455, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(459, 1, 459, 2));
        flexSheet.mergeRange(new wijmo.grid.CellRange(460, 2, 460, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(462, 2, 462, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(466, 1, 466, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(467, 2, 467, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(468, 2, 468, 6));
        flexSheet.mergeRange(new wijmo.grid.CellRange(469, 2, 469, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(470, 2, 470, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(470, 4, 470, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(471, 2, 471, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(471, 4, 471, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(483, 2, 483, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(485, 2, 485, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(488, 0, 488, 1));
        flexSheet.mergeRange(new wijmo.grid.CellRange(490, 1, 490, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(491, 2, 491, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(492, 2, 492, 7));
        flexSheet.mergeRange(new wijmo.grid.CellRange(493, 2, 493, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(495, 2, 495, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(499, 1, 499, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(500, 2, 500, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(501, 2, 501, 9));
        flexSheet.mergeRange(new wijmo.grid.CellRange(502, 2, 502, 11));
        flexSheet.mergeRange(new wijmo.grid.CellRange(503, 2, 503, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(504, 2, 504, 9));
        flexSheet.mergeRange(new wijmo.grid.CellRange(509, 2, 509, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(511, 2, 511, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(516, 1, 516, 3));
        flexSheet.mergeRange(new wijmo.grid.CellRange(517, 2, 517, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(518, 1, 518, 4));
        flexSheet.mergeRange(new wijmo.grid.CellRange(519, 3, 519, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(520, 3, 520, 7));
        flexSheet.mergeRange(new wijmo.grid.CellRange(521, 3, 521, 6));
        flexSheet.mergeRange(new wijmo.grid.CellRange(522, 3, 522, 7));
        flexSheet.mergeRange(new wijmo.grid.CellRange(523, 3, 523, 6));
        flexSheet.mergeRange(new wijmo.grid.CellRange(524, 3, 524, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(525, 3, 525, 5));
        flexSheet.mergeRange(new wijmo.grid.CellRange(526, 3, 526, 7));
        flexSheet.mergeRange(new wijmo.grid.CellRange(527, 2, 527, 3));
    }

    $scope.showalert = function () {
        $scope.savesuccess = true;
        $timeout(function () {
            $scope.savesuccess = false;
        }, 3000);
    };

    $rootScope.downloadpdf1120 = function () {
        var link = window.document.createElement("a");
        link.download = "FORM_1120-IC-DISC_2_230_1.pdf";
        link.href = "../Test/Pdfs/FORM_1120-IC-DISC_2_230_1_(2)_(2).pdf";
        link.click();
    }

});