const APIkey = "ad6906a7db14d056c528df88473db7a3";
const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector("#cityNameInput");
const tempSection = document.querySelector(".temp-section");
const alert = document.querySelector(".alert");

searchBtn.addEventListener("click", () => {
	searchWeather();
});

cityInput.addEventListener("keyup", (event) => {
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode == 13) {
		// Cancel the default action
		event.preventDefault();
		if (!cityInput.value) {
			window.alert("Enter City Name");
		} else {
			// Trigger the search button element with a click
			searchBtn.click();
		}
	}
});

cityInput.addEventListener("input", () => {
	if (!cityInput.value) {
		searchBtn.classList.add("disabled");
	} else {
		searchBtn.classList.remove("disabled");
		alert.classList.add("alert-disabled");
	}
});

// search weather
function searchWeather() {
	// URL of API
	let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${APIkey}`;

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			// call Temperature data
			tempSectionText("Navsari", data);
			if (!cityInput.value) {
				window.alert("Enter City Name");
			} else {
				tempSectionText(cityInput.value, data);
			}
		});
}

// geting Temperature data
function tempSectionText(cityName, data) {
	// date and time
	const date = new Date();
	const day = date.getDate();
	const month = date.toLocaleString("en-US", {
		month: "short",
	});
	let minutes = date.getMinutes();
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	let hours = date.getHours();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;

	tempSection.innerHTML = `
			<div class="temp-group">
				<div class="city-details">
					<p class="time-and-date">${hours}:${minutes} ${ampm}, ${month} ${day}</p>
					<h1 class="city-name">${cityName}</h1>
				</div>
				<div class="temp-wrapper">
					<div class="wrapper">
						<p class="description">${data.weather[0].description}</p>
						<h2 class="temperature">${data.main.temp}°C</h2>
					</div>
					<img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Haze">
				</div>
			</div>
			`;
}
