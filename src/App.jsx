import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchWeatherData = async (city, coords = null) => {
    setLoading(true);
    setError(null);
    try {
      let latitude, longitude, timezone;
      let geoData, reverseGeoData;

      if (coords) {
        ({ latitude, longitude } = coords);
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const reverseGeoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
        );
        reverseGeoData = await reverseGeoResponse.json();
      } else {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
        );
        geoData = await geoResponse.json();
        if (!geoData.results?.length) {
          throw new Error("Città non trovata. Prova con un altro nome.");
        }
        ({ latitude, longitude, timezone } = geoData.results[0]);
      }

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,is_day` +
        `&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation_probability` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max` +
        `&timezone=${timezone}`
      );
      const weatherData = await weatherResponse.json();

      // Se abbiamo le coordinate, otteniamo il nome della città
      if (coords) {
        try {
          const reverseGeoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
          );
          if (!reverseGeoResponse.ok) {
            throw new Error('Errore nel recupero dei dati della città');
          }
          const reverseGeoData = await reverseGeoResponse.json();
          if (!reverseGeoData.results?.length) {
            throw new Error('Posizione non trovata');
          }
          city = reverseGeoData.results[0].name;
        } catch (error) {
          setError("Impossibile determinare la tua posizione. Cerca manualmente una città.");
          setLoading(false);
          return;
        }
      }

      setWeather({
        current: {
          ...weatherData.current,
          city: city,
          country: coords ? reverseGeoData.results[0].country : geoData.results[0].country,
        },
        latitude,
        longitude,
        hourly: weatherData.hourly,
        daily: weatherData.daily,
      });
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Geolocalizzazione all'avvio
  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const reverseGeoResponse = await fetch(
              `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
            );
            
            if (!reverseGeoResponse.ok) {
              throw new Error("Errore nel recupero della posizione");
            }
            
            const geoData = await reverseGeoResponse.json();
            if (!geoData.results?.length) {
              throw new Error("Posizione non trovata");
            }

            await fetchWeatherData(geoData.results[0].name);
          } catch (error) {
            setError("Impossibile determinare la tua posizione. Cerca manualmente una città.");
            setLoading(false);
          }
        },
        (error) => {
          let errorMessage = "Impossibile ottenere la posizione. ";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Permesso negato. Attiva la geolocalizzazione nel browser.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Posizione non disponibile.";
              break;
            case error.TIMEOUT:
              errorMessage += "Richiesta scaduta.";
              break;
            default:
              errorMessage += "Errore sconosciuto.";
          }
          setError(errorMessage);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError("Il tuo browser non supporta la geolocalizzazione");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-200 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-6xl font-bold text-center mb-8 text-white dark:text-sky-100 drop-shadow-lg">
          Meteo App
        </h1>
        <div className="flex justify-center mb-12">
          <SearchBar onSearch={(city) => fetchWeatherData(city)} />
        </div>
        {error && (
          <div className="text-white bg-red-500/80 text-center mb-8 p-4 rounded-lg shadow-lg max-w-md mx-auto">
            {error}
          </div>
        )}
        {lastUpdate && (
          <div className="text-center text-sm text-white/80 mb-6">
            Ultimo aggiornamento: {lastUpdate}
          </div>
        )}
        <WeatherDisplay weather={weather} loading={loading} />
      </div>
    </div>
  );
}

export default App;
