<?php  
	
	include "config.php";

	if($_GET['title'])
	{
		$full_name = $_GET['title'];
        $query = "SELECT * FROM books WHERE title = '$title' ORDER BY id DESC";
	}
	else
	{
        $query = "SELECT * FROM books ORDER BY id DESC";
	}

		
	


	$books = array();

	
	$result = mysql_query($query);

	while($row = mysql_fetch_array($result)):
		$books[] = array(
			'id' => $row['id'],
			'title' => $row['title'], 
			'author' => $row['author'], 
			'description' => $row['description']
		);

	endwhile;

echo json_encode($books);

?>

