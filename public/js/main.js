'use strict'

var fantasyFB = {};


$(document).ready(function() {

	console.log("fantasyFB: ", fantasyFB);
	fantasyFB.model.init();

	playerList.init();
	filterControls.init();

	fantasyFB.events.register(fantasyFB.events.DATA_LOAD_COMPLETED, DataLoaded);

})

function DataLoaded() {
	playerList.update();
	filterControls.update();
}