//Feature #1
//Display the current date and time using JavaScript: Tuesday 16:00

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let daysOfWeek = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[daysOfWeek];
  let sky = "Clear sky";

  return `${day} ${hours}:${minutes}, ${sky}`;
}

let dateElement = document.querySelector("#time-now");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Feature #2
//Add a search engine, when searching for a city - i.e. Paris, display the city name on the page after the user submits the form.
function showLocation(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#my-city");
  let cityInput = document.querySelector("#input-search");
  cityElement.innerHTML = cityInput.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showLocation);

//Display a fake temperature - i.e 17 - in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

//function changeDegrees(event) {
// event.preventDefault();
// let tempCelsius = document.querySelector("#now-temperature");
// let fahrenheitTemperature = Math.round(tempCelsius * 1.8 + 32);
// alert(fahrenheitTemperature);}

//let switchTofahrenheit = document.querySelector("#degreeF");
//switchTofahrenheit.addEventListener("click", changeDegrees);

//function degreesToCelcius(event) {
// event.preventDefault();
//let temp = document.querySelector("#now-temperature");
//temp.innerHTML = "☀️ 18";}

//let switchToCelsius = document.querySelector("#degreeC");
//switchToCelsius.addEventListener("click", degreesToCelcius);

//when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
//Please note: there's no need to include a temperature conversion at the moment.

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let displaytemp = document.querySelector(".now-temperature");
  displaytemp.innerHTML = `${temperature}`;
  let changeCity = document.querySelector("#my-city");
  changeCity.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "02c067fbe0a95f847d98a3fc4fe7414d";
  let city = document.querySelector("#input-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentPosition(position) {
  let apiKey = "02c067fbe0a95f847d98a3fc4fe7414d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

searchForm.addEventListener("submit", searchCity);

//Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
//let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", handlePosition);
