
var xhr=new XMLHttpRequest();
var xmlQuiz;
window.onload=loadXML;

function loadXML() {

    document.getElementById("StartButton").addEventListener("click", function (){ startQuiz();},false);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            xmlQuiz = xhr.responseXML;
        }
    };
    xhr.open("GET", "FinalQuiz.xml", true);
    xhr.send();

}

function startQuiz() {
    document.getElementById("StartButton").disabled = true;
    document.getElementById("quizForm").innerHTML = "";

    var form = "<br><hr><br>";

    var x = xmlQuiz.getElementsByTagName("question");
    for (var i = 0; i < x.length; i++) {

        var qNum = x[i].getElementsByTagName("qnumber")[0].childNodes[0].nodeValue;
        var question = x[i].getElementsByTagName("qtitle")[0].childNodes[0].nodeValue;

        var a = x[i].getElementsByTagName("a")[0].childNodes[0].nodeValue;
        var b = x[i].getElementsByTagName("b")[0].childNodes[0].nodeValue;
        var c = x[i].getElementsByTagName("c")[0].childNodes[0].nodeValue;
        var d = x[i].getElementsByTagName("d")[0].childNodes[0].nodeValue;

        form += "<b>Question " + qNum + ": </b><br><p>" + question + "</p>" +
                "<input required type='radio' value='a' id='" + qNum + "a' name='q" + qNum + "'><label for='" + qNum + "a'> a) " + a + "</label><br><br>" +
                "<input type='radio' value='b' id='" + qNum + "b' name='q" + qNum + "'><label for='" + qNum + "b'> b) " + b + "</label><br><br>" +
                "<input type='radio' value='c' id='" + qNum + "c' name='q" + qNum + "'><label for='" + qNum + "c'> c) " + c + "</label><br><br>" +
                "<input type='radio' value='d' id='" + qNum + "d' name='q" + qNum + "'><label for='" + qNum + "d'> d) " + d + "</label><br><br>";
    }

    form += "<hr><br><input type='submit' value='Submit Quiz'>"

    document.getElementById("quizForm").innerHTML = form;
}

function gradeQuiz() {
    document.getElementById("StartButton").disabled = false;
    var results = "<br><hr><br>";
    var correct = 0;
    var questionCount = 0;

    var answers = xmlQuiz.getElementsByTagName("rightanswers")[0].childNodes[0].nodeValue;
    var array = answers.split(',');

    var x = xmlQuiz.getElementsByTagName("question");
    for (var i = 0; i < x.length; i++) {
        var qAnswer = array[i].toString();
        var selected = document.querySelector("input[name='q" + (i+1) + "']:checked").value;

        if (qAnswer == selected) {
            correct++;
        }

        questionCount = i + 1;
    }

    results += "<h2>Quiz Results: " + correct + "/" + questionCount + "</h2>";

    document.getElementById("quizForm").innerHTML = results;
}