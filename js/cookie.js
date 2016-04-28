
var COOKIELIFETIME = 1;

var COUNTCOOKIE = 'TEAMCOUNT'
var TEAMCOOKIE = 'TEAMS';

function HasCookies() {
	return Cookies.get() != undefined;
}

function SetCookies() {

	Cookies.set(COUNTCOOKIE, Teams.length, { expires: COOKIELIFETIME });

	var teamJSON = [];

	for (var i = 0; i < Teams.length; i++ ) {
		var team = Teams[i];
		teamJSON.push( { _team: team.Name, _scores: team.Scores });
	}

	Cookies.set(TEAMCOOKIE, teamJSON, { expires: COOKIELIFETIME });
}

function GetTeamsFromCookie() {
	var count = Cookies.get(COUNTCOOKIE);
	var teams = Cookies.get(TEAMCOOKIE);

	console.log("CookieCount: " + teams.length);
}
