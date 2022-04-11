<?php
include('query.php');

$datas=$_POST;


 if($_POST){
     
   
    $get_data=select('admin', array(
          "conditions"=>array(
                            "password"=>$_POST['password']
                        )    
     ));
     
 }
 if($get_data){
     echo 1;
 }else{
     echo 0;
 }
 
 header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 ?>