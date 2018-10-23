<?php 
 include('dbconnect.php');
 
 $idtask = $_POST["idtask"];
 $task = $_POST["task"];
 $begindate = $_POST["begindate"]; 
 $deadline = $_POST["deadline"]; 
 $priority = $_POST["priority"]; 

 $sql = "UPDATE tasks SET task='".$task."',begindate='".$begindate."', deadline='".$deadline."', priority='".$priority."'  WHERE idtask='".$idtask."'"; 
 if(mysqli_query($conn, $sql)) {
    echo 'succes';
    
} else {
    echo 'error'. mysqli_error($conn);
   
}
mysqli_close($conn);
 ?> 