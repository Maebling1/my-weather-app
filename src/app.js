let now = new Date();
let div = document.querySelector(".current-date");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

div.innerHTML = `${day} ${month} ${date} ${hours}:${minutes}`;

function weatherConditions(response) {
  document.querySelector(
    "#currentCity"
  ).innerHTML = `Currently in ${response.data.name}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${Math.round(response.data.main.humidity)}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)}mph`;

  let precipication = document.querySelector("#precipitation");
  precipication.innerHTML = `Precipication ${Math.round(
    response.data.clouds.all
  )}%`;
}

function searchLocation(position) {
  let apiKey = "51d8bdfeb22d20074ad84e043ba0c3c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let apiKey = "51d8bdfeb22d20074ad84e043ba0c3c3";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&${apiKey}`).then(weatherConditions);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);
