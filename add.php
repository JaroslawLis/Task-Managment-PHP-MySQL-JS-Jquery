<?php
include('dbconnect.php');
//print_r($_POST);
$task = $_POST['task'];
/*$begindate = $_POST['begindate'];
$begindate = ($_POST['begindate'] == ''? 'NULL' : "'".$_POST['begindate']."'");*/
$begindate = validiationDataToMslq($_POST['begindate']);

$deadline = validiationDataToMslq($_POST['deadline']);
$priority= $_POST['priority'];
$category_form= $_POST['category'];
/*if ($category_form == "null") {
    $category_form = NULL;
};*/
$subcategory_form= $_POST['subcategory'];
/*if ($subcategory_form == "null") {
    $subcategory_form = NULL;
};*/
// print_r( $subcategory_form);
$period_form= $_POST['period'];
$alarm_form= $_POST['alarm'];


$sql = "INSERT INTO tasks (`task`, `begindate`, `deadline`, `priority`, `category` , `subcategory` , `period` , `alarm`  ) VALUES ('".$task."',".$begindate.",".$deadline.",'".$priority."',".$category_form.",".$subcategory_form.",'".$period_form."','".$alarm_form."')";




/*$sql = "INSERT INTO tasks (`task`, `begindate`, `deadline`, `priority`, `category` , `subcategory` , `period` , `alarm`  ) VALUES ('".$task."','".$begindate."','".$deadline."','".$priority."',".$category_form.",".$subcategory_form.",'".$period_form."','".$alarm_form."')";*/
//echo $sql;


if(mysqli_query($conn, $sql)) {
    echo 'succes';
    
} else {
    echo 'error'. mysqli_error($conn);
}
mysqli_close($conn);

?>
   

