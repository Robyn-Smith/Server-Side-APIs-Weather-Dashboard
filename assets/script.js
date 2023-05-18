var WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
var WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';

//Global variables so that they can be regularly called by any function.

// create an array of searched locations - jsn
// var locationHistory = [];
//could change to var?

var onSearch = () => {
    var enteredLocation = locationInput.value;//retrive location entered by the user

    if (enteredLocation === '') {
        displayWarning('Please enter a valid location');
    } else {
        locationSearch(enteredLocation);
    }

        localStorage.setItem("recent",enteredLocation);
        $("#history-locations").val(localStorage.getItem("recent"));
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

//Display an warning - jsn
var displayWarning = (text) => {
    var warningDisplay = document.getElementById('warning');
    warningDisplay.textContent = text;

    //set a timer to clear it after 3 seconds - jsn//changed to 2 seconds
//it shows warning then hides it
    setTimeout(removeWarning, 2000);
} 

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
    document.getElementById('tempValue').textContent = `${currentWeather.temp}°`;

    document.getElementById('windValue').textContent = `${currentWeather.wind_speed}MPH`;
    document.getElementById('humidValue').textContent = `${currentWeather.humidity}%`;
    //check symbol % looks different on jsn's
    document.getElementById('cloudsValue').textContent = `${currentWeather.clouds}%`;

    // var img = document.createElement("img");
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

$('#day1dayValue').text(day1);  
document.getElementById('day1tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day1windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day1humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day1cloudsValue').textContent = `${dailyForecast.clouds}%`;

// var img = document.createElement("img");
// img.src = `https://openweathermap.org/img/w/${dailyForecast.icon}.png`;
// document.getElementsById('day1icon').appendChild(img);

//day 2 of 5 forecast days
var dailyForecast = dailyData[2];
//check if array starts from 0 being current day
var day2 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day2);

$('#day2dayValue').text(day2);  
document.getElementById('day2tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day2windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day2humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day2cloudsValue').textContent = `${dailyForecast.clouds}%`;


//day 3 of 5 forecast days
var dailyForecast = dailyData[3];
//check if array starts from 0 being current day
var day3 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day3);

$('#day3dayValue').text(day3);  
document.getElementById('day3tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day3windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day3humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day3cloudsValue').textContent = `${dailyForecast.clouds}%`;


//day 4 of 5 forecast days
var dailyForecast = dailyData[4];
//check if array starts from 0 being current day
var day4 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day4);

$('#day4dayValue').text(day4);  
document.getElementById('day4tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day4windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day4humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day4cloudsValue').textContent = `${dailyForecast.clouds}%`;


//day 5 of 5 forecast days
var dailyForecast = dailyData[5];
//check if array starts from 0 being current day
var day5 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
console.log(day5);
//could use momentum js or day js instead
$('#day5dayValue').text(day5);  
document.getElementById('day5tempValue').textContent = `${dailyForecast.temp.day}°`;
document.getElementById('day5windValue').textContent = `${dailyForecast.wind_speed}MPH`;
document.getElementById('day5humidValue').textContent = `${dailyForecast.humidity}%`;
document.getElementById('day5cloudsValue').textContent = `${dailyForecast.clouds}%`;
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

//need to add local storage to remember recent searches........................................................

//// create an array of searched locations - jsn - plucked from top of this js code
// var locationHistory = [];
//     if (localStorage.getItem('location')!= null){
//       array = JSON.parse(localStorage.getItem('location'));
//     }
//     console.log(locationHistory)
//     // Find the index of the element in the array
//     var index = array.indexOf(title);
//     // Check if the element exists (index will be -1 if the element is not found)
//     if (index !== -1) {
//       // Remove the element using splice()
//       array.splice(index, 1);
//     }  
//     array.push(title);
//     //console.log(array);



// function onSaveLocation(){
//     var enteredLocation = locationInput.value;
//  var locationHistory = document.getElementById("location-name").value
//         if (enteredLocation !== "") {
//           localStorage.setItem("location-name", enteredLocation);
//           document.getElementById("history-locations").value = "";
//       }     
// }
   
//     onSaveLocation();

//work day schedulor local storage:
//var savedToDo = localStorage.getItem(hour) || '';  
//localStorage.setItem(hour, toDo);

//quiz local storage:
//function onSaveScore(event) {
//     var player = document.getElementById("player").value
//     if (player !== "") {
//       localStorage.setItem(player, score);
//       document.getElementById("player").value = "";
//   }
// }
//localStorage.setItem("player", JSON.stringify(score));
// var highscores = document.getElementById("highscores")
// for (var i = 0; i < localStorage.length; i++) {

//     var player = localStorage.key(i);
//     var score = localStorage.getItem(player);
    
//         var list = document.createElement("li");
//         list.classList.add("list");
    
//         list.innerHTML = `<li id="score-item" class = "player">${player}</li><li id="score-item" class = "score">${score}</li>`
//         highscores.appendChild(list);
//     }

// function saveHistory(title){
//     // get localHistory to array
//     var array = [];
//     if (localStorage.getItem('saved-titles')!= null){
//       array = JSON.parse(localStorage.getItem('saved-titles'));
//     }
//     // Find the index of the element in the array
//     var index = array.indexOf(title);
//     // Check if the element exists (index will be -1 if the element is not found)
//     if (index !== -1) {
//       // Remove the element using splice()
//       array.splice(index, 1);
//     }  
//     array.push(title);
//     //console.log(array);
//     localStorage.setItem('saved-titles', JSON.stringify(array));
//     // remove existing entries
//     // Remove all li elements (children) from the ul
//     while (historyEl.firstChild) {
//       historyEl.removeChild(historyEl.firstChild);
//     }  
//     // create all childs
//     for (i=array.length-1; i>=0; i--){
//       liEl = document.createElement('li');
//       liEl.textContent = array[i];
//       liEl.classList.add('histBtn',  'btn', 'btn-primary', 'w-100', 'list-group-item', 'list-group-item-action', 'mb-1');
//       //console.log(liEl);
//       historyEl.appendChild(liEl);
//     }
    
//   }


// function loadFromLocalStorage(){
//     var array = [];
//     if (localStorage.getItem('saved-titles')!= null){
//       array = JSON.parse(localStorage.getItem('saved-titles'));
//     }
//     while (historyEl.firstChild) {
//       historyEl.removeChild(historyEl.firstChild);
//     }  
//     // create all childs
//     for (i=array.length-1; i>=0; i--){
//       liEl = document.createElement('li');
//       liEl.textContent = array[i];
//       liEl.classList.add('histBtn',  'btn', 'btn-primary', 'w-100', 'list-group-item', 'list-group-item-action', 'mb-2');
//       //console.log(liEl);
//       historyEl.appendChild(liEl);
//     }
  
//   }
// loadFromLocalStorage();






// need to add icons.............................................................................................

// var date = dayjs().format('M/D/YYYY');
//   // Store response data from our fetch request in variables
//   var tempF = weather.main.temp;
//   var windMph = weather.wind.speed;
//   var humidity = weather.main.humidity;
//   var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
//   var iconDescription = weather.weather[0].description || weather[0].main;

