<?php
include('query.php');

$datas=$_POST;


 if($_POST){
     
   
    $get_data=select('game', array(
          "conditions"=>array(
                            "user_id"=>$_POST['user_id'],
                            "question_id"=>$_POST['question_id'],
                        )    
     ));
 }
 
 echo json_encode($get_data);
 
 header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


     ?>