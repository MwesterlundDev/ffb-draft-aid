'use strict';

var playerInspector = (function () {

	var QB_SVG_HEIGHT = 30;
	var QB_SVG_WIDTH = 200;

	var QB_BAR_HEIGHT = 10;

	var qbScale;
	var qbColorScale;

	var highQBColor = d3.rgb(200, 0, 0);
	var lowQBColor = d3.rgb(0, 200, 0);

	return {
		init: function () {
			console.log("init player inspector", fantasyFB.model.quarterbacks.length);
		},

		update: function () {
			var selectedPlayers = fantasyFB.model.getPlayersByIds(fantasyFB.selection.players);
			console.log("update player inspector: ", selectedPlayers);

			qbScale = d3.scaleLinear()
				.domain([0, fantasyFB.model.quarterbacks.length])
				.range([5, QB_SVG_WIDTH]);

			qbColorScale = d3.scaleLinear()
				.domain([0, fantasyFB.model.quarterbacks.length])
				.interpolate(d3.interpolate)
				.range([lowQBColor, highQBColor]);

			var playerCrumbDiv = d3.select("#selected-players-crumbs");

			playerCrumbDiv.selectAll(".player-crumb").remove();
			var playerCrumbs = playerCrumbDiv.selectAll(".player-crumb")
				.data(selectedPlayers)
				.enter();

			playerCrumbs.append("label")
				.attr("id", function (d) {
					console.log("selected crumbs", d)
					return "player-crumb-" + d.id;
				})
				.classed("player-crumb", 1)
				.text(function (d) {
					return d.firstName + " " + d.lastName;
				})
				.on("click", function (d) {
					fantasyFB.selection.select(fantasyFB.selection.PLAYER, [d.id]);
				})

			var playerDetailsDiv = d3.select("#player-details");

			playerDetailsDiv.selectAll(".player-card").remove();
			var playerDetailsCard = playerDetailsDiv.selectAll(".player-card")
				.data(selectedPlayers)
				.enter();

			var cardDiv = playerDetailsCard.append("div")
				.attr("id", function (d) {
					return "player-card-" + d.id;
				})
				.classed("player-card", 1)

			var cardLeft = cardDiv.append("div")
				.classed("card-left", 1)

			var cardLeftTop = cardLeft.append("div")
				.classed("card-left-top", 1);

			cardLeftTop.append("button")
				.classed("pc-button", 1)
				.text("Draft")

			cardLeftTop.append("button")
				.classed("pc-button", 1)
				.text("Picked")
				.on("click", function (d) {
					fantasyFB.model.playerPicked(d.id);
					fantasyFB.selection.select(fantasyFB.selection.PLAYER, [d.id]);
				})

			cardLeftTop.append("button")
				.classed("pc-button", 1)
				.text("Clear")
				.on("click", function (d) {
					fantasyFB.selection.select(fantasyFB.selection.PLAYER, [d.id]);
				})

			cardLeft.append("label")
				.attr("id", function (d) {
					return "pc-name-" + d.id;
				})
				.classed("pc-name-label", 1)
				.style("font-size", "20px")
				.text(function (d) {
					return d.firstName + ' ' + d.lastName;
				})

			cardLeft.append("label")
				.attr("id", function (d) {
					return "pc-position-" + d.id;
				})
				.classed("pc-label", 1)
				.text(function (d) {
					return "Position: " + d.position;
				})

			cardLeft.append("label")
				.attr("id", function (d) {
					return "pc-team-" + d.id;
				})
				.classed("pc-label", 1)
				.text(function (d) {
					return "Team: " + d.team;
				})

			cardLeft.append("label")
				.attr("id", function (d) {
					return "pc-team-" + d.id;
				})
				.classed("pc-label", 1)
				.text(function (d) {
					var team = fantasyFB.model.getTeamByTricode(d.team);
					var bye = (team) ? team.byeWeek : "N/A";
					return "Bye: " + bye;
				})

			var cardRight = cardDiv.append("div")
				.classed("card-right", 1)


			var qbDiv = cardRight.append("div")
				.classed("pc-qb-div", 1);

			qbDiv.append("label")
				.classed("pc-qb-label", 1)
				.text(function(d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)
					return (qb) ? qb.firstName.charAt(0).toUpperCase() + '. ' + qb.lastName + ": " : "NO QB";
				})

			var qbSvg = qbDiv.append("svg")
				.classed("qb-rank-svg", 1)
				.attr("height", QB_SVG_HEIGHT)
				.attr("width", QB_SVG_WIDTH);

			qbSvg.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("height", QB_SVG_HEIGHT)
				.attr("width", QB_SVG_WIDTH)
				.style("fill", d3.rgb(0, 0, 0));
				
			qbSvg.append("rect")
				.attr("id", function(d) {
					return "qb-rank-bar-" + d.id; 
				})
				.classed("qb-rank-bar", 1)
				.attr("x", function(d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)

					var qbIndex = findIndexByValue(fantasyFB.model.quarterbacks, "id", qb.id);
					return qbScale(qbIndex);
				})
				.attr("y", 10)
				.attr("height", QB_BAR_HEIGHT)
				.attr("width", function(d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)

					var qbIndex = findIndexByValue(fantasyFB.model.quarterbacks, "id", qb.id);

					return QB_SVG_WIDTH - qbScale(qbIndex);
				})
				.style("fill", function(d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)

					var qbIndex = findIndexByValue(fantasyFB.model.quarterbacks, "id", qb.id);
					return qbColorScale(qbIndex);
				});

			
		}



	}


})();