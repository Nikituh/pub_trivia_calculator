<?php

require_once 'conf.php';
require_once 'team.php';

$payload = file_get_contents('php://input');

$json = json_decode($payload);

$connection = new mysqli($mysql_server, $mysql_username, $mysql_password, $mysql_db);

if ($connection->connect_error) {
    printf($message_connection_failed, $mysqli->connect_errno, $mysqli->connect_error);
    echo("Error: " . $message_connection_error);
    exit;
}

$games = [];
$teams = [];
$scores = [];
$teamgames = [];

$result = query("SELECT * FROM Game");

while ($row = $result->fetch_assoc()) {
	$game = Game::FromRow($row);
	array_push($games, $game);
}

$result = query("SELECT * FROM Team");

while ($row = $result->fetch_assoc()) {
	$team = Team::FromRow($row);
	array_push($teams, $team);
}

$result = query("SELECT * FROM Score");

while ($row = $result->fetch_assoc()) {
	$score = Score::FromRow($row);
	array_push($scores, $score);
}

$result = query("SELECT * FROM TeamGame");

while ($row = $result->fetch_assoc()) {
	$teamgame = TeamGame::FromRow($row);
	array_push($teamgames, $teamgame);
}

$result->close();
$connection->close();

foreach ($games as $game) {
	foreach ($teamgames as $teamgame) {
		if ($game->Id == $teamgame->GameId) {
			$team = findTeam($teamgame->TeamId);
			$team = $team->ToNewObject();
			
			foreach ($scores as $score) {
				if ($score->GameId == $game->Id && $score->TeamId == $team->Id) {
					// echo($score->GameId . ": " . $score->TeamId . ": " . $score->Value . "\n");
					array_push($team->Scores, $score);
				}
			}

			array_push($game->Teams, $team);
		}
	}
}

toJSON($games);

/****************
	UTILS
****************/

function query($query) {

	global $connection;

	if ($result = $connection->query($query, MYSQLI_USE_RESULT)) {
		return $result;
	} else {
		return false;
	}
}

function toJSON($item) {
	echo(json_encode($item));
}

function findTeam($id) {
	global $teams;

	foreach ($teams as $team) {
		if ($team->Id == $id) {
			return $team;
		}
	}

	return null;
}

?>












