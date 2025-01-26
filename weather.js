async function getWeatherInfo() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=4fe3735326aa4f2ea9c73540241907&q=${cityName}`);
        const currentWeather = response.data.current;
        const location = response.data.location;

        // Update the current weather section
        document.getElementById('temperature').textContent = `${currentWeather.temp_c}°C`;
        document.getElementById('cityName').textContent = location.name;
        document.getElementById('description').textContent = currentWeather.condition.text;
        document.getElementById('weatherIcon').src = `https:${currentWeather.condition.icon}`;

        // Update the additional info cards
        document.getElementById('humidity').textContent = `${currentWeather.humidity}%`;
        document.getElementById('windSpeed').textContent = `${currentWeather.wind_kph} km/h`;
        document.getElementById('pressure').textContent = `${currentWeather.pressure_mb} hPa`;

        cityInput.value = ''; // Clear the input field

        // Dynamic background and effects
        const weatherContainer = document.querySelector('.weather-container');
        const body = document.body;

        // Remove existing weather effects
        weatherContainer.classList.remove('rain-bg', 'sun-bg');
        document.querySelectorAll('.rain, .sun').forEach(el => el.remove());

        if (currentWeather.condition.text.toLowerCase().includes('rain')) {
            // Rain effect
            const rainDiv = document.createElement('div');
            rainDiv.classList.add('rain');
            for (let i = 0; i < 100; i++) {
                const drop = document.createElement('div');
                drop.style.left = `${Math.random() * 100}%`;
                drop.style.animationDuration = `${0.5 + Math.random()}s`;
                rainDiv.appendChild(drop);
            }
            weatherContainer.appendChild(rainDiv);

            // Background colors for rain
            body.style.background = 'linear-gradient(to bottom, #4a6076, #1c2833)';
            weatherContainer.style.background = '#3b4d61';
        } else if (currentWeather.condition.text.toLowerCase().includes('sun')) {
            // Sun effect
            const sunDiv = document.createElement('div');
            sunDiv.classList.add('sun');
            weatherContainer.appendChild(sunDiv);

            // Background colors for sunny weather
            body.style.background = 'linear-gradient(to bottom, #f6d365, #fda085)';
            weatherContainer.style.background = '#f7b733';
        } else {
            // Default background for other weather
            body.style.background = 'linear-gradient(to bottom, #73c8a9, #373b44)';
            weatherContainer.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    } catch (error) {
        alert('City not found or an error occurred.');
        console.error('API Error:', error);
    }
}

// Attach event listener to the search button
document.getElementById('searchButton').addEventListener('click', getWeatherInfo);
