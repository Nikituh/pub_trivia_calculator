
$(document).ready(function() {

	var TEAMCOUNT = 5;

	Parse.initialize("nu2ODMNFUme7MVibNXq0zhZNI3h8ACb7btaMmhJe", "hav8XU3gKQ7Gz3lLmW3dPvJuRnrT7xC3bmZhxKzW");
	var TeamScores = Parse.Object.extend("TeamScores");

	$(".save_button").click(saveData);

	function saveData() {
		var table = $(".team_table");
		var rows = table.find("tr").get();

		var teams = [];

		$.each(rows, function(index, row) {
			teams.push(getDataFromRow(row));
		});

		// Parse.Object.saveAll(teams, {
		// 	success: function(objs) {
		// 		console.log("Success");
		// 	},
		// 	error : function(error) {
		// 		console.log("Erorr");
		// 	}
		// });
	}

	function getDataFromRow (row) {
		
		console.log(row);

		var name = getName(row);
		var scores = getScores(row);
		var total = $(row).find(".total_field").html();
		
		console.log(name + " - " + scores + " - " + total);

		var team = new TeamScores();
		team.set("scores", [1, 2, 3, 4, 0]);
		team.set("gameId", "saveAllTry");
		team.set("teamName", "testTeam4");
		return team;
	}

	function getName (row) {
		var name = $(row).filter(".data_team_name").html();
		var td = $(row).find("td");

		console.log(name + " - " + td);
	}

	function getScores(row) {

		var fields = $(row).find("data_input_field");
		var scores = [];

		for (var i; i < fields.length; i++) {
			var field = fields[i].html();
			scores.push(field);
		}

		return scores;
	}

	function getTotal(row) {

	}
});









