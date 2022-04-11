<?php
include('query.php');

$datas=$_POST;
$attempt = [];

 if($_POST){
    $status=0; 
   
    $get_data=select('game', array(
          "conditions"=>array(
                            "user_id"=>$_POST['user_id'],
                            "question_id"=>$_POST['question_id'],
                        )    
     ));
     
     $get_question_data=select('questions', array(
          "conditions"=>array(
                            "id"=>$_POST['question_id'],
                        )    
     ));
     
     if($get_data){
        $correct_attempt=$get_data[0]['correct_attempt'];
        $no_of_attempts=$get_data[0]['attempt'];
        $attempt = $get_data[0]['attempt'];
       if($correct_attempt){
           $status= 1;
       }else{
           if($no_of_attempts && count($no_of_attempts) == 6){
              $status= 2;
           }else{
                $status=  0;
           }
          
       }
     }else{
         $status=  0;
     }
   
    
 }


$response = [
    "data"=>$attempt,
    "status" =>$status,
    "answer" => $get_question_data[0]['answer']
    ];
        
echo json_encode($response);




header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>  