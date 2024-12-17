const api_key = "&appid=7821014de233ecf098180185706f59ca";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const location_entered = document.getElementById("location");
const Humidity = document.getElementById("humidity_val");
const feels_val = document.getElementById("feels_val");
const wind_speed_val = document.getElementById("wind_speed_val");
const Max_Temp = document.getElementById("Max_Temp");
const Min_Temp = document.getElementById("Min_Temp");
const Temp = document.getElementById("temp_val");
const curr_city = document.getElementById("city_loc");
const msg = document.getElementById("error");
const image = document.getElementById("weather_img");

async function fetchData(url) {
  const response = await fetch(url);
  const Data = await response.json();
  console.log(Data);
  if (Data.cod === "404") {
    msg.style.visibility = "visible"; // Show error immediately
    setTimeout(() => {
      msg.style.visibility = "hidden"; // Hide after 4 seconds
    }, 2000);
    return;
  }
  console.log(Data.main.feels_like);
  update_data(Data);
}
const button = document.getElementById("search");
button.addEventListener("click", () => {
  loc = location_entered.value;
  if (loc) {
    full_url = apiurl + loc + api_key;
    fetchData(full_url);
    return;
  } else {
    msg.style.visibility = "visible"; // Show error immediately
    setTimeout(() => {
      msg.style.visibility = "hidden"; // Hide after 4 seconds
    }, 2000);
  }
});
function update_data(Data) {
  if (Data) {
    const weather_type = Data.weather[0].main;
    if (
      weather_type === "Haze" ||
      weather_type === "Clouds" ||
      weather_type === "Mist" ||
      weather_type === "Fog"
    ) {
      image.src = "imgs/cloudy.png";
      console.log("The weather is hazy. Stay cautious while driving!");
    } else if (weather_type === "Rain" || weather_type === "Thunderstorm") {
      image.src = "imgs/storm.png";
      console.log("It's raining. Don't forget your umbrella!");
    } else if (weather_type === "Clear") {
      image.src = "imgs/sun.png";
      console.log("The sky is clear. Have a nice day!");
    } else if (weather_type === "Drizzle") {
      image.src = "imgs/drizzle.png";
      console.log("It's drizzling.");
    } else {
      console.log("Weather condition not recognized.");
    }
    curr_city.textContent = Data.name;
    Temp.textContent = Data.main.temp;
    Humidity.textContent = Data.main.humidity;
    feels_val.textContent = Data.main.feels_like;
    wind_speed_val.textContent = Data.wind.speed;
    Max_Temp.textContent = Data.main.temp_max;
    Min_Temp.textContent = Data.main.temp_min;
  } else {
    msg.style.visibility = "visible"; // Show error immediately
    setTimeout(() => {
      msg.style.visibility = "hidden"; // Hide after 4 seconds
    }, 2000);
  }
}
