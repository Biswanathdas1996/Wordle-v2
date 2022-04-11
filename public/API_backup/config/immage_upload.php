<?php
function resizeUpload($file,$folderPath,$fileNewName,$targetWidth,$targetHeight)
	{
	    
	     
	    
		$targetHeight=$targetHeight;
		$targetWidth=$targetWidth;
		$ext='';
		if(is_array($file)) 
		{
			// pr($file);
			$file2=$file;
	        $file = $file['tmp_name']; 
	        
	        $sourceProperties = getimagesize($file);
	        $ext = pathinfo($file2['name'], PATHINFO_EXTENSION);
	        $imageType = $sourceProperties[2];
	        switch ($imageType) {

	            case IMAGETYPE_PNG:
	                $imageResourceId = imagecreatefrompng($file); 
	                $targetLayer = imageResize($imageResourceId,$sourceProperties[0],$sourceProperties[1],$targetWidth,$targetHeight);
	                imagepng($targetLayer,$folderPath. $fileNewName.'.'. $ext);
	                break;

	            case IMAGETYPE_GIF:
	                $imageResourceId = imagecreatefromgif($file); 
	                $targetLayer = imageResize($imageResourceId,$sourceProperties[0],$sourceProperties[1],$targetWidth,$targetHeight);
	                imagegif($targetLayer,$folderPath. $fileNewName.'.'. $ext);
	                break;

	            case IMAGETYPE_JPEG:
	                $imageResourceId = imagecreatefromjpeg($file); 
	                $targetLayer = imageResize($imageResourceId,$sourceProperties[0],$sourceProperties[1],$targetWidth,$targetHeight);
	                imagejpeg($targetLayer,$folderPath. $fileNewName.'.'. $ext);
	                break;

	            default:
	                // echo "Invalid Image type.";
	                exit;
	                break;
	        }
            $newpath=$folderPath."original_";
	        move_uploaded_file($file, $newpath. $fileNewName. ".". $ext);
	        // echo "Image Resize Successfully.";
    	}
    	return $ext;
	}
	function imageResize($imageResourceId,$width,$height,$targetWidth,$targetHeight)
	{
	   // $targetWidth=200;
	   // $targetHeight=200;
	    $targetLayer=imagecreatetruecolor($targetWidth,$targetHeight);
	    imagecopyresampled($targetLayer,$imageResourceId,0,0,0,0,$targetWidth,$targetHeight, $width,$height);
	    return $targetLayer;
	}  
// 	a:
?>