'use strict';


fantasyFB.calculator = (function() {

	return {

		pprPlayerPointsTotal: function(player) {

			var pointsTotal = 0;

			// PASSING CALCULATIONS
			pointsTotal += player.passYards / 25.0;
			// pointsTotal += player.passTDs * 6;
			pointsTotal += player.int * - 2;
			
			// RUSHING CALCULATIONS
			pointsTotal += player.rushYards / 10.0;
			pointsTotal += player.rushTDs * 6;
			
			// RECEIVING CALCULATIONS
			pointsTotal += player.recs;
			pointsTotal += player.recYards / 10.0;
			// pointsTotal += player.recTDs * 6;
			
			// KICKING CALCULATIONS
			pointsTotal += (player.FGAttempts - player.FGMade) * -1;
			pointsTotal += player.FGMade * 3

			// MISC CALCULATIONS
			pointsTotal += player.totalTDs * 6;


			return pointsTotal;

			
		},

	}

})();