<?php


function pr($val=[]){
    echo "<pre>";
    print_r($val);
    echo "</pre>";
}

/////////////////////////////////////////////////////SELECT/////////////

function select($table,$condition=[]){
    include('connection.php');
    $table=mysqli_real_escape_string($conn, $table);
    // echo "<pre>";
    // print_r($condition);
    // echo "</pre>";
    
        if(isset($condition['limit'])){
            $limit= $condition['limit'];
            $limit=mysqli_real_escape_string($conn, $limit);
            $limitq="LIMIT $limit";
        }else{
            $limitq="LIMIT 10000000000000000000";
        }
    
        if(isset($condition['offset'])){
            $ofset= $condition['offset'];
            $ofset=mysqli_real_escape_string($conn, $ofset);
            $ofsetq="OFFSET $ofset";
        }else{
            $ofsetq="OFFSET 0";
        }
  
        if(isset($condition["conditions"])){
            $conditions=$condition["conditions"];
        }
    
        if(isset($condition['order'])){
            $order=$condition['order']; 
            $orders = [];
            foreach($order as $names => $vals){
                
                $orders = mysqli_real_escape_string($conn,$names)." ".mysqli_real_escape_string($conn,$vals);
         
            }
        }else{ $orders= "id asc"; }
        
        
                $table_name=$table;
                $linkp=mysqli_connect($host, $user, $pass);
                $db_selectedp = mysqli_select_db( $linkp,$dbname );
                $result = mysqli_query($linkp,"SHOW COLUMNS FROM $table_name");
                    if(mysqli_num_rows($result) > 0) {
                            $form_data=array();
                                while ($row = mysqli_fetch_assoc($result)) {
                                    $form_data[]=$row['Field'];
                                }
                    }
                $total_data=array();
                        if(isset($conditions)){
                            $columns = [];
                            foreach($conditions as $name => $val){
                                $columns[] = "$name = '".mysqli_real_escape_string($conn, $val)."'";
                            }
                            $sql = "SELECT * FROM `$table_name`  WHERE ".implode(" AND ", $columns)." ORDER BY $orders "."$limitq "." $ofsetq" ;
                        }else{
                            $sql = "SELECT * FROM `$table_name` ";
                        }
                        $retval=mysqli_query($conn, $sql);  
                            if(mysqli_num_rows($retval) > 0){ 
                                while($row = mysqli_fetch_assoc($retval)){ 
                                    $data=array();
                                        foreach($form_data as $value){  
                                            $data[$value]=$row[$value];
                                        }
                                        $join_test_id=$row['id'];
                                    if(isset($condition['join'])){ 
                                        foreach($condition['join'] as $keys =>$values){
                                            $join_table=mysqli_real_escape_string($conn, $keys);
                                            $result_join = mysqli_query($linkp,"SHOW COLUMNS FROM $join_table");
                                                if(mysqli_num_rows($result_join) > 0) {
                                                        $form_data_join=array();
                                                            while ($row_join_table = mysqli_fetch_assoc($result_join)) {
                                                                $form_data_join[]=$row_join_table['Field'];
                                                            }
                                                }
                                            $join_table_id=mysqli_real_escape_string($conn, $row[$values]);
                                            $sql_join = "SELECT * FROM `$join_table`  WHERE `id` = '$join_table_id'";
                                            $retval_joint=mysqli_query($conn, $sql_join);
                                                if(mysqli_num_rows($retval_joint) > 0){ 
                                                    while($row_join = mysqli_fetch_assoc($retval_joint)){
                                                            $data_join=array();
                                                            foreach($form_data_join as $values){  
                                                                    $data_join[$values]=$row_join[$values];
                                                             }
                                                    }
                                                    $data[$join_table]=$data_join;
                                                }
                                        }
                                    }
                                    if(isset($condition['join_many'])){
                                        
                                        foreach($condition['join_many'] as $keys =>$values){
                                            $join_table=mysqli_real_escape_string($conn, $keys);
                                            $foregin_key=mysqli_real_escape_string($conn, $values);
                                            $result_join = mysqli_query($linkp,"SHOW COLUMNS FROM $join_table");
                                                if(mysqli_num_rows($result_join) > 0) {
                                                        $form_data_join=array();
                                                            while ($row_join_table = mysqli_fetch_assoc($result_join)) {
                                                                $form_data_join[]=$row_join_table['Field'];
                                                            }
                                                }
                                            $join_id=mysqli_real_escape_string($conn, $join_test_id);
                                            
                                            
                                             if(isset($condition['join_many_conditions'])){
                                                $join_conditions=$condition['join_many_conditions']; 
                                                $join_columns = [];
                                                    foreach($join_conditions as $names => $vals){
                                                        $join_columns[] = "$names = '".mysqli_real_escape_string($conn, $vals)."'";
                                                    } 
                                                
                                                    $sql_join_many = "SELECT * FROM `$join_table`  WHERE `$foregin_key` = '$join_id' AND ".implode(" AND ", $join_columns)."";
                                                 
                                             }else{
                                                    $sql_join_many = "SELECT * FROM `$join_table`  WHERE `$foregin_key` = '$join_id'";
                                             }
                                            
                                            
                                            $retval_joint_many=mysqli_query($conn, $sql_join_many);
                                                if(mysqli_num_rows($retval_joint_many) > 0){ 
                                                    $many_data=[];
                                                    while($row_join_many = mysqli_fetch_assoc($retval_joint_many)){
                                                            $data_join_many=array();
                                                            foreach($form_data_join as $values){  
                                                                    $data_join_many[$values]=$row_join_many[$values];
                                                             }
                                                             if((int)$join_test_id===(int)$data_join_many[$foregin_key]){
                                                               $many_data[]=$data_join_many;
                                                               
                                                               
                                                             }else{
                                                                $many_data[]=0; 
                                                             }   
                                                            unset($data_join_many);
                                                            unset($sql_join_many);
                                                            unset($row_join_many);
                                                    }
                                                      unset($retval_joint_many);
                                                }else{
                                                    $many_data="";
                                                }
                                        }
                                        if(isset($many_data)){  
                                        $data[$join_table]=$many_data;
                                        }
                                    }
                                                $total_data[]=$data;
                                                unset($row);
                                }
                            }else{  
                            }
                            mysqli_close($conn);
                            return $total_data;
                 
} 

