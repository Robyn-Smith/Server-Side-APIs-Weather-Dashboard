var starterUrl = 'https://api.openweathermap.org';
var apiKEY = '3770aa61038a0816864d556d797ecb9f';
//Global variables, so that they can be regularly called by any function. API key allows access to api.

// create an array of searched locations - jsn
var recentSearch = [];
//could change to var?

var onSearch = () => {
    var enteredLocation = locationInput.value;//retrive location entered by the user

    if (enteredLocation === '') {
        displayWarning('Please enter a valid location');
    } else {
        locationSearch(enteredLocation);
    }
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
    saveRecentSearch(search);
    // searches the location to retrieve the latitude and longitude data
    var apiURL = starterUrl + "/geo/1.0/direct?q=" + search + "&limit=5&appid=" + apiKEY;
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
            var apiURL = starterUrl + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + apiKEY;
           
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

    var weatherIcon = document.getElementById('icon');
    weatherIcon.innerHTML = '';
    var img = document.createElement("div");
    img.innerHTML = ` <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" />`
    weatherIcon.appendChild(img);
    //shows the current weather data
    document.getElementById('cloudsValue').textContent = `${currentWeather.clouds}%`;
    document.getElementById('windValue').textContent = `${currentWeather.wind_speed}MPH`;
    document.getElementById('humidValue').textContent = `${currentWeather.humidity}%`;
    document.getElementById('tempValue').textContent = `${currentWeather.temp}°`;
    }

var showNext5Days = (weatherData) => {
    //collects the daily forecast
    var dailyData = weatherData.daily;

//day 1 of 5 forecast days
var dailyForecast = dailyData[1];
var day1 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day1);
console.log(dailyForecast)
$('#day1dayValue').text(day1);  
var weatherIcon = document.getElementById('day1icon');
weatherIcon.innerHTML = "";
var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[1].weather[0].icon}.png" />`
weatherIcon.appendChild(img);

document.getElementById('day1cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day1windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day1humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day1tempValue').textContent = `${dailyForecast.temp.day}°`;
//this array is set to 1 as it is second in the array, the current weather is 0 in the array as it is first.
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

//day 2 of 5 forecast days
var dailyForecast = dailyData[2];
var day2 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day2);
$('#day2dayValue').text(day2);  

var weatherIcon = document.getElementById('day2icon');
weatherIcon.innerHTML = "";
var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[2].weather[0].icon}.png" />`
weatherIcon.appendChild(img);

document.getElementById('day2cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day2windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day2humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day2tempValue').textContent = `${dailyForecast.temp.day}°`;
console.log(dailyForecast)


//this array is set to 2 as it is third in the array
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

//day 3 of 5 forecast days
var dailyForecast = dailyData[3];
var day3 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day3);
$('#day3dayValue').text(day3);  

var weatherIcon = document.getElementById('day3icon');
weatherIcon.innerHTML = "";
var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[3].weather[0].icon}.png" />`
weatherIcon.appendChild(img);

document.getElementById('day3cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day3windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day3humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day3tempValue').textContent = `${dailyForecast.temp.day}°`;
//this array is set to 3 as it is fourth in the array.
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

//day 4 of 5 forecast days
var dailyForecast = dailyData[4];
var day4 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day4);
$('#day4dayValue').text(day4);  

var weatherIcon = document.getElementById('day4icon');
weatherIcon.innerHTML = "";
var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[4].weather[0].icon}.png" />`
weatherIcon.appendChild(img);

document.getElementById('day4cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day4windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day4humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day4tempValue').textContent = `${dailyForecast.temp.day}°`;
//this array is set to 4 as it is fifth in the array.
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

//day 5 of 5 forecast days
var dailyForecast = dailyData[5];
var day5 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day5);
$('#day5dayValue').text(day5);  

var weatherIcon = document.getElementById('day5icon');
weatherIcon.innerHTML = "";
var img = document.createElement("div");
img.innerHTML = ` <img src="https://openweathermap.org/img/w/${dailyData[5].weather[0].icon}.png" />`
weatherIcon.appendChild(img);

document.getElementById('day5cloudsValue').textContent = `${dailyForecast.clouds}%`;
document.getElementById('day5windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day5humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day5tempValue').textContent = `${dailyForecast.temp.day}°`;
}//this array is set to 5 as it is sixth in the array.
//this function adds the day of the week and weather data retrieved from thr api as text and is added to html elements

//display the weather for the cached location- jsn
var displayWeather = (weatherData) => {
    document.getElementById('location-name').textContent = `${weatherData.name}, ${weatherData.country}`;
    // weatherReport(weatherData.lat,weatherData.lon);
}

//search text and search button - jsn
var locationInput = document.getElementById('location');
var searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', onSearch);

function saveRecentSearch(location) {
    //look for the location within the recentSearch array
    var index = recentSearch.indexOf(location);

    //if it's not already in the array, add it
    if (index === -1) {
        recentSearch.push(location);

        //add it to the list of recent locations
        localStorage.setItem('locationInput', JSON.stringify(recentSearch));
    }

}

function addSearchHistory() {
    //load everything from local storage
    var storedLocations = JSON.parse(localStorage.getItem('locationInput'));
    ///issue with this line????

    //load the recent locations into the recentLocation array
    if (storedLocations!== null) {
        recentSearch.push(...storedLocations);

        //loop through the recent locations and add them to the list
        for (let i=0; i < recentSearch.length; i++) {
            var input = document.createElement('div');
            input.classList.add('place')
            input.textContent = recentSearch[i];
            input.addEventListener('click', onClickRecentSearch);

            document.getElementById('search_history').appendChild(input);
        }
    }
}
function onClickRecentSearch(event) {
    console.log('clicked');

    //get the location from the clicked element
    var location = event.target.textContent;
    locationSearch(location);
}

addSearchHistory();