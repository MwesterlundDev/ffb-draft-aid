'use strict';

var filterControls = (function () {

	var selectedColor = d3.rgb(207, 144, 46);

	return {
		init: function () {
			console.log("init filter Controls")



		},

		update: function () {
			var positionsControls = d3.select("#position-controls");

			var positionFilter = fantasyFB.filter.getPositionFilter();

			positionsControls.selectAll(".pos").remove();
			var positionDiv = positionsControls.selectAll(".pos")
				.data(fantasyFB.model.positions)
				.enter();

			var posDiv = positionDiv.append("div")
				.attr("id", function (d) {
					return "pos-" + d;
				})
				.classed("pos", 1)
				.style("background", function(d) {
					if (positionFilter.length === 0) {
						return (d === "ALL") ? selectedColor : "none";
					}

					return (positionFilter.indexOf(d) >=0 ) ? selectedColor : "none";
				})
				.on("click", function(d) {
					console.log("position clicked: ", d)
					fantasyFB.filter.filter(fantasyFB.filter.POSITION_FILTER, [d])
				}) 
				
			posDiv.append("label")
				.text(function (d) {
					return d;
				})
		}
	}

})();