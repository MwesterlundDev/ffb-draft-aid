'use strict'

var fantasyFB = {};


$(document).ready(function() {

	console.log("fantasyFB: ", fantasyFB);
	fantasyFB.model.init();

	playerList.init();
	filterControls.init();

	fantasyFB.events.register(fantasyFB.events.DATA_LOAD_COMPLETED, DataLoaded);
	fantasyFB.events.register(fantasyFB.events.FILTER, postFilter);

})

function DataLoaded() {
	
	fantasyFB.filter.filter(fantasyFB.filter.POSITION_FILTER, ["ALL"])
}

function postFilter() {
	console.log("post filter")
	playerList.update();
	filterControls.update();
}