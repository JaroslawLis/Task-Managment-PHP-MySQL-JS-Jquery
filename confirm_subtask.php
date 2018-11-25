<?php 
 include('dbconnect.php');
 $idsubtask = $_POST["idsubtask"];
 $sql = "UPDATE subtasks SET enddate_subtask=now() WHERE idsubtask='".$idsubtask."'";

 if(mysqli_query($conn, $sql)) {
    echo 'succes';
    
} else {
     
    echo 'error'. mysqli_error($conn);
   
}
mysqli_close($conn);
 ?> 