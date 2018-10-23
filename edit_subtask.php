<?php 
 include('dbconnect.php');
 // print_r($_POST);
 $idsubtask = $_POST["idsubtask"];
 $subtask = $_POST["subtask"];
 $date_subtask = $_POST["date_subtask"]; 
  $note = $_POST["note"]; 
  $sql = "UPDATE subtasks SET subtask='".$subtask."', Uwagi='".$note."',date_subtask='".$date_subtask."'  WHERE idsubtask='".$idsubtask."'";
 // $sql = "UPDATE subtasks SET subtask='".$subtask."',date_subtask='".$date_subtask."', Uwagi='".$note."''  WHERE idsubtask='".$idsubtask."'"; 
 if(mysqli_query($conn, $sql)) {
    echo 'succes';
    
} else {
     
    echo 'error'. mysqli_error($conn);
   
}
mysqli_close($conn);
 ?> 