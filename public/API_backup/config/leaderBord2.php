<?php
include('connection.php');
include('query.php');

$session_id = $_POST['session_id'];


$sql = "SELECT SUM(TIMESTAMPDIFF(SECOND, A.new_start_time, A.new_end_time)) AS totalTime FROM `questions` A INNER JOIN `session` B ON A.session_id = B.id AND B.id = '$session_id' AND (A.status = 2 OR A.status = 1)";  
$retvale=mysqli_query($conn, $sql);  
$rows = mysqli_fetch_assoc($retvale);  
$total_time = $rows['totalTime'];
// --------------------------------------------------------

$sqlGetingTotalQuestion = "SELECT * FROM `questions` WHERE `session_id`= '$session_id' AND (`status` = 2 OR`status` = 1)";
$retvaleQuestion=mysqli_query($conn, $sqlGetingTotalQuestion);  
$no_of_question_done=mysqli_num_rows($retvaleQuestion);
//--------------------------------------------------------------

$avarage_time_per_question = $total_time / $no_of_question_done;

//-----------------------------------------------------------

$response = [];

$get_all_user = select('users');
    

   
if(mysqli_num_rows($retvaleQuestion) > 0){  
 while($question = mysqli_fetch_assoc($retvaleQuestion)){  
  
      
      
    foreach($get_all_user as $user){
        $user_score=[];
        $get_all_game_data=   select('game',[
            "conditions"=>[
                "question_id"=>$question['id'],
                "user_id"=>$user['id']
                ]
        ]);
        
        if($get_all_game_data){
            $score =0;
            if($get_all_game_data[0]['correct_attempt']){
                $score =$get_all_game_data[0]['correct_attempt'];
            }else{
                $score =6;
            }
            $user_score=[
                "question_id"=>$question['id'],
                "user_name"=>$user['name'],
                "user_contact_number"=>$user['contact_number'],
                "user_id"=>$user['id'],
                "score"=>(int) $score/$no_of_question_done
                ];
                
        }else{
              $user_score=[
                 "question_id"=>$question['id'],
                "user_name"=>$user['name'],
                "user_contact_number"=>$user['contact_number'],
                "user_id"=>$user['id'],
                "score"=>$avarage_time_per_question
                ];
        }
        array_push($response,$user_score);
        
        
    }
      
 } //end of while  
}  
   
   
   
$final_response=[];


    
  foreach($get_all_user as $udata){
      $temp_score=0;
      $temp_response=[];
      foreach($response as $data){
          if($udata['id'] == $data['user_id']){
              $temp_score+=$data['score'];
          }
      }
      
      if($total_time != $temp_score){
          $temp_response =[
        
                "user_name"=>$udata['name'],
                "user_contact_number"=>$udata['contact_number'],
                "user_id"=>$udata['id'],
                "score"=>$temp_score
          ];
          
        array_push($final_response,$temp_response); 
      }
     
  }




echo json_encode($final_response);



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");