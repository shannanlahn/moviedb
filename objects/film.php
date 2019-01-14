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
	
	public function getFilms(){
		
		//var_dump($_POST);
		
		$where = "";
		
		if($_POST['rating'] != 'Rating'){
			$where .= " and f.rating = '" .$_POST['rating'] . "'";
		}
		
		if($_POST['category'] != 'Category'){
			$where .= " and y.category_id = " . $_POST['category'];
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
					and title like '%" . $_POST['movieTitle'] . "%' " 
					. $where . " 
				
				ORDER BY f.title DESC;";
			
		$res = $this->dbconn->query($sql);	
		
		$res->execute();
		
		return $res;
	}
	
}
?>