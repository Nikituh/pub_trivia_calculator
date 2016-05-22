<?php

$mysql_server = 'd56958.mysql.zone.ee';
$mysql_username = 'd56958sa111914';
$mysql_password = '8N6VkrGj';
$mysql_db = 'd56958sd118164';

// TABLES

$table_game = 'Game';
$table_team = 'Team';
$table_score = 'Score';
$table_teamgame = 'TeamGame';

// COLUMNS

$column_id = 'id';
$column_date = "date";
$column_organizer = "organizer";

$column_name = 'name';

$column_team_id = 'teamid';
$column_game_id = 'gameid';
$column_value = 'value';

$column_place = 'place';
$column_points = 'points';

$insert_game = 'INSERT INTO '.$table_game.' SET '
	.$column_id.' = \'%s\', '
	.$column_date.' = \'%s\', '
	.$column_organizer.' = \'%s\'';

$insert_team = 'INSERT INTO '.$table_team.' SET '
	.$column_id.' = \'%s\', '
	.$column_name.' = \'%s\'';

$insert_score = 'INSERT INTO '.$table_score.' SET '
	// .$column_id.' = \'%s\', '
	.$column_value.' = \'%s\', '
	.$column_game_id.' = \'%s\', '
	.$column_team_id.' = \'%s\'';

$insert_teamgame = 'INSERT INTO '.$table_teamgame.' SET '
	// .$column_id. ' = \'%s\', '
	.$column_place. ' = \'%s\', '
	.$column_points. ' = \'%s\', '
	.$column_game_id.' = \'%s\', '
	.$column_team_id.' = \'%s\'';

$sql_table_test = "test_table";
$sql_table_accounts_col_test1 = "test1";
$sql_table_accounts_col_test2 = "test2";
$sql_table_accounts_col_test1 = "test3";

$sql_insert_test = 
	'INSERT INTO '.$sql_table_test.' SET '
		.$sql_table_accounts_col_test1.' = \'%s\', '
		.$sql_table_accounts_col_test2.' = \'%s\', '
		.$sql_table_accounts_col_test3.' = 0';
?>