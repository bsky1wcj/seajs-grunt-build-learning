<?php
    include "config.php";

    $id = $_GET['id'];
    $title = $_GET['title'];
    $author = $_GET['author'];
    $description = $_GET['description'];



    $validate = true;
    $validationError = array();

    if ($title === '') {
        $validate = false;
        $validationError[] = array(
            'target' => 'title_error', 
            'error'  => 'Title is required'
        );
    }

    if ($author === '') {
        $validate = false;
        $validationError[] = array(
            'target' => 'author_error', 
            'error'  => 'Author is required'
        );
    }



    if ($validate === true) {
		
    	if ( empty($id) ) 
        {
            $query = "INSERT INTO books (title, author, description) VALUE ('$title', '$author', '$description')";

            $result = mysql_query($query);

            if($result)
            {
                exit(json_encode(array('success' => true, 'msg' => 'Saved!')));
            }

    		
    	} 
        elseif ( $id > 0 )
        {
             $query = "UPDATE books SET title = '$title', author = '$author', description = '$description' WHERE id = '$id'";

             $result = mysql_query($query);

             if($result)
             {
                exit(json_encode(array('success' => true, 'msg' => 'Saved!')));
             }


    		
    	}
    }

    echo json_encode(array(
        'success' => false, 
        'msg'     => 'there is a problem, please check ', 
        'validationError' => $validationError
    ));
    ?>
