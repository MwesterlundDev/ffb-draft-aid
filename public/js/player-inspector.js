'use strict';

var playerInspector = (function () {

	var QB_SVG_HEIGHT = 18;
	var QB_SVG_WIDTH = 200;

	var QB_BAR_HEIGHT = QB_SVG_HEIGHT / 3;

	var qbScale;
	var qbColorScale;
	var rbScale;
	var rbColorScale;
	var wrScale;
	var wrColorScale;
	var teScale;
	var teColorScale;
	var pkScale;
	var pkColorScale;

	var highQBColor = d3.rgb(200, 0, 0);
	var lowQBColor = d3.rgb(0, 200, 0);

	var dangerTextColor = d3.rgb(255, 0 , 0);


	function setPositionRankScales() {

		// QB SCALES
		qbScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.quarterbacks.length])
			.range([5, QB_SVG_WIDTH]);

		qbColorScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.quarterbacks.length])
			.interpolate(d3.interpolate)
			.range([lowQBColor, highQBColor]);

		// RB SCALES
		rbScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.runningbacks.length])
			.range([5, QB_SVG_WIDTH]);

		rbColorScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.runningbacks.length])
			.interpolate(d3.interpolate)
			.range([lowQBColor, highQBColor]);

		// WR Scales
		wrScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.recievers.length])
			.range([5, QB_SVG_WIDTH]);

		wrColorScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.recievers.length])
			.interpolate(d3.interpolate)
			.range([lowQBColor, highQBColor]);

		// TE scales
		teScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.tightEnds.length])
			.range([5, QB_SVG_WIDTH]);

		teColorScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.tightEnds.length])
			.interpolate(d3.interpolate)
			.range([lowQBColor, highQBColor]);

		// Kicker Scales
		pkScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.kickers.length])
			.range([5, QB_SVG_WIDTH]);

		pkScale = d3.scaleLinear()
			.domain([0, fantasyFB.model.kickers.length])
			.interpolate(d3.interpolate)
			.range([lowQBColor, highQBColor]);
	}

	function positionScale(position, index) {
		switch (position) {
			case "QB":
				return qbScale(index)
			case "RB":
				return rbScale(index)
			case "WR":
				return wrScale(index)
			case "TE":
				return teScale(index)
			case "PK":
				return pkScale(index)
			default:
				return 0;
		}
	}

	function positionColorScale(position, index) {
		switch (position) {
			case "QB":
				return qbColorScale(index)
			case "RB":
				return rbColorScale(index)
			case "WR":
				return wrColorScale(index)
			case "TE":
				return teColorScale(index)
			case "PK":
				return pkColorScale(index)
			default:
				return 0;
		}
	}

	return {
		init: function () {
			console.log("init player inspector", fantasyFB.model.quarterbacks.length);
		},

		update: function () {
			var selectedPlayers = fantasyFB.model.getPlayersByIds(fantasyFB.selection.players);
			console.log("update player inspector: ", selectedPlayers);

			setPositionRankScales();

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
				.on("click", function (d) {
					fantasyFB.model.draftPlayer(d);
					fantasyFB.selection.select(fantasyFB.selection.PLAYER, [d.id]);
				})

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
				.on("click", function(d) {
					var name = d.firstName + ' ' + d.lastName;
					window.open('http://google.com/search?q='+name);

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
				.style("background", function(d) {
					var team = fantasyFB.model.getTeamByTricode(d.team);
					var byeWeek = (team) ? team.byeWeek : "N/A";

					// if position on team has this byeWeek show Red...
					for (var i = 0; i < fantasyFB.model.myDraft.length; i++ ) {
						var player = fantasyFB.model.myDraft[i];
						console.log("bye week ", byeWeek === player.byeWeek);
						if (player.byeWeek === byeWeek && player.position === d.position) {
							
							return dangerTextColor;
						}
					}
				})
				.text(function (d) {
					var team = fantasyFB.model.getTeamByTricode(d.team);
					var bye = (team) ? team.byeWeek : "N/A";
					return "Bye: " + bye;
				})

			var cardRight = cardDiv.append("div")
				.classed("card-right", 1)



			var prDiv = cardRight.append("div")
				.classed("pc-pr-div", 1);

			prDiv.append("label")
				.classed("pc-qb-label", 1)
				.text("Position Rank")

			var prSvg = prDiv.append("svg")
				.classed("qb-rank-svg", 1)
				.attr("height", QB_SVG_HEIGHT)
				.attr("width", QB_SVG_WIDTH);

			prSvg.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("height", QB_SVG_HEIGHT)
				.attr("width", QB_SVG_WIDTH)
				.style("fill", d3.rgb(0, 0, 0));

			prSvg.append("rect")
				.attr("id", function (d) {
					return "qb-pr-bar-" + d.id;
				})
				.classed("qb-pr-bar", 1)
				.attr("x", function (d) {

					var positionRank = fantasyFB.model.getPositionRank(d)
					return positionScale(d.position, positionRank.index);
				})
				.attr("y", QB_BAR_HEIGHT)
				.attr("height", QB_BAR_HEIGHT)
				.attr("width", function (d) {
					var positionRank = fantasyFB.model.getPositionRank(d)

					return QB_SVG_WIDTH - positionScale(d.position, positionRank.index);
				})
				.style("fill", function (d) {
					var positionRank = fantasyFB.model.getPositionRank(d)
					return positionColorScale(d.position, positionRank.index);
				});


			prDiv.append("label")
				.classed("qb-rank", 1)
				.text(function (d) {
					var positionRank = fantasyFB.model.getPositionRank(d)
					return positionRank.index + " of " + positionRank.length;

				})



			var qbDiv = cardRight.append("div")
				.classed("pc-qb-div", 1);

			qbDiv.append("label")
				.classed("pc-qb-label", 1)
				.text(function (d) {
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
				.attr("id", function (d) {
					return "qb-rank-bar-" + d.id;
				})
				.classed("qb-rank-bar", 1)
				.attr("x", function (d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)

					var qbIndex = findIndexByValue(fantasyFB.model.quarterbacks, "id", qb.id);
					return qbScale(qbIndex);
				})
				.attr("y", QB_BAR_HEIGHT)
				.attr("height", QB_BAR_HEIGHT)
				.attr("width", function (d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)

					var qbIndex = findIndexByValue(fantasyFB.model.quarterbacks, "id", qb.id);

					return QB_SVG_WIDTH - qbScale(qbIndex);
				})
				.style("fill", function (d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)

					var qbIndex = findIndexByValue(fantasyFB.model.quarterbacks, "id", qb.id);
					return qbColorScale(qbIndex);
				});


			qbDiv.append("label")
				.classed("qb-rank", 1)
				.text(function (d) {
					var qb = fantasyFB.model.getPlayersStartingQBByTeam(d.team)

					var qbIndex = findIndexByValue(fantasyFB.model.quarterbacks, "id", qb.id);
					return "QB Rank: " + qbIndex + " of " + fantasyFB.model.quarterbacks.length;

				})

		}



	}


})();