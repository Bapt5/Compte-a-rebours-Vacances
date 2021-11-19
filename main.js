var dates = [];
var endDAtes = [];
var now;

var annee = '2021-2022'
var endpoint = ''.concat('https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&facet=description&facet=start_date&facet=end_date&facet=location&facet=zones&facet=annee_scolaire&refine.zones=Zone+C&refine.annee_scolaire=', annee, '&refine.location=Versailles&timezone=Europe%2FParis');

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4) {
		if (this.status == 200) {
			document.getElementById("pb").style.diplay = "none";
			var response = JSON.parse(this.responseText);
			var len = Object.keys(response["records"]).length;
			for (let i = 0; i < len; i++) {
				if (response["records"][i]["fields"]["description"] == "Vacances de la Toussaint") {
					dates[0] = response["records"][i]["fields"]["start_date"];
					dates[0] = dates[0].substring(0, dates[0].length - 15);
					dates[0] = new Date(dates[0] + "T12:13:00");
					endDAtes[0] = response["records"][i]["fields"]["start_date"];
					endDAtes[0] = endDAtes[0].substring(0, endDAtes[0].length - 15);
					endDAtes[0] = new Date(endDAtes[0] + "T00:00:00");
				} else if (response["records"][i]["fields"]["description"] == "Vacances de Noël") {
					dates[1] = response["records"][i]["fields"]["start_date"];
					dates[1] = dates[1].substring(0, dates[1].length - 15);
					dates[1] = new Date(dates[1] + "T12:13:00");
					endDAtes[1] = response["records"][i]["fields"]["start_date"];
					endDAtes[1] = endDAtes[1].substring(0, endDAtes[1].length - 15);
					endDAtes[1] = new Date(endDAtes[1] + "T00:00:00");
				} else if (response["records"][i]["fields"]["description"] == "Vacances d'Hiver") {
					dates[2] = response["records"][i]["fields"]["start_date"];
					dates[2] = dates[2].substring(0, dates[2].length - 15);
					dates[2] = new Date(dates[2] + "T12:13:00");
					endDAtes[2] = response["records"][i]["fields"]["start_date"];
					endDAtes[2] = endDAtes[2].substring(0, endDAtes[2].length - 15);
					endDAtes[2] = new Date(endDAtes[2] + "T00:00:00");
				} else if (response["records"][i]["fields"]["description"] == "Vacances de Printemps") {
					dates[3] = response["records"][i]["fields"]["start_date"];
					dates[3] = dates[3].substring(0, dates[3].length - 15);
					dates[3] = new Date(dates[3] + "T12:13:00");
					endDAtes[3] = response["records"][i]["fields"]["start_date"];
					endDAtes[3] = endDAtes[3].substring(0, endDAtes[3].length - 15);
					endDAtes[3] = new Date(endDAtes[3] + "T00:00:00");
				} else if (response["records"][i]["fields"]["description"] == "Vacances d'Été") {
					dates[4] = response["records"][i]["fields"]["start_date"];
					dates[4] = dates[4].substring(0, dates[4].length - 15);
					dates[4] = new Date(dates[4] + "T12:13:00");
					endDAtes[4] = response["records"][i]["fields"]["start_date"];
					endDAtes[4] = endDAtes[4].substring(0, endDAtes[4].length - 15);
					endDAtes[4] = new Date(endDAtes[4] + "T00:00:00");
				}
			}
		} else {
			document.getElementById("pb").style.diplay = "block";
		}
	}

};
xhr.open('GET', endpoint, true);
xhr.send();

var i = 0;
var j = 0;

