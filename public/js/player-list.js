'use strict';

var playerList = (function() {

	var columns = [
		"",
		"Name",
		"Position",
		"Team",
		"Point Total",
		"Bye",
		"QB",
		"Total Yards",
		"Total TDs",
		"Rec"
	]

	var noTeamColor = d3.rgb(80, 80, 80)
	var normalTextColor = d3.rgb(220, 220, 220);
	var notSelectedTextColor = d3.rgb(150, 150, 150);
	var selectedTextColor = d3.rgb(255, 255, 255);

	var selectedColor = d3.rgb(207, 144, 46);

	var oddRowColor = d3.rgb(21, 41, 53);
	var evenRowColor = d3.rgb(29, 59, 77);


	return {
		init: function() {

			console.log("init player list")
			var table = d3.select("#player-list-table")
				.append("table")
				.attr("id", "player-table")

			$("#clear-selection").on('click', function() {
				fantasyFB.selection.clearSelection(fantasyFB.selection.PLAYER);
			})
			
		},

		update: function() {

			var selectedPlayers = fantasyFB.selection.players;
			console.log("player-list.selectedPlayers: ", selectedPlayers);

			var players = fantasyFB.model.filteredPlayers;
			console.log("playerList.players", players.length)

			var table = d3.select("#player-table")

			table.selectAll('tr').remove();

			var header = table.append("thead")
				.append("tr")
				.attr("id", "player-list-header-row")
				.classed("table-header", 1)

			var tableHeaderCols = header.selectAll("thead tr")
				.data(columns)
				.enter();

			tableHeaderCols.append("th")
				.attr("id", function(d) {
					return "col-" + d;
				})
				.classed("table-header-col", 1)
				.text(function(d) {
					return d;
				})
			
			var tbody = table.append("tbody");

			var tableRows = tbody.selectAll(".player-row")
				.data(players)
				.enter();


			var tableRow = tableRows.append("tr")
				.attr("id", function(d) { return d.id})
				.classed("player-row", 1)
				.style("color", function(d) {
					return (d.team === "FA") ? noTeamColor : normalTextColor;
				})
				.style("color", function(d) {
					var myColor = {};
					if (fantasyFB.selection.players.length > 0) {
						myColor = (fantasyFB.selection.players.indexOf(d.id) >= 0) ? selectedTextColor : notSelectedTextColor;
					} else {
						myColor = normalTextColor
					}
					// console.log("my color: ", myColor)
					// console.log("my color id: ", d.id)
					// console.log("my color index: ", fantasyFB.selection.players.indexOf(d.id) >= 0)
					return myColor;
				}) 
				.on('click', function(d) {
					console.log("player Clicked ", d)
					fantasyFB.selection.select(fantasyFB.selection.PLAYER, [d.id]);
				})
				.attr("title", function(d) {
					return "whatup"
				})
				

			tableRow.append("td")
				.text(function(d) {
					return "Picked";
				})
				.on("click", function(d) {
					event.stopPropagation() 
					console.log("player picked: ", d)
					fantasyFB.model.playerPicked(d.id);
				})

			tableRow.append("td")
				.text(function(d) {
					return d.firstName + ' ' + d.lastName;
				})

			tableRow.append("td")
				.text(function(d) {
					return d.position;
				})

			tableRow.append("td")
				.text(function(d) {
					return d.team;
				})

			tableRow.append("td")
				.text(function(d) {
					return d.projectedPoints;
				})

			tableRow.append("td")
				.text(function(d) {
					var team = fantasyFB.model.getTeamByTricode(d.team);
					return (team) ? team.byeWeek : "N/A";
				})

			tableRow.append("td")
				.text(function(d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)
					return (qb) ? qb.firstName.charAt(0).toUpperCase() + '. ' + qb.lastName : "NO QB";
				})

			tableRow.append("td")
				.text(function(d) {
					return d.totalYards;
				})

			tableRow.append("td")
				.text(function(d) {
					return d.totalTDs;
				})

			tableRow.append("td")
				.text(function(d) {
					return d.recs;
				})


		}


	}
})();