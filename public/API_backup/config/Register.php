<?php
include('query.php');

$datas=$_POST;


 if($_POST){
     
    $get_user=select('users', array(
          "conditions"=>array(
                            "contact_number"=>$_POST['contact_number'],
                            
                        )    
        )); 
     $data =[];
     if(!$get_user){
         $data=array(
        "data"=>array(
                "name"=>$_POST['name'],
                "contact_number"=>$_POST['contact_number'],
                
            )
        );
        $insert_data = insert('users',$data);
        $data = [
                "name"=>$_POST['name'],
                "id" =>$insert_data,
                
                ];
        
        
     }else{
          $data = [
                "name"=>$get_user[0]['name'],
                "id" =>$get_user[0]['id'],
                
                ];
         
         
     }
     
   echo json_encode($data); 
 }




header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>