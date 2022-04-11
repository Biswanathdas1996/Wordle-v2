<?php
include('query.php');

$datas=$_POST;


 if($_POST){
     
    $data=array(
        "data"=>array(
                "question"=>$_POST['question'],
                "answer" =>$_POST['ans'],
                "session_id" =>$_POST['session_id'],
                "status" =>0
            )
        );
        $insert_data = insert('questions',$data);
       
   
     
     
   echo json_encode($data); 
 }




header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>