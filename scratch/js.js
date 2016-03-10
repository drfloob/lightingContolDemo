/* ******************** SVG Interaction ******************** */
var svg;
function getSVG() {
    if (svg) return svg;
    return svg = document.getElementById('roomsvg').getSVGDocument();
}

function getLights() {
    return getSVG().getElementById('lights').children;
}

function getWindows() {
    return getSVG().getElementById('windows').getElementsByTagName('use');
}

/* utility functions */
function _applyLightOpacities(opac) {
    _.each(_.zip(getLights(), opac), function(e) {
	e[0].setAttribute('fill-opacity', e[1]);
    });
}

/* lighting preset functions */
function lightsOff() {
    _.each(getSVG().getElementById('lights').children, function(e, i) {
	e.setAttribute('fill-opacity', '0');
    });
}

function lightsOn() {
    _.each(getSVG().getElementById('lights').children, function(e, i) {
	e.setAttribute('fill-opacity', '1');
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
function setDaylight(pct) {
    _.each(getWindows(), function(e) {
	e.setAttribute('fill-opacity', pct);
    });
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
