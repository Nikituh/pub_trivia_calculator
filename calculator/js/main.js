

$(document).ready(function() {

	var counter = 0;

	/****************** 
		EVENTHANDLERS
	*******************/

	$(".add_button").click(addTeamButtonPressed);
	$(".remove_button").click(removeTeam);
	
	$(".toggle_popup_button").click(togglePopup);
	$(".popup").click(togglePopup);
	
	$(".finish_button").click(finishGame);

	var table = $(".team_table");

	table.on("change", updateTotal);

	/****************** 
		UI INIT / GET COOKIE DATA
	*******************/

	table.append(getHeader());
	table.append(getBody());

	var header = $("th");
		
	if (HasCookies()) {
		Teams = GetTeamsFromCookie();
		addSavedTeams();
	}

	if (Teams.length == 0) {
		header.hide();
	}

	/****************** 
		BUTTONS
	*******************/

	function addTeamButtonPressed() {
		addTeam(true);
	}

	function addTeam(add) {
		counter++;
		header.show();

		var row = getRow(counter);
		$(".team_table tbody").append(row);
		
		if (add) {
			Teams.push(new Team());
			SetCookies();
		}

		return row;
	}

	function removeTeam() {
		
		if (counter > 0) {
			counter--;
			var lastRow = $(".team_table tr:last");
			lastRow.remove();
			Teams.splice(-1, 1);
			SetCookies();

			if (counter == 0) {
				header.hide();
			}

		} else {
			// TODO?
		}
	}

	var DURATION = 300;

	function togglePopup (event) {
		var popup = $(".popup");

		var c = $(".table_container")[0];
	    if (event.target == c || $.contains(c, event.target)) {
	    	console.log("Popup itself was clicked; return");
	        return;
	    }

		var isVisible = popup.css("display") == "block";

		if (!isVisible) {
			showPopup();
		} else {
			hidePopup();
		}
	}

	function showPopup() {
		var popup = $(".popup");

		popup.css("display", "inherit");
		popup.css("opacity", "0");
		popup.fadeTo(DURATION, 1, null);

		var popupTable = $(".team_table_ordered");
		popupTable.append(getHeader());
		popupTable.append(getBody());

		var sorted = GetSortedTeams();

		for (var i = 0; i < Teams.length; i++) {
			var team = sorted[i];
			var row = getPopupRow(i + 1, team);
			var fields = getInputFieldsFromRow(row);
			setFieldValues(team, fields);
			
			popupTable.find("tbody").append(row);
		}

		var height = (Teams.length + 2) * 35 + (Teams.length - 2) * 5;
		$(".popup_table_container").height(height);
	}

	function hidePopup() {
		var popup = $(".popup");
		
		popup.fadeTo(DURATION, 0, function() {
				popup.css("display", "none");
				var table = $(".team_table_ordered");
				table.html("");
			});
	}

	
	URL = "http://pubtrivia.thinkforce.eu/php/save.php"
		
	function finishGame() {
		console.log("FinishGame");
		// IsGameFinished();
		console.log(EncodeGame());
		post();
	}

	function post() {
		$.ajax({
		    type: 'POST',
		    url: URL,
		    data: EncodeGame(),
		    success: onSuccess,
		    error: onError,
		    contentType: "application/json"
		});

		// add: dataType: 'json' if response will be json
	}

	function onSuccess(data) {
		console.log("Data: " + data);
	}

	function onError(XMLHttpRequest, textStatus, errorThrown) {
		console.log("OnError: " + textStatus + " - " + errorThrown);
	}

	/****************** 
		SORTING LOGIC
	*******************/

	function updateTotal () {
		
		var row = $(event.target).closest("tr");
		var rowIndex = $("table tr").index(row);
		var team = Teams[rowIndex];

		var inputFields = getInputFieldsFromRow(row);
		var totalLabel = row.find(".total_field")[0];

		for (var i = 1; i < inputFields.length; i++) {
			
			var field = inputFields[i];
			var value = parseInt(field.value);
			
			if (value != undefined && !isNaN(value)) {
				var scoreIndex = i - 1;
				team.Scores[scoreIndex] = value;
			} else {
				console.log("value is undefined or nan");
			}
		}

		$(totalLabel).html(team.Total());

		team.Name = inputFields[0].value;
		SetCookies();
	}

	/****************** 
		COOKIE DATA HANDLING
	*******************/

	function addSavedTeams() {

		var counter = 0;

		for (var i = 0; i < Teams.length; i++) {
			var team = Teams[i];
			var row = addTeam(false);
			var fields = getInputFieldsFromRow(row);
			
			var totalField = getTotalFieldFromRow(row);
			totalField.html(team.Total());

			setFieldValues(team, fields);
		}
	}

	function setFieldValues(team, fields) {

		if (team.HasName()) { 
				fields[0].value = team.Name;
		}

		for (var j = 1; j < fields.length; j++) {
			var field = fields[j];
			var index = j - 1;
			var value = team.Scores[index];

			if (value != undefined && !isNaN(value) && value != 0) {
				field.value = value;
			}
		}
	}

});










