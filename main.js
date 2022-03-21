var unit = "week";
var zone = "C";
var city = {};
var distance = 0;
$('#zone-select').val(zone);

var vacDay = "dS";
$('#dayVac-select').val(vacDay);

var heurVac = "00:00";
$('#time-Vac').val(heurVac);

var departZone = { 1: "A", 2: "B", 3: "A", 4: "B", 5: "B", 6: "B", 7: "A", 8: "B", 9: "C", 10: "B", 11: "C", 12: "C", 13: "B", 14: "B", 15: "A", 16: "A", 17: "A", 18: "B", 19: "A", 21: "A", 22: "B", 23: "A", 24: "A", 25: "A", 26: "A", 27: "B", 28: "B", 29: "B", 30: "C", 31: "C", 32: "C", 33: "A", 34: "C", 35: "B", 36: "B", 37: "B", 38: "A", 39: "A", 40: "A", 41: "B", 42: "A", 43: "A", 44: "B", 45: "B", 46: "C", 47: "A", 48: "C", 49: "B", 50: "B", 51: "B", 52: "B", 53: "B", 54: "B", 55: "B", 56: "B", 57: "B", 58: "A", 59: "B", 60: "B", 61: "B", 62: "B", 63: "A", 64: "A", 65: "C", 66: "C", 67: "B", 68: "B", 69: "A", 70: "A", 71: "A", 72: "B", 73: "A", 74: "A", 75: "C", 76: "B", 77: "C", 78: "C", 79: "A", 80: "B", 81: "C", 82: "C", 83: "B", 84: "B", 85: "B", 86: "A", 87: "A", 88: "B", 89: "A", 90: "A", 91: "C", 92: "C", 93: "C", 94: "C", 95: "C" };
var keyzone = Object.keys(departZone);

function findCity(userLatitude, userLongitude) {
	var longitude = userLongitude;
	var latitude = userLatitude;
	var promis = fetch("data.json")
		.then(response => {
			return response.json();
		})
		.then(jsondata => {
			var len = Object.keys(jsondata).length;
			for (let i = 0; i < len; i++) {
				findDistance(longitude, latitude, jsondata[i].longitude, jsondata[i].latitude);
				if (city.distance > distance || Object.keys(city).length === 0) {
					city = {}
					city.departement = jsondata[i].departement;
					city.ville = jsondata[i].ville;
					city.longitude = jsondata[i].longitude;
					city.latitude = jsondata[i].latitude;
					city.distance = distance;
				}
			}
			var len2 = Object.keys(keyzone).length;
			for (let i = 0; i < len2; i++) {
				if (keyzone[i] == city.departement) {
					zone = departZone[keyzone[i]]
				}
			}
		});
}


function findDistance(lon1, lat1, lon2, lat2) {
	var R = 6371e3; // R is earth’s radius
	var lat1radians = toRadians(lat1);
	var lat2radians = toRadians(lat2);
	var latRadians = toRadians(lat2 - lat1);
	var lonRadians = toRadians(lon2 - lon1);
	var a = Math.sin(latRadians / 2) * Math.sin(latRadians / 2) +
		Math.cos(lat1radians) * Math.cos(lat2radians) *
		Math.sin(lonRadians / 2) * Math.sin(lonRadians / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	distance = R * c;
	return distance
}
function toRadians(val) {
	var PI = 3.1415926535;
	return val / 180.0 * PI;
}


function test() {
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top": itemPosNewAnimTop.top + "px",
		"left": itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click", "li", function(e) {
		if (this.id == "Setting") {
			$('#zone-select').val(zone);
			$('#dayVac-select').val(vacDay);
			$('#time-Vac').val(heurVac);
			$("#myModal").css("display", "block");
		}
		else {
			unit = this.id;
		}
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top": itemPosNewAnimTop.top + "px",
			"left": itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
	$('#submit').on("click", function() {
		zone = $('#zone-select').val();
		vacDay = $('#dayVac-select').val();
		heurVac = $('#time-Vac').val();
		localStorage.setItem('zone', zone);
		localStorage.setItem('vacDay', vacDay);
		localStorage.setItem('heurVac', heurVac);
		dateVacance();
		$("#myModal").css("display", "none");
		$('#week').click();
	});
	$(window).on('resize', function() {
		setTimeout(function() { test(); }, 500);
	});
	$(".navbar-toggler").click(function() {
		console.log('yes');
		$(".navbar-collapse").slideToggle(300);
		setTimeout(function() { test(); });
	});
	// $(".navbar-toggle").on("click", function() {
	// 	console.log('yes');
	// 	$(".navbar-collapse").slideToggle(300);
	// });
	$(".close").on("click", function() {
		$("#myModal").css("display", "none");
		$('#week').click();
	});
	$(window).on("click", function(event) {
		if (event.target.id == "myModal") {
			$("#myModal").css("display", "none");
			$('#week').click();
		}
	});
}
$(document).ready(function() {
	setTimeout(function() { test(); });
});




// --------------add active class-on another-page move----------
jQuery(document).ready(function($) {
	if (localStorage.length == 0) {
		zone = "C";
		vacDay = "dS";
		heurVac = "00:00";
	}
	else {
		zone = localStorage.getItem('zone');
		vacDay = localStorage.getItem('vacDay');
		heurVac = localStorage.getItem('heurVac');
	}
	dateVacance()
	$('#zone-select').val(zone);
	$('#dayVac-select').val(vacDay);
	$('#time-Vac').val(heurVac);
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			findCity(position.coords.latitude, position.coords.longitude);
		});
		dateVacance();
	} else {
		console.log("Browser doesn't support geolocation!");
	}


	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if (path == '') {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
	// Add active class to target link
	target.parent().addClass('active');
});




