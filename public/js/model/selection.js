'use strict';

fantasyFB.selection = (function () {


	return {

		players: [],

		PLAYER: "player",

		select: function (type, parameters) {
			var self = this;

			switch (type) {
				case self.PLAYER:
					// add player to selection
					if (self.players.indexOf(parameters[0]) < 0) {
						self.players.push(parameters[0])
					} else {
						// remove player from selection
						var index = self.players.indexOf(parameters[0]);
						if (index >= 0) {
							self.players.splice(index, 1);
						} else {
							console.log("PLAYER SELECTION: THIS SHOULDNT HAPPEN ", index)
						}
					}
					break;
				default:
					console.log(type, " cannot be selected")
					break;
			}

			fantasyFB.events.send(fantasyFB.events.SELECTION, {
				type: type,
				parameters: parameters,
			})

		},


		clearSelection: function (type) {
			var self = this;
			switch (type) {
				case self.PLAYER:
					self.players = [];
					break;

				default:
					console.log(type, " cannot be selected");
					break;

			}

			fantasyFB.events.send(fantasyFB.events.CLEAR_SELECTION, type);
		}

	}

})()