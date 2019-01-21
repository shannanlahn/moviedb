<?php
header("Access-Control-Allow-Origin: *");
header("Content-TYpe: application/json; charset-UTF-8");

include_once 'config/db.php';
include_once 'objects/category.php';

$database = new Database();
$db = $database->getConnection();

$categories = new Category($db);
$res = $categories->getCategory();
$num = $res->rowCount();

if($num >0){
	
	$category_arr = array();
	
	while($row = $res->fetch(PDO::FETCH_ASSOC)){
		extract($row);
		
		$cats = array(
			"category_id" => $category_id,
			"name" => $name	
		);
		array_push($category_arr, $cats);
	}
	
	http_response_code(200);
	
	echo json_encode($category_arr);
}else{
	http_response_code(404);
	
	echo json_encode( array("message" => "No categories were found.") );
}

?>