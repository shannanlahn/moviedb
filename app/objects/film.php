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
	public $first_name;
	public $last_name;
	
	public function __construct($dbconn){
		
		$this->dbconn = $dbconn;
	}
	
	public function getFilms( ){
		
		
		$data = json_decode(file_get_contents('php://input'), true);		
		$where = "";
		$hasSearchInfo = false;
		
		if(isset($data['movieTitle']) ){
			if($data['movieTitle'] != ""){
				$where .=  " and f.title like '%" . $data['movieTitle'] . "%' ";
				$hasSearchInfo = true;
			}
		}
		
		if(isset($data['rating'])){
			if($data['rating'] != 'Rating' && trim( $data['rating'] ) != ""  ){
				$where .= " and f.rating = '" .$data['rating'] . "'";
			}
		}
		
		if(isset($data['category'])){
			if( $data['category'] != 'Category' && trim( $data['category'] ) !=  ""  ){
				$where .= " and y.category_id = " . $data['category'];
			}
		}
		if(!$hasSearchInfo){
			return false;
		}
		
		$sql = "SELECT 
				f.title, f.description, f.rating, f.release_year, 
				f.rental_duration, f.replacement_cost, f.special_features,  
				a.first_name, a.last_name, c.name, c.category_id, f.film_id, 
				y.film_id, y.category_id 
				
				FROM film f, actor a, film_actor x, category c, film_category y 
				
				WHERE 
					f.film_id = y.film_id and 
					y.category_id = c.category_id and 
					x.film_id = f.film_id and 
					x.actor_id = a.actor_id 
					" .  $where . " 
				
				ORDER BY f.title DESC;";

			
		$res = $this->dbconn->query($sql);	
		
		$res->execute();
		
		return $res;
	}
	
}
?>