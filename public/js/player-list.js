'use strict';

var playerList = (function() {

	var columns = [
		"Name",
		"Position",
		"Team",
		"Point Total",
		"QB",
		"Total Yards",
		"Total TDs",
		"Rec"
	]

	return {
		init: function() {

			console.log("init player list")
			var table = d3.select("#player-list")
				.append("table")
				.attr("id", "player-table")
				.append("thead")

			var tableHeader = table.append("tr")
				.attr("id", "player-list-header-row")
				.classed("table-header", 1)

			var tableHeaderCols = tableHeader.selectAll(".header-col")
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
			
		},

		update: function() {

			// TODO: change to filtered players
			var players = fantasyFB.model.players;
			console.log("playerList.players", players)

			var table = d3.select("#player-table").append("tbody");

			table.selectAll(".player-row").remove();
			var tableRows = table.selectAll(".player-row")
				.data(players)
				.enter();


			var tableRow = tableRows.append("tr")
				.attr("id", function(d) { return d.id})
				.classed("player-row", 1)

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
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)
					return (qb) ? qb.firstName + qb.lastName : "";
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