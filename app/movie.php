<?php
header("Access-Control-Allow-Origin: *");
header("Content-TYpe: application/json; charset-UTF-8");

include_once 'config/db.php';
include_once 'objects/film.php';

$database = new Database();
$db = $database->getConnection();

$film_collection = new Film($db);
$res = $film_collection->getFilms( );
$num = 0;

if($res){
	$num = $res->rowCount();
}	
if($num >0){
	
	$film_arr = array();
	$film_arr['movies'] = array();
	$film_arr['actors'] = array();
	$thisTitle = '';
	
	//loop through results and build array to create JSON object with
	while($row = $res->fetch(PDO::FETCH_ASSOC)){
		extract($row);		
						
		if( $thisTitle != $title ){
			$thisTitle = $title;
			$film = array(
				"film_id" => $film_id,
				"title" => $title,
				"description" => $description,
				"release_year" => $release_year,
				"rating" => $rating,
				"rental_duration" => $rental_duration,
				"replacement_cost" => $replacement_cost,
				"special_features" => $special_features,
				"name" => $name,
				"actors" => array()
			);			

			array_push($film_arr["movies"], $film);
				
		}
		
		//appending actor array to the movie array 
		$actors = array(
			"first_name" => $first_name,
			"last_name" => $last_name,
			"film_id" => $film_id
		);
		
		array_push($film_arr["actors"], $actors);
	}
	
	http_response_code(200);
	
	echo json_encode($film_arr);
}else{
	http_response_code(404);
	
	echo json_encode( array("message" => "No movies were found.") );
}

?>