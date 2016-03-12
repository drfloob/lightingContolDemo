/* ******************** Globals, yuck ******************** */

var daylightHarvesting = false;
var daylightHarvestingSetting = 0.7;
var baseLightsSetting = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var windowsLightSetting = 0.8;

/* ******************** SVG Interaction ******************** */
var svg;
function getSVG() {
    if (svg) return svg;
    return svg = document.getElementById('roomsvg').getSVGDocument();
}

function getLights() {
    return getSVG().getElementById('lights').children;
}

function getLightsStatusTextNodes() {
    return getSVG().querySelector("[name='lights-status-overlay']").children;
}

function getLightStatesArray() {
    return _.map(getLights(), function(n) {
	return n.getAttribute('fill-opacity');
    });
}

function getWindows() {
    return getSVG().getElementById('windows').querySelectorAll('polygon');
}

/* utility functions */
function _applyLightOpacities(opac) {
    baseLightsSetting = opac;
    _.each(_.zip(getLights(), opac, getLightsStatusTextNodes()), function(e, i) {
	pct = e[1];
	if (i < 6 && daylightHarvesting) {
	    pct -= pct * daylightHarvestingSetting * windowsLightSetting;
	}
	e[0].setAttribute('fill-opacity', pct);
	e[2].innerHTML = (pct*100).toFixed(0) + '%';
    });
}

/* lighting preset functions */
function lightsOff() {
    _applyLightOpacities([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
}

function lightsOn() {
    _applyLightOpacities([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
}

function lightsForWhiteboard() {
    rowOpacities = [1, 0.3, 0.3, 0.3, 0.10, 0.10];
    rowOpacities = rowOpacities.concat(rowOpacities, rowOpacities);
    _applyLightOpacities(rowOpacities);
}

function lightsForVideo() {
    rowOpacities = [0.3, 0.3, 0.3, 0.3, 0.3, 0.3];
    rowOpacities = rowOpacities.concat(rowOpacities, [0,0,0,0,0,0]);
    _applyLightOpacities(rowOpacities);
}

function lightsForGroupArea() {
    rowOpacities = [0.10, 0.10, 0.10, 0.20, 0.70, 0.90];
    rowOpacities = rowOpacities.concat(rowOpacities, rowOpacities);
    _applyLightOpacities(rowOpacities);
}

/* window control */
var setDaylight = $.throttle(333, function(pct) {
    if (pct.hasOwnProperty('newValue'))
	pct=pct.newValue;
    windowsLightSetting = pct;
    _.each(getWindows(), function(e) {
    	e.setAttribute('fill-opacity', pct);
    });
    _applyLightOpacities(baseLightsSetting);
});


/* overlay control */
function toggleLabelsOverlay(setOn) {
    var pct = setOn ? 1 : 0;
    getSVG().querySelector("[name='labels-overlay']").setAttribute('opacity', pct);
}

function toggleLightStatusOverlay(setOn) {
    var pct = setOn ? 1 : 0;
    getSVG().querySelector("[name='lights-status-overlay']").setAttribute('opacity', pct);
}

/* harvesting */
function toggleHarvesting(isOn) {
    daylightHarvesting = isOn;
    _applyLightOpacities(baseLightsSetting);
}

/* ******************** SLIDER ******************** */
$('#windowSlider').slider({
    formatter: function (val) {
	switch(val) {
	case 0: return "Pitch black / close the blinds"; break;
	case 0.2: return "Street lights"; break;
	case 0.4: return "Evening"; break;
	case 0.6: return "Cloudy day"; break;
	case 0.8: return "Bright morning light"; break;
	case 1: return "Midday"; break;
	default: return "hwat?";
	}
    }})
    .on('slide', function(event) {
	setDaylight(event.value);
    })
    .on('change', function(event) {
	setDaylight(event.value);
    });


$("input[name='light-harvesting-checkbox']").bootstrapSwitch({
    state: false,
    onSwitchChange: function(event, isOn) {
	toggleHarvesting(isOn);
    }
});

$("input[name='label-overlay-checkbox']").bootstrapSwitch({
    state: true,
    onSwitchChange: function(event, isOn) {
	toggleLabelsOverlay(isOn);
    }
});

$("input[name='light-status-overlay-checkbox']").bootstrapSwitch({
    state: true,
    onSwitchChange: function(event, isOn) {
	toggleLightStatusOverlay(isOn);
    }
});

$(document).ready(function() {
    setTimeout(function() {
	$("input[name='light-status-overlay-checkbox']").bootstrapSwitch('toggleState');
	$("input[name='label-overlay-checkbox']").bootstrapSwitch('toggleState');
    }, 1500);

    // affix bug hack
    $('#svgDivSpaceWrapper').height($('#svgDiv').height());

    var md = new MobileDetect(window.navigator.userAgent);
    var uap = new UAParser();
    
    if (md.mobile()) {
	$("#mobileModal").modal();
    } else if (_.indexOf(['Chrome', 'Chromium', 'Firefox'], uap.getBrowser().name) == -1) {
	$("#untestedBrowserModal").modal();
    }
});


