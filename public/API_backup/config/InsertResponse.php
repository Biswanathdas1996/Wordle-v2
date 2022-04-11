<?php
include('query.php');

$datas=$_POST;


 if($_POST && $_POST['user_id'] && $_POST['question_id']){
     
   
    $get_data=select('game', array(
          "conditions"=>array(
                            "user_id"=>$_POST['user_id'],
                            "question_id"=>$_POST['question_id'],
                        )    
     ));
     
     if($get_data){
        $id=$get_data[0]['id'];
        if($_POST){
        $data=array(
        "data"=>array(
                "attempt"=>$_POST['attempt'],
                "correct_attempt"=>$_POST['correct_attempt'],
                "time"=>$_POST['time'],
            )
        );
        $update_data=update('game',$data,$id);
        }
     }else{
         $data=array(
        "data"=>array(
                "user_id"=>$_POST['user_id'],
                "question_id"=>$_POST['question_id'],
                "attempt"=>$_POST['attempt'],
                "session_id"=>$_POST['session_id'],
                "correct_attempt"=>$_POST['correct_attempt'],
                "time"=>$_POST['time'],
               
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