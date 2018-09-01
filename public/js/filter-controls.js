'use strict';

var filterControls = (function () {

	return {
		init: function () {
			console.log("init filter Controls")



		},

		update: function () {
			var positionsControls = d3.select("#position-controls");

			positionsControls.selectAll(".positions").remove();
			var positionDiv = positionsControls.selectAll(".positions")
				.data(fantasyFB.model.positions)
				.enter();

			var posDiv = positionDiv.append("div")
				.attr("id", function (d) {
					return "pos-" + d;
				})
				.classed("pos", 1)
				.on("click", function(d) {
					console.log("position clicked: ", d)
				}) 
				
			posDiv.append("label")
				.text(function (d) {
					return d;
				})
		}
	}

})();