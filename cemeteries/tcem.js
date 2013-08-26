  var tl;
  function onLoad() {
    var eventSource = new Timeline.DefaultEventSource(0);
    
    var theme = Timeline.ClassicTheme.create();
    theme.event.bubble.width = 620;
    theme.event.bubble.height = 570;
    theme.ether.backgroundColors[1] = theme.ether.backgroundColors[0];
    var d = Timeline.DateTime.parseGregorianDateTime(cdate)
    var topBandHeight = 40;
		var bandInfos = [
			Timeline.createBandInfo({
				width:          "" + topBandHeight, 
				intervalUnit:   Timeline.DateTime.DECADE, 
				intervalPixels: 50,
				eventSource:    eventSource,
				showEventText:  false,
				date:           d,
				theme:          theme
			}),
			Timeline.createBandInfo({
				width:          "" + (dataBandHeight - topBandHeight), 
				intervalUnit:   Timeline.DateTime.YEAR, 
				intervalPixels: 125,
				date:           d,
				eventSource:    eventSource,
				showEventText:  true,
				theme:          theme
			})
		];    

    bandInfos[0].syncWith = 1;

    bandInfos[0].highlight = false;
    
    tl = Timeline.create(document.getElementById("tl"), bandInfos, Timeline.HORIZONTAL);
    tl.loadJSON(file+".js", function(json, url) {
        eventSource.loadJSON(json, url);
    });
}
var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}

function leap( date )
{
   tl.getBand( 1 ).setCenterVisibleDate( Timeline.DateTime.parseIso8601DateTime( date + '31T12:00:00Z' ) );
}