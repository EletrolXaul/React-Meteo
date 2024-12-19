import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      // Geocoding API
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results?.length) {
        throw new Error('Città non trovata. Prova con un altro nome.');
      }

      const { latitude, longitude } = geoData.results[0];

      // Weather API
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,is_day`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        ...weatherData.current,
        city: geoData.results[0].name
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">
        Meteo App
      </h1>
      <div className="flex justify-center mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      {error && (
        <div className="text-destructive text-center mb-8 p-4 bg-destructive/10 rounded-lg">
          {error}
        </div>
      )}
      <WeatherDisplay weather={weather} loading={loading} />
    </div>
  );
}

export default App;
