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
}

class Game extends Base
{
    public $Date;

    public $Organizer;

    public $Teams;

    function __construct() {
       $this->Id = uniqid();
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
}

?>




