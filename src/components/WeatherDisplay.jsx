import { getWeatherEmoji } from '@/lib/utils';

export default function WeatherDisplay({ weather, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Caricamento previsioni...</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p>Inserisci il nome di una città per vedere le previsioni meteo</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="bg-card rounded-lg p-8 shadow-lg max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{weather.city}</h2>
          <div className="flex justify-center mb-6">
            <img 
              src={getWeatherEmoji(weather.weather_code, weather.is_day)}
              alt="weather icon"
              className="w-32 h-32"
            />
          </div>
          <div className="text-5xl font-bold mb-6">
            {Math.round(weather.temperature_2m)}°C
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold">Vento</p>
              <p>{weather.wind_speed_10m} km/h</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold">Stato</p>
              <p>{weather.is_day ? 'Giorno' : 'Notte'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 