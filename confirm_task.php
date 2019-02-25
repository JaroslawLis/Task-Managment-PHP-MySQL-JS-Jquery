<?php 
 include('dbconnect.php');
 $idtask = $_POST["idtask"];
 $sql = "UPDATE tasks SET enddate=now() WHERE idtask='".$idtask."'";

 if(mysqli_query($conn, $sql)) {
    echo 'success';
    
} else {
     
    echo 'error'. mysqli_error($conn);
   
}
mysqli_close($conn);
 ?> 