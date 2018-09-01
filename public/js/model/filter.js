'use strict';

fantasyFB.filter = (function() {

	var positionFilter = [];


	return  {

		POSITION_FILTER: "positionFilter",

		filter: function(type, parameters) {
			var self = this;

			switch (type) {
				case self.POSITION_FILTER: 
					if (positionFilter.indexOf(parameters[0]) < 0 && parameters[0] !== "ALL") {
						positionFilter.push(parameters[0])
					} else if (parameters[0] === "ALL" ){
						positionFilter = [];
					} else {
						var index = positionFilter.indexOf(parameters[0])
						positionFilter.splice(index, 1);
					}
					break;

				default: 
					console.log(type, " is not a valid filter type");
			}

			self.doFilter();

		},

		doFilter: function() {

			// console.log("positionFilter: ", positionFilter); 
			// console.log("positionFilter: ", positionFilter.length); 
			fantasyFB.model.filteredPlayers = fantasyFB.model.players.filter((player) => {
				if (player.picked) {
					return false;
				}
				
				if (positionFilter.length == 0) {
					return true;
				}
				
				console.log("running filter: ", positionFilter.indexOf(player.position) >= 0);
	
				return positionFilter.indexOf(player.position) >= 0;
			})
	
			fantasyFB.events.send(fantasyFB.events.FILTER, positionFilter);
	
		},

		getPositionFilter: function() {
			return positionFilter;
		}

	}
})();