//$(document).ready(function () {

const settings = {
    display_query: "without_courses",
}

var idtask_update, task_update, begindate_update, deadline_update, priority_update, idtask_subtask, idsubtask_update, subtask_update, subtaskdate_update, note, temporary_task;
var active_button_adding_task = true;
var grey_flag = false;

const listener_for_table = function (e) {
    let target = e.target;
    if (target.className == 'far fa-check-square') {
        console.log(target.dataset.idtask, target.dataset.task);
        mark_task_as_done(target.dataset.idtask, target.dataset.task);
    }
}

showData();
$('#adding-task').click(function () {

    if (active_button_adding_task) {
        $('#oneForm').slideToggle();
        $('#oneForm').css('position', 'absolute');
        $('.modal-content').css('display', 'block');
        $('#oneForm').css('z-index', 3000);
    }
});


$("#cancel-write").click(function (e) {
    e.preventDefault();
    $(this).closest('form').find("input[type=text], textarea").val("");
    $(this).closest('form').find("input[type=date], textarea").val("");
    $("#oneForm").slideToggle();
    $('.add-form').removeAttr("style");
    $('.modal-content').css('display', 'none');
    // $('.add-form').css('z-index',null);

});

// add task
$('#oneForm').submit(function (e) {
    e.preventDefault();
    var Data = $('#oneForm');
    var task = $('#task').val();
    var begindate = $('#begindate').val();
    var deadline = $('#deadline').val();
    var priority = $('#priority').val();
    var category = $('#category').val();
    var subcategory = $('#subcategory').val();
    var period = $('#period').val();
    var alarm = $('#alarm').val();


    $.ajax({
        type: "POST",
        url: "add.php",
        data: { //dane do wysyłki
            idtask_update: idtask_update,
            task: task,
            begindate: begindate,
            deadline: deadline,
            priority: priority,
            category: category,
            subcategory: subcategory,
            period: period,
            alarm: alarm
        },

        success: function (response) {
            empty_form();
            showData();
            alertify.success("Dodano nowy rekord");
            $('#oneForm').slideToggle();
            $('.add-form').removeAttr("style");
            $('.modal-content').css('display', 'none');
            // console.log(response);
        }
    });

});

$('#table-task-show').on('click', listener_for_table);



// remove task
$(document).on('click', '#remove', function () {
    // e.preventDefault();
    var task = $(this).closest('tr').find('td.task-in-table').text();
    var idtask = $(this).closest('tr').find('td.id').text();
    alertify.confirm("Czy usunąć zadanie: <br><b> " + task + "</b>", function (e) {

        if (e) {
            $.post("delete_task.php", {
                    idtask: idtask
                })
                .done(function (data) {
                    showData();
                });
            alertify.success("Zadanie:   <br>" + task + "<br>   zotało usunięte");
        } else {
            alertify.error("Anulowanie");
        }
    });







});
// edit task
$(document).on('click', '#edit', function (e) {
    e.preventDefault();
    $('.add-form').slideToggle();
    //if(confirm('Are you sure?')){

    idtask_update = $(this).closest('tr').find('td.id').text();
    task_update = $(this).closest('tr').find('td.task-in-table').text();
    begindate_update = $(this).closest('tr').find('td.date-in-table').text();
    deadline_update = $(this).closest('tr').find('td.deadline_date').text();
    priority_update = $(this).closest('tr').find('td.priority').text();
    // console.log(begindate_update);

    $('#tasks').slideToggle();
    $('#edittask').slideToggle();
    $('input#task_update').val(task_update);
    $('input#begindate_update').val(begindate_update);
    //console.log( $('input#begindate_update').text());
    $('input#deadline_update').val(deadline_update);
    $('input#priority_update').val(priority_update);



    //console.log(task_update);

});


$('#write_update').click(function (e) {
    e.preventDefault();
    //  console.log(idtask_update);
    var idtask = idtask_update;
    var task = $('#task_update').val();
    var begindate = $('#begindate_update').val();
    var deadline = $('#deadline_update').val();
    var priority = $('#priority_update').val();

    $.ajax({
        type: "POST",
        url: "edit.php",
        data: { //dane do wysyłki
            idtask: idtask,
            task: task,
            begindate: begindate,
            deadline: deadline,
            priority: priority
        },

        success: function (response) {
            showData();
            alertify.success("Dokonano edycji zadania");
        }

    });
    $('#tasks').slideToggle();
    $('#edittask').slideToggle();


});

