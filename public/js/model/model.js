fantasyFB.model = (function() {

	function loadSchedules() {
		var self = fantasyFB.model;

		console.log("self: ", self)
				
		d3.csv("/data/2018_schedule.csv", (data) => {

			console.log("schedule data: ", data);
			data.forEach((teamSchedule) => {

				var team = self.getTeamByTricode(teamSchedule.team)
				team.schedule = [];
				for (var prop in teamSchedule) {
					if (prop !== "team") {
						
						if (teamSchedule[prop] === "BYE") {
							team.byeWeek = Number(prop);
						}
						
						team.schedule.push(teamSchedule[prop]);
					}
				}
			})
			// console.log(self.teams)
			fantasyFB.events.send(fantasyFB.events.DATA_LOAD_COMPLETED, true);
		});

	}

	// public model stuff
	return {
		players: [],
		teams: [],

		init: function() {
			var self = this;
			console.log("init fantasyFB");

			d3.csv("/data/Huddle_Projections.csv", function(data) {
				var tempPlayers = data.filter((player) => {
					player.id = player.firstName + "-" + player.lastName + "-" + player.position;

					if (player.position === "DF") {
						var team = {
							city: player.firstName,
							name: player.lastName,
							tricode: player.team,
							DEFFumbles: Number(player.DEFFumbles),
							DEFInterceptions: Number(player.DEFInterceptions),
							DEFReturnTDs: Number(player.DEFReturnTDs),
							DEFSacks: Number(player.DEFSacks),
							DEFSafeties: Number(player.DEFSafeties),
							DEFTDs: Number(player.DEFTDs)
						}

						//TODO: Calculate def strength

						self.teams.push(team);
					}
					
					return player.position !== "DF";
				})

				//TODO: calculate point totals etc.
				self.players = tempPlayers;

				console.log(self.players[0]);
				console.log(self.players[1]);
				console.log("teams: ", self.teams);

				loadSchedules();
			});
		},

		getTeamByTricode: function(tricode) {
			var self = this;
			var teamIndex = findIndexByValue(self.teams, "tricode", tricode);
			return self.teams[teamIndex];

		}
	}
})();