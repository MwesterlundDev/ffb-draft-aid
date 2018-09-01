'use strict';

var playerList = (function() {

	return {
		init: function() {

			console.log("init player list")
		},

		update: function() {

			var players = fantasyFB.model.players;
			console.log("playerList.players", players)

		}


	}
})();