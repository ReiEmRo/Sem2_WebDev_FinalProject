
var xhr;
var parsedrecord;

function adddata4() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            parsedrecord = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", "https://data.calgary.ca/resource/2kp2-hsy7.json", true);
    xhr.send();
}

function searchArt(val) {
    var contents = '<tr><th>Art ID</th><th>Tab Name</th><th>Title</th><th>Artist</th><th>Address</th><th>Location</th></tr>';
    var searchFor = document.getElementById(val).value;

    for (var i = 0; i < parsedrecord.length; i++) {
        var row = "";
        var coordinates = "https://www.google.com/maps/place/";
        coordinates += parsedrecord[i].latitude + "," + parsedrecord[i].longitude;

        switch (val) {
            case "artid": row = parsedrecord[i].art_id.toString();
                break;
            case "tabname": row = parsedrecord[i].tab_name.toString();
                break;
            case "title": row = parsedrecord[i].title.toString();
                break;
            case "artist": row = parsedrecord[i].artist.toString();
                break;
        }

        if (row.toLowerCase().startsWith(searchFor.toLowerCase())) {
            contents += '<tr><td>' + parsedrecord[i].art_id + '</td>';
            contents += '<td>' + parsedrecord[i].tab_name + '</td>';
            contents += '<td>' + parsedrecord[i].title + '</td>';
            contents += '<td>' + parsedrecord[i].artist + '</td>';
            contents += '<td>' + parsedrecord[i].address + '</td>';
            contents += '<td style="text-align: center;"><a href="' + coordinates + '" target="_blank">Click to see on map</a></td></tr>';
        }
    }

    document.getElementById('output').innerHTML = contents;
}