$('#body').css('opacity', 0);
var dates = [];
var endDAtes = [];
var premierCercleSec = 0;
var deuxiemeCercleSec = 0;
var premierCercleMin = 0;
var deuxiemeCercleMin = 0;
var premierCercleHeure = 0;
var deuxiemeCercleHeure = 0;
var premierCercleDay = 0;
var deuxiemeCercleDay = 0;
var premierCercleWeek = 0;
var deuxiemeCercleWeek = 0;

var now;
var annee = '2021-2022'
var endpoint = ''.concat('https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&facet=description&facet=start_date&facet=end_date&facet=location&facet=zones&facet=annee_scolaire&refine.zones=Zone+', zone, '&refine.annee_scolaire=', annee, '&refine.location=Versailles&timezone=Europe%2FParis');

function dateVacance() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				$('#pb').css('diplay', "none");
				var response = JSON.parse(this.responseText);
				var len = Object.keys(response["records"]).length;
				for (let i = 0; i < len; i++) {
					if (response["records"][i]["fields"]["description"] == "Vacances de la Toussaint") {
						dates[0] = response["records"][i]["fields"]["start_date"];
						dates[0] = dates[0].substring(0, dates[0].length - 15);
						dates[0] = new Date(dates[0] + "T" + heurVac + ":00");
						if (vacDay == "dV") {
							dates[0].setDate(dates[0].getDate() - 1);
						}
						endDAtes[0] = response["records"][i]["fields"]["end_date"];
						endDAtes[0] = endDAtes[0].substring(0, endDAtes[0].length - 15);
						endDAtes[0] = new Date(endDAtes[0] + "T00:00:00");
					} else if (response["records"][i]["fields"]["description"] == "Vacances de Noël") {
						dates[1] = response["records"][i]["fields"]["start_date"];
						dates[1] = dates[1].substring(0, dates[1].length - 15);
						dates[1] = new Date(dates[1] + "T" + heurVac + ":00");
						if (vacDay == "dV") {
							dates[1].setDate(dates[1].getDate() - 1);
						}
						endDAtes[1] = response["records"][i]["fields"]["end_date"];
						endDAtes[1] = endDAtes[1].substring(0, endDAtes[1].length - 15);
						endDAtes[1] = new Date(endDAtes[1] + "T00:00:00");
					} else if (response["records"][i]["fields"]["description"] == "Vacances d'Hiver") {
						dates[2] = response["records"][i]["fields"]["start_date"];
						dates[2] = dates[2].substring(0, dates[2].length - 15);
						dates[2] = new Date(dates[2] + "T" + heurVac + ":00");
						if (vacDay == "dV") {
							dates[2].setDate(dates[2].getDate() - 1);
						}
						endDAtes[2] = response["records"][i]["fields"]["end_date"];
						endDAtes[2] = endDAtes[2].substring(0, endDAtes[2].length - 15);
						endDAtes[2] = new Date(endDAtes[2] + "T00:00:00");
					} else if (response["records"][i]["fields"]["description"] == "Vacances de Printemps") {
						dates[3] = response["records"][i]["fields"]["start_date"];
						dates[3] = dates[3].substring(0, dates[3].length - 15);
						dates[3] = new Date(dates[3] + "T" + heurVac + ":00");
						if (vacDay == "dV") {
							dates[3].setDate(dates[3].getDate() - 1);
						}
						endDAtes[3] = response["records"][i]["fields"]["end_date"];
						endDAtes[3] = endDAtes[3].substring(0, endDAtes[3].length - 15);
						endDAtes[3] = new Date(endDAtes[3] + "T00:00:00");
					} else if (response["records"][i]["fields"]["description"] == "Vacances d'Été") {
						dates[4] = response["records"][i]["fields"]["start_date"];
						dates[4] = dates[4].substring(0, dates[4].length - 15);
						dates[4] = new Date(dates[4] + "T" + heurVac + ":00");
						if (vacDay == "dV") {
							dates[4].setDate(dates[4].getDate() - 1);
						}
						endDAtes[4] = response["records"][i]["fields"]["end_date"];
						endDAtes[4] = endDAtes[4].substring(0, endDAtes[4].length - 15);
						endDAtes[4] = new Date(endDAtes[4] + "T00:00:00");
					}
				}
			} else {
				$('#pb').css('diplay', "block");
			}
		}

	};
	xhr.open('GET', endpoint, true);
	xhr.send();
}