// cancel of write update
$("#cancel-write_update").click(function (e) {
    e.preventDefault();
    $('#edittask').slideToggle();
    $('#tasks').slideToggle();
    $('.add-form').slideToggle();

});
//end of write update
//show subtask
$(document).on('click', '#subtask', function (e) {
    $('.add-form').slideToggle();
    active_button_adding_task = false;
    $('#oneForm').hide();
    //$('#adding-task').off(); // turn off "dodaj zadanie"
    e.preventDefault();
    idtask_subtask = $(this).closest('tr').find('td.id').text();
    temporary_task = $(this).closest('tr').find('td.task-in-table').text();

    $('#tasks').slideToggle();
    $('#show_subtasks').slideToggle();


    showSubtasks()
});

// back from subtasks
$(document).on('click', '#comeback', function () {

    $('#tasks').slideToggle();
    $('#show_subtasks').slideToggle();
    active_button_adding_task = true;
    $('.add-form').slideToggle();

});

// remove subtask
$(document).on('click', '#remove_subtask', function () {
    // e.preventDefault();
    //if(confirm('Are you sure?')){

    var idsubtask = $(this).closest('tr').find('td.idsubtask').text();
    var subtask = $(this).closest('tr').find('td.task-in-table').text();

    // console.log(idsubtask);
    alertify.confirm("Czy usunąć zadanie: <br><b> " + subtask + "</b>", function (e) {

        if (e) {
            $.post("delete_subtask.php", {
                    idsubtask: idsubtask
                })
                .done(function (data) {
                    showSubtasks();
                });

            alertify.success("Zadanie:   <br>" + subtask + "<br>   zotao usunięte");
        } else {
            alertify.error("Anulowanie");
        }
    });






});
// confirm subtaks
$(document).on('click', '.confirm-task', function () {
    // e.preventDefault();

    console.log('zrobione');
    var idsubtask = $(this).closest('tr').find('td.idsubtask').text();
    var subtask = $(this).closest('tr').find('td.task-in-table').text();

    console.log(idsubtask);

    alertify.confirm("Czy oznaczyć jako zrobione podzadanie: <br><b> " + subtask + "</b>", function (e) {

        if (e) {
            $.post("confirm_subtask.php", {
                    idsubtask: idsubtask
                })
                .done(function (data) {
                    showSubtasks();
                });

            alertify.success("Zadanie:   <br>" + subtask + "<br>   zostało oznaczone");
        } else {
            alertify.error("Anulowanie");
        }
    });

    //end of confirm are you sure




});




// edit subtask - open form
$(document).on('click', '#edit_subtask', function () {
    //e.preventDefault();
    //if(confirm('Are you sure?')){

    idsubtask_update = $(this).closest('tr').find('td.idsubtask').text();
    subtask_update = $(this).closest('tr').find('td.task-in-table').text();
    subtaskdate_update = $(this).closest('tr').find('td.date-in-table').text();
    note = $(this).closest('tr').find('td.note').text();

    // console.log(idsubtask_update, subtask_update, subtaskdate_update, note);

    $('#show_subtasks').slideToggle();
    $('#editsubtask').slideToggle();
    $('input#subtask_update').val(subtask_update);
    $('input#subtaskdate_update').val(subtaskdate_update);
    $('input#note').val(note);

});
// edit subtask - write subtask
$('#writesubtask_update').click(function (e) {
    e.preventDefault();
    //  console.log(idsubtask_update);
    var id = idsubtask_update;
    var subtask = $('#subtask_update').val();
    var date_subtask = $('#subtaskdate_update').val();
    var note = $('#note').val();

    //console.log(id,subtask,date_subtask, note);

    // console.log("działa");
    $.ajax({
        type: "POST",
        url: "edit_subtask.php",
        data: { //dane do wysyłki
            idsubtask: id,
            subtask: subtask,
            date_subtask: date_subtask,
            note: note,
            //       priority: priority
        },

        success: function (response) {
            showSubtasks();
            //   console.table(response);
        },
        error: function (request, status, error) {

            var val = request.responseText;
            alert("error" + val);
        }

    });
    $('#show_subtasks').slideToggle();
    $('#editsubtask').slideToggle();


});
// end of  edit subtask - write subtask

// add new task open form
$(document).on('click', '#add-new-subtask', function () {
    $('#show_subtasks').slideToggle();
    $('#addsubtask').slideToggle();

});
$(document).on('click', '#cancel-writesubtaks_new', function (e) {
    e.preventDefault();
    $('#show_subtasks').slideToggle();
    $('#addsubtask').slideToggle();

});


