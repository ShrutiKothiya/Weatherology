const APIkey = "ad6906a7db14d056c528df88473db7a3";

const btn = document.querySelector(".search-btn");

btn.addEventListener("click", () => {
	let cityName = document.querySelector("#cityNameInput").value;
	let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`;

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			const container = document.querySelector(".container");

			// create title element
			const title = document.createElement("h1");
			title.innerText = data.name;
			container.appendChild(title);

			// create temprature element
			const temp = document.createElement("div");
			temp.className = "temprature";
			container.appendChild(temp);
			// temprature value
			const tempValue = document.createElement("h3");
			tempValue.innerText = `${data.main.temp}°C`;
			temp.appendChild(tempValue);
			// weather icon
			const icon = document.createElement("img");
			icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
			temp.appendChild(icon);
		});
});