/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////DELETE////////////////////////

function delete($table,$conditions){
                include('connection.php');
                if($conditions){
                        $columns = [];
                        foreach($conditions as $name => $val){
                            $columns[] = "$name = '$val'";
                        }
                        $sql = "DELETE FROM `$table` WHERE ".implode(" AND ", $columns);
                    }else{
                        $sql = "DELETE FROM `$table` WHERE `id`='$id'";
                    }
                if(mysqli_query($conn, $sql)){  
                 echo "Record deleted successfully";  
                }else{  
                echo "Could not deleted record: ". mysqli_error($conn);  
                }
                mysqli_close($conn);
}
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////UPDATE//////////////////////////////
function update($table,$conditions,$id){
                $success=0;
                include('connection.php');
                $columns = [];
                            foreach($conditions['data'] as $name => $val){
                                $columns[] = "$name = '$val'";
                            }
                $sql= "UPDATE `$table` SET ".implode(" , ", $columns)." WHERE `$table`.`id` = $id";
                if(mysqli_query($conn, $sql)){
                    $success=1;
                   if(!empty($conditions["file"])){
                        foreach($conditions["file"] as $key => $up_img){
                            $path=$table."_".$up_img['name']."/";
                            $ext = pathinfo($_FILES[$up_img["name"]]['name'], PATHINFO_EXTENSION);
                            
                                $get_current_file=select($table,array(
                                        "conditions"=>array(
                                                'id'=>$id
                                            )
                                    ));
                                unlink($get_current_file[0][$up_img['name']]);
                            if(file_exists($path)){
                                move_uploaded_file($_FILES[$up_img["name"]]['tmp_name'],"$path/$id.$ext");
                            }
                            $datas=[];
                            $db_name_save=$path.$id;
                            $datas=array(
                                "data"=>array(
                                        $up_img["name"]=>$db_name_save.".".$ext
                                    ));
                            
                            $update_data=update($table,$datas,$id);
                            unset($datas);   
                        }
                        unset($get_current_file);
                    }    
                    
                    }else{  
                    echo "Could not update record: ". mysqli_error($conn);  
                    }
                mysqli_close($conn);
                return $success;
}
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////INSERT /////////////////////

function insert($table,$data){
    include('connection.php');
    include('immage_upload.php');
    
    // pr($data);
    // exit;
if(sizeof($data["unique_field"])>0){
    $check=[];
    foreach($data["unique_field"] as $keys => $vals){
        $check[$vals]=$keys;
    }
    $result=array_intersect_key($data["data"],$check);
    foreach($result as $keyss => $valss){
      $get_data=select($table,array(
            "conditions"=>array(
                     $keyss=>$valss
                )
          ));
        if(sizeof($get_data)>0){
          echo  "Sorry... ".$keyss." already exist.";
          return 0;
          die;  
        }
        else{}
    }
}   

    $fields=array();
    $values= array();
    foreach($data["data"] as $key => $val){
        $fields[]=$key;
        $values[]=$val;
    }  
    $matstring=implode("','",$values);
    $matstring_field=implode("`,`",$fields);
    
    $sql = "INSERT INTO `$table` (`$matstring_field`) VALUES ('$matstring')"; 
    
        if(mysqli_query($conn, $sql)){
            $last_id = mysqli_insert_id($conn);
             
        return $last_id;

    }else{  
    echo "Could not insert record: ". mysqli_error($conn);  
    }  
    mysqli_close($conn);
}

//////////////////////////////////////////////////////////////////////////
?>
