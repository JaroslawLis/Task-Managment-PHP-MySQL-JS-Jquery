<?php
include('dbconnect.php');
$display_condition =($_GET['display_condition'])?$_GET['display_condition']:'';
$sql = "select * from tasks WHERE enddate IS NULL";
if ($display_condition === 'without_courses') {
    $sql = "SELECT * FROM tasks WHERE enddate IS NULL  AND (category<>4 OR category IS NULL)";
}
$result = mysqli_query($conn, $sql) or die ("error" . mysqli_error($conn));

$myTasks = array();
while($row = mysqli_fetch_assoc($result)) {
    if ($row['begindate'] == '0000-00-00' || $row['begindate'] == '')  {
        $row['begindate'] = '';
    } else {
    $date = new DateTime($row['begindate']);
    $row['begindate'] = $date->format('d-m-Y');
    }
    if ($row['deadline'] == '0000-00-00'  || $row['begindate'] == '') {
        $row['deadline'] = '';
    } else {
    $date = new DateTime($row['deadline']);
      $row['deadline'] = $date->format('d-m-Y');
    }
    $myTasks[] = $row;
}
mysqli_close($conn);
header('Content-Type: application/json');
$json = json_encode($myTasks);
echo $json;
?>