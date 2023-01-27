
var xhr;
var parsedrecord;

function adddata2() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            parsedrecord = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", "https://data.calgary.ca/resource/ikeb-n5bc.json", true);
    xhr.send();
}

function searchSeat(val) {
    var contents = '<tr><th>Asset Type</th><th>Type Desc.</th><th>Finish Type</th><th>Asset Code</th>' +
                    '<th>Steward</th><th>Location Details</th><th>Map Location</th></tr>';
    var searchFor = document.getElementById(val).value;

    for (var i = 0; i < parsedrecord.length; i++) {
        var row = "";
        var coordinates = "https://www.google.com/maps/place/";
        coordinates += parsedrecord[i].latitude + "," + parsedrecord[i].longitude;

        switch (val) {
            case "assettype": row = parsedrecord[i].asset_type.toString();
                break;
            case "type": row = parsedrecord[i].type_description.toString();
                break;
            case "assetcode": row = parsedrecord[i].asset_cd.toString();
                break;
            case "steward": row = parsedrecord[i].steward.toString();
                break;
        }

        if (row.toLowerCase().startsWith(searchFor.toLowerCase())) {
            contents += '<tr><td style="text-align: center;">' + parsedrecord[i].asset_type + '</td>';
            contents += '<td>' + parsedrecord[i].type_description + '</td>';
            contents += '<td>' + parsedrecord[i].finish_type + '</td>';
            contents += '<td>' + parsedrecord[i].asset_cd + '</td>';
            contents += '<td>' + parsedrecord[i].steward + '</td>';
            contents += '<td>' + parsedrecord[i].location_detail + '</td>';
            contents += '<td style="text-align: center;"><a href="' + coordinates + '" target="_blank">Click to see on map</a></td></tr>';
        }
    }

    document.getElementById('output').innerHTML = contents;
}