
var Teams = [];

function Team() {
	this.Name = "none";
	this.Scores = [0, 0, 0, 0, 0];
}

Team.prototype.Total = function() {
	var total = 0;
	
	for (var i = 0; i < this.Scores.length; i++) {

		var score = this.Scores[i];
	
		if (score != undefined && !isNaN(score)) {
			total += this.Scores[i];
		}
	}

	return total;
};

Team.prototype.LogInfo = function() {
	var log = this.Name + "[";

	for (var i = 0; i < this.Scores.length; i++) {
		var score = this.Scores[i];
		log += score;

		if (i < this.Scores.length - 1) {
			log += ",";
		}
	}

	log += "]";
	log += "[" + this.Total() + "]";

	console.log(log);
};







