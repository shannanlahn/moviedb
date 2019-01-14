<?php
class Ratings{
	
	private $dbconn;
	private $table_name = "film";	
	
	public $rating;
	
	
	public function __construct($dbconn){
		
		$this->dbconn = $dbconn;
	}
	
	public function getRatings(){
		
		$sql = "SELECT DISTINCT rating FROM " . $this->table_name . " t ORDER BY t.rating ASC;";
			
		$res = $this->dbconn->query($sql);	
		
		$res->execute();
		
		return $res;
	}
	
}

?>