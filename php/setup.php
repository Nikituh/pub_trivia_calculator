<?php

// CONSTANTS

$max_length = 50;

// TABLES

$table_team = 'team';

// COLUMNS

$column_teamname = 'name';
$column_id = 'id';

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

$sql_create_table_teams = 'CREATE TABLE ' . $table_team . ' ('
	.$column_id . ' INT NOT NULL PRIMARY KEY,' 
	.$column_teamname.' VARCHAR(' . $max_length . ') NOT NULL)';

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


$result = create_table($sql_create_table_teams, $table_team);

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










