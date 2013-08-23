var tl;
function onLoad() {
    var eventSource = new Timeline.DefaultEventSource(0);
    
    var theme = Timeline.ClassicTheme.create();
//	theme.event.label.width = 70; // px
    theme.event.bubble.width = 320;
    theme.event.bubble.height = 220;
    theme.ether.backgroundColors[1] = theme.ether.backgroundColors[0];
    var d = Timeline.DateTime.parseGregorianDateTime(cdate)
		var bandInfos = [
			Timeline.createBandInfo({
				width:          "20%", 
				intervalUnit:   Timeline.DateTime.DECADE, 
				intervalPixels: 80,
				date:           d,
				showEventText:  false,
				theme:          theme
			}),
			Timeline.createBandInfo({
				width:          "80%", 
				intervalUnit:   Timeline.DateTime.DECADE, 
				intervalPixels: 80,
				eventSource:    eventSource,
				date:           d,
				theme:          theme
			})
		];    
		bandInfos[0].etherPainter = new Timeline.YearCountEtherPainter({
        startDate:  bdate,
        multiple:   5,
        theme:      theme
    });
    bandInfos[0].syncWith = 1;
    bandInfos[0].highlight = false;
    bandInfos[0].decorators = [
        new Timeline.SpanHighlightDecorator({
            startDate:  bdate,
            endDate:    ddate,
            startLabel: "birth",
            endLabel:   "death",
            color:      "#FFC080",
            opacity:    50,
            theme:      theme
        })
    ];
    
    tl = Timeline.create(document.getElementById("tl"), bandInfos, Timeline.HORIZONTAL);
    tl.loadJSON(jfile+".js", function(json, url) {
        eventSource.loadJSON(json, url);

//            tl.loadXML(jfile+".xml", function(xml, url) {
//                eventSource.loadXML(xml, url);
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