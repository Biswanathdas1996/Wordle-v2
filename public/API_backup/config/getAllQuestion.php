<?php
include('query.php');
    
    $session_id= $_GET['session_id'];
    
    $get_data=select('questions',[
            "conditions"=>[
                "session_id"=>$session_id
                ]
        ]);
$response=[];
    foreach($get_data as $data){
        $temp_response = $data;
        $get_game_data = select('game',[
            "conditions"=>[
                "question_id"=>$data['id']
                ]
            ]);
            $correct=0;
            foreach($get_game_data as $c){
                if($c && $c['correct_attempt'] !== ''){
                    $correct++;
                }
            }
            
            
         $temp_response['total_user'] =count($get_game_data) ; 
         $temp_response['corect_ans'] =$correct ; 
        array_push($response,$temp_response);
    }
    
echo json_encode($response);


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");