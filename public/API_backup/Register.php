<?php
include('query.php');

$datas = array(
    "conditions" => array(
        "status" => 0
    ),
    "order" => array(
        "id" => 'desc'
    )
);
$get_data = select('questions', $datas);

pr($get_data);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");