'use strict';

var myTeam = (function() {

	var sortOrder = {
		QB: 1,
		RB: 2,
		WR: 3,
		TE: 4,
		PK: 5
	}


	return {
		init: function() {
			console.log("my team init");


		},

		update: function() {
			console.log("my team update")
			var myDraft = fantasyFB.model.myDraft;

			myDraft.sort((playerA, playerB) => {
				return sortOrder[playerA.position] - sortOrder[playerB.position]
			})

			console.log("my Tea.myDraft: ", myDraft);

			var myTeamDiv = d3.select("#my-team-list")
			
			myTeamDiv.selectAll(".drafted-players");
			var playerRows = myTeamDiv.selectAll(".drafted-players")
				.data(myDraft, function(d) {
					return d.id;
				})
				.enter();

			var playerRow = playerRows.append("div")
				.attr("id", function(d) {
					console.log("drafted: ", d)
					return "drafted-player-" + d.id;
				})
				.classed("drafted-players", 1)

			playerRow.append("label")
				.classed("drafted-position-label", 1)
				.text(function(d) {
					return d.position;
				})

			playerRow.append("label")
				.classed("drafted-label", 1)
				.text(function(d) {
					return d.name;
				})

			playerRow.append("label")
				.classed("drafted-bye-label", 1)
				.text(function(d) {
					return d.byeWeek;
				})

			
		}
	}
})();