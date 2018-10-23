<?php
include('dbconnect.php');


if(isset($_POST['idsubtask'])){
    $id = $_POST['idsubtask'];
    
    $query = "DELETE FROM subtasks WHERE idsubtask = '$id'";
    $delete = mysqli_query($conn, $query);
    if($delete){
        echo 'Zadanie zostało usunięte';
    }
        else
        {
        echo 'cos nie tak';
        }
}
 echo '<a class="return_link" href="index.php">Powrót</a>';
   ?>