var i = 0;
var j = 0;

var x = setInterval(function() {

	$.ajax({
		url: 'https://api-ratp.pierre-grimaud.fr/v4/traffic',
		dataType: 'json',
		data: {},
		success: function(jsondata) {
			$.map(jsondata, function() {
				now = jsondata._metadata.date;
				now = new Date(now.substring(0, now.length - 6));
			});
		}
	});

	var vacation = dates[i];
	var endVacation = endDAtes[j];
	var distance = vacation - now;
	if (distance > 0) {
		$('#body').css('opacity', 1);
	}
	if (j == 0) {
		var finAncienneVac = vacation - endDAtes[4]
	}
	else {
		var finAncienneVac = vacation - endDAtes[j - 1]
	}
	nbre_semaine = Math.round((vacation - endDAtes[j - 1]) / (1000 * 60 * 60 * 24 * 7));
	nbre_jours = Math.round((vacation - endDAtes[j - 1]) / (1000 * 60 * 60 * 24));
	nbre_heure = Math.round((vacation - endDAtes[j - 1]) / (1000 * 60 * 60));
	nbre_minute = Math.round((vacation - endDAtes[j - 1]) / (1000 * 60));
	nbre_seconde = Math.round((vacation - endDAtes[j - 1]) / 1000);
	// var unit = $('#unit').val();
	if (unit == "week") {
		$('#secondsTime').css('fontSize', "25px");
		$('#weeks').show();
		$('#days').show();
		$('#hours').show();
		$('#minutes').show();
		$('#seconds').show();
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (seconds <= 30) {
			premierCercleSec = (seconds * 180) / 30;
			deuxiemeCercleSec = 0;
		}
		if (seconds > 30) {
			premierCercleSec = 180;
			deuxiemeCercleSec = ((seconds - 30) * 180) / 30;
		}
		if (minutes <= 30) {
			premierCercleMin = (minutes * 180) / 30;
			deuxiemeCercleMin = 0;
		}
		if (minutes > 30) {
			premierCercleMin = 180;
			deuxiemeCercleMin = ((minutes - 30) * 180) / 30;
		}
		if (hours <= 12) {
			premierCercleHeure = (hours * 180) / 12;
			deuxiemeCercleHeure = 0;
		}
		if (hours > 12) {
			premierCercleHeure = 180;
			deuxiemeCercleHeure = ((hours - 12) * 180) / 12;
		}
		if (days <= 3.5) {
			premierCercleDay = (days * 180) / 3.5;
			deuxiemeCercleDay = 0;
		}
		if (days > 3.5) {
			premierCercleDay = 180;
			deuxiemeCercleDay = ((days - 3.5) * 180) / 3.5;
		}
		if (weeks <= (nbre_semaine / 2)) {
			premierCercleWeek = (weeks * 180) / (nbre_semaine / 2);
			deuxiemeCercleWeek = 0;
		}
		if (weeks > (nbre_semaine / 2)) {
			premierCercleWeek = 180;
			deuxiemeCercleWeek = ((weeks - (nbre_semaine / 2)) * 180) / (nbre_semaine / 2);
		}

		if (weeks == 0) {
			$("#week").prop('disabled', true);
			$("#unit").val("days");
		} else {
			$("#week").prop('disabled', false);
			$("#day").prop('disabled', false);
			$("#hour").prop('disabled', false);
			$("#minute").prop('disabled', false);
		}
	} else if (unit == "day") {
		$('#secondsTime').css('fontSize', "25px");
		$('#weeks').hide();
		$('#days').show();
		$('#hours').show();
		$('#minutes').show();
		$('#seconds').show();
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (seconds <= 30) {
			premierCercleSec = (seconds * 180) / 30;
			deuxiemeCercleSec = 0;
		}
		if (seconds > 30) {
			premierCercleSec = 180;
			deuxiemeCercleSec = ((seconds - 30) * 180) / 30;
		}
		if (minutes <= 30) {
			premierCercleMin = (minutes * 180) / 30;
			deuxiemeCercleMin = 0;
		}
		if (minutes > 30) {
			premierCercleMin = 180;
			deuxiemeCercleMin = ((minutes - 30) * 180) / 30;
		}
		if (hours <= 12) {
			premierCercleHeure = (hours * 180) / 12;
			deuxiemeCercleHeure = 0;
		}
		if (hours > 12) {
			premierCercleHeure = 180;
			deuxiemeCercleHeure = ((hours - 12) * 180) / 12;
		}
		if (days <= (nbre_jours / 2)) {
			premierCercleDay = (days * 180) / (nbre_jours / 2);
			deuxiemeCercleDay = 0;
		}
		if (days > (nbre_jours / 2)) {
			premierCercleDay = 180;
			deuxiemeCercleDay = ((days - (nbre_jours / 2)) * 180) / (nbre_jours / 2);
		}
		if (weeks == 0 && days == 0) {
			$("#week").prop('disabled', true);
			$("#day").prop('disabled', true);
			$("#unit").val("hours");
		} else {
			$("#day").prop('disabled', false);
			$("#hour").prop('disabled', false);
			$("#minute").prop('disabled', false);
		}
	} else if (unit == "hour") {
		$('#secondsTime').css('fontSize', "25px");
		$('#weeks').hide();
		$('#days').hide();
		$('#hours').show();
		$('#minutes').show();
		$('#seconds').show();
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(distance / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (seconds <= 30) {
			premierCercleSec = (seconds * 180) / 30;
			deuxiemeCercleSec = 0;
		}
		if (seconds > 30) {
			premierCercleSec = 180;
			deuxiemeCercleSec = ((seconds - 30) * 180) / 30;
		}
		if (minutes <= 30) {
			premierCercleMin = (minutes * 180) / 30;
			deuxiemeCercleMin = 0;
		}
		if (minutes > 30) {
			premierCercleMin = 180;
			deuxiemeCercleMin = ((minutes - 30) * 180) / 30;
		}
		if (hours <= (nbre_heure / 2)) {
			premierCercleHeure = (hours * 180) / (nbre_heure / 2);
			deuxiemeCercleHeure = 0;
		}
		if (hours > (nbre_heure / 2)) {
			premierCercleHeure = 180;
			deuxiemeCercleHeure = ((hours - (nbre_heure / 2)) * 180) / (nbre_heure / 2);
		}
		if (weeks == 0 && days == 0 && hours == 0) {
			$("#week").prop('disabled', true);
			$("#day").prop('disabled', true);
			$("#hour").prop('disabled', true);
			$("#unit").val("minute");
		} else {
			$("#hour").prop('disabled', false);
			$("#minute").prop('disabled', false);
		}
	} else if (unit == "minute") {
		$('#secondsTime').css('fontSize', "25px");
		$('#weeks').hide();
		$('#days').hide();
		$('#hours').hide();
		$('#minutes').show();
		$('#seconds').show();
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(distance / (1000 * 60 * 60));
		var minutes = Math.floor(distance / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (seconds <= 30) {
			premierCercleSec = (seconds * 180) / 30;
			deuxiemeCercleSec = 0;
		}
		if (seconds > 30) {
			premierCercleSec = 180;
			deuxiemeCercleSec = ((seconds - 30) * 180) / 30;
		}
		if (minutes <= (nbre_minute / 2)) {
			premierCercleMin = (minutes * 180) / (nbre_minute / 2);
			deuxiemeCercleMin = 0;
		}
		if (minutes > (nbre_minute / 2)) {
			premierCercleMin = 180;
			deuxiemeCercleMin = ((minutes - (nbre_minute / 2)) * 180) / (nbre_minute / 2);
		}
		if (weeks == 0 && days == 0 && hours == 0 && minutes == 0) {
			$("#week").prop('disabled', true);
			$("#day").prop('disabled', true);
			$("#hour").prop('disabled', true);
			$("#minute").prop('disabled', true);
			$("#unit").val("second");
		} else {
			$("#minute").prop('disabled', false);
		}
		$("#clock").text(Intl.NumberFormat().format(minutes) + " min, " + seconds + " s ");
	} else {
		$('#secondsTime').css('fontSize', "100%");
		$('#weeks').hide();
		$('#days').hide();
		$('#hours').hide();
		$('#minutes').hide();
		$('#seconds').show();
		var seconds = Math.floor(distance / 1000);
		if (seconds <= (nbre_seconde / 2)) {
			premierCercleSec = (seconds * 180) / (nbre_seconde / 2);
			deuxiemeCercleSec = 0;
		}
		if (seconds > (nbre_seconde / 2)) {
			premierCercleSec = 180;
			deuxiemeCercleSec = ((seconds - (nbre_seconde / 2)) * 180) / (nbre_seconde / 2);
		}
		$("#clock").text(Intl.NumberFormat().format(seconds) + " s ");
	}
	$("#weekTime").html(weeks + "<br><span class='uniteCercle'>Week</span>");
	$("#dayTime").html(days + "<br><span class='uniteCercle'>Day</span>");
	$("#hoursTime").html(hours + "<br><span class='uniteCercle'>Hours</span>");
	$("#minuteTime").html(minutes + "<br><span class='uniteCercle'>Min</span>");
	$("#secondsTime").html(seconds + "<br><span class='uniteCercle'>Sec</span>");
	$(".circular:nth-of-type(1) .circle .left .progress").css({
		'transform': 'rotate(' + premierCercleWeek + 'deg)'
	});
	$(".circular:nth-of-type(1) .circle .right .progress").css({
		'transform': 'rotate(' + deuxiemeCercleWeek + 'deg)'
	});

	$(".circular:nth-of-type(2) .circle .left .progress").css({
		'transform': 'rotate(' + premierCercleDay + 'deg)'
	});
	$(".circular:nth-of-type(2) .circle .right .progress").css({
		'transform': 'rotate(' + deuxiemeCercleDay + 'deg)'
	});
	//
	$(".circular:nth-of-type(3) .circle .left .progress").css({
		'transform': 'rotate(' + premierCercleHeure + 'deg)'
	});
	$(".circular:nth-of-type(3) .circle .right .progress").css({
		'transform': 'rotate(' + deuxiemeCercleHeure + 'deg)'
	});

	$(".circular:nth-of-type(4) .circle .left .progress").css({
		'transform': 'rotate(' + premierCercleMin + 'deg)'
	});
	$(".circular:nth-of-type(4) .circle .right .progress").css({
		'transform': 'rotate(' + deuxiemeCercleMin + 'deg)'
	});

	$(".circular:nth-of-type(5) .circle .left .progress").css({
		'transform': 'rotate(' + premierCercleSec + 'deg)'
	});
	$(".circular:nth-of-type(5) .circle .right .progress").css({
		'transform': 'rotate(' + deuxiemeCercleSec + 'deg)'
	});
	if (distance <= 0 && endVacation - now >= 0) {
		i++;
		$('#progress').css('display', 'none')
		if (window.screen.width > window.screen.height) {
			$("#vacation").html("🎉C'est les vacances🎉<br>");
		}
		else {
			$("#vacation").html("<br>🎉C'est les vacances🎉<br><br>");
		}
		start();
		stop();
		$("#week").prop('disabled', false);
		$("#day").prop('disabled', false);
		$("#hour").prop('disabled', false);
		$("#minute").prop('disabled', false);
		$("#unit").val("week");
	}
	if (distance >= 0 && endVacation - now <= 0) {
		j++;
		$("#vacation").html("");
		$('#progress').css('display', 'block')
	}
	if (distance <= 0 && endVacation - now <= 0) {
		j++;
		i++;
	}

}, 50)
const start = () => {
	setTimeout(function() {
		confetti.start()
	}, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti

const stop = () => {
	setTimeout(function() {
		confetti.stop()
	}, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};
