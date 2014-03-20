<?php

	include 'config.php';
	

	$id = $_GET['id'];

//echo json_encode(array('success' => true)); exit;

	 $query = "DELETE FROM books WHERE id = '$id' ";

	 $result = mysql_query($query);

	//var_dump($result, $query);exit;
	

	 if ($result) 
	 {
	    echo json_encode(array('success' => true));
	 }
	 else 
	 {
	    echo json_encode(array(
	    	'success' => false,
	    	'msg' => 'Something wrong '
	    ));
	 }

	 ?>
	 
     