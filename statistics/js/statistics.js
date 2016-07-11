
var Games = [];

$(document).ready(function() {

	query4();
});

function query1() {
	var resultBox = $(".search_results_container");
	var result = "query1";
	resultBox.html(result);
}

function query2() {
	var resultBox = $(".search_results_container");
	var result = "query2";
	resultBox.html(result);
}

function query3() {
	var resultBox = $(".search_results_container");
	var result = "query3";
	resultBox.html(result);
}

function query4() {

	post("http://pubtrivia.thinkforce.eu/php/query.php", { id : 0 }, onQuerySuccess, onQueryError);
}

function onQuerySuccess(data) {
	var resultBox = $(".search_results_container");

	console.log(data);
	data = JSON.parse(data);

	for (var i = 0; i < data.length; i++) {
		var gameJSON = data[i];
		var game = new Game();
		game.Decode(gameJSON);
		Games.push(game);

		var element = UI_getGameHtml(game);
		resultBox.append(element);
	}

	for (var i = 0; i < Games.length; i++) {
		console.log(Games[i]);
	}
}

function onQueryError(data) {
	alert(data);
}

/******************
	NETWORKING
*******************/

function post(url, data, success, error) {

	$.ajax({
		type: "POST",
		url: url,
		data: data,
		success: success,
		error: error,
		contentType: "application/json"
	});
}

/******************
	UI-ELEMENTS
*******************/

function UI_getGameHtml(game) {

	var html = "<div class='col_100 game'>";


		html += UI_getSeparatorHtml();

		html += "<div class='col_100 game_header'>";
			html += "<div class='col_50 game_organizer'> Organizer: " + game.Organizer + "</div>";
			html += "<div class='col_50 game_organized_date'>" + game.GetParsedDate() + "</div>";
		html += "</div>";

		html += UI_getSeparatorHtml();

		html += "<div class='col_100 game_teams_container'>";

		for (var i = 0; i < game.Teams.length; i++) {
			var team = game.Teams[i];
			html += UI_getTeamHtml(team);
		}

		html += "</div>";

	html += "</div>";

	return html;
}

function UI_getTeamHtml(team) {

	var html = "<div class='col_100 game_team'>";

		html += "<div class='col_33 game_team_name'>" + team.Name + "</div>";
		html += "<div class='col_66 game_team_scores_container'>";

		for (var i = 0; i < 5; i++) {
			var score = team.Scores[i];
			html += "<div class='game_team_score'>" + score  + "</div>";
		}

		html += UI_getVerticalSeparatorHtml();
		html += "<div>" + team.Total() + "</div>"
		html += "</div>";

	html += "</div>";

	return html;
}

function UI_getSeparatorHtml() {
	return "<div class='col_100'> <div class='game_separator'> </div> </div>";
}

function UI_getVerticalSeparatorHtml() {
	return "<div class='game_separator_vertical'> </div>";	
}










