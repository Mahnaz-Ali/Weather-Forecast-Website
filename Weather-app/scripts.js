document.getElementById('get-weather-btn').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if (location.trim() === '') {
        alert('Please enter a location.');
        return;
    }
    getWeather(location);
});

function getWeather(location) {
    const apiKey = '16a6955ca250464c7208c3231dd3c1cb'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found!');
            }
            return response.json();
        })
        .then(data => {
            const weatherIconMap = {
                '01d': 'fas fa-sun',
                '01n': 'fas fa-moon',
                '02d': 'fas fa-cloud-sun',
                '02n': 'fas fa-cloud-moon',
                '03d': 'fas fa-cloud',
                '03n': 'fas fa-cloud',
                '04d': 'fas fa-cloud-meatball',
                '04n': 'fas fa-cloud-meatball',
                '09d': 'fas fa-cloud-showers-heavy',
                '09n': 'fas fa-cloud-showers-heavy',
                '10d': 'fas fa-cloud-sun-rain',
                '10n': 'fas fa-cloud-moon-rain',
                '11d': 'fas fa-poo-storm',
                '11n': 'fas fa-poo-storm',
                '13d': 'fas fa-snowflake',
                '13n': 'fas fa-snowflake',
                '50d': 'fas fa-smog',
                '50n': 'fas fa-smog'
            };

            const iconCode = data.weather[0].icon;
            const weatherIcon = weatherIconMap[iconCode] || 'fas fa-cloud-sun';

            document.getElementById('weather-icon').innerHTML = `<i class="${weatherIcon}"></i>`;
            document.getElementById('location').innerText = data.name;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
            document.getElementById('weather-result').classList.remove('hidden');
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error);
        });
}
