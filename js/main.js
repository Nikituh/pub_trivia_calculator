
var ORIGINALWIDTH = 1000;
var ORIGINALHEIGHT = 295;

$(document).ready(function() {

	var banner = $(".banner");
	var newHeight = (banner.width() / ORIGINALWIDTH) * ORIGINALHEIGHT;
	
	banner.height(newHeight);
});