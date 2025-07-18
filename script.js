const apiKey = 'ВАШ_API_КЛЮЧ_ОТ_OPENWEATHERMAP';
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const resultDiv = document.getElementById('weather-result');
const cityNameEl = document.getElementById('city-name');
const descEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  // Получаем координаты города
  const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`);
  const [loc] = await geoRes.json();
  if (!loc) {
    alert('Город не найден');
    return;
  }

  // Получаем погоду по координатам
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&lang=ru&appid=${apiKey}`
  );
  const data = await weatherRes.json();

  // Вставляем данные в DOM
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  descEl.textContent = data.weather[0].description;
  tempEl.textContent = Math.round(data.main.temp);
  humidityEl.textContent = data.main.humidity;
  windEl.textContent = data.wind.speed;

  resultDiv.classList.remove('hidden');
});
