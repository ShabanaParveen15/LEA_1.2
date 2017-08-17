GLET.controller('HierarchyController', function HierarchyController($scope, constant, $window, $rootScope, localStorageService, sessionService, $location, $anchorScroll, $routeParams, simpleFactory, PanZoomService, $timeout, appSetting) {
    $('#warrper').hide();
    $('#footer').hide();

    $('#contentcontainer').removeClass('view-fixer');
    $('#contentcontainer').removeClass('continer-padding');
    $timeout(function () {
        var window1 = {
            x: 0,
            y: 0,
            width: $("svg").width(),
            height: $("svg").height()
        };

        PanZoomService.getAPI('PanZoom').then(function (api) {
            api.zoomToFit(window1);
        });



    })


});
var itemdata, itemid, legalentities, period, jurisdictions;
GLET.controller('PrimitiveController', ['$scope', '$rootScope', 'appSetting', '$window', 'sessionService', '$anchorScroll', '$location', '$timeout', 'PanZoomService', '$http', 'constant',
                              function ($scope, $rootScope, appSetting, $window, sessionService, $anchorScroll, $location, $timeout, PanZoomService, $http, constant) {
    $scope.index = 10;
    //console.log(JSON.stringify(itemdata))
    // alert(JSON.stringify($rootScope));

    $scope.searchbypercentage = function () {
        $("#searchtxt2").animate({
            width: 'toggle'
        }, "slow")
      
        $("#searchtxt_btn").animate({
            width: 'toggle'
        }, "slow")
    }
    $scope.downloadxml = function () {
        var x2js = new X2JS();
        var xmljson = {
            "LE": {
                "leStatus": "Active",
                "leType": "USCORP (1120)",
                "leJurisdiction": "United States (US)",
                "incorporatedDate": "15-Jan-2015",
                "owned": "0%",
                "subsidiaries":
                    {
                        "LE":[
                          { "leStatus": "Active", "leType": "DRE (8858)", "leJurisdiction": "Netherlands (NL)", "incorporatedDate": "15-Jan-2015", "owned": "100%", "subsidiaries": "null", "_id": "375", "_name": "Contrarian European Fund LP" },
                        
                            { "leStatus": "Active", "leType": "DRE (8858)", "leJurisdiction": "Russia(RU)", "incorporatedDate": "15-Jan-2015", "owned": "100%", "subsidiaries": "null", "_id": "352", "_name": "HighVista Strategies LLC" },
                        
                            { "leStatus": "Active", "leType": "DRE (8858)", "leJurisdiction": "Japan(JP)", "incorporatedDate": "15-Jan-2015", "owned": "100%", "subsidiaries": "null", "_id": "312", "_name": "Contrarian European Fund LP" }]
                    },
                "_id": "387",
                "_name": "JCK Partners Opportunities Fund LP"
            }
        };

        var filename = "IRS-851.xml";
        var pom = document.createElement('a');
        var bb = new Blob([x2js.json2xml_str(xmljson)], { type: 'text/plain' });

        pom.setAttribute('href', window.URL.createObjectURL(bb));
        pom.setAttribute('download', filename);

        pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');


        pom.click();
    }
    $scope.ImageExport = function () {
        var hierarchy = $("#hierarchy");
        var svg = "<svg id='screenshot' xmlns='http://www.w3.org/2000/svg' style='background-color:white' width='" + $('svg').width() + "' height='" + $('svg').height() + "' style='overflow: visible !important;'>" +
"<foreignObject width='100%' height='100%' style='-moz-box-sizing: border-box; box-sizing: border-box;overflow: visible !important;' xmlns='http://www.w3.org/1999/xhtml'>" + hierarchy[0].innerHTML + "<svg id='ovals' xmlns='http://www.w3.org/2000/svg' width='" + $('svg').width() + "' height='" + $('svg').height() + "'></svg></foreignObject>" + "</svg>";
        var win = window.open("Rendering...", '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=-100000000, top=-100000000, width=1, height=1, visible=none', '');
        win.blur();
        window.focus();
        win.resizeTo(0, 0);
        win.moveTo(0, window.screen.availHeight + 100);
        win.document.body.innerHTML = svg;
        win.document.write('<html><head>    <script src="assets/global/plugins/jquery.min.js" type="text/javascript"></script><script src="assets/global/plugins/hierarchy tools/html2canvas.js"></script>    <script src="assets/global/plugins/hierarchy tools/rgbcolor.js"></script><script src="assets/global/plugins/hierarchy tools/StackBlur.js"></script><script src="assets/global/plugins/hierarchy tools/canvg.min.js"></script>' + $('head').html() + '</head><body >');
        win.document.write(svg);
        win.document.write('<script src="js/imageexporter.js"></script></body></html>');

    }
    $scope.search = function () {
        $('#searchtxt2 option:first-child').attr("selected", "selected");
        $scope.percentage = "";
        if ($('#searchjuris').css('display') != 'none') {
            $scope.jurisdiction = undefined;
            $scope.searchbyjuris();
        }
        $("#searchtxt").animate({
            width: 'toggle'
        }, "slow")
    }

    $scope.searchbyjuris = function () {
        $('#searchtxt2 option:first-child').attr("selected", "selected");
        $scope.percentage = "";

        if ($('#searchtxt').css('display') != 'none') {
            $scope.LEName = undefined;
            $scope.search();
        }
        $("#searchjuris").animate({
            width: 'toggle'
        }, "slow")
    }

    $scope.LeDropdown = legalentities;
    $scope.jurisdictions = jurisdictions;
    $scope.apiURL = constant;
  

    //Comment : Filter by name and Percentages
        $scope.newHierarchy = function (type) {

        if (type!=undefined)
         $scope.type = type;

        var Url;
        if ($scope.type == 2) {
                      // Jurisdiction
            Url = appSetting.ServerPath + "apiGet/HierarchyTool/GetHierarchyChartByJuris?lE_ID=" + $scope.jurisdiction.lE_ID + "&PeriodId=" + period + "&Percentage=" + $scope.percentage;
            $scope.leNew = $scope.jurisdiction.LE_ID;
        }
        else {
            // LE Name
            if ($scope.LEName == undefined) {
                Url = appSetting.ServerPath + "apiget/hierarchytool/gethierarchychart?le_id=" + itemid + "&periodid=" + period + "&Percentage=" + $scope.percentage;
                $scope.leNew = itemid;
            } else {
                Url = appSetting.ServerPath + "apiget/hierarchytool/gethierarchychart?le_id=" + $scope.LEName.LE_ID + "&periodid=" + period + "&Percentage=" + $scope.percentage;
                $scope.leNew = $scope.LEName.LE_ID;
            }

        }

       
            $http.get(Url)
         .then(function (re) {

             itemdata = re.data;
             itemid = $scope.leNew;
             newItems = itemdata["nodes"];

             var ann = itemdata["edges"];
             var annotations = [];
             for (var an in ann) {
                 annotations.push(new primitives.famdiagram.LabelAnnotationConfig(ann[an]));
             }

             jQuery("#hierarchy").famDiagram({
                 items: newItems,
                 annotations: annotations
             });
             jQuery("#hierarchy").famDiagram("update", /*Refresh: use fast refresh to update chart*/ primitives.common.UpdateMode.Refresh);
             
             if ($("svg").width() < $(".pan-zoom-frame").width()) {
                 $('.pan-element').css('left', '40%');
             }
             $scope.zoomToFit();
             $timeout(function () {
                 for (var item in newItems) {
                     $('.oval').css("background-color", "#DAF7A6");
                     if (newItems[item].id == itemid) {

                         newItems[item].itemTitleColor = "#56564E";
                         $('.modal-title').html("Hierarchy View - " + newItems[item].title + " - " + $('.input-block-level option:selected').text());
                         $('#' + itemid).css("background-color", " #FFA494");
                     }
                 }
             })
             
         })
      
         
    }

        $scope.pdf = function () {
            var link = window.document.createElement("a");
            link.download = "esd.pdf";

            if ($scope.LEName == undefined) {
                $scope.leNew = itemid;
                link.href = $scope.apiURL + "apiGet/PDF/GetPDFByLEID?LeId=" + $scope.leNew + "&PeriodId=" + period;
            } else {
                $scope.leNew = $scope.LEName.LE_ID;
                link.href = $scope.apiURL + "apiGet/PDF/GetPDFByLEID?LeId=" + $scope.leNew + "&PeriodId=" + period;
            }
            link.click();
        }

    $scope.panzoomConfig = {
        panOnClickDrag: false,
        zoomLevels: 12,
        neutralZoomLevel: 5,
        scalePerZoomLevel: 1.5,
        chromeUseTransform: true,
        invertMouseWheel: true
    };
    $scope.print = function (divName) {
        window.print();
    }


    // The panzoom model should initialle be empty; it is initialized by the <panzoom>
    // directive. It can be used to read the current state of pan and zoom. Also, it will
    // contain methods for manipulating this state.
    $scope.panzoomModel = {};

    var noda = itemdata["nodes"];
    $scope.Message = "";

    $scope.$on('$locationChangeStart', function (ev) {
        ev.preventDefault();
    });

    var options = {};

   


    $scope.zoomToFit = function () {
        var window = {
            x: 0,
            y: 0,
            width: $("svg").width(),
            height: $("svg").height()
        };

        PanZoomService.getAPI('PanZoom').then(function (api) {
            api.zoomToFit(window);
        });

    }

    options.items = noda;
   
    $timeout(function () {
        for (var item in noda) {
            if (noda[item].id == itemid) {

             
                noda[item].itemTitleColor = "#56564E";
                $('.modal-title').html("Hierarchy View - " + noda[item].title + " - " + $('.input-block-level option:selected').text());
                $('#' + itemid).css("background-color", " #FFA494");
                $('#' + itemid).addClass('selected');
              //  gotoSearched(itemid);
            }
            if (noda[item].leType == "DRE (8858)") {
                var id = '#' + noda[item].id;
                $(id).addClass('oval');
                $(id + " .colorband").remove();
            }

            if (noda[item].leType == "10/50 (5471)") {
                var id = '#' + noda[item].id;
                var node = $(id)
                $(id).css('border', 'none');
               $(id).addClass('triangle');
               $(node[0].childNodes[0]).addClass('t-flag');
               $(node[0].childNodes[1]).addClass('t-node');
               $(node[0].childNodes[0]).removeClass('nodetext');


                $(id + " .colorband").remove();
            }
        }
    })

    
    $timeout(function () {
        $('.calloutplaceholder').remove();
        $scope.zoomToFit();
        var modal = $('.modal-dialog');
        $(modal[0]).css('height', $(window).height() * 0.8 + 'px');
        //$('#hierarchy').width($('svg').width());
        //$('#hierarchy').height($('svg').height());

        if ($("svg").width() < $(".pan-zoom-frame").width()) {

            $('.pan-element').css('left', '40%');

        }

    })

    // var ann = [{ "fromItem": 352, "toItems": [386], "title": "100%" }, { "fromItem": 352, "toItems": [483], "title": "2.61%" }, { "fromItem": 386, "toItems": [483], "title": "12.39%" }, { "fromItem": 483, "toItems": [424], "title": "100%" }];
    var ann = itemdata["edges"];
    var annotations = [];
    for (var an in ann) {
        annotations.push(new primitives.famdiagram.LabelAnnotationConfig(ann[an]));
    }

    options.annotations = annotations;
    options.cursorItem = 0;
    options.highlightItem = 0;
    options.showLabel = primitives.common.Enabled.False;
    options.showLabels = primitives.common.Enabled.False;

    options.showCallout = primitives.common.Enabled.False;
    // options.graphics = primitives.common.GraphicsType.Canvas;
    options.pageFitMode = primitives.common.PageFitMode.None;
    options.hasSelectorCheckbox = primitives.common.Enabled.False;
    options.templates = [getContactTemplate()];
    options.defaultTemplateName = "contactTemplate";
    options.highlightBorderWidth = 0;
    $scope.myOptions = options;

    $scope.setCursorItem = function (item) {
        $scope.myOptions.cursorItem = item;
    };

    //$scope.setHighlightItem = function (item) {
    //    $scope.myOptions.highlightItem = item;
    //};

    $scope.deleteItem = function (index) {
        $scope.myOptions.items.splice(index, 1);
    }

    $scope.addItem = function (index, parent) {
        var id = $scope.index++;
        $scope.myOptions.items.splice(index, 0, new primitives.famdiagram.ItemConfig({
            id: id,
            parent: parent,
            title: "New title " + id,
            description: "New description " + id,
            image: "demo/images/photos/b.png"
        }));
    }

    $scope.onMyCursorChanged = function () {
        $scope.Message = "onMyCursorChanged";
        //alert("sadas")
    }

    //$scope.onMyHighlightChanged = function () {
    //    $scope.Message = "onMyHighlightChanged";
    //   // alert($('#'+options.highlightItem).val());
    //}

    function getContactTemplate() {
        var result = new primitives.famdiagram.TemplateConfig();
        result.name = "contactTemplate";

        result.itemSize = new primitives.common.Size(200, 100);
        result.minimizedItemSize = new primitives.common.Size(5, 5);
        result.minimizedItemCornerRadius = 5;
        result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);

        if ($('html').hasClass('ie9'))

            var itemTemplate = jQuery(
              '<div class="bp-item bp-corner-all bt-item-frame"   >'
                + '<div name="titleBackground" id="{{itemConfig.id}}" class="bp-item bp-title-frame bp-title"  style="width: inherit;height:inherit; "><div popover-append-to-body="true" uib-popover-template="Popover.templateUrl" popover-placement="right" popover-trigger="mouseenter" ng-mouseover="bindPopup($event)"   style="width: 95%; height: 50px; display: table;"><div style="vertical-align: middle; display: table-cell;"><div class="flag flag-{{itemConfig.leJurisdiction| parseJur  }}" style="margin-left: 10px;"></div><div ng-bind="itemConfig.title"></div></div></div><div class="colorband" ng-style="{\'background-color\': itemConfig.itemTitleColor};    " style="margin-top:-50px;"></div>'
                + '</div>'

               + '</div>'
            ).addClass("bp-item bp-corner-all bt-item-frame");
        else
            var itemTemplate = jQuery(
      '<div class="bp-item bp-corner-all bt-item-frame" >'
        + '<div name="titleBackground" id="{{itemConfig.id}}" popover-append-to-body="true" uib-popover-template="Popover.templateUrl" popover-placement="right" popover-trigger="mouseenter"  class="bp-item bp-title-frame bp-title" ng-mouseover="bindPopup($event)" style="width: inherit;height:inherit;    display: flex;align-items: center;"><div class="flag flag-{{itemConfig.leJurisdiction| parseJur  }}" style="margin-left: 10px;"></div><div ng-bind="itemConfig.title" class="nodetext"></div><div class="colorband" ng-style="{\'background-color\': itemConfig.itemTitleColor};"></div>'
        + '</div>'

       + '</div>'
    ).addClass("bp-item bp-corner-all bt-item-frame");

        result.itemTemplate = itemTemplate.wrap('<div>').parent().html();
        //result.highlightTemplate = itemTemplate.wrap('<div>').parent().html();
        result.cursorBorderWidth = 0;
        result.highlightBorderWidth = 0;
        result.highlightPadding = 0;

        return result;
    }

}]);
angular.module('BasicPrimitives', [], function ($compileProvider) {
    $compileProvider.directive('bpFamDiagram', function ($compile) {
        function link(scope, element, attrs) {
            var itemScopes = [];
            var noda = itemdata["nodes"];
            var config = new primitives.famdiagram.Config();
            angular.extend(config, scope.options);
            config.onItemRender = onTemplateRender;
            //config.onCursorChanged = onCursorChanged;
            //config.onHighlightChanged = onHighlightChanged;
            scope.Popover = {
                templateUrl: 'myPopoverTemplate.html',
                title: "",
                leStatus: "",
                leType: "",
                leJurisdiction: "",
                incorporatedDate: "",
            };
            scope.bindPopup = function (event) {
                if ($('html').hasClass('ie9'))
                    var id = event.target.parentNode.parentNode.id;

                else
                    var id = event.target.id;

                for (var item in noda) {

                    if (noda[item].id == id) {
                        scope.Popover.title = noda[item].title;
                        scope.Popover.leType = noda[item].leType;
                        scope.Popover.leStatus = noda[item].leStatus;
                        scope.Popover.leJurisdiction = noda[item].leJurisdiction;
                        scope.Popover.incorporatedDate = noda[item].incorporatedDate;

                    }
                }
                //$('.popover-content').width($('#popuptable').width());
            }
            var chart = jQuery(element).famDiagram(config);

            scope.$watch('options.highlightItem', function (newValue, oldValue) {
                var highlightItem = chart.famDiagram("option", "highlightItem");
                //alert(highlightItem);
                if (highlightItem != newValue) {
                    // chart.famDiagram("option", { highlightItem: newValue });
                    //chart.famDiagram("update", primitives.common.UpdateMode.PositonHighlight);
                }
            });

            scope.$watch('options.cursorItem', function (newValue, oldValue) {
                var cursorItem = chart.famDiagram("option", "cursorItem");
                if (cursorItem != newValue) {
                    chart.famDiagram("option", { cursorItem: newValue });
                    chart.famDiagram("update", primitives.common.UpdateMode.Refresh);
                }
            });

            scope.$watchCollection('options.items', function (items) {
                chart.famDiagram("option", { items: items });
                chart.famDiagram("update", primitives.common.UpdateMode.Refresh);
            });

            function onTemplateRender(event, data) {
                var itemConfig = data.context;

                switch (data.renderingMode) {
                    case primitives.common.RenderingMode.Create:
                        /* Initialize widgets here */
                        var itemScope = scope.$new();
                        itemScope.itemConfig = itemConfig;
                        $compile(data.element.contents())(itemScope);
                        if (!scope.$parent.$$phase) {
                            itemScope.$apply();
                        }
                        itemScopes.push(itemScope);
                        break;
                    case primitives.common.RenderingMode.Update:
                        /* Update widgets here */
                        var itemScope = data.element.contents().scope();
                        itemScope.itemConfig = itemConfig;
                        break;
                }
            }

            function onButtonClick(e, data) {
                scope.onButtonClick();
                scope.$apply();
            }

            function onCursorChanged(e, data) {
                //scope.options.cursorItem = data.context ? data.context.id : null;
                //scope.onCursorChanged();
                //scope.$apply();
            }

            function onHighlightChanged(e, data) {
                //scope.options.highlightItem = data.context ? data.context.id : null;
                //scope.onHighlightChanged();
                //scope.$apply();
            }

            //element.on('$destroy', function () {
            //    /* destroy items scopes */
            //    for (var index = 0; index < scopes.length; index++) {
            //        itemScopes[index].$destroy();
            //    }

            //    /* destory jQuery UI widget instance */
            //    chart.remove();
            //});
        };

        return {
            scope: {
                options: '=options',
                //onCursorChanged: '&onCursorChanged',
                //onHighlightChanged: '&onHighlightChanged',
            },
            link: link
        };
    });
});