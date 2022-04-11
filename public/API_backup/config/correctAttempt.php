<?php
include('query.php');

function timestampdiff($qw,$saw)
{
    $datetime1 = new DateTime("@$qw");
    $datetime2 = new DateTime("@$saw");
    $interval = $datetime1->diff($datetime2);
    return $interval->format('%Hh %Im');
}

 if($_POST){
     
   
    $get_data=select('game', array(
          "conditions"=>array(
                            "user_id"=>$_POST['user_id'],
                            "question_id"=>$_POST['question_id'],
                        )    
     ));
     
     $get_question_data =select('questions', array(
          "conditions"=>array(
                            "id"=>$_POST['question_id'],
                        )    
     ));
     
   
   
     
     if($get_data){
        $id=$get_data[0]['id'];
        
        $data=array(
        "data"=>array(
                "correct_attempt"=>$_POST['correct_attempt'],
                "time"=>$_POST['time'],
                "attempt"=>$_POST['attempt']
            )
        );
        $update_data=update('game',$data,$id);
        echo json_encode($update_data);
     }else{
         $data=array(
        "data"=>array(
                "user_id"=>$_POST['user_id'],
                "question_id"=>$_POST['question_id'],
                "attempt"=>$_POST['attempt'],
                "correct_attempt"=>$_POST['correct_attempt'],
                "time"=>$_POST['time'],
               "session_id"=>$_POST['session_id'],
               
            )
        );
        $insert_data = insert('game',$data);
        echo json_encode($insert_data);
     }
   
    
 }



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>  