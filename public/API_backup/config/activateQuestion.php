<?php
include('query.php');
date_default_timezone_set('Asia/Kolkata');

        $session_id=$_POST['session_id'];

          $get_data=select('questions',[
              "conditions"=>[
                  "session_id"=>$session_id
                  ]
              ]);
            foreach($get_data as $que){
                
               if($que['status'] === '1'){
                   $data=array(
                    "data"=>array(
                        "status"=>2
                    )
                );
                $update_data=update('questions',$data,$que['id']);
               }
                
                
                
           }

    

        $id=$_POST['id'];
        
        $current_time= time();
        
        $new_start_time =date('Y-m-d H:i:s');
        $new_end_time= date('Y-m-d H:i:s', strtotime('+3 minutes', strtotime($new_start_time)));
        if($_POST){
        $data=array(
            "data"=>array(
                     "status"=>1,
                     "start_time"=>$current_time,
                     "end_time"=>$current_time+(60*3.08),
                     "new_start_time"=>$new_start_time,
                     "new_end_time"=>$new_end_time,
                )
            );
            $update_data=update('questions',$data,$id);
        }



       echo $id; 





header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>  