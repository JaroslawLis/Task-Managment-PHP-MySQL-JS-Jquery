<?php
// print_r($_POST);

include('dbconnect.php');
$idtask = $_POST['idtask'];
$subtask = $_POST['subtask'];
$date_subtask = $_POST['date_subtask'];
$Uwagi = $_POST['Uwagi'];
// echo $idtask;
// echo $subtask;
// echo $date_subtask;
// echo $Uwagi;

// INSERT INTO subtasks (`idsubtask`, `subtask`, `date_subtask`, `Uwagi`, `idtask`) VALUES (NULL, 'test1', '2018-07-18', 'uwagi', '62');
$sql = "INSERT INTO subtasks (`subtask`, `date_subtask`, `Uwagi`, `idtask` ) VALUES ('".$subtask."','".$date_subtask."','".$Uwagi."','".$idtask."')" ;
// echo $sql;
if(mysqli_query($conn, $sql)) {
    echo 'succes';
    
} else {
    echo 'error'. mysqli_error($conn);
}
mysqli_close($conn);
   /*[idtask] => 61
    [subtask] => 1213
    [date_subtask] => 2018-07-18
    [Uwagi] => test*/


?>
   

