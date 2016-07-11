
var DEFAULTNAME = "none";

var Teams = [];

function Team() {
	this.Name = DEFAULTNAME;
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

Team.prototype.HasName = function() {
	return this.Name != undefined && this.Name != "" && this.Name != "none";
};

Team.prototype.IsTiedWithAnyone = function() {
	
	for (var i = 0; i < Teams.length; i++) {
		var team = Teams[i];

		var isDifferentTeam = this.Name.localeCompare(team.Name);
		var isNotNoneTeam = team.Name.localeCompare(DEFAULTNAME);

		if (isDifferentTeam && isNotNoneTeam && this.Total() == team.Total()) {
			return true;
		}
	}

	return false;
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

Team.prototype.Decode = function(data) {
	this.Name = data.Name;

	for (var i = 0; i < data.Scores.length; i++) {
		var score = data.Scores[i];
		this.Scores[i] = parseFloat(score.Value);
	}

};

function IsGameFinished() {
	for (var i = 0; i < Teams.length; i++) {
		
		var team = Teams[i];

		for (var j = 0; j < team.Scores.length; j++) {
			var score = team.Scores[j];

			if (score == 0) {
				console.log("Game is not finished");
				return false;
			}
		}
	}

	console.log("Game is finished");
	return true;
}

function EncodeGame() {
	
	var array = [];

	for (var i = 0; i < Teams.length; i++) {
		var team = Teams[i];

		array.push({ "name": team.Name, "scores": team.Scores });
	}
	
	var date = (new Date).getTime();
	
	var organizer = $(".organizer_text").val();
	
	var json = { "organizer": organizer, "teams": array, "date": date };

	return JSON.stringify(json);
}

function getDate() {

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	} 

	if (mm < 10) {
		mm = '0' + mm;
	} 

	return dd + '/' + mm + '/' + yyyy;
}

function GetSortedTeams() {

	var sorted = [];

	for (var i = 0; i < Teams.length; i++) {
		var team = Teams[i];
		sorted.push(team);
	}

	sorted.sort(compareTotal);

	return sorted;
}

function compareTotal(a, b) {

	if (a.Total() < b.Total()) {
		return 1;
	}

	if (a.Total() > b.Total()) {
		return -1;
	}

	return 0;
}



function Game() {
	this.Date = "";
	this.Organizer = "";
	this.Teams = [];
}

Game.prototype.Decode = function(data) {
	this.Date = parseInt(data.Date);
	this.Organizer = data.Organizer;

	var teamsJSON = data.Teams;


	for (var i = 0; i < teamsJSON.length; i++) {
		var teamJSON = teamsJSON[i];

		var team = new Team();
		team.Decode(teamJSON);
		this.Teams.push(team);
	};
};

Game.prototype.GetParsedDate = function() {
    var date = new Date(this.Date);
    return prettyUp(date);
};

function prettyUp(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return date.getUTCDate() + " " + months[date.getUTCMonth()] + " " + date.getFullYear();
}















