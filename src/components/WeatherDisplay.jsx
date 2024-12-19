import { getWeatherEmoji } from "@/lib/utils";
import WeatherMap from "./WeatherMap";
import WeatherAlert from "./WeatherAlert";
import WindInfo from "./WindInfo";
import SunInfo from "./SunInfo";
import HourlyForecast from "./HourlyForecast";
import DailyStats from "./DailyStats";

export default function WeatherDisplay({ weather, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Caricamento previsioni...</p>
      </div>
    );
  }

  if (!weather) return <EmptyState />;

  const { current, hourly, daily } = weather;

  return (
    <div className="space-y-6">
      <WeatherAlert weather={weather} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <CurrentWeather current={current} />
          <DailyStats current={current} />
          <SunInfo
            sunrise={daily.sunrise[0]}
            sunset={daily.sunset[0]}
          />
          <WindInfo
            speed={current.wind_speed_10m}
            direction={current.wind_direction_10m}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <WeatherMap weather={weather} />
          <HourlyForecast hourly={hourly} />
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-sky-900 dark:text-sky-100">
              Previsioni Meteo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {daily.time.slice(0, 5).map((day, index) => (
                <DayForecast
                  key={day}
                  date={new Date(day)}
                  icon={getWeatherEmoji(daily.weather_code[index], true)}
                  maxTemp={daily.temperature_2m_max[index]}
                  minTemp={daily.temperature_2m_min[index]}
                  rainProb={daily.precipitation_probability_max[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentWeather({ current }) {
  return (
    <div className="text-center space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold text-sky-900 dark:text-sky-100">{current.city}</h2>
        <p className="text-lg text-sky-700 dark:text-sky-300">{current.country}</p>
      </div>
      <img
        src={getWeatherEmoji(current.weather_code, current.is_day)}
        alt="weather icon"
        className="w-32 h-32 mx-auto drop-shadow-xl"
      />
      <div>
        <div className="text-4xl font-bold">{Math.round(current.temperature_2m)}°C</div>
        <div className="text-sm text-muted-foreground">
        </div>
        <div className="text-lg text-sky-700 dark:text-sky-300">
          Percepita {Math.round(current.apparent_temperature)}°C
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <InfoCard title="Umidità" value={`${current.relative_humidity_2m}%`} icon="💧" />
        <InfoCard title="Vento" value={`${current.wind_speed_10m} km/h`} icon="💨" />
      </div>
    </div>

  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl shadow-lg">
      <span className="text-3xl mb-2">{icon}</span>
      <h3 className="font-medium text-sky-900 dark:text-sky-100">{title}</h3>
      <p className="text-xl text-sky-800 dark:text-sky-200">{value}</p>
    </div>
  );
}

function DayForecast({ date, icon, maxTemp, minTemp, rainProb }) {
  const dayName = date.toLocaleDateString("it-IT", { weekday: "short" });

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center">
      <h4 className="font-medium text-sky-900 dark:text-sky-100 text-lg">{dayName}</h4>
      <img src={icon} alt="weather" className="w-16 h-16 mx-auto my-3" />
      <div className="flex justify-center gap-3 text-lg">
        <span className="text-red-500 font-bold">{Math.round(maxTemp)}°</span>
        <span className="text-blue-500 font-bold">{Math.round(minTemp)}°</span>
      </div>
      <div className="text-sky-700 dark:text-sky-300 mt-2">{rainProb}% 🌧️</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold mb-2">Nessuna città selezionata</h3>
      <p className="text-muted-foreground">
        Cerca una città per vedere le previsioni meteo
      </p>
    </div>
  );
}
