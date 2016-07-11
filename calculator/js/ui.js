
	/****************** 
		UI REFERENCES
	*******************/
	var roundCount = 5;

	function getInputFieldsFromRow(row) {
		return row.find(".data_input_field");
	}

	function getTotalFieldFromRow(row) {
		return row.find(".total_field");
	}

	function getRow (counter) {
		var content = getRowContent(counter);
		return $("<tr class='team_row'></tr>").append(content);
	}

	function getRowContent(counter) {
		var content = "<td class='row_data data_number'> " + counter + "</td>";
		content += getInputField("data_team_name");

		for (var i = 0; i < roundCount; i++) {
			content += getInputField("data_round_" + (i + 1))
		}

		content += getTotalLabel(0);

		content += getTiebreakerField();

		return content;
	}

	function getInputField(className) {
		return "<td>" + "<input type='text' class='row_data data_input_field " + className + "'>" + "</td>";
	}

	function getTotalLabel(value) {
		return "<td class='row_data data_number total_field'>" + value + "</td>";
	}

	function getTiebreakerField() {
		return "<td>" + "<input type='text' class='row_data data_input_field data_input_tiebreaker'>" + "</td>";
	}

	function getHeader() {
		return  "<th> </th> <th> Team </th> <th> I </th> <th> II </th> <th> III </th> <th> IV </th> <th> V </th>";
	}

	function getBody() {
		return "<tbody> </tbody>";
	}

	function getPopupRow (index, team) {
		var content = getPopupRowContent(index, team);
		return $("<tr class='team_row team_row_popup'></tr>").append(content);
	}

	function getPopupRowContent (index, team) {

		if (team.IsTiedWithAnyone()) {
			var content = "<td class='row_data data_number tied_team'> " + index + "</td>";
		} else {
			var content = "<td class='row_data data_number'> " + index + "</td>";
		}

		content += getPopupInputLabel(team.Name, "data_team_name");

		for (var i = 0; i < roundCount; i++) {
			var score = team.Scores[i];
			content += getPopupInputLabel(score, "data_round_" + (i + 1))
		}

		content += getTotalLabel(team.Total());

		return content;
	}

	function getPopupInputLabel(value, className) {
		return "<td>" + "<input disabled='disabled' type='text' class='row_data data_input_field " + className + "'>" + "</td>";
	}

$(document).ready(function() {

});









