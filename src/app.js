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
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function showDayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let month = date.getMonth();

  return `${day}/${month}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour < 12) {
    return `${hour}:${minute} AM`;
  } else {
    return `${hour}:${minute} PM`;
  }
}

function showWeatherForecast(response) {
  console.log(response);

  let dailyForecastElement = document.querySelector("#forecast");
  let hourlyForecastElement = document.querySelector("#temperatureForecast");

  let dailyForecastHTML = `<h6 class="text">Weather Forecast</h6>
  <div class="wrapper-forecast">`;
  let hourlyForecastHTML = `<h6>Temperature Forecast</h6>
  <div class="temperate">`;

  let dailyForecast = response.data.daily;
  let hourlyForecast = response.data.hourly;

  dailyForecast.forEach(function (dailyForecastDay, index) {
    if (index < 7) {
      dailyForecastHTML =
        dailyForecastHTML +
        `
                  <div class="wrapper-forecast-features">
                    <div class="current-time">
                      ${formatDay(dailyForecastDay.dt)}
                    </div>
                    <div class="forecast-img-icon">
                      <img
                        src="https://openweathermap.org/img/wn/${
                          dailyForecastDay.weather[0].icon
                        }@2x.png"
                        alt=""
                        width="42"
                      />
                      <span class="forecast-description"
                        >${dailyForecastDay.weather[0].description}</span
                      >
                    </div>
                    <div class="min-max-temperature">
                      <span class="max-temperature"
                        >${Math.round(dailyForecastDay.temp.max)}°</span
                      >
                      <span class="min-temperature"
                        >${Math.round(dailyForecastDay.temp.max)}°</span
                      >
                    </div>
                    <div>
                      <span>${showDayFormat(dailyForecastDay.dt)}</span>
                    </div>
                  </div>
                  <hr />
                `;
    }
  });

  dailyForecastHTML = dailyForecastHTML + `</div>`;
  dailyForecastElement.innerHTML = dailyForecastHTML;

  hourlyForecast.forEach(function (hourlyForecastTime, index) {
    if (index < 6) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `
                    <div class="temp1">
                      <ul class="temp">
                        <li>${formatTime(hourlyForecastTime.dt)}</li>
                        <li><img
                src="https://openweathermap.org/img/wn/${
                  hourlyForecastTime.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
                  /></li>
                        <li>${Math.round(hourlyForecastTime.temp)}°</li>
                      </ul>
                      <span class="line1">|</span>
                    </div>
                  `;
    }
  });

  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

function getCordinates(coordinates) {
  let apikey = "caa883a4a60d93878755b08a933f74ea";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=${unit}`;

  axios.get(apiUrl).then(showWeatherForecast);
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

  temperatureValue = response.data.main.temp;

  country.innerHTML = response.data.sys.country;
  city.innerHTML = response.data.name;
  todayDate.innerHTML = formateDate(response.data.dt * 1000);
  temperature.innerHTML = Math.round(temperatureValue);
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

  getCordinates(response.data.coord);
}

function searchCity(value) {
  let apikey = "caa883a4a60d93878755b08a933f74ea";
  let unit = "metric";
  let city = value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);
}

function inputSubmit(event) {
  event.preventDefault();

  let formInput = document.querySelector("#searchBtn");
  searchCity(formInput.value);
}

function showFahrenheitConversion(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = document.querySelector("fahrenheit-link");
  let temperatureElement = document.querySelector("#tempDegree");
  fahrenheitTemperature = (temperatureValue * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusConversion(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempDegree");
  temperatureElement.innerHTML = Math.round(temperatureValue);
}

let form = document.querySelector("#submit");
form.addEventListener("submit", inputSubmit);

let temperatureValue = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitConversion);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusConversion);

searchCity("Owerri");
