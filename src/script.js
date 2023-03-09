//Time Display Controls & Operations

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentTime = new Date();
let year = currentTime.getFullYear();
let month = months[currentTime.getMonth()];
let date = currentTime.getDate();
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let time = `${hours}:${minutes}`;

let timeInfo = document.querySelector("#time-info");
timeInfo.innerHTML = `${day} ${time}, ${date} ${month} ${year}`;

//City Display Controls & Operations

function displayCity(event) {
  event.preventDefault();
  let userInput = document.querySelector("#user-input");
  let cityOfInterest = document.querySelector("#city-display");

  cityOfInterest.innerHTML = userInput.value;
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", displayCity);

//Fahrenheit/Celcius Display Controls & Operations
function displayFahrenheit(event) {
  let tempDisplay = document.querySelector("#temperature");
  let metricConversion = (3 * 9) / 5 + 32;
  tempDisplay.innerHTML = Math.round(metricConversion);
}

function displayCelcius(event) {
  let tempDisplay = document.querySelector("#temperature");
  tempDisplay.innerHTML = 3;
}

let fahrenheitTemp = document.querySelector("#fahrenheit-display");
fahrenheitTemp.addEventListener("click", displayFahrenheit);

let celciusTemp = document.querySelector("#celcius-display");
celciusTemp.addEventListener("click", displayCelcius);

//API Integrations & Geolocation APIs

function searchSubmit(event) {
  let userInput = document.querySelector("#user-input");
  let city = userInput.value;
  let units = "metric";
  let apiKey = "74373fd9c9c828199b66c103f4039a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  function displayTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let tempNumber = document.querySelector("#temperature");
    tempNumber.innerHTML = temperature;
  }

  axios.get(apiUrl).then(displayTemp);
}

let searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", searchSubmit);

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "74373fd9c9c828199b66c103f4039a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  function displayTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let tempNumber = document.querySelector("#temperature");
    tempNumber.innerHTML = temperature;

    let currentLocation = response.data.name;
    let locationDisplay = document.querySelector("#city-display");

    locationDisplay.innerHTML = currentLocation;
  }

  axios.get(apiUrl).then(displayTemp);
}

function buttonClick(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector(".location-btn");
locationButton.addEventListener("click", buttonClick);
