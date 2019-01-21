<?php
header("Access-Control-Allow-Origin: *");
header("Content-TYpe: application/json; charset-UTF-8");

include_once 'config/db.php';
include_once 'objects/ratings.php';

$database = new Database();
$db = $database->getConnection();

$ratings = new Ratings($db);
$res = $ratings->getRatings();
$num = $res->rowCount();

if($num >0){
	
	$ratings_arr = array();
	
	while($row = $res->fetch(PDO::FETCH_ASSOC)){
		extract($row);
		
		$thisRating = array( "rating" => $rating );
		array_push($ratings_arr, $thisRating);
	}
	
	http_response_code(200);
	
	echo json_encode($ratings_arr);
}else{
	http_response_code(404);
	
	echo json_encode( array("message" => "No ratings were found.") );
}

?>