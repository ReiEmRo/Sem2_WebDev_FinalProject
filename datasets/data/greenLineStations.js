
var xhr;
var parsedrecord;

function adddata1() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            parsedrecord = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", "https://data.calgary.ca/resource/4y6b-yvdc.json", true);
    xhr.send();
}

function searchStations(val) {
    var contents = '<tr><th>Station</th><th>Station Name</th><th>Segment</th><th>Is Underground?</th><th>Location</th></tr>';
    var searchFor = document.getElementById(val).value;

    for (var i = 0; i < parsedrecord.length; i++) {
        var row = "";
        var coordinates = "https://www.google.com/maps/place/";
        coordinates += parsedrecord[i].latitude + "," + parsedrecord[i].longitude;

        switch (val) {
            case "segment": row = parsedrecord[i].segment.toString();
                break;
            case "name": row = parsedrecord[i].name.toString();
                break;
            case "order": row = parsedrecord[i].order.toString();
                break;
            case "underground": row = parsedrecord[i].underground.toString();
                break;
        }

        if (row.toLowerCase().startsWith(searchFor.toLowerCase())) {
            contents += '<tr><td style="text-align: center;">' + parsedrecord[i].order + '</td>';
            contents += '<td>' + parsedrecord[i].name + '</td>';
            contents += '<td style="text-align: center;">' + parsedrecord[i].segment + '</td>';
            contents += '<td style="text-align: center;">' + parsedrecord[i].underground + '</td>';
            contents += '<td><a href="' + coordinates + '" target="_blank">Click to see on map</a></td></tr>';
        }
    }

    document.getElementById('output').innerHTML = contents;
}