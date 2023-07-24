const apikey = "841aa35c8cdc8c5c8e3274991502e029";

const weatherData = document.getElementById("weather-data");
const cityData = document.getElementById("city-input");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityData.value;
    getWeather(cityValue);
})

async function getWeather(cityValue)
{
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if(!response.ok)
        {
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like : ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity} %`,
            `Wind speed : ${data.wind.speed} m/s`, 
        ]

        weatherData.querySelector(".icon").innerHTML = ` <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather">`
        weatherData.querySelector(".temperature").textContent = `${temperature}°C`
        weatherData.querySelector(".description").textContent = `${desc}`
        weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
        

    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = " ";
        weatherData.querySelector(".temperature").textContent = " "
        weatherData.querySelector(".description").textContent = "An error happened try again later."
        weatherData.querySelector(".details").innerHTML = 
        " ";
        
    }
}