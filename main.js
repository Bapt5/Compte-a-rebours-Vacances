$('#body').css('opacity', 0);
var dates = [];
var endDAtes = [];
var now;
var annee = '2021-2022'
var endpoint = ''.concat('https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&facet=description&facet=start_date&facet=end_date&facet=location&facet=zones&facet=annee_scolaire&refine.zones=Zone+C&refine.annee_scolaire=', annee, '&refine.location=Versailles&timezone=Europe%2FParis');

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
			$('#pb').css('diplay', "block");
		}
	}

};
xhr.open('GET', endpoint, true);
xhr.send();

var i = 0;
var j = 0;

var x = setInterval(function() {

	$.ajax({
		url: 'https://api-ratp.pierre-grimaud.fr/v4/traffic',
		dataType: 'json',
		data: {},
		success: function(donnee) {
			$.map(donnee, function() {
				now = donnee._metadata.date;
				now = new Date(now.substring(0, now.length - 6));
			});
		}
	});
	//
	//
	//
	//
	//
	// var endpoint = 'https://api-ratp.pierre-grimaud.fr/v4/traffic';
	//
	// var xhr = new XMLHttpRequest();
	// xhr.onreadystatechange = function() {
	// 	if (this.readyState == 4) {
	// 		if (this.status == 200) {
	// 			$('#pb').css('diplay', "none");
	// 			var response = JSON.parse(this.responseText);
	// 			now = response._metadata.date;
	// 			now = new Date(now.substring(0, now.length - 6));
	// 		} else {
	// 			$('#pb').css('diplay', "block");
	// 			now = Date.now();
	// 		}
	// 	}
	//
	// };
	// xhr.open('GET', endpoint, true);
	// xhr.send();

	var vacation = dates[i];
	var endVacation = endDAtes[j];
	var distance = vacation - now;
	if (distance > 0) {
		$('#body').css('opacity', 1);
	}

	var unit = $('#unit').val();
	if (unit == "week") {
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (weeks == 0) {
			$("#week").disabled = true;
			$("#unit").val("day");
		} else {
			$("#week").disabled = false;
			$("#day").disabled = false;
			$("#hour").disabled = false;
			$("#minute").disabled = false;
		}
		if (window.screen.width > window.screen.height) {
			$("#clock").text(weeks + " semaines, " + days + " jours, " + hours + " h, " + minutes + " min, " + seconds + " s");
		}
		else {
			$("#clock").text(weeks + " sem, " + days + " j, " + hours + " h, " + minutes + " min, " + seconds + " s");
		}
	} else if (unit == "day") {
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (weeks == 0 && days == 0) {
			$("#week").disabled = true;
			$("#day").disabled = true;
			$("#unit").val("hours");
		} else {
			$("#day").disabled = false;
			$("#hour").disabled = false;
			$("#minute").disabled = false;
		}
		if (window.screen.width > window.screen.height) {
			$("#clock").text(days + " jours, " + hours + " h, " + minutes + " min, " + seconds + " s");
		}
		else {
			$("#clock").text(days + " j, " + hours + " h, " + minutes + " min, " + seconds + " s");
		}
	} else if (unit == "hour") {
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(distance / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (weeks == 0 && days == 0 && hours == 0) {
			$("#week").disabled = true;
			$("#day").disabled = true;
			$("#hour").disabled = true;
			$("#unit").val("minute");
		} else {
			$("#hour").disabled = false;
			$("#minute").disabled = false;
		}
		if (window.screen.width > window.screen.height) {
			$("#clock").text(hours + " h, " + minutes + " min, " + seconds + " s");
		}
		else {
			$("#clock").text(hours + " h, " + minutes + " min, " + seconds + " s");
		}
	} else if (unit == "minute") {
		var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(distance / (1000 * 60 * 60));
		var minutes = Math.floor(distance / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (weeks == 0 && days == 0 && hours == 0 && minutes == 0) {
			$("#week").disabled = true;
			$("#day").disabled = true;
			$("#hour").disabled = true;
			$("#minute").disabled = true;
			$("#unit").val("second");
		} else {
			$("#minute").disabled = false;
		}
		$("#clock").text(Intl.NumberFormat().format(minutes) + " min, " + seconds + " s ");
	} else {
		var seconds = Math.floor(distance / 1000);
		$("#clock").text(Intl.NumberFormat().format(seconds) + " s ");
	}

	if (distance <= 0 && endVacation - now >= 0) {
		i++;
		if (window.screen.width > window.screen.height) {
			$("#vacation").text("🎉C'est les vacances🎉<br>");
		}
		else {
			$("#vacation").text("<br>🎉C'est les vacances🎉<br><br>");
		}
		start();
		stop();
	}
	if (distance >= 0 && endVacation - now <= 0) {
		j++;
		$("#vacation").text("");
	}
	if (distance <= 0 && endVacation - now <= 0) {
		j++;
		i++;
	}

	if (j == 0) {
		if (window.screen.width > window.screen.height) {
			$("#body").css('background-image', "url(images/halloween.jpg)");
		} else {
			$("#body").css('background-image', "url(images/halloweenTel.jpg)");
		}
		$("#body").css('color', "white");
		$("#unitLabel").css('color', "white");
	}

	if (j == 1) {
		if (window.screen.width > window.screen.height) {
			$("#body").css('background-image', "url(images/noel.jpg)");
		} else {
			$("#body").css('background-image', "url(images/noelTel.jpg)");
		}
		$("#body").css('color', "white");
		$("#unitLabel").css('color', "white");
	}

	if (j == 2) {
		if (window.screen.width > window.screen.height) {
			$("#body").css('background-image', "url(images/ski.jpg)");
		} else {
			$("#body").css('background-image', "url(images/skiTel.jpg)");
		}
		$("#body").css('color', "yellow");
		$("#unitLabel").css('color', "yellow");
	}

	if (j == 3) {
		if (window.screen.width > window.screen.height) {
			$("#body").css('background-image', "url(images/paques.jpg)");
		} else {
			$("#body").css('background-image', "url(images/paquesTel.jpg)");
		}
		$("#body").css('color', "yellow");
		$("#unitLabel").css('color', "yellow");
	}

	if (j == 4) {
		if (window.screen.width > window.screen.height) {
			$("#body").css('background-image', "url(images/vacances.jpg)");
		} else {
			$("#body").css('background-image', "url(images/vacancesTel.jpg)");
		}
		$("#body").css('color', "black");
		$("#unitLabel").css('color', "white");
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
