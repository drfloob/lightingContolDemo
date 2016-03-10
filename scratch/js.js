/* ******************** SVG Interaction ******************** */
var svg;
function getSVG() {
    if (svg) return svg;
    return svg = document.getElementById('roomsvg').getSVGDocument();
}

function getLights() {
    return getSVG().getElementById('lights').children;
}

function getLightsStatusText() {
    return getSVG().querySelector("[name='lights-status-overlay']").children;
}

function getWindows() {
    return getSVG().getElementById('windows').querySelectorAll('polygon');
}

/* utility functions */
function _applyLightOpacities(opac) {
    _.each(_.zip(getLights(), opac, getLightsStatusText()), function(e) {
	e[0].setAttribute('fill-opacity', e[1]);
	e[2].innerHTML = e[1]*100 + '%';
    });
}

/* lighting preset functions */
function lightsOff() {
    _.each(_.zip(getLights(), getLightsStatusText()), function(e, i) {
	e[0].setAttribute('fill-opacity', '0');
	e[1].innerHTML = '0%';
    });
}

function lightsOn() {
    _.each(_.zip(getLights(), getLightsStatusText()), function(e, i) {
	e[0].setAttribute('fill-opacity', '1');
	e[1].innerHTML = '100%';
    });
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
    _.each(getWindows(), function(e) {
    	console.log(pct, e);
    	e.setAttribute('fill-opacity', pct);
    });
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
    offColor: 'danger',
    onSwitchChange: function(event, isOn) {
	if(isOn) {
	    console.log('ToDo: harvesting on');
	} else {
	    console.log('ToDo: harvesting off');
	}
    }
});

$("input[name='label-overlay-checkbox']").bootstrapSwitch({
    onSwitchChange: function(event, isOn) {
	toggleLabelsOverlay(isOn);
    }
});

$("input[name='light-status-overlay-checkbox']").bootstrapSwitch({
    onSwitchChange: function(event, isOn) {
	toggleLightStatusOverlay(isOn);
    }
});

$(document).ready(function() {
    setTimeout(function() {
	$("input[name='light-status-overlay-checkbox']").bootstrapSwitch('toggleState');
	$("input[name='label-overlay-checkbox']").bootstrapSwitch('toggleState');
    }, 1500);
});
