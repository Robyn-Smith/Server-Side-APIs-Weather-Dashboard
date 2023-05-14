var WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
var WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';

// create an array of searched locations - jsn
var locationHistory = [];
//could change to var?

var onSearch = () => {
//could chand to onSearch

    //get the location entered by user - jsn
    var enteredLocation = locationInput.value;

    //verify its valid, if it is, look up location -jsn
    //if nothing is entered display warning message - check if anything entered
    if (enteredLocation === '') {
        displayWarning('Please enter a valid location');
    } else {
        locationSearch(enteredLocation);
    }
}

// Clear the last warning on the page -jsn
var removeWarning = () => {
    var warningDisplay = document.getElementById('warning');
    warningDisplay.textContent = '';
}//changed to warning 

//Display an warning - jsn
var displayWarning = (text) => {
    var warningDisplay = document.getElementById('warning');
    warningDisplay.textContent = text;

    //set a timer to clear it after 3 seconds - jsn
    setTimeout(removeWarning, 2000);
} //changed to 2 seconds
//it shows warning then hides it

var locationSearch = (search) => {

    // Lookup the location to get the Lat/Lon - jsn
    var apiURL = WEATHER_API_BASE_URL + "/geo/1.0/direct?q=" + search + "&limit=5&appid=" + WEATHER_API_KEY;
    //concatinated version mine
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Pick the First location from the results - jsn
            //var location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            var myData = {
                name: data[0].name,
                country: data[0].country,
                lat: data[0].lat,
                lon: data[0].lon
            }

            console.log(myData);

            // Get the Weather for the cached location - jsn
            var apiURL = WEATHER_API_BASE_URL + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + WEATHER_API_KEY;
           
            console.log(apiURL);
            fetch(apiURL)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    //show the current weather forecast- old jsn
                    showCurrentWeather(data);

                    //show the 5 day weather forecast - jsn - change forecast to report?
                    showNext5Days(data);

                    //pick the first location -new jsn

                    // Display the Current Weather - new jsn

                    // Display the 5 Day Forecast - new jsn
                });
            //display the weather- jsn
            displayWeather(myData);
        });
}

var showCurrentWeather = (weatherData) => {
    var currentWeather = weatherData.current;

    //display the current weather at the top of the dashboard - jsn
    document.getElementById('temp_value').textContent = `${currentWeather.temp}°`;
    //&deg insead of degree symbol - jsn got the actual symbol check this as might not work°
    document.getElementById('wind_value').textContent = `${currentWeather.wind_speed}MPH`;
    document.getElementById('humid_value').textContent = `${currentWeather.humidity}%`;
    //check symbol % looks different on jsn's
    document.getElementById('uvi_value').textContent = `${currentWeather.uvi}`;
}

var showNext5Days = (weatherData) => {

    //get the daily forecasts- jsn
    var dailyData = weatherData.daily;

    //show the forcast section - jsn
    // document.getElementById('forecast').style.display = 'block';

    //clear any current forecasts - jsn
    // var forecastList = document.getElementById('forecast-days');
    // forecastList.innerHTML = '';


//day 1 of 5 forecast days
var dailyForecast = dailyData[1];
//check if array starts from 0 being current day
var day1 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day1);

$('#day1day_value').text(day1);  
document.getElementById('day1temp_value').textContent = `${dailyForecast.temp.day}°`;
//&deg insead of degree symbol - jsn got the actual symbol check this as might not work°
document.getElementById('day1wind_value').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day1humid_value').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day1uvi_value').textContent = `${dailyForecast.uvi}`;


//day 2 of 5 forecast days
var dailyForecast = dailyData[2];
//check if array starts from 0 being current day
var day2 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day2);

$('#day2day_value').text(day2);  
document.getElementById('day2temp_value').textContent = `${dailyForecast.temp.day}°`;
//&deg insead of degree symbol - jsn got the actual symbol check this as might not work°
document.getElementById('day2wind_value').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day2humid_value').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day2uvi_value').textContent = `${dailyForecast.uvi}`;


//day 3 of 5 forecast days
var dailyForecast = dailyData[3];
//check if array starts from 0 being current day
var day3 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day3);

$('#day3day_value').text(day3);  
document.getElementById('day3temp_value').textContent = `${dailyForecast.temp.day}°`;
//&deg insead of degree symbol - jsn got the actual symbol check this as might not work°
document.getElementById('day3wind_value').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day3humid_value').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day3uvi_value').textContent = `${dailyForecast.uvi}`;


//day 4 of 5 forecast days
var dailyForecast = dailyData[4];
//check if array starts from 0 being current day
var day4 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day4);

$('#day4day_value').text(day4);  
document.getElementById('day4temp_value').textContent = `${dailyForecast.temp.day}°`;
//&deg insead of degree symbol - jsn got the actual symbol check this as might not work°
document.getElementById('day4wind_value').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day4humid_value').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day4uvi_value').textContent = `${dailyForecast.uvi}`;


//day 5 of 5 forecast days
var dailyForecast = dailyData[5];
//check if array starts from 0 being current day
var day5 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day5);
//could use momentum js or day js instead
$('#day5day_value').text(day5);  
document.getElementById('day5temp_value').textContent = `${dailyForecast.temp.day}°`;
//&deg insead of degree symbol - jsn got the actual symbol check this as might not work°
document.getElementById('day5wind_value').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day5humid_value').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day5uvi_value').textContent = `${dailyForecast.uvi}`;
}


var weatherReport = (lat, lon) => {

    //get the weather for the cached location
    //repeat from earlier???
        // Get the Weather for the cached location - jsn
        var apiURL = WEATHER_API_BASE_URL + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + WEATHER_API_KEY;
        
            console.log(apiURL);
            fetch(apiURL)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    //show the current weather forecast- old jsn
                    showCurrentWeather(data);

                    //show the 5 day weather forecast - jsn - change forecast to report?
                    showNext5Days(data);

                    //pick the first location -new jsn

                    // Display the Current Weather - new jsn

                    // Display the 5 Day Forecast - new jsn
                });
        }

// Add an event handler for the search button - new jsn

//display the weather for the cached location- jsn
var displayWeather = (weatherData) => {
    document.getElementById('location-name').textContent = `${weatherData.name}, ${weatherData.country}`;

    weatherReport(weatherData.lat,weatherData.lon);
}

//search text and search button - jsn
var locationInput = document.getElementById('location');
var searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', onSearch);

//need to add local storage to remember recent searches

// need to add icons