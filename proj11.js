/*
proj11.js
Cayden Park
Professor Kristi Smith
CSCN315-001: Front-End Programming in JavaScript

OpenWeather API implementation in JavaScript.
Uses both Fetch and XHR to retrieve data from OpenWeather.
Displays information on homepage, or error message if data cannot be fetched.

The Fetch API has a more simplified promise approach to retrieving data, using .then
and .catch to evaluate requests and errors. XMLHttpRequest is more involved, using
analysis of request state and status to determine whether a request was successful.
Utilizing the data, however, is very similar.
*/

// Stored API key for OpenWeather
const apiKey = "cfa73ba5fd3ed57af1c3969d9446699d";

document.addEventListener("DOMContentLoaded", () => {
    // Attempt to display weather based on current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayWeather, geoError);
    } else {
        const weatherError = document.getElementById("weatherError");
        const msg = "Geolocation is not supported by this browser.";
        weatherError.innerHTML = msg;
        console.log(msg);
    }
});

// Displays weather given a position.
function displayWeather(position) {
    // Get user's current coordinates
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    // Uses Fetch API to gretrieveet information from OpenWeather.
    fetch(url)
        .then(response => {
            // Throw error if response is invalid.
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            console.log("Fetched data from OpenWeather");
            return response.json();
        })
        .then(data => {
            console.log(data);

            // Get data and update elements accordingly.
            const temp = document.getElementById("temp");
            const feelsLike = document.getElementById("feelsLike");
            const minTemp = document.getElementById("minTemp");
            const maxTemp = document.getElementById("maxTemp");
            const location = document.getElementById("location");
            const latDisplay = document.getElementById("lat");
            const lonDisplay = document.getElementById("lon");

            temp.innerHTML = `${data.main.temp}°F`;
            feelsLike.innerHTML = `Feels like: ${data.main.feels_like}°F`;
            minTemp.innerHTML = `Min: ${data.main.temp_min}°F`;
            maxTemp.innerHTML = `Max: ${data.main.temp_max}°F`;
            location.innerHTML = `${data.name}, ${data.sys.country}`;
            latDisplay.innerHTML = `${data.coord.lat}°N`;
            lonDisplay.innerHTML = `${data.coord.lon}°W`;
        })
        .catch(error => {
            // Catch errors.
            apiError(error);
        }
    );
    
    // Uses XHR to retrieve information from OpenWeather.
    const xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("XHRequested data from OpenWeather");
                const data = JSON.parse(xhr.responseText);
                const weatherDesc = document.getElementById("weatherDesc");
                const windSpeed = document.getElementById("windSpeed");

                weatherDesc.innerHTML = data.weather[0].main;
                windSpeed.innerHTML = `Wind Speed: ${data.wind.speed} mph`;
            }
            else {
                apiError("Request unsuccessful");
            }
        }
    }
}

// Show error in retrieving API information.
function apiError(error) {
    const weatherError = document.getElementById("weatherError");
    weatherError.innerHTML = "Error in retrieving weather information. Please try again later.";
    console.error(error)
}

// Show error if geolocator fails.
function geoError(position) {
    const weatherError = document.getElementById("weatherError");
        const msg = "Error retrieving geolocation data.";
        weatherError.innerHTML = msg;
        console.log(msg);
}