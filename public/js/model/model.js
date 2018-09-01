fantasyFB.model = (function() {

	function loadSchedules() {
		var self = fantasyFB.model;

		// console.log("self: ", self)
				
		d3.csv("/data/2018_schedule.csv", (data) => {

			// console.log("schedule data: ", data);
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

	var starters = {
		qb: 1,
		rb: 2,
		wr: 2,
		te: 1,
		flex: 1,
		pk: 1,
		bench: 7,
	}

	// public model stuff
	return {
		players: [],
		filteredPlayers: [],
		teams: [],
		quarterbacks: [],

		myDraft: [],

		starters: {
			qb: null,
			rb1: null,
			rb2: null,
			wr1: null,
			wr2: null,
			te: null,
			flex: null,
			pk: null,
	
		},
	
		bench: [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		],


		positions: [
			'ALL',
			'RB',
			'QB',
			'WR',
			'TE',
			'PK',
		],

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
				self.players = tempPlayers.map((tempPlayer) => {
					var player = {
						FGAttempts: Number(tempPlayer.FGAttempts),
						FGMade: Number(tempPlayer.FGMade),
						STTDs: Number(tempPlayer.STTDs),
						STYards: Number(tempPlayer.STYards),
						XPTAttempts: Number(tempPlayer.XPTAttempts),
						XPTMade: Number(tempPlayer.XPTMade),
						bonusTDs: Number(tempPlayer.bonusTDs),
						bonusYards: Number(tempPlayer.bonusYards),
						firstName: tempPlayer.firstName,
						id: tempPlayer.id,
						int: Number(tempPlayer.int),
						lastName: tempPlayer.lastName,
						passTDs: Number(tempPlayer.passTDs),
						passYards: Number(tempPlayer.passYards),
						position: tempPlayer.position,
						recTDs: Number(tempPlayer.recTDs),
						recYards: Number(tempPlayer.recYards),
						recs: Number(tempPlayer.recs),
						rushTDs: Number(tempPlayer.rushTDs),
						rushYards: Number(tempPlayer.rushYards),
						team: tempPlayer.team,
						totalTDs: Number(tempPlayer.totalTDs),
						totalYards: Number(tempPlayer.totalYards),
						picked: false

					}

					//TODO: point calculations...

					player.projectedPoints = fantasyFB.calculator.pprPlayerPointsTotal(player);

					return player;
				});

				// console.log(self.players[0]);
				// console.log(self.players[1]);
				// console.log("teams: ", self.teams);

				self.players.sort((playerA, playerB) => {
					return playerB.projectedPoints - playerA.projectedPoints;
				})

				self.quarterbacks = self.players.filter((player) => {
					return player.position === "QB";
				})

				self.runningbacks = self.players.filter((player) => {
					return player.position === "RB";
				})

				self.recievers = self.players.filter((player) => {
					return player.position === "WR";
				})

				self.tightEnds = self.players.filter((player) => {
					return player.position === "TE";
				})

				self.kickers = self.players.filter((player) => {
					return player.position === "PK";
				})

				

				// self.quarterbacks.sort((qbA, qbB) => {
				// 	return qbB.projectedPoints - qbA.projectedPoints;
				// })
				
				self.teams.forEach((team) => {
					team.quarterback = self.getPlayersStartingQBByTeam(team.tricode);
				})

				loadSchedules();
			});
		},

		getTeamByTricode: function(tricode) {
			var self = this;
			var teamIndex = findIndexByValue(self.teams, "tricode", tricode);
			return self.teams[teamIndex];

		},

		getPlayerById: function(id) {
			var self = this;
			var playerIndex = findIndexByValue(self.players, "id", id);
			return self.players[playerIndex];
		},

		getPlayersStartingQBByTeam: function(teamId) {
			var self = this;

			var startingQb = self.quarterbacks.filter((qb) => {
				return qb.team === teamId
			})
			
			// console.log("starting qb for team: ", startingQb, teamId);
			return startingQb[0];
		},

		playerPicked: function(id) {
			var self = this;

			var player = self.getPlayerById(id);
			player.picked = true;
			fantasyFB.filter.doFilter();
		}, 

		getPlayersByIds: function(ids) {
			var self = this;

			if (!Array.isArray(ids)) {
				ids = [ids];
			}

			var players = self.players.filter((player) => {
				return (ids.indexOf(player.id) >= 0)
			})

			return players;

		},

		draftPlayer: function(player) {
			var self = this;

			var team = fantasyFB.model.getTeamByTricode(player.team);
			var byeWeek = (team) ? team.byeWeek : "N/A";

			

			var myPlayer = {
				id: player.id,
				name: player.firstName + " " + player.lastName,
				byeWeek: byeWeek,
				projectedPoints: player.projectedPoints,
				position: player.position,
				fantasyPosition: "",
			}

			self.myDraft.push(myPlayer)

			self.myDraft.sort((playerA, playerB) => {
				return playerB.projectedPoints - playerA.projectedPoints;
			})


			// console.log("myTeam: ", this.myDraft);

			self.playerPicked(player.id)
			fantasyFB.events.send(fantasyFB.events.PLAYER_DRAFTED, player);

		},

		getPositionRank: function(player) {

			var index = 0;
			var length = 0;
			switch (player.position) {
				case "QB":
					var index = findIndexByValue(fantasyFB.model.quarterbacks, "id", player.id);
					var length = fantasyFB.model.quarterbacks.length;
					break;
				case "RB":
					var index = findIndexByValue(fantasyFB.model.runningbacks, "id", player.id);
					var length = fantasyFB.model.runningbacks.length;
					break;
				case "WR":
					var index = findIndexByValue(fantasyFB.model.recievers, "id", player.id);
					var length = fantasyFB.model.recievers.length;
					break;
				case "TE":
					var index = findIndexByValue(fantasyFB.model.tightEnds, "id", player.id);
					var length = fantasyFB.model.tightEnds.length;
					break;
				case "PK":
					var index = findIndexByValue(fantasyFB.model.kickers, "id", player.id);
					var length = fantasyFB.model.kickers.length;
					break;
			
				default:
					break;
			}

			return {index: index + 1, length: length};
		}





	}
})();