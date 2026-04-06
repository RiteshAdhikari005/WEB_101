// Configuration and Constants
const WEATHER_API_KEY = '46a2d396cab48ee5c589a74fa1d46ac8';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const PLACEHOLDER_API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Global state to store saved locations
let savedLocations = [];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // Tab navigation
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      // ✅ FIX: add active class
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });

  document.getElementById('get-weather').addEventListener('click', getWeather);
  document.getElementById('save-location').addEventListener('click', saveLocation);

  document.getElementById('update-location').addEventListener('click', updateLocation);
  document.getElementById('cancel-edit').addEventListener('click', () => {
    document.getElementById('edit-modal').style.display = 'none';
  });

  fetchSavedLocations();
});

// Utility Functions
function displayResponseInfo(method, url, status, data) {
  const responseInfo = document.getElementById('response-info');
  responseInfo.textContent = `Method: ${method}
URL: ${url}
Status: ${status}
Timestamp: ${new Date().toLocaleString()}

Data: ${JSON.stringify(data, null, 2)}`;
}

// GET Request Implementation
async function getWeather() {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const weatherResult = document.getElementById('weather-result');
  weatherResult.innerHTML = 'Loading...';

  try {
    const url = `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    displayResponseInfo('GET', url.replace(WEATHER_API_KEY, 'API_KEY_HIDDEN'), response.status, data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    weatherResult.innerHTML = `
      <div class="weather-card">
        <h3>${data.name}, ${data.sys.country}</h3>
        <div>
          <strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}
        </div>
        <div>
          <strong>Temperature:</strong> ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)
        </div>
        <div>
          <strong>Humidity:</strong> ${data.main.humidity}%
        </div>
        <div>
          <strong>Wind:</strong> ${data.wind.speed} m/s
        </div>
      </div>
      <button id="quick-save" style="background-color: #27ae60;">Save This Location</button>
    `;

    document.getElementById('quick-save').addEventListener('click', () => {
      document.getElementById('location-name').value = `Weather in ${data.name}`;
      document.getElementById('location-city').value = data.name;
      document.getElementById('location-country').value = data.sys.country;
      document.getElementById('location-notes').value =
        `Temp: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;

      document.querySelector('.tab[data-tab="post"]').click();
    });

  } catch (error) {
    weatherResult.innerHTML = `
      <div class="weather-card" style="border-left-color: #e74c3c;">
        <h3>Error</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// POST Request Implementation
async function saveLocation() {
    const name = document.getElementById('location-name').value.trim();
    const city = document.getElementById('location-city').value.trim();
    const country = document.getElementById('location-country').value.trim();
    const notes = document.getElementById('location-notes').value.trim();

    if (!name || !city) {
        alert('Please enter at least a name and city');
        return;
    }

    try {
        const locationData = {
            title: name,
            body: JSON.stringify({ city, country, notes }),
            userId: 1
        };

        const response = await fetch(PLACEHOLDER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(locationData)
        });

        const data = await response.json();

        displayResponseInfo('POST', PLACEHOLDER_API_URL, response.status, data);

        if (!response.ok) {
            throw new Error('Failed to save location');
        }

        const savedLocation = {
            id: data.id,
            name,
            city,
            country,
            notes
        };

        savedLocations.push(savedLocation);
        renderSavedLocations();

        document.getElementById('location-name').value = '';
        document.getElementById('location-city').value = '';
        document.getElementById('location-country').value = '';
        document.getElementById('location-notes').value = '';

        document.querySelector('.tab[data-tab="saved"]').click();

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Fetch saved locations
async function fetchSavedLocations() {
    const response = await fetch(`${PLACEHOLDER_API_URL}?userId=1`);
    const data = await response.json();

    savedLocations = data.slice(0, 5).map(item => {
        let city = '', country = '', notes = '';

        try {
            const body = JSON.parse(item.body);
            city = body.city || 'Unknown City';
            country = body.country || '';
            notes = body.notes || '';
        } catch {
            city = 'Unknown City';
            notes = item.body;
        }

        return {
            id: item.id,
            name: item.title,
            city,
            country,
            notes
        };
    });

    renderSavedLocations();
}

// Render saved locations
function renderSavedLocations() {
  const container = document.getElementById('saved-locations');

  if (savedLocations.length === 0) {
    container.innerHTML = '<p>No saved locations.</p>';
    return;
  }

  container.innerHTML = savedLocations.map(location => `
    <div class="location-item" data-id="${location.id}">
      <h3>${location.name}</h3>
      <div><strong>City:</strong> ${location.city}</div>

      <!-- ✅ FIX -->
      ${location.country ? `<div><strong>Country:</strong> ${location.country}</div>` : ''}
      ${location.notes ? `<div><strong>Notes:</strong> ${location.notes}</div>` : ''}

      <div class="location-actions">
        <button class="btn-edit" onclick="editLocation(${location.id})">Edit</button>
        <button class="btn-delete" onclick="deleteLocation(${location.id})">Delete</button>
      </div>
    </div>
  `).join('');
}