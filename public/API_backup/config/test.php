<?php
include('query.php');

//////////////////////////////////////////Select Query start \\\\\\\\\\\\\\
     $datas=array(
          "conditions"=>array(
                             "status"=>0
                        ),
          "order"=>array(
                        "id"=>'desc'
                    )     
     );
    $get_data=select('questions',$datas);

pr($get_data);

    // $get_data=select('Shopping_mall_list' 
    //                     ,array(
    //                     'conditions'=>array(
    //                             "city"=>37,
    //                         ),
    //                     'order'=>array(
    //                             'id'=>'asc'
    //                         ),
    //                     'join' =>array(
    //                             'shopping_mall_cities'=>'city',
    //                         ),    
    //                     'join_many' => array(
    //                             'shopping_mall_offer'=>'mall_id',
    //                         ),
    //                     // 'join_many_conditions'=>array(
    //                     //         'discount'=>50,
    //                     //         'category'=>4
    //                     //           ),
    //                     // "limit"=>2,
    //                     // "offset"=>5,
    //                 )
    //                 );
                    

    // echo "<pre>";
    // print_r($get_data);
    // echo "</pre>";
//////////////////////////////////////////Select Query end \\\\\\\\\\\\\\\\\
//////////////////////////////////////////Delete Query start \\\\\\\\\\\\\\\
    // $conditions=array(
    //         "name"=>'b',
    //         "logo"=>'a',
    //         "img"=>'c',
    //     );
    // $delete_data=delete('auto_dat',$conditions); 
 
 
 
    // $delete_data=delete('auto_dat',array(
    //         "name"=>'b',
    //         "logo"=>'a',
    //         "img"=>'c',
    //     ));
    // echo $delete_data;

//////////////////////////////////////////Delete Query end \\\\\\\\\\\\\\\\\\
//////////////////////////////////////////Update Query start \\\\\\\\\\\\\\\\\

 
       
        
        // $id=3;
        // if($_POST){
        // $data=array(
        // "data"=>array(
        //         "name"=>$_POST['name'],
        //     ),
        // "file"=>array(
        //         array(
        //                 "name"=>"img"
        //             ),
        //         array(
        //                 "name"=>"logo"
        //             )
        //         )
        // );
        // $update_data=update('auto_dat',$data,$id);
        //  echo $update_data;
        // }
        
 //////////////////////////////////////////Update Query end \\\\\\\\\\\\\\\\\ 
  //////////////////////////////////////////Insert Query start \\\\\\\\\\\\\\\\\ 
 
 
//  if($_POST){
//     $data=array(
//         "data"=>array(
//                 "name"=>$_POST['name'],
//             ),
//         "unique_field"=>array(
//              "name","logo"
//             ),    
//             // "upload_immage"=>array(
//             //       array(
//             //         "name"=>"img",
//             //         ),
//             //       array(
//             //         "name"=>"logo",
//             //         ),
//             //       array(
//             //         "name"=>"images",
//             //         "height"=>384,
//             //         "weidth"=>480)
//             // ),
//             "file"=>array(
//                 array(
//                         "name"=>"img"
//                     ),
//                 array(
//                         "name"=>"logo"
//                     )
//                 )
//         );
//     $insert_data = insert('auto_dat',$data);
//  }   
 ?>
 
 
 
 
<!-- <form action="" method="post" enctype="multipart/form-data">-->
<!--  Name:<br>-->
<!--  <input type="text" name="name" >-->
<!--  <br>-->
<!--  File:<br>-->
<!--  <input type="file" name="img" >-->
<!--  <br><br>-->
<!--   File:<br>-->
<!--  <input type="file" name="logo" >-->
<!--  <br><br>-->
  <!-- File:<br>-->
  <!--<input type="file" name="images" >-->
  <!--<br><br>-->
  
<!--  <input type="submit" value="Submit">-->
<!--</form> -->
 
 
 
 
 