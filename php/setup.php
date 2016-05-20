<?php

require_once 'conf.php';

// CONSTANTS

$max_length = 100;

// MESSAGES

$message_starting_setup = '<b>Starting setup</b><br/>';
$message_connection_failed = 'Database connection failed (%s) %s<br/>';
$message_connection_successful = 'Database connection established<br/>';
$message_connection_closed = 'Database connection closed<br/>';
$message_failed_to_drop_table = 'Failed to drop table %s<br/>';
$message_created_table = 'Created table %s<br/>';
$message_failed_to_create_table = 'Failed to create table %s: %s<br/>';
$message_setup_successful = '<b>Setup successful<b/><br/>';
$message_setup_failed = '<b style="color: red">Setup failed<b/><br/>';

$failed_to_drop_table = "Failed to drop table";

// TABLES

$sql_create_table_game = 'CREATE TABLE ' . $table_game . ' ('
	.$column_id . ' VARCHAR(' . $max_length . ')  NOT NULL PRIMARY KEY,'
	.$column_date . ' VARCHAR(' . $max_length . ') NOT NULL,'
	.$column_organizer . ' VARCHAR(' . $max_length . ') NOT NULL)';

$sql_create_table_team = 'CREATE TABLE ' . $table_team . ' ('
	.$column_id . ' VARCHAR(' . $max_length . ')  NOT NULL PRIMARY KEY,' 
	.$column_name.' VARCHAR(' . $max_length . ') NOT NULL)';

$sql_create_table_score = 'CREATE TABLE ' . $table_score . ' ('
	.$column_id . ' INT NOT NULL PRIMARY KEY AUTO_INCREMENT,'
	.$column_team_id . ' VARCHAR(' . $max_length . ')  NOT NULL,'
	.$column_game_id . ' VARCHAR(' . $max_length . ')  NOT NULL,'
	.$column_value . ' INT NOT NULL)';

$sql_create_table_teamgame = 'CREATE TABLE ' . $table_teamgame . ' ('
	.$column_id . ' INT NOT NULL PRIMARY KEY AUTO_INCREMENT,'
	.$column_team_id . ' VARCHAR(' . $max_length . ')  NOT NULL,'
	.$column_game_id . ' VARCHAR(' . $max_length . ')  NOT NULL,'
	.$column_place . ' INT NOT NULL,'
	.$column_points . ' INT NOT NULL)';

// TABLE COMMANDS

$sql_drop_table = 'DROP TABLE IF EXISTS %s';

// ACTIONS

$mysqli = new mysqli($mysql_server, $mysql_username, $mysql_password, $mysql_db);

if ($mysqli->connect_error) {
    printf($message_connection_failed, $mysqli->connect_errno, $mysqli->connect_error);
    echo $message_setup_failed;
    exit;
} else {
	echo $message_connection_successful;
}


$result = create_table($sql_create_table_game, $table_game) && 
		  create_table($sql_create_table_team, $table_team) && 
		  create_table($sql_create_table_score, $table_score) &&
		  create_table($sql_create_table_teamgame, $table_teamgame);

// FUNCTIONS

function create_table($sql_create_table, $sql_table_name) {
	global $mysqli;
	global $sql_drop_table;
	global $message_failed_to_drop_table;
	global $message_created_table;
	global $message_failed_to_create_table;
	
	if (!$mysqli->query(sprintf($sql_drop_table, $sql_table_name))) {
		printf($failed_to_drop_table, $sql_table_name);
		return false;
	}

	if ($mysqli->query($sql_create_table)) {
		printf($message_created_table, $sql_table_name);
		return true;
	} else {
		printf($message_failed_to_create_table, $sql_table_name, $mysqli->error);
		return false;
	}
}

$mysqli->close();

if ($result) {
	echo $message_setup_successful;
} else {
	echo $message_setup_failed;
}

?>










