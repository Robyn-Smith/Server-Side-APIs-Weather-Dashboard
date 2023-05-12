const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

// create an array of searched locations - jsn
const recentLocations = [];
//could change to var?

const getLocation = () => {
//could chand to onSearch

    //get the location entered by user - jsn
    const userLocation = locationInput.value;

    //verify its valid, if it is, look up location -jsn
    if (userLocation === '') {
        setLocationError('Please enter a location');
    } else {
        lookupLocation(userLocation);
    }
}

// Clear the last error on the page -jsn
const clearError = () => {
    const errorDisplay = document.getElementById('error');
    errorDisplay.textContent = '';
}//change error to warning

//Display an error - jsn
const setLocationError = (text) => {
    const errorDisplay = document.getElementById('error');
    errorDisplay.textContent = text;

    //set a timer to clear it after 3 seconds - jsn
    setTimeout(clearError, 3000);
} //change second amount?
//it shows warning then hides it

const lookupLocation = (search) => {

    // Lookup the location to get the Lat/Lon - jsn
    var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Pick the First location from the results - jsn
            //const location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            // Get the Weather for the cached location
            //var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
            var 
            //var apiUrl = WEATHER_API_BASE_URL + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + WEATHER_API_KEY;
            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
            console.log(apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    // Display the Current Weather

                    // Display the 5 Day Forecast
                });
        });
}


// Add an event handler for the search button
