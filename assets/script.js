const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';

// create an array of searched locations - jsn
const recentLocations = [];
//could change to var?

const onSearch = () => {
//could chand to onSearch

    //get the location entered by user - jsn
    const userLocation = locationInput.value;

    //verify its valid, if it is, look up location -jsn
    if (userLocation === '') {
        setLocationwarning('Please enter a location');
    } else {
        lookupLocation(userLocation);
    }
}

// Clear the last warning on the page -jsn
const clearwarning = () => {
    const warningDisplay = document.getElementById('warning');
    warningDisplay.textContent = '';
}//change warning to warning

//Display an warning - jsn
const setLocationwarning = (text) => {
    const warningDisplay = document.getElementById('warning');
    warningDisplay.textContent = text;

    //set a timer to clear it after 3 seconds - jsn
    setTimeout(clearwarning, 2000);
} //changed to 2 seconds
//it shows warning then hides it

const lookupLocation = (search) => {

    // Lookup the location to get the Lat/Lon - jsn
    var apiUrl = WEATHER_API_BASE_URL + "/geo/1.0/direct?q=" + search + "&limit=5&appid=" + WEATHER_API_KEY;
    //concatinated version mine
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Pick the First location from the results - jsn
            //const location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            const myData = {
                name: data[0].name,
                country: data[0].country,
                lat: data[0].lat,
                lon: data[0].lon
            }

            console.log(myData);

            // Get the Weather for the cached location - jsn
            var apiUrl = WEATHER_API_BASE_URL + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + WEATHER_API_KEY;
           
            console.log(apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    //show the current weather forecast- old jsn
                    displayCurrentWeather(data);

                    //show the 5 day weather forecast - jsn - change forecast to report?
                    displayWeatherForecast(data);

                    //pick the first location -new jsn

                    // Display the Current Weather - new jsn

                    // Display the 5 Day Forecast - new jsn
                });
            //display the weather- jsn
            displayWeather(myData);
        });
}

const displayCurrentWeather = (weatherData) => {
    const currentWeather = weatherData.current;

    //display the current weather at the top of the dashboard - jsn
    document.getElementById('temp_value').textContent = `${currentWeather.temp}°`;
    //&deg insead of degree symbol - jsn got the actual symbol check this as might not work°
    document.getElementById('wind_value').textContent = `${currentWeather.wind_speed}MPH`;
    document.getElementById('humid_value').textContent = `${currentWeather.humidity}%`;
    //check symbol % looks different on jsn's
    document.getElementById('uvi_value').textContent = `${currentWeather.uvi}`;
}

const displayWeatherForecast = (weatherData) => {

    //get the daily forecasts- jsn
    const dailyData = weatherData.daily;

    //show the forcast section - jsn
    // document.getElementById('forecast').style.display = 'block';

    //clear any current forecasts - jsn
    // const forecastList = document.getElementById('forecast-days');
    // forecastList.innerHTML = '';


//day 1 of 5 forecast days
var dailyForecast = dailyData[1];
//check if array starts from 0 being current day
const day1 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
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
const day2 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
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
const day3 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
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
const day4 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
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
const day5 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day5);
//could use momentum js or day js instead
$('#day5day_value').text(day5);  
document.getElementById('day5temp_value').textContent = `${dailyForecast.temp.day}°`;
//&deg insead of degree symbol - jsn got the actual symbol check this as might not work°
document.getElementById('day5wind_value').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day5humid_value').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day5uvi_value').textContent = `${dailyForecast.uvi}`;
}


const getWeather = (lat, lon) => {

    //get the weather for the cached location
    //repeat from earlier???
        // Get the Weather for the cached location - jsn
        var apiUrl = WEATHER_API_BASE_URL + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + WEATHER_API_KEY;
        
            console.log(apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    //show the current weather forecast- old jsn
                    displayCurrentWeather(data);

                    //show the 5 day weather forecast - jsn - change forecast to report?
                    displayWeatherForecast(data);

                    //pick the first location -new jsn

                    // Display the Current Weather - new jsn

                    // Display the 5 Day Forecast - new jsn
                });
        }

// Add an event handler for the search button - new jsn

//display the weather for the cached location- jsn
const displayWeather = (weatherData) => {
    document.getElementById('location-name').textContent = `${weatherData.name}, ${weatherData.country}`;

    getWeather(weatherData.lat,weatherData.lon);
}

//search text and search button - jsn
const locationInput = document.getElementById('location');
const searchButton = document.getElementById('search');

searchButton.addEventListener('click', onSearch);

//need to add local storage to remember recent searches

// need to add icons