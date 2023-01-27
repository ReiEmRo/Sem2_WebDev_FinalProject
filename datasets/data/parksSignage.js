
var xhr;
var parsedrecord;

function adddata3() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            parsedrecord = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", "https://data.calgary.ca/resource/97dx-rvjp.json", true);
    xhr.send();
}

function searchParkSigns(val) {
    var contents = '<tr><th>Asset Code</th><th>WAM ID</th><th>Type Desc.</th><th>Status</th>' +
                    '<th>Steward</th><th>Direction</th><th>Location</th></tr>';
    var searchFor = document.getElementById(val).value;

    for (var i = 0; i < parsedrecord.length; i++) {
        var row = "";
        var coordinates = "https://www.google.com/maps/place/";
        coordinates += parsedrecord[i].point.coordinates[1] + "," + parsedrecord[i].point.coordinates[0];

        switch (val) {
            case "asset": row = parsedrecord[i].asset_cd.toString();
                break;
            case "wamid": row = parsedrecord[i].wam_id.toString();
                break;
            case "type": row = parsedrecord[i].type_description.toString();
                break;
            case "status": row = parsedrecord[i].life_cycle_status.toString();
                break;
        }

        if (row.toLowerCase().startsWith(searchFor.toLowerCase())) {
            contents += '<tr><td style="text-align: center;">' + parsedrecord[i].asset_cd + '</td>';
            contents += '<td style="text-align: center;">' + parsedrecord[i].wam_id + '</td>';
            contents += '<td>' + parsedrecord[i].type_description + '</td>';
            contents += '<td style="text-align: center;">' + parsedrecord[i].life_cycle_status + '</td>';
            contents += '<td>' + parsedrecord[i].steward + '</td>';
            contents += '<td style="text-align: center;">' + parsedrecord[i].direction + '</td>';
            contents += '<td style="text-align: center;"><a href="' + coordinates + '" target="_blank">Click to see on map</a></td></tr>';
        }
    }

    document.getElementById('output').innerHTML = contents;
}