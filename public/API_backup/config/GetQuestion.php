<?php
include('query.php');




 if($_POST){
     $datas=array(
          "conditions"=>array(
                             "status"=>1,
                             "session_id"=>$_POST["session_id"]
                        ),
          "order"=>array(
                        "id"=>'desc'
                    )     
     );
     
 
     
    $get_data=select('questions',$datas);
    
    // $get_data[0]['answer']=base64_encode($get_data[0]['answer']);
  
echo json_encode($get_data); 
 }
   





     


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");