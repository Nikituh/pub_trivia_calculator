<?php

require_once 'conf.php';
require_once 'team.php';

// require_once 'setup.php';
// exit;

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
    echo("Error: " . $message_connection_error);
    exit;
}

if (insert_game($game)) {
	foreach ($teams as $team) {
		
		if (!insert_team($team)) {
			// echo("Error: Failed insert team " . $team->Name);
			// exit;
		}

		foreach ($team->Scores as $score) {
			if (!insert_score($score)) {
				echo("Error: Failed insert score of team " . $team->Name);
			}

			$teamgame = $score->GetTeamGame();
			
			if (!insert_teamgame($teamgame)) {
				echo("Error: Failed insert teamgame of team " . $team->Name);
				exit;
			}
		}
	}
} else {
	echo("Error: Failed insert game");
	exit;
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

function insert_teamgame($teamgame) {
	global $insert_teamgame;
	echo((string)$teamgame);
	$query = sprintf($insert_teamgame, $teamgame->Place, $teamgame->Points, $teamgame->GameId, $teamgame->TeamId);
	echo($query);
	return insert($query);
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















