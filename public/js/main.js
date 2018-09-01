'use strict'

var fantasyFB = {};


$(document).ready(function() {

	console.log("fantasyFB: ", fantasyFB);
	fantasyFB.model.init();

	playerList.init();
	filterControls.init();
	playerInspector.init();

	fantasyFB.events.register(fantasyFB.events.DATA_LOAD_COMPLETED, DataLoaded);
	fantasyFB.events.register(fantasyFB.events.FILTER, postFilter);
	fantasyFB.events.register(fantasyFB.events.SELECTION, selection)
	fantasyFB.events.register(fantasyFB.events.CLEAR_SELECTION, clearSelection)

})

function DataLoaded() {
	
	fantasyFB.filter.filter(fantasyFB.filter.POSITION_FILTER, ["ALL"])
}

function postFilter() {
	console.log("post filter")
	playerList.update();
	filterControls.update();
}

function selection(selectionObj) {

	var type =  selectionObj.type;	

	switch(type) {
		case fantasyFB.selection.PLAYER: 
			playerList.update();
			playerInspector.update();

			break;
		default:
			console.log("No Controller for selection type: ", type);
			break;
	}
}

function clearSelection(type) {

	switch(type) {
		case fantasyFB.selection.PLAYER: 
			playerList.update();
			playerInspector.update();


			break;
		default:
			console.log("No Controller for selection type: ", type);
			break;
	}
}