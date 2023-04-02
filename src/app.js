function formateDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response);

  let country = document.querySelector("#country");
  let city = document.querySelector("#city");
  let todayDate = document.querySelector("#formatDate");
  let temperature = document.querySelector("#tempDegree");
  let weatherDescription = document.querySelector("#description");
  let iconElement = document.querySelector("#weatherIcon");
  let feel = document.querySelector("#feelLike");
  let humidity = document.querySelector("#humidityPercentage");
  let wind = document.querySelector("#windSpeed");

  country.innerHTML = response.data.sys.country;
  city.innerHTML = response.data.name;
  todayDate.innerHTML = formateDate(response.data.dt * 1000);
  temperature.innerHTML = Math.round(response.data.main.temp);
  weatherDescription.innerHTML = response.data.weather[0].description;
  let icons = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icons}@2x.png`
  );
  let attributeDetail = response.data.weather[0].description;
  iconElement.setAttribute(
    "alt",
    `https://openweathermap.org/img/wn/${attributeDetail}`
  );
  feel.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apikey = "caa883a4a60d93878755b08a933f74ea";
let unit = "metric";
let city = "Owerri";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${unit}`;

axios.get(apiUrl).then(displayTemperature);
