<?php

require_once 'conf.php';
require_once 'team.php';
// require_once 'setup.php';

$message_connection_error = "Error connecting to database";
$message_invalid_fields = "INVALID_DATA";
$message_great_success = "GREAT_SUCCESS";

$payload = file_get_contents('php://input');

// echo($payload);

$json = json_decode($payload, true);
$team_json = $json["teams"];

$game = new Game();
$game->Date = $json["date"];
$game->Organizer = $json["organizer"];

$teams = [];

foreach ($team_json as $item) {
	$name = $item["name"];
	
	if ($name == "none") {
		echo($message_invalid_fields);
		exit;
	}

	$scores = $item["scores"];

	$team = new Team();
	$team->Name = $name;	
	$team->GenerateId();

	$team->SetScores($game->Id, $scores);
	
	if ($team->IsAnyScoreFieldEmpty()) {
		echo($message_invalid_fields);
		exit;	
	}

	array_push($teams, $team);
}

$connection = new mysqli($mysql_server, $mysql_username, $mysql_password, $mysql_db);

if ($connection->connect_error) {
    printf($message_connection_failed, $mysqli->connect_errno, $mysqli->connect_error);
    echo($message_connection_error);
    exit;
}

if (insert_game($game)) {
	foreach ($teams as $team) {
		
		if (!insert_team($team)) {
			echo("Failed insert team ");
		}

		foreach ($team->Scores as $score) {
			if (!insert_score($score)) {
				echo("Failed insert score ");
			}

			// $teamscore = $score->GetTeamScore();

			// if (!insert_teamscore($teamscore)) {
			// 	echo("Failed insert teamscore");
			// }
		}
	}
} else {
	echo("Failed insert game");
}

echo($message_great_success);

$connection->close();

function insert_game($game) {
	global $insert_game;
	$query = sprintf($insert_game, $game->Id, $game->Date, $game->Organizer);
	return insert($query);
}

function insert_team($team) {
	global $insert_team;
	$query = sprintf($insert_team, $team->Id, $team->Name);
	return insert($query);
}

function insert_score($score) {
	global $insert_score;
	$query = sprintf($insert_score, $score->Value, $score->GameId, $score->TeamId);
	return insert($query);
}

function insert_teamscore($teamscore) {
	global $insert_teamscore;
	$query = sprintf($insert_teamscore, $teamscore->Place, $teamscore->Points, $teamscore->GameId, $teamscore->TeamId);
}

function insert($query) {
	global $connection;

	if ($connection->query($query)) {
		return true;
	} else {
		return false;
	}
}

?>















