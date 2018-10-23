$(document).ready(function () {
    
    var idtask_update, task_update , begindate_update, deadline_update, priority_update ,idtask_subtask, idsubtask_update, subtask_update, subtaskdate_update, note;
    // var formatter = new Intl.DateTimeFormat( 'pl' );
    // $("#tasks").val($.datepicker.formatDate('dd M yy', new Date()));
    showData();
    
    $('#adding-task').click(function () {
        $('#oneForm').slideToggle();
    });
   
    $("#cancel-write").click(function (e) {
        e.preventDefault();
        $(this).closest('form').find("input[type=text], textarea").val("");
        $(this).closest('form').find("input[type=date], textarea").val("");
        $("#oneForm").slideToggle();

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
                // console.log(response);
            }
        });

    });

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


    });
    //end of write update
    //show subtask
    $(document).on('click', '#subtask', function (e) {
        $('#oneForm').hide();
        e.preventDefault();
        idtask_subtask = $(this).closest('tr').find('td.id').text();
        // console.log(idtask_subtask);
        $('#tasks').slideToggle();
        $('#show_subtasks').slideToggle();


        showSubtasks()
    });

    // back from subtasks
    $(document).on('click', '#comeback', function () {
        // e.preventDefault();
        console.log('te');
        $('#tasks').slideToggle();
        $('#show_subtasks').slideToggle();


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
     $(document).on('click', 'cancel-writesubtaks_new', function () {
        $('#show_subtasks').slideToggle();
        $('#addsubtask').slideToggle();

    });
    
    
    $('#addsubtask').submit(function (e) {
        e.preventDefault();
        var idtask = idtask_subtask;
        var newsubtask = $('#newsubtask').val();
        var newsubtaskdate = $('#newsubtaskdate').val();
        var newnote = $('#newnote').val();

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
        $('.add-form, #tasks').css('box-shadow', '36px 59px 27px 0px rgba(122, 88, 21, 0)');
        $('.add-form, #tasks, table#table-task-show tbody tr:nth-child(even)').css('background', '#6c757d');
        $('table#table-task-show tbody tr:nth-child(odd)').css('background', '#646E75');


        //   $(".show-all").toggleClass("show-all show-all1");
        //  $(".ol-task").toggleClass("ol-task ol-task1");
        //  $(".ol-subtask").toggleClass("ol-subtask ol-subtask1");
    });
   // End of Listeners .................................................

    function showData() {

        $('#table-tasks').empty();

        $.ajax({
            type: 'GET',
            url: 'json.php',
            success: function (response) {
                // console.dir(response);
                $.each(response, function (index) {                    
                    var number = response.indexOf(response[index]) + 1;
                    $('#table-tasks').append('<tr><td>' + number + '</td><td class="id">' + response[index].idtask + '</td><td class="task-in-table">' + response[index].task + '</td><td class="date-in-table">' + response[index].begindate + '</td><td class="deadline_date">' + response[index].deadline + '</td><td class="priority">' + response[index].priority + '</td><td><button id="remove">usuń</button></td><td><button id="edit">edytuj</button></td><td><button id="subtask">podzadania</button></td></tr>');

                });

                // console.log(response);

            }

        });

    }
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
                console.dir(response);
                if (response.length === 0) {
                    console.log('pusto');
                    $('#subtasks').append('<tr><td>Nie masz podzadań dla tego zadania</td></tr><tr><td><button id="add-new-subtask">dodaj nowe podzadanie</button><button id="comeback">wróć</button></td></tr>');
                } else {

                    $.each(response, function (index) {


                        var number = response.indexOf(response[index]) + 1;

                        $('#subtasks').append('<tr><td>' + number + '</td><td class="idsubtask">' + response[index].idsubtask + '</td><td class="task-in-table">' + response[index].subtask + '</td><td class="date-in-table">' + response[index].date_subtask + '</td><td class="note">' + response[index].Uwagi + '</td><td><button id="remove_subtask">usuń</button></td>//<td><button id="edit_subtask">edytuj</button></td></tr>');

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
    function showAllData() {
        $('#table-tasks').empty();
       var call1 =  $.get('json.php', function(response1){
          
           return response1;
       });
           
       var call2 =  $.get('json2.php', function(response2){
           return response2;
            });
           $.when(call1, call2).then(function (response1, response2) {
           console.log(response1[0]);
               
           console.log(response2[0]);
            var content = '';
            var content2='';
            var content3='';
            
           $.each(response1[0], function (index) {
              
                   var idtask8 = response1[0][index].idtask;
                // console.log(idtask8);
                    var number = response1[0].indexOf(response1[0][index]) + 1;
                 $('#table-tasks').append('<tr class="task-in-row"><td>' + number + '</td><td class="id">' + response1[0][index].idtask + '</td><td class="task-in-table">' + response1[0][index].task + '</td><td class="date-in-table">' + response1[0][index].begindate + '</td><td class="deadline_date">' + response1[0][index].deadline + '</td><td class="priority">' + response1[0][index].priority + '</td><td><button id="remove">usuń</button></td><td><button id="edit">edytuj</button></td><td><button id="subtask">podzadania</button></td></tr><tr><ol>');    
                 //$('#table-tasks').append('<tr><ol>');
                 //content2 += 
                    //    var html= '<tr><ol>';
                  var cos ='<tr><td colspan="8"><ol class="sub-tasks-ol">';
                  cos += returnSubtask( response2, idtask8);
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
                         html+='<li><span>' + response2[0][index].subtask + '</span><span>'+response2[0][index].date_subtask +'</span></li>';
                         
                        
                     }
                     ;
                  });
    return html;
}   // end of function return Subtask

    function empty_form() {
   
       document.getElementById('task').value="";
       document.getElementById('begindate').value="";
       document.getElementById('deadline').value="";
       document.getElementById('priority').value="";
       // document.getElementById('category').value="";
       // document.getElementById('subcategory').value="";
       document.getElementById('period').value="";
       document.getElementById('alarm').value="";  
    }
    
    /*function dateFormat(date) {
   return formatter.format( new Date(date) ); 
}*/
});
