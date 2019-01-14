<?php
class Database{
	
	
	
	//get connection to database
	public function getConnection(){
		
		$host 	 = "localhost";
		$db 	 = "sakila";
		$user 	 = "sakila";
		$pass 	 = "sakila";
		$charset = "utf8";
		$dbconn;
			
		$this->dbconn = null;
		$dsn = "mysql:host=" . $host.";dbname=" . $db . ";charset=" . $charset;
		$options = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		];
		try{
			$this->dbconn = new PDO($dsn, $user, $pass, $options);
			$this->dbconn->exec("set names utf8");			
			
		}catch(PDOException $ex){			
			echo "Connection fail: " . $ex->getMessage();
		}
		
		return $this->dbconn;
	}	
}
?>