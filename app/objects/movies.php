<?php
class Film{
	
	private $dbconn;
	private $table_name = "film";
	
	public $film_id;
	public $title;
	public $description;
	public $release_year;
	public $language_id;
	public $original_language_id;
	public $rental_duration;
	public $rental_rate;
	public $length;
	public $replacement_cost;
	public $rating;
	public $special_features;
	public $last_update;
	
	public function __construct($dbconn){
		
		$this->conn = $dbconn;
	}
	
}

?>