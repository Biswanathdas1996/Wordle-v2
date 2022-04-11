<?php
 $host =   'localhost';  
     $user =   'sosalin_word';  
     $pass =   'Papun@1996';  
     $dbname = 'sosalin_word'; 
     
    $conn = mysqli_connect($host, $user, $pass,$dbname);  
    if(!$conn){  
      die('Could not connect: '.mysqli_connect_error());  
    }  
    
    
    
    ?>