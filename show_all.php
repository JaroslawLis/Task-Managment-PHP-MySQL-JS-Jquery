<?php
include('dbconnect.php');
$sql1 = "select * from tasks ";
$sql = "select *,  DATE_FORMAT(date,'%d/%m/%Y')  from tasks ";
$result = mysqli_query($conn, $sql) or die ("error" . mysqli_error($conn));


$number = 1;

if (mysqli_num_rows($result) > 0) {
    // output data of each row
   /* '<tr><td>' + number + '</td><td class="id">' + response[index].idtask + '</td><td class="task-in-table">' + response[index].task + '</td><td class="date-in-table">' + response[index].begindate + '</td><td class="deadline_date">' + response[index].deadline + '</td><td class="priority">' + response[index].priority + '</td><td><button id="remove">usuń</button></td><td><button id="edit">edytuj</button></td><td><button id="subtask">podzadania</button></td></tr>');*/
     echo '<ol class="ol-task">';


    while($row = mysqli_fetch_assoc($result)) {
        $idtask = $row["idtask"];
         echo "<li>" . $row["task"]. "</li>";

        checkSubtask($idtask, $conn);
    }
    echo "</ol>";
} else {
    echo "0 results";
}

function checkSubtask($idtask, $conn) {
    $sql3 = "select * from subtasks where idtask='".$idtask."' ";
    $result3 = mysqli_query($conn, $sql3) or die ("error" . mysqli_error($conn));
    if (mysqli_num_rows($result3) > 0) {

    echo '<ol class="ol-subtask">';
    while($row2 = mysqli_fetch_assoc($result3)) {

        echo "<li>" . $row2["subtask"]. "</li>";

    }

   echo "</ol>";
}
}

?>
