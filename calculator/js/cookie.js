

var COOKIELIFETIME = 1;

var TEAMCOOKIE = 'TEAMS';

// DeleteCookies ();

function DeleteCookies() {
	var cookies = document.cookie.split(";");
	
	for (var i = 0; i < cookies.length; i++) {
  		eraseCookie(cookies[i].split("=")[0]);
  	}
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    } else {
    	var expires = "";
    }

    document.cookie = name+"="+value+expires+"; path=/";
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

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
	// team.Scores = json["_scores"];
	
	var scores = json["_scores"];

	for (var i = 0; i < scores.length; i++) {
		var score = scores[i];
		team.Scores[i] = parseInt(score);
	}

	return team;
}










