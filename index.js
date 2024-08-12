//Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "eecbe12b1e6fb2e213c8d7d5607ebee6";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value ;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter the City");
    }
});

async function getWeatherData(city) {
    
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const respons = await fetch(apiurl);

    if(!respons.ok){
        throw new Error("Could not fetch weather data");
    }
    return await respons.json();
}

function displayWeatherInfo(data){
    const { name: city, 
            visibility: visibility,
            main:{temp, humidity}, 
            wind:{speed},
            weather: [{description, id}]} = data;

    card.textContent="";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const visibilityDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    visibilityDisplay.textContent = `Visibilty: ${(visibility/1000).toFixed(2)}km`;
    windDisplay.textContent = `Wind Speed: ${speed}m/s`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDiplay")
    humidityDisplay.classList.add("humidityDisplay");
    visibilityDisplay.classList.add("visibilityDisplay");
    windDisplay.classList.add("windDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(visibilityDisplay);
    card.appendChild(windDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId>=200 && weatherId<300): 
            return "⛈️";
        case(weatherId>=300 && weatherId<400): 
            return "🌧️";
        case(weatherId>=500 && weatherId<600): 
            return "🌧️";
        case(weatherId>=600 && weatherId<700): 
            return "❄️";
        case(weatherId>=700 && weatherId<800): 
            return "🌫️";
        case(weatherId===800): 
            return "☀️";
        case(weatherId>=801 && weatherId<810): 
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

