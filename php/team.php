<?php

class Base
{
    public $Id;
}

class Team extends Base
{
    public $Name = "none";

    public $Scores = [];

    public function GenerateId() {
        $id = $this->Name;

        $id = str_replace(' ', '_', $id);
        $id = strtolower($id);
        
        $id = str_replace("ä", "", $id);
        $id = str_replace("õ", "", $id);
        $id = str_replace("ö", "", $id);
        $id = str_replace("ü", "", $id);

        $this->Id = $id;
    }

    public function GetTotal() {
        $total = 0;
        
        foreach ($this->Scores as $score) {
            $total += $score->Value;
        }

        return $total;
    }
    
    public function IsAnyScoreFieldEmpty() {
    
        foreach ($this->Scores as $score) {
            if ($score == 0) {
                return true;
            }        
        }

        return false;
    }

    public function SetScores($gameId, $scoreValues) {
       
        foreach($scoreValues as $scoreValue) {
            $score = new Score();
            
            $score->TeamId = $this->Id;
            $score->GameId = $gameId;
            $score->Value = $scoreValue;

            array_push($this->Scores, $score);
        }
    }

    public function ToNewObject() {
        $instance = new self();

        $instance->Id = $this->Id;
        $instance->Name = $this->Name;
        
        return $instance;
    }

    public static function FromRow($row) {
        $instance = new self();

        $instance->Id = $row['id'];
        $instance->Name = $row['name'];

        return $instance;
    }
}

class Game extends Base
{
    public $Date;

    public $Organizer;

    public $Teams = [];

    function __construct() {
       $this->Id = uniqid();
    }

    public static function FromRow($row) {
        $instance = new self();

        $instance->Id = $row['id'];
        $instance->Date = $row['date'];
        $instance->Organizer = $row['organizer'];

        return $instance;
    }

    public function ToMessage() {
        $message = "";

        $message .= "Date: " . $this->Date . "\n";
        $message .= "Organizer: " . $this->Organizer . "\n";
        $message .= "\n";
        echo("Teams: " . $this->Teams . "|");
        foreach ($this->Teams as $team) {
            $message .= $team->Name . ": " . $team->GetTotal() . "\n";
        }

        return $message;
    }
}

class Score extends Base
{
    public $TeamId;

    public $GameId;

    public $Value;

    public function GetTeamGame() {
        $teamgame = new TeamGame();

        $teamgame->GameId = $this->GameId;
        $teamgame->TeamId = $this->TeamId;
        $teamgame->Points = $this->Value;
        $teamgame->Place = 0;

        return $teamgame;
    }

    public static function FromRow($row) {
        $instance = new self();

        $instance->Id = $row['id'];
        $instance->TeamId = $row['teamid'];
        $instance->GameId = $row['gameid'];
        $instance->Value = $row['value'];

        return $instance;
    }
}

class TeamGame extends Base
{
    public $GameId;

    public $TeamId;

    public $Points;

    public $Place;

    function __construct() {
        $this->Place = 0;
    }

    public function __toString() {
        return $this->GameId . "/" . $this->TeamId . "/" . $this->Points . "/" . $this->Place;
    }

    public static function FromRow($row) {
        $instance = new self();

        $instance->Id = $row['id'];
        $instance->TeamId = $row['teamid'];
        $instance->GameId = $row['gameid'];
        $instance->Points = $row['points'];
        $instance->Place = $row['place'];
        
        return $instance;
    }
}

?>




