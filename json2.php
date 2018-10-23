<?php
include('dbconnect.php');

$sql = "select * from subtasks";
$sql2 = "select idsubtask, idtask, subtask, DATE_FORMAT(date_subtask, '%d/%m/%Y' ) AS date_subtask from subtasks ";
$sql3 = "select *, subtask, DATE_FORMAT(date_subtask, '%d/%m/%Y' ) AS *, date_subtask from subtasks ";

$result = mysqli_query($conn, $sql) or die ("error" . mysqli_error($conn));

$myTasks = array();
while($row = mysqli_fetch_assoc($result)) {
  if ($row['date_subtask'] == '0000-00-00') {
        $row['date_subtask'] = '';
    }else {
    
    $date = new DateTime($row['date_subtask']);
    $row['date_subtask'] = $date->format('d-m-Y');
    }
    $myTasks[] = $row;
}
mysqli_close($conn);
header('Content-Type: application/json');
$json = json_encode($myTasks);
echo $json;
?>