
$(document).ready(function() {

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

		Parse.Object.saveAll(teams, {
			success: function(objs) {
				console.log("Success");
			},
			error : function(error) {
				console.log("Erorr");
			}
		});
	}

	function getDataFromRow (row) {
		console.log(row);

		var team = new TeamScores();
		team.set("scores", [1, 2, 3, 4, 0]);
		team.set("gameId", "saveAllTry");
		team.set("teamName", "testTeam4");
		return team;
	}

	function handleResult(object) {
		alert("Result. Object; " + object);
	}

});




