//alert("sfd");
var svgElements = $('#screenshot svg');

var ovals = $('.oval');
var x , y;
//alert("testovals");
function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}



$.each(ovals, function (index, value) {
    var bodyRect = document.body.getBoundingClientRect(),
    elemRect = value.getBoundingClientRect(),
    x = elemRect.top - bodyRect.top;
    y = elemRect.left - bodyRect.left;    /* border: ; */
    $(value).addClass('noborder');
    if ($(value).hasClass('selected')) {
        $(value).css("background-color", "transparent");
        var circle = makeSVG('ellipse', { cx: y + 100, cy: x + 50, rx: 100, ry: 50, stroke: 'red', 'stroke-width': 1, fill: '#FFA494' });
      //  alert('selected');

    }
    else {
                $(value).css("background-color", "transparent");

        var circle = makeSVG('ellipse', { cx: y + 100, cy: x + 50, rx: 100, ry: 50, stroke: 'red', 'stroke-width': 1, fill: '#DAF7A6' });
    }

    document.getElementById('ovals').appendChild(circle);
   // y += 30;
})
//replace all svgs with a temp canvas
svgElements.each(function () {
    var canvas, xml;

    canvas = document.createElement("canvas");
    canvas.className = "screenShotTempCanvas";
    //convert SVG into a XML string
    xml = (new XMLSerializer()).serializeToString(this);

    // Removing the name space as IE throws an error
    xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');

    //draw the SVG onto a canvas
    canvg(canvas, xml);
    $(canvas).insertAfter(this);
    //hide the SVG element
    this.className = "tempHide";
    //  $(this).hide();
});
$('#ovals').hide();
    html2canvas($('body'), {
        onrendered: function (canvas) {
            var imageData = canvas.toDataURL("image/png");
            // Now browser starts downloading it instead of just showing it
            var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
            var link = window.opener.document.createElement("a");
            link.download = "hierarchy.png";
            link.href = imageData;
            link.click();
            window.close();
        }
    });
