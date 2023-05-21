var WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
var WEATHER_API_KEY = '3770aa61038a0816864d556d797ecb9f';

//Global variables, so that they can be regularly called by any function. API key allows access to api.

// create an array of searched locations - jsn
const recentLocations = [];
//could change to var?

var onSearch = () => {
    var enteredLocation = locationInput.value;//retrive location entered by the user

    if (enteredLocation === '') {
        displayWarning('Please enter a valid location');
    } else {
        locationSearch(enteredLocation);
    }
//................................................not working................................
//localStorage.setItem("player", JSON.stringify(score));
        // localStorage.setItem("recent",enteredLocation);
        // localStorage.setItem('recent', enteredLocation, JSON.stringify(recentLocations));
        //add stringify??
        // $("#history-locations").val(localStorage.getItem("recent"));

        // var recent = localStorage.getItemrecent
        // localStorage.getItem("recent",enteredLocation);
        // var list = document.createElement("li");
        // list.classList.add("list");
    
        // list.innerHTML = `<li id="list" class = "recent">${enteredLocation}</li>`
        // $("#history-locations").appendChild(list);
     
}   //check that the user has entered a location, if they have not entered anything 
    //a warning is displayed for 2 seconds, if they have continue to search for 
    //weather data on location

var removeWarning = () => {
    var warningDisplay = document.getElementById('warning');
    warningDisplay.textContent = '';
}//remove warning

var displayWarning = (text) => {
    var warningDisplay = document.getElementById('warning');
    warningDisplay.textContent = text;

    setTimeout(removeWarning, 2000);
} //shows the warning and removes it after 2 seconds

var locationSearch = (search) => {

    //save the location to recent Locations
    saveRecentLocation(search);
    // searches the location to retrieve the latitude and longitude data
    var apiURL = WEATHER_API_BASE_URL + "/geo/1.0/direct?q=" + search + "&limit=5&appid=" + WEATHER_API_KEY;
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            //this chooses the first location from the results, in the array
            // var location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            var myData = {
                name: data[0].name,
                country: data[0].country,
                lat: data[0].lat,
                lon: data[0].lon
            }

            console.log(myData);

            // This collects the weather data for the cached location
            var apiURL = WEATHER_API_BASE_URL + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + WEATHER_API_KEY;
           
            console.log(apiURL);
            fetch(apiURL)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    //display the current weather
                    showCurrentWeather(data);

                    //display the 5 day weather forecast
                    showNext5Days(data);
                });
            //show the weather
            displayWeather(myData);
        });
}

var showCurrentWeather = (weatherData, locationData) => {
    var currentWeather = weatherData.current;

    //shows the current weather data
    document.getElementById('cloudsValue').textContent = `${currentWeather.clouds}%`;
    document.getElementById('tempValue').textContent = `${currentWeather.temp}°`;
    document.getElementById('windValue').textContent = `${currentWeather.wind_speed}MPH`;
    document.getElementById('humidValue').textContent = `${currentWeather.humidity}%`;
    

    var weatherIcon = document.getElementById('weather-icon');
    weatherIcon.innerHTML = '';

    var img = document.createElement("div");
    img.innerHTML = ` <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" />`
    weatherIcon.appendChild(img);
    

//  var img = document.createElement("img");
//     img.innerHTML = ` <img
//                 src="https://openweathermap.org/img/wn/${
//                   extraForecast.weather[0].icon
//                 }@2x.png" />`
//     document.getElementsByClassName('#weather-icon').appendChild(img);

   
    // img.innerHTML = `<img id="weather-icon"
    // src="https://openweathermap.org/img/w/${currentWeather.icon}.png" 
    // alt="">
    // </>`

    // var iconUrl = `https://openweathermap.org/img/w/${currentWeather.icon}.png`;
    // var iconDescription = currentWeather.description
    // fetch(iconUrl)
    // .then(function (response) {
    //     if (response.status !== 200){
    //       console.log(response);
    //     }   
    //     return response.json();
    //   })
    //   .then(function(data){
    //     console.log(data);
    //     if ('Poster' in data){
    //          imageEl.src = iconUrl;
    //          imageEl.alt = data.iconDescription;
    //          imageEl.style.display = 'block';
    //   } else {
    //     imageEl.style.display = 'none';
    //   }
    // });
//  document.getElementsByClassName;('weather-icon').appendChild(img);
    }
    // var img = document.createElement("img");
    // img.src = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    // document.getElementsByClassName;('weather-icon').appendChild(img);

    // console.log(img)

    // createElement()
    // var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    // var iconDescription = weather.weather[0].description || weather[0].main;

    // document.getElementsByClassName;('#weather-icon').textContent = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    // document.getElementsByClassName;('#weather-icon').appendChild(iconDescription);

//         list.innerHTML = `<li id="score-item" class = "player">${player}</li><li id="score-item" class = "score">${score}</li>`
//         highscores.appendChild(list);

    //icon example
    // var date = dayjs().format('M/D/YYYY');
//   // Store response data from our fetch request in variables
//   var tempF = weather.main.temp;
//   var windMph = weather.wind.speed;
//   var humidity = weather.main.humidity;
//   var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
//   var iconDescription = weather.weather[0].description || weather[0].main;
// }

var showNext5Days = (weatherData) => {

    //collects the daily forecast
    var dailyData = weatherData.daily;

    //show the forcast section - jsn
    // document.getElementById('forecast').style.display = 'block';

    //clear any current forecasts - jsn
    // var forecastList = document.getElementById('forecast-days');
    // forecastList.innerHTML = '';


//day 1 of 5 forecast days
var dailyForecast = dailyData[1];
var day1 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day1);
console.log(dailyForecast)
$('#day1dayValue').text(day1);  
document.getElementById('day1cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day1tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day1windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day1humidValue').textContent = `${dailyForecast.humidity}%`;