$('#addsubtask').submit(function (e) {
    e.preventDefault();
    var idtask = idtask_subtask;
    var newsubtask = $('#newsubtask').val();
    var newsubtaskdate = $('#newsubtaskdate').val();
    var newnote = $('#newnote').val();
    $('#newsubtask').val('');
    $('#newnote').val('');
    $.ajax({
        type: "POST",
        url: "add_subtask.php",
        data: { //dane do wysyłki
            idtask: idtask,
            subtask: newsubtask,
            date_subtask: newsubtaskdate,
            Uwagi: newnote,
        },
        success: function (response) {
            showSubtasks();
            //console.dir(response);
        }
    });
    // showSubtasks();

    $('#addsubtask').slideToggle();

    $('#show_subtasks').slideToggle();

    //return false;
});
// listners .....................................................

$(document).on('click', '#show-task-and-subtask', function () {
    //$('#container').slideToggle();
    showAllData();

    // $('#show-task-and-subtask').text('Pokaż po staremu');
});
$(document).on('click', '#show-task', function () {
    showData();
});


//change skin grey skin


$(document).on('click', '#grey-skin', function () {
    grey_flag = !grey_flag;
    if (grey_flag) {
        $('#grey-skin').text('Zwykła skórka');
        $('.add-form, #tasks').css('box-shadow', '36px 59px 27px 0px rgba(122, 88, 21, 0)');
        const elem = document.querySelector('body');
        elem.style.setProperty("--background", "#6c757d99");
        elem.style.setProperty("--even-row", "#6c757d99");
        elem.style.setProperty("--odd-row", "#646E75");
    } else {
        $('#grey-skin').text('Szara skórka');
        const elem = document.querySelector('body');
        $('.add-form, #tasks').css('box-shadow', '');
        elem.style.setProperty("--background", "#e7a61a");
        elem.style.setProperty("--even-row", "#e9ae2f");
        elem.style.setProperty("--odd-row", "#d09516");
    }
});

$(document).on('click', '#change-query', function () {
    if (settings.display_query === 'without_courses') {
        settings.display_query = 'display_all_task'
        $('#change-query').text('Bez kursów');
    } else if (settings.display_query === 'display_all_task') {
        settings.display_query = 'without_courses';
        $('#change-query').text('Wszystkie zadania');
    }


    showData();

})

// End of Listeners .................................................

function showData(display_query = settings.display_query) {

    $('#table-tasks').empty();

    $.ajax({
        type: 'GET',
        url: 'json.php',
        data: {
            display_condition: display_query,
        },
        success: function (response) {
            // console.dir(response);
            $.each(response, function (index) {
                var number = response.indexOf(response[index]) + 1;
                $('#table-tasks').append('<tr><td>' + number + '</td><td class="id">' + response[index].idtask + '</td><td class="task-in-table">' + response[index].task + '</td><td class="date-in-table">' + response[index].begindate + '</td><td class="deadline_date">' + response[index].deadline + '</td><td class="priority">' + response[index].priority + '</td><td><button id="remove">usuń</button></td><td><button id="edit">edytuj</button></td><td><button id="subtask">podzadania</button></td><td class="mark_as_done"><i class="far fa-check-square" data-idtask="' + response[index].idtask + '" data-task="' + response[index].task + '"></i></td></tr>');

            });

            // console.log(response);

        }

    });

};
//






function showSubtasks() {

    $('#subtasks').empty();
    $('#show_subtask_child').empty();
    $.ajax({

        type: 'GET',

        url: 'show.php',
        data: { //dane do wysyłki
            idtask: idtask_subtask,

        },

        success: function (response) {
            //console.dir(response);
            if (response.length === 0) {
                //console.log('pusto');
                $('#subtasks').append('<tr><td>Nie masz podzadań dla tego zadania</td></tr><tr><td><button id="add-new-subtask">dodaj nowe podzadanie</button><button id="comeback">wróć</button></td></tr>');
            } else {
                $('#subtasks').append('<th colspan="6">' + temporary_task + '</th>');
                $('#subtasks th').css("background-color", "lightgray");
                $.each(response, function (index) {


                    var number = response.indexOf(response[index]) + 1;

                    $('#subtasks').append('<tr><td>' + number + '</td><td class="idsubtask">' + response[index].idsubtask + '</td><td class="task-in-table">' + response[index].subtask + '</td><td class="date-in-table">' + response[index].date_subtask + '</td><td class="note">' + response[index].Uwagi + '</td><td><button id="remove_subtask">usuń</button></td>//<td><button id="edit_subtask">edytuj</button></td><td class="confirm-task"><img src="scr\\img\\approved-151676_640.png" alt="" width="20px"> </td></tr>');

                });

                $('#show_subtask_child').append('<button id="comeback">wróć</button>');
                $('#show_subtask_child').append('<button id="add-new-subtask">dodaj nowe podzadanie</button>');
                // console.log(response);
            };
        }

    });

}

