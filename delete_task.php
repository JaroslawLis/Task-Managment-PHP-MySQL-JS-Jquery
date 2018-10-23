<?php
include('dbconnect.php');


if(isset($_POST['idtask'])){
    $id = $_POST['idtask'];
    
    $query = "DELETE FROM tasks WHERE idtask = '$id'";
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