
$(document).ready(function() {

	var counter = 0;
	var roundCount = 5;

	$(".add_button").click(addTeam);
	$(".remove_button").click(removeTeam);
	$(".show_ordered_list_button").click(showOrderedList);
	$(".toggle_popup_button").click(togglePopup);
	$(".finish_button").click(finishGame);

	var table = $(".team_table");

	table.on("change", updateTotal);

	addHeader();
	addBody();

	var header = $("th");
	header.hide();

	function addTeam() {
		counter++;
		header.show();

		$(".team_table tbody").append(getRow());
		Teams.push(new Team());
	}

	function removeTeam() {
		
		if (counter > 0) {
			counter--;
			var lastRow = $(".team_table tr:last");
			lastRow.remove();
			Teams.splice(-1, 1);

			if (counter == 0) {
				header.hide();
			}

		} else {
			
		}
	}

	function showOrderedList() {

		var rows = table.find("tr").get();

		rows.sort(sortingFunction);

		$.each(rows, function(index, row) {
			table.children("tbody").append(row);
		});
	}

	function togglePopup ()
	{
		var duration = 300;

		var popup = $(".popup");
		popup = $(popup);
		var isVisible = popup.css("display") == "block";

		if (!isVisible) {
			popup.css("display", "inherit");
			popup.css("opacity", "0");
			popup.fadeTo(duration, 1, null);
		} else {
			popup.fadeTo(duration, 0, function() {
				popup.css("display", "none");
			});
		}
	}

	function sortingFunction(a, b) {

		var fieldA = $(a).find(".total_field")[0];
		var fieldB = $(b).find(".total_field")[0];

		var keyA = parseInt($(fieldA).html());
		var keyB = parseInt($(fieldB).html());

		if (keyA > keyB) {
			return 1;
		}

		if (keyA < keyB) {
			return -1;
		}

		return 0;
	}

	function updateTotal () {

		var row = $(event.target).closest("tr");
		var rowIndex = $("table tr").index(row);
		var team = Teams[rowIndex];

		var inputFields = row.find(".data_input_field");
		var totalLabel = row.find(".total_field")[0];

		for (var i = 1; i < inputFields.length; i++) {
			
			var field = inputFields[i];
			var value = parseInt(field.value);
			
			if (value != undefined && !isNaN(value)) {
				var scoreIndex = i - 1;
				team.Scores[scoreIndex] = value;
			}
		}

		$(totalLabel).html(team.Total());

		team.Name = inputFields[0].value;
	}

	function getRow () {
		var content = getRowContent();
		return $("<tr class='team_row'></tr>").append(content);
	}

	function getRowContent() {
		var content = "<td class='row_data data_number'> " + counter + "</td>";
		content += getInputField("data_team_name");

		for (var i = 0; i < roundCount; i++) {
			content += getInputField("data_round_" + (i + 1))
		}

		content += getTotalLabel();

		return content;
	}

	function getInputField(className) {
		return "<td>" + "<input type='text' class='row_data data_input_field " + className + "'>" + "</td>";
	}

	function getTotalLabel() {
		return "<td class='row_data data_number total_field'>" + 0 + "</td>";
	}

	function addHeader() {
		var header = "<th> </th> <th> Team </th> <th> I </th> <th> II </th> <th> III </th> <th> IV </th> <th> V </th>";
		table.append(header);
	}

	function addBody() {
		var body = "<tbody> </tbody>";
		table.append(body);
	}

	function finishGame() {
		for (var i = 0; i < Teams.length; i++) {
			var team = Teams[i];
			team.LogInfo();
		}
	}

});










