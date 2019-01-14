<?php
class Category{
	
	private $dbconn;
	private $table_name = "category";	
	
	public $category_id;
	public $name;
	
	
	public function __construct($dbconn){
		
		$this->dbconn = $dbconn;
	}
	
	public function getCategory(){
		
		$sql = "SELECT category_id, name FROM " . $this->table_name . " t ORDER BY t.name ASC;";
			
		$res = $this->dbconn->query($sql);	
		
		$res->execute();
		
		return $res;
	}
	
}

?>