const APIkey = "ad6906a7db14d056c528df88473db7a3";
const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector("#cityNameInput");

searchBtn.addEventListener("click", () => {
	searchWeather();
});

// search weather
function searchWeather() {
	// URL of API
	let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${APIkey}`;

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
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

			const tempSection = document.querySelector(".temp-section");
			tempSection.innerHTML = `
			<div class="temp-group">
				<div class="city-details">
					<p class="time-and-date">${hours}:${minutes} ${ampm}, ${month} ${day}</p>
					<h2 class="city-name">${cityInput.value}</h2>
				</div>
				<div class="wrapper">
					<h1 class="temperature">${data.main.temp}°C</h1>
					<img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Haze">
				</div>
			</div>
			`;
		});
}
