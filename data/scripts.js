var counter = 0;
var curr_id = 0;
var arr = Array.apply(null, { length: 65 }).map(Number.call, Number);
console.log(arr);
var selections = [];
var new_data = {};
var new_arr = [];

$(document).ready(function () {
    $("#question-template").hide();
    $("#result").hide();
    $("#home").show();
});

function startQuiz() {
    $("#question-template").show();
    $("#result").hide();
    $("#home").hide();
    new_arr = shuffleArray(arr);
    curr_id = new_arr[counter];
    new_data = data[curr_id];
    changeQuestion(new_data);

    $("#next").click(function () {
        if (!$("input[name=question]:checked").val()) {
            alert("Keine Antwort ausgewählt!");
        }
        else {
            var chosen = $("input[name=question]:checked").val();
            if (chosen === new_data.correct) {
                var result = { "id": curr_id, "chosen": chosen, "correct": true };
            }
            else {
                var result = { "id": curr_id, "chosen": chosen, "correct": false, "correct_answ": new_data.correct };
            }
            selections.push(result);
            if (counter < 65) {
                counter = counter + 1;
                curr_id = counter;

                curr_id = new_arr[counter];
                new_data = data[curr_id];

                changeQuestion(new_data);
            }
            else {
                var score = 0;
                var text = "";
                var str = "";
                for (var i = 0; i < selections.length; i++) {
                    str_1 = "<div class='res_question'><h3>" + (i + 1) + ". " + data[selections[i].id].question + "</h3></div>";
                    answer = data[selections[i].id].answers[selections[i].chosen];
                    str_2 = "<div class='res_answer'><span>Deine Antwort: " + answer + "</span></div>";
                    $("#result").append("<div class='res' id='res_" + i + "'></div>");
                    if (selections[i].correct === true) {
                        score++;
                        text = "<div class='res_answer_correct'> Richtig </div>";
                        str_3 = "<div></div>";
                    }
                    else {
                        text = "<div class='res_answer_wrong'> Falsch </div>";
                        answer = data[selections[i].id].answers[selections[i].correct_answ];
                        str_3 = "<div class='res_answer'><span>Richtige Antwort: " + answer + "</span></div>";
                    }

                    $("#res_" + i).append(str_1);
                    $("#res_" + i).append(text);
                    $("#res_" + i).append(str_2);
                    $("#res_" + i).append(str_3)

                    $("#result #score")[0].innerHTML = score;

                    $("#result").show();
                    $("#question-template").hide();
                }
            }
        }
    });
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function changeQuestion(array) {
    $("#question-title")[0].innerHTML = array.question;
    var answers = $("#answers .answer-a");
    answers[0].innerHTML = array.answers.a;
    var answers = $("#answers .answer-b");
    answers[0].innerHTML = array.answers.b;
    var answers = $("#answers .answer-c");
    answers[0].innerHTML = array.answers.c;
    var answers = $("#answers .answer-d");
    answers[0].innerHTML = array.answers.d;

    $('input[name=question]').attr('checked', false);
    $(".counter")[0].innerHTML = (counter + 1) + " / 65";
}

function showQuestions() {
    for (var i = 0; i < data.length; i++) {
        str_1 = "<div class='res_question'><h3>" + (i + 1) + ". " + data[i].question + "</h3></div>";
        $("#result").append("<div class='question-res' id='res_" + i + "'></div>");
        $("#res_" + i).append(str_1);
        for (var x = 65; x < 69; x++) {
            str = String.fromCharCode(x).toLowerCase();
            answer = data[i].answers[str];
            str_3 = "<ol type='a' id='res_answer_" + i + "'></ol>"
            $("#res_" + i).append(str_3)
            if(str === data[i].correct) {
                str_3 = "<li class='res_answer_correct'>" + answer + "</li>";
            }
            else {
                str_3 = "<li class='res_answer'>" + answer + "</li>";
            }
           
            $("#res_answer_" + i).append(str_3)
        }

        $("#result").show();
        $("#score-block").hide();
        $("#question-template").hide();
        $("#home").hide();
    }
}