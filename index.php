<?php
 include('dbconnect.php');
$sql = "select * from categories ";
$sql2 = "select * from subcategories ";

$categories = mysqli_query($conn, $sql) or die ("error" . mysqli_error($conn));
$subcategories = mysqli_query($conn, $sql2) or die ("error" . mysqli_error($conn));
mysqli_close($conn);
?>

    <!DOCTYPE html>
    <html lang="pl">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tasks Management</title>

        <script src="vendor/jquery/jquery-3.3.1.min.js"></script>
        <script src="vendor/jquery/jquery-ui.min.js"></script>
        <script src="vendor/alertify/alertify.min.js"></script>


        <script defer src="scr/js/script.js"></script>

        <link rel="stylesheet" href="vendor/jquery/jquery-ui.min.css">
        <link rel="stylesheet" href="scr/css/style.css">

        <link rel="stylesheet" href="vendor/alertify/alertify.core.css" />
        <link rel="stylesheet" href="vendor/alertify/alertify.default.css" id="toggleCSS" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

    </head>

    <body>
        <header>
            <div id="txttime"></div>
            <div>SUPER TO DO LIST <span>by Jarek &amp Jurek</span></div>

            <div id="txtdata"></div>

        </header>
        <div class="wrapper">
        <div id="sidebar">
            <button id="adding-task">DODAJ ZADANIE</button>
            <button id="show-task-and-subtask" class="nav-button">Pokaż wszystko</button>
            <button id="show-task" class="nav-button">Widok zwykły</button>
            <button id="grey-skin" class="nav-button">Szara skórka</button>
           <button id="change-query" class="nav-button">Wszystkie zadania</button>
        </div>

        <div id="container">
            <!--add task form-->
            <!-- <div class="add-form">-->

            <div id="oneForm">

                <form method="post" action="add.php">
                    <table id="form">
                        <tr>
                            <td>Zadanie</td>
                            <td> <input type="text" name="task" id="task"></td>
                        </tr>
                        <tr>
                            <td>data rozpoczęcia</td>
                            <td><input type="date" name="begindate" id="begindate"></td>
                        </tr>
                        <tr>
                            <td>termin zakończenia</td>
                            <td> <input type="date" name="deadline" id="deadline"></td>
                        </tr>
                        <tr>
                            <td>priorytet</td>
                            <td> <input type="number" min="1" max="5" name="priority" id="priority"></td>
                        </tr>
                        <tr>
                            <td>kategoria</td>
                            <td>
                                <?php
                                    echo '<select name="category" id="category" >';
                                    echo '<option value="NULL">brak</option>';
                                    while($category = mysqli_fetch_array($categories))
                                    {

                                    echo'

                                    <option value="'.$category['idcat'].'">'.$category['category'].'
                                    </option>';
                                    }
                                    echo '</select>';?>
                            </td>
                        </tr>
                        <tr>
                            <td>podkategoria</td>
                            <td>
                                <?php
                                    echo '<select name="subcategory" id="subcategory" >';
                                    echo '<option value="NULL">brak</option>';
                                    while($subcategory = mysqli_fetch_array($subcategories))
                                    {

                                    echo'

                                    <option value="'.$subcategory['idsubcat'].'">'.$subcategory['subcategory'].'
                                    </option>';
                                    }
                                    echo '</select>';?>
                            </td>
                        </tr>
                        <tr>
                            <td>Powtarzanie zadania</td>
                            <td> <input type="number" min="0" name="period" id="period"></td>
                        </tr>
                        <tr>
                            <tr>
                                <td>Alarm</td>
                                <td> <input type="number" min="0" name="alarm" id="alarm"></td>
                            </tr>
                            <tr>
                                <tr>
                                    <td><input id="task-write" type="submit" value="zapisz"> <input id="cancel-write" type="button" value="anuluj"></td>
                                </tr>
                    </table>




                </form>
            </div>
            <!--  </div>  class add form-->


            <div id="tasks" class="main-table">
                <table id="table-task-show" class="table-task-show">
                    <thead class="table-tasks-th">
                        <tr>
                            <th>Nr</th>
                            <th>Zadanie</th>
                            <th>Data rozpoczęcia</th>
                            <th>Termin</th>
                            <th>Priorytet</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="table-tasks">


                    </tbody>
                </table>


            </div>
            <div id="edittask">
                <form method="post">
                    <table id="editform">
                        <tr>
                            <td>Zadanie</td>
                            <td> <input type="text" name="task" id="task_update"></td>
                        </tr>
                        <tr>
                            <td>data rozpoczęcia</td>
                            <td><input type="date" name="begindate_update" id="begindate_update"></td>
                        </tr>
                        <tr>
                            <td>termin zakończenia</td>
                            <td> <input type="date" name="deadline_update" id="deadline_update"></td>
                        </tr>
                        <tr>
                            <td>priorytet</td>
                            <td> <input type="number" min="1" max="5" name="priority" id="priority_update"></td>
                            <tr>
                                <td> <input type="submit" value="zapisz" id="write_update"><button id="cancel-write_update">anuluj</button></td>
                                <td></td>
                            </tr>
                            <!--</tr>
                   <tr>
                   <td><input id="task-write" type="submit" value="zapisz">           <input id="cancel-write" type="button" value="anuluj"></td>
                   </tr>-->
                    </table>


                </form>


            </div>
            <div id="show_subtasks" class="main-table">
                <table class="table-task-show">
                    <thead>

                    </thead>
                    <tbody id="subtasks">

                    </tbody>

                </table>
                <div id="show_subtask_child">

                </div>
            </div>
            <div id="editsubtask">
                <form method="post">
                    <table id="editform">
                        <tr>
                            <td>Podzadanie</td>
                            <td> <input type="text" name="subtask" id="subtask_update"></td>
                        </tr>
                        <tr>
                            <td>data rozpoczęcia</td>
                            <td><input type="date" name="subtaskdate_update" id="subtaskdate_update"></td>
                        </tr>
                        <tr>
                            <td>Uwagi</td>
                            <td> <input type="text" name="note" id="note"></td>
                        </tr>

                        <td> <input type="submit" value="zapisz" id="writesubtask_update"><button id="cancel-writesubtaks_update">anuluj</button></td>
                        <td></td>
                        </tr>
                        <!--</tr>
                   <tr>
                   <td><input id="task-write" type="submit" value="zapisz">           <input id="cancel-write" type="button" value="anuluj"></td>
                   </tr>-->
                    </table>

                </form>

            </div>
            <div id="addsubtask">
                <form method="post">
                    <table class="editform">
                        <tr>
                            <td>Podzadanie</td>
                            <td> <input type="text" name="newsubtask" id="newsubtask"></td>
                        </tr>
                        <tr>
                            <td>data rozpoczęcia</td>
                            <td><input type="date" name="newsubtaskdate" id="newsubtaskdate"></td>
                        </tr>
                        <tr>
                            <td>Uwagi</td>
                            <td> <input type="text" name="note" id="newnote"></td>
                        </tr>

                        <td> <input type="submit" value="zapisz" id="writesubtask_new"><button id="cancel-writesubtaks_new">anuluj</button></td>
                        <td></td>
                        </tr>
                        <!--</tr>
                   <tr>
                   <td><input id="task-write" type="submit" value="zapisz">           <input id="cancel-write" type="button" value="anuluj"></td>
                   </tr>-->
                    </table>

                </form>
            </div>
        </div>
        <div id="show-all" class="show-all">
        </div>
        <div class="modal-content">

        </div>

        </div>

<!--        <div id="table_div"></div>-->
    </body>

    </html>
