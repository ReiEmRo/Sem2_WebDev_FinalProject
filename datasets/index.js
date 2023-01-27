
function getHTML() {
    var selected = document.getElementById("selections").value;
    var path = "data/";

    switch (selected) {
        case "1": path += "greenLineStations.html"; adddata1();
            break;
        case "2": path += "parkSeatings.html"; adddata2();
            break;
        case "3": path += "parksSignage.html"; adddata3();
            break;
        case "4": path += "publicArt.html"; adddata4();
            break;
        default: document.getElementById("htmlOutput").innerHTML = "";
    }

    if (path != "") {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("htmlOutput").innerHTML = xhr.responseText;
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }
}