function showAllData2() {
    $('#show-all').empty();

    $.ajax({
        type: 'GET',
        url: 'show_all.php',

        success: function (response) {
            console.dir(response);
            $('#show-all').append(response);
        }

    });
    $('#show-all').slideToggle();
}

function showAllData(display_query = settings.display_query) {
    $('#table-tasks').empty();
    var call1 = $.ajax({
        type: 'GET',
        url: 'json.php',
        data: {
            display_condition: display_query,
        },
        success: function (response1) {

            return response1;
        }
    });

    var call2 = $.get('json2.php', function (response2) {
        return response2;
    });
    $.when(call1, call2).then(function (response1, response2) {
        console.log(response1[0]);

        console.log(response2[0]);
        var content = '';
        var content2 = '';
        var content3 = '';

        $.each(response1[0], function (index) {

            var idtask8 = response1[0][index].idtask;
            // console.log(idtask8);
            var number = response1[0].indexOf(response1[0][index]) + 1;
            $('#table-tasks').append('<tr class="task-in-row"><td>' + number + '</td><td class="id">' + response1[0][index].idtask + '</td><td class="task-in-table">' + response1[0][index].task + '</td><td class="date-in-table">' + response1[0][index].begindate + '</td><td class="deadline_date">' + response1[0][index].deadline + '</td><td class="priority">' + response1[0][index].priority + '</td><td><button id="remove">usuń</button></td><td><button id="edit">edytuj</button></td><td><button id="subtask">podzadania</button></td></tr><tr><ol>');
            //$('#table-tasks').append('<tr><ol>');
            //content2 +=
            //    var html= '<tr><ol>';
            var cos = '<tr><td colspan="8"><ol class="sub-tasks-ol">';
            cos += returnSubtask(response2, idtask8);
            cos += '</ol></td></tr>'
            //console.log(cos);
            $('#table-tasks').append(cos);
            /*$.each(response2[0], function (index) {
                   //console.log(response2[0][index].idtask);

                  if (response2[0][index].idtask == idtask8) {

                      //console.log(response2[0][index].idtask,response2[0][index].subtask);
                     /* $('#table-tasks').append('<li>' + response2[0][index].subtask + '</li>');*/
            //   html+='<li>' + response2[0][index].subtask + '</li>';


            // }
            //  ;
        });
        //  html +='</ol></tr>';
        //console.log(html);
        //  $('#table-tasks').append(html);
        //console.dir(content2);


        // console.log(response1, response2)
    }); // end of first each
    // $('#table-tasks').append(content) ;
    // });

}
// End of Show All data




function returnSubtask(response2, idtask8) {
    var html = '';
    $.each(response2[0], function (index) {
        //console.log(response2[0][index].idtask);

        if (response2[0][index].idtask == idtask8) {

            //console.log(response2[0][index].idtask,response2[0][index].subtask);
            /* $('#table-tasks').append('<li>' + response2[0][index].subtask + '</li>');*/
            html += '<li><span>' + response2[0][index].subtask + '</span><span>' + response2[0][index].date_subtask + '</span></li>';


        };
    });
    return html;
} // end of function return Subtask

function empty_form() {

    document.getElementById('task').value = "";
    document.getElementById('begindate').value = "";
    document.getElementById('deadline').value = "";
    document.getElementById('priority').value = "";
    // document.getElementById('category').value="";
    // document.getElementById('subcategory').value="";
    document.getElementById('period').value = "";
    document.getElementById('alarm').value = "";
}


// Clock
function leadingZero(i) {
    return (i < 10) ? '0' + i : i;
}

function showTextTime() {
    const currentDate = new Date();
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const textDate = leadingZero(currentDate.getDate()) + "." + leadingZero((currentDate.getMonth() + 1)) + "." + currentDate.getFullYear() + " - " + days[currentDate.getDay()];
    const textTime = leadingZero(currentDate.getHours()) + ":" + leadingZero(currentDate.getMinutes()) + ":" + leadingZero(currentDate.getSeconds());
    document.querySelector('#txtdata').innerHTML = textDate;
    document.querySelector('#txttime').innerHTML = textTime;
    setTimeout(function () {
        showTextTime()
    }, 1000);
}

function mark_task_as_done(idtask, task) {

    alertify.confirm("Czy oznaczyć jako zrobione zadanie: <br><b> " + task + "</b>", function (e) {
        if (e) {
            $.post("confirm_task.php", {
                    idtask: idtask
                })
                .done(function (data) {
                    showData();
                });

            alertify.success("Zadanie zostało oznaczone jako zrobione");
        } else {
            alertify.error("Anulowanie");
        }
    });

}
showTextTime();


//});