

var COOKIELIFETIME = 1;

var TEAMCOOKIE = 'TEAMS';

function HasCookies() {
	return Cookies.get(TEAMCOOKIE) != undefined;
}

function SetCookies() {

	var teamJSON = [];

	for (var i = 0; i < Teams.length; i++ ) {
		var team = Teams[i];
		var item = { _team: team.Name, _scores: team.Scores };
		teamJSON.push(item);
	}

	Cookies.set(TEAMCOOKIE, teamJSON, { expires: COOKIELIFETIME });
}

function GetTeamsFromCookie() {
	var list = [];
	var teams = Cookies.get(TEAMCOOKIE);
	var json = JSON.parse(teams);

	for (var i = 0; i < json.length; i++) {
		var child = json[i];
		var team = getTeamFromJSON(child);
		list.push(team);
	}

	return list;
}

function getTeamFromJSON(json) {
	var team = new Team();
	team.Name = json["_team"];
	team.Scores = json["_scores"];

	return team;
}










