const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="223ff658c7476a5e1d39100192c9960a";

weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city =cityInput.value;
    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }catch(error){
            console.error(error);
            displayError(error);
        }
        
    }else{
        displayError("please enter a city");
    }
});

async function getWeatherData(city){
    //need to use back apostrophes for url
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);
    console.log(response);
    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }
    return await response.json(); //need to type it exactly like this to get the correct response
}
function displayWeatherInfo(data){
    console.log(data);
    
    const {name:city, 
           main: {temp,humidity}, 
           weather: [{description, id}]} =data;
           
    card.textContent="";
    card.style.display="flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${((temp-273.15)* (9/5) +32).toFixed(1)}°F`;//round it to one decimal place
    humidityDisplay.textContent=`Humidity ${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay") //add city display css styling
    tempDisplay.classList.add("tempDisplay") //add city display css styling
    humidityDisplay.classList.add("humidityDisplay") //add city display css styling
    descDisplay.classList.add("DescDisplay") //add city display css styling
    weatherEmoji.classList.add("weatherEmoji") //add city display css styling

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    
}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId>=200 && weatherId<300):
            return "⛈️";
        case(weatherId>=300 && weatherId<400):
            return "🌨️";
        case(weatherId>=400 && weatherId<500):
            return "🌧️";
        case(weatherId>=500 && weatherId<600):
            return "🌧️";
        case(weatherId>=600 && weatherId<700):
            return "❄️";
        case(weatherId>=700 && weatherId<800):
            return "💥";
        case(weatherId==800 && weatherId<900):
            return "☀️";
        case(weatherId>800):
            return "☁️";
        default:
            return "❓"
    }
}
function displayError(message){
    const errorDisplay=document.createElement("p")
    errorDisplay.textContent=message;
    errorDisplay.classList.add("erroDisplay");
    card.textContent ="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

}