var xhr = new XMLHttpRequest();
var clients;
window.onload=loaddata;

function loaddata()
{
    var date = new Date();
    var formatted_date = "Today is: " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +
        "<br>Time: " + date.getHours() + ":" + (date.getMinutes() < 10 ? (`0${date.getMinutes()}`) : date.getMinutes());
    document.getElementById("date").innerHTML = formatted_date;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            clients = JSON.parse(this.responseText);
        }
    };
    xhr.open('GET', 'rentalclients.json', true);
    xhr.send();
}

function searchClient(val) {
    clearClients();
    var output = "";

    if(val!="") {
        for (var i = 0; i < clients.length; i++) {
            var id = clients[i].last_name.toString();

            if (id.toLowerCase().startsWith(val.toLowerCase())) {
                output += "<input type='radio' name='client' id='" + i + "' onchange='getClient()'><label for='" + i + "' >" +
                    clients[i].last_name.toString() + " " + clients[i].first_name.toString() + "</label><br>";
            }
        }
        if(output == "") {
            output = "No Data Found<br>";
        }
        output += "<br>";
    }
    document.getElementById('clients').innerHTML = output;
}

function getClient() {
    var list = document.getElementsByName("vehicle");
    for (var i =0; i<list.length; i++) {
        list[i].disabled = false;
    }
    var images = document.getElementsByClassName("RentalImgs");
    for (var i =0; i<images.length; i++) {
        images[i].style.opacity = 1;
    }
    document.getElementById('rack').disabled = false;
    document.getElementById('gps').disabled = false;
    document.getElementById('childseat').disabled = false;
    document.getElementById('days').disabled = false;
    document.getElementById('checkout').disabled = false;

    var val = document.querySelector("input[type='radio'][name='client']:checked").id;

    document.getElementById('name').innerHTML =
        clients[val].last_name.toString() + " " + clients[val].first_name.toString();
    document.getElementById('address').innerHTML = clients[val].address.toString();
    document.getElementById('state').innerHTML = clients[val].state_prov.toString();
    document.getElementById('email').innerHTML = clients[val].email.toString();
    document.getElementById('phone').innerHTML = clients[val].phone.toString();
}

function clearClients() {
    document.getElementById("output").style.display = "none";
    var list = document.getElementsByName("vehicle");
    for (var i =0; i<list.length; i++) {
        list[i].disabled = true;
    }
    var images = document.getElementsByClassName("RentalImgs");
    for (var i =0; i<images.length; i++) {
        images[i].style.opacity = 0.5;
    }
    document.getElementById('rack').disabled = true;
    document.getElementById('gps').disabled = true;
    document.getElementById('childseat').disabled = true;
    document.getElementById('days').disabled = true;
    document.getElementById('checkout').disabled = true;

    document.getElementById('name').innerHTML = "";
    document.getElementById('address').innerHTML = "";
    document.getElementById('state').innerHTML = "";
    document.getElementById('email').innerHTML = "";
    document.getElementById('phone').innerHTML = "";
}

function calcTotal() {
    var list = document.getElementsByName("client");
    for (var i =0; i<list.length; i++) {
        list[i].disabled = true;
    }

    document.getElementById("output").style.display = "block";
    var output = "";

    var vehicle = document.querySelector("input[name='vehicle']:checked").id;
    var price = 0;
    var type = "";

    switch (vehicle) {
        case "compact": price = 15; type = "Compact Vehicle";
            break;
        case "mid": price = 20; type = "Mid Size Vehicle";
            break;
        case "lux": price = 35; type = "Luxury Vehicle";
            break;
        case "truck": price = 40; type = "Van or Truck";
            break;
    }

    var days = document.getElementById("days").value;

    var total = (days*price);

    output += "<tr><td colspan='2'>Full Name: " + document.getElementById('name').innerHTML + "</td></tr>";
    output += "<tr><td colspan='2'>Address: " + document.getElementById('address').innerHTML + "</td></tr>";
    output += "<tr><td colspan='2'>State: " + document.getElementById('state').innerHTML + "</td></tr>";
    output += "<tr><td colspan='2'>Email: " + document.getElementById('email').innerHTML + "</td></tr>";
    output += "<tr><td colspan='2'>Phone: " + document.getElementById('phone').innerHTML + "</td></tr>";
    output += "<tr><td colspan='2'><p> </p></td></tr>";
    output += "<tr><td>" + type + " (" + days + " days)</td><td>$" + (days*price).toFixed(2) + "</td></tr>";

    if(document.getElementById('rack').checked) {
        total += (5*days);
        output += "<tr><td>Roof/Bycicle Rack (" + days + " days)</td><td>$" + (days*5).toFixed(2) + "</td></tr>";
    }
    if(document.getElementById('gps').checked) {
        total += 10;
        output += "<tr><td>GPS</td><td>$10.00</td></tr>";
    }
    if(document.getElementById('childseat').checked) {
        output += "<tr><td>Child Seat</td><td>Free</td></tr>";
    }

    output += "<tr><td colspan='2'><p> </p></td></tr>";
    output += "<tr><td>Total: </td><td>$" + total.toFixed(2) + "</td></tr>";

    document.getElementById("result").innerHTML = output;
}