//this array is set to 1 as it is second in the array, the current weather is 0 in the array as it is first.
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

console.log(dailyForecast)

var weatherIcon = document.getElementById('day1weather-icon');
weatherIcon.innerHTML = "";

var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[1].weather[0].icon}.png" />`
weatherIcon.appendChild(img);

// var iconCode = dailyForecast.weather[0].icon;
// var iconUrl = "http://openweathermap.org/img/w" + iconCode + ".png";
// document.getElementById('day1weather-icon').innerHTML += `<img src='${iconUrl}'></img>`

// var weatherIcon = document.getElementById('day1weather-icon');
// weatherIcon.innerHTML = '';

// var img = document.createElement("div");
// img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyForecast.weather[0].icon}.png" />`
// weatherIcon.appendChild(img);

// var img = document.createElement("img");
// img.src = `https://openweathermap.org/img/w/${dailyForecast.icon}.png`;
// document.getElementsById('day1icon').appendChild(img);

//day 2 of 5 forecast days
var dailyForecast = dailyData[2];
var day2 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day2);

$('#day2dayValue').text(day2);  
document.getElementById('day2cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day2tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day2windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day2humidValue').textContent = `${dailyForecast.humidity}%`;

console.log(dailyForecast)

var weatherIcon = document.getElementById('day2weather-icon');
weatherIcon.innerHTML = "";

var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[2].weather[0].icon}.png" />`
weatherIcon.appendChild(img);
//this array is set to 2 as it is third in the array
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

//day 3 of 5 forecast days
var dailyForecast = dailyData[3];
var day3 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day3);

$('#day3dayValue').text(day3);  
document.getElementById('day3cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day3tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day3windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day3humidValue').textContent = `${dailyForecast.humidity}%`;


var weatherIcon = document.getElementById('day3weather-icon');
weatherIcon.innerHTML = "";

var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[3].weather[0].icon}.png" />`
weatherIcon.appendChild(img);
//this array is set to 3 as it is fourth in the array.
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

//day 4 of 5 forecast days
var dailyForecast = dailyData[4];
var day4 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day4);

$('#day4dayValue').text(day4);  
document.getElementById('day4cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day4tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day4windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day4humidValue').textContent = `${dailyForecast.humidity}%`;


var weatherIcon = document.getElementById('day4weather-icon');
weatherIcon.innerHTML = "";

var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[4].weather[0].icon}.png" />`
weatherIcon.appendChild(img);
//this array is set to 4 as it is fifth in the array.
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

//day 5 of 5 forecast days
var dailyForecast = dailyData[5];
var day5 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day5);

$('#day5dayValue').text(day5);  
document.getElementById('day5cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day5tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day5windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day5humidValue').textContent = `${dailyForecast.humidity}%`;


var weatherIcon = document.getElementById('day5weather-icon');
weatherIcon.innerHTML = "";

var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[5].weather[0].icon}.png" />`
weatherIcon.appendChild(img);
}//this array is set to 5 as it is sixth in the array.
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements


// var weatherReport = (lat, lon) => {

    //get the weather for the cached location
    //repeat from earlier???
        // retrieve the Weather data for the cached location
        // var apiURL = WEATHER_API_BASE_URL + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + WEATHER_API_KEY;
        
        //     console.log(apiURL);
        //     fetch(apiURL)
        //         .then(response => response.json())
        //         .then(data => {

        //             console.log(data);

                    //show the current weather forecast- old jsn
                    // showCurrentWeather(data);

                    //show the 5 day weather forecast - jsn - change forecast to report?
                    // showNext5Days(data);

                    //pick the first location -new jsn

                    // Display the Current Weather - new jsn

                    // Display the 5 Day Forecast - new jsn
        //         });
        // }

// Add an event handler for the search button - new jsn

//display the weather for the cached location- jsn
var displayWeather = (weatherData) => {
    document.getElementById('location-name').textContent = `${weatherData.name}, ${weatherData.country}`;

    // weatherReport(weatherData.lat,weatherData.lon);
}

//search text and search button - jsn
var locationInput = document.getElementById('location');
var searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', onSearch);

function saveRecentLocation(location) {
    //look for the location within the recentLocations array
    const index = recentLocations.indexOf(location);

    //if it's not already in the array, add it
    if (index === -1) {
        recentLocations.push(location);

        //add it to the list of recent locations
        localStorage.setItem('locationInput', JSON.stringify(recentLocations));
    }

}

//not working.........................................................................................
function loadRecentLocations() {
    //load everything from local storage
    const storedLocations = JSON.parse(localStorage.getItem('locationInput'));
    ///issue with this line????

    //load the recent locations into the recentLocation array
    if (storedLocations!== null) {
        recentLocations.push(...storedLocations);

        //loop through the recent locations and add them to the list
        for (let i=0; i < recentLocations.length; i++) {
            var newLocation = document.createElement('div');
            newLocation.classList.add('recent-location');
            newLocation.textContent = recentLocations[i];
            newLocation.addEventListener('click', onClickRecentLocation);

            document.getElementById('recent-locations').appendChild(newLocation);
        }
    }
}
function onClickRecentLocation(event) {
    console.log('clicked');

    //get the location from the clicked element
    const location = event.target.textContent;
    locationSearch(location);
}

loadRecentLocations();