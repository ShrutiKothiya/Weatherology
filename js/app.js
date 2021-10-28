const APIkey = "ad6906a7db14d056c528df88473db7a3";

const btn = document.querySelector(".search-btn");

btn.addEventListener("click", () => {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	let cityName = document.querySelector("#cityNameInput").value;
	let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`;
	let today = new Date();
	let hours = (today.getHours()+11)%12+1;
	let meridiem = hours>12 ? 'am' : 'pm';

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			// create title element
			document.getElementById("city").innerHTML = data.name;

			// temprature value
			document.getElementById("temp").innerHTML = `${data.main.temp}°C`;

			// Set time.
			document.getElementById("dat").innerHTML = `${hours}:${today.getMinutes()}${meridiem}, ${months[today.getMonth()]} ${today.getDate()}`;
			
			// weather icon
			document.getElementById("wicon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
		});
});