var x = setInterval(function() {
	if (innerHeight > 800) {
		document.body.style.height = "".concat(innerHeight, "px");
	}

	var endpoint = 'https://api-ratp.pierre-grimaud.fr/v4/traffic';

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				document.getElementById("pb").style.diplay = "none";
				var response = JSON.parse(this.responseText);
				now = response._metadata.date;
				now = new Date(now.substring(0, now.length - 6));
			} else {
				document.getElementById("pb").style.diplay = "block";
				now = Date.now();
			}
		}

	};
	xhr.open('GET', endpoint, true);
	xhr.send();

	var vacation = dates[i];
	console.log(vacation)
	var endVacation = endDAtes[j];
	var distance = vacation - now;
	var unit = document.getElementById("unit").value;
	if (unit == "week") {
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (weeks == 0) {
			document.getElementById("week").disabled = true;
			document.getElementById("unit").value = "day";
		} else {
			document.getElementById("week").disabled = false;
			document.getElementById("day").disabled = false;
			document.getElementById("hour").disabled = false;
			document.getElementById("minute").disabled = false;
		}
		document.getElementById("clock").innerHTML = weeks + " semaines, " + days + " jours, " + hours + " heures, " + minutes + " minutes, " + seconds + " secondes";
	} else if (unit == "day") {
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (weeks == 0 && days == 0) {
			document.getElementById("week").disabled = true;
			document.getElementById("day").disabled = true;
			document.getElementById("unit").value = "hour";
		} else {
			document.getElementById("day").disabled = false;
			document.getElementById("hour").disabled = false;
			document.getElementById("minute").disabled = false;
		}
		document.getElementById("clock").innerHTML = days + " jours, " + hours + " heures, " + minutes + " minutes, " + seconds + " secondes ";
	} else if (unit == "hour") {
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(distance / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (weeks == 0 && days == 0 && hours == 0) {
			document.getElementById("week").disabled = true;
			document.getElementById("day").disabled = true;
			document.getElementById("hour").disabled = true;
			document.getElementById("unit").value = "minute";
		} else {
			document.getElementById("hour").disabled = false;
			document.getElementById("minute").disabled = false;
		}
		document.getElementById("clock").innerHTML = hours + " heures, " + minutes + " minutes, " + seconds + " secondes ";
	} else if (unit == "minute") {
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(distance / (1000 * 60 * 60));
		var minutes = Math.floor(distance / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (weeks == 0 && days == 0 && hours == 0 && minutes == 0) {
			document.getElementById("week").disabled = true;
			document.getElementById("day").disabled = true;
			document.getElementById("hour").disabled = true;
			document.getElementById("minute").disabled = true;
			document.getElementById("unit").value = "second";
		} else {
			document.getElementById("minute").disabled = false;
		}
		document.getElementById("clock").innerHTML = minutes + " minutes, " + seconds + " secondes ";
	} else {
		var seconds = Math.floor(distance / 1000);
		document.getElementById("clock").innerHTML = seconds + " secondes ";
	}

	if (distance <= 0 && endVacation - now >= 0) {
		i++;
		document.getElementById("vacation").innerHTML = "🎉C'est les vacances🎉"
	}
	if (distance >= 0 && endVacation - now <= 0) {
		j++;
		document.getElementById("vacation").innerHTML = "";
	}
	if (distance <= 0 && endVacation - now <= 0) {
		j++;
		i++;
	}

	if (j == 0) {
		if (window.screen.width > window.screen.height) {
			document.body.style.backgroundImage = "url(images/halloween.jpg)";
		} else {
			document.body.style.backgroundImage = "url(images/halloweenTel.jpg)";
		}
		document.body.style.color = "white";
		document.getElementById("unitLabel").style.color = "white";
	}

	if (j == 1) {
		if (window.screen.width > window.screen.height) {
			document.body.style.backgroundImage = "url(images/noel.jpg)";
		} else {
			document.body.style.backgroundImage = "url(images/noelTel.jpg)";
		}
		document.body.style.color = "white";
		document.getElementById("unitLabel").style.color = "white";
	}

	if (j == 2) {
		if (window.screen.width > window.screen.height) {
			document.body.style.backgroundImage = "url(images/ski.jpg)";
		} else {
			document.body.style.backgroundImage = "url(images/skiTel.jpg)";
		}
		document.body.style.color = "yellow";
		document.getElementById("unitLabel").style.color = "yellow";
	}

	if (j == 3) {
		if (window.screen.width > window.screen.height) {
			document.body.style.backgroundImage = "url(images/paques.jpg)";
		} else {
			document.body.style.backgroundImage = "url(images/paquesTel.jpg)";
		}
		document.body.style.color = "yellow";
		document.getElementById("unitLabel").style.color = "yellow";
	}

	if (j == 4) {
		if (window.screen.width > window.screen.height) {
			document.body.style.backgroundImage = "url(images/vacances.jpg)";
		} else {
			document.body.style.backgroundImage = "url(images/vacancesTel.jpg)";
		}
		document.body.style.color = "black";
		document.getElementById("unitLabel").style.color = "white";
	}

	if (window.screen.width > window.screen.height) {
		document.getElementById("h1").style.fontSize = "50px";
		document.getElementById("vacation").style.fontSize = "70px";
		document.getElementById("p").style.fontSize = "40px";
		document.getElementById("clock").style.fontSize = "40px";
	} else {
		document.getElementById("h1").style.fontSize = "90px";
		document.getElementById("vacation").style.fontSize = "100px";
		document.getElementById("p").style.fontSize = "70px";
		document.getElementById("clock").style.fontSize = "70px";
	}

}, 50)
