import { Clock } from 'lucide-react';
import { getWeatherEmoji } from '@/lib/utils';

export default function HourlyForecast({ hourly }) {
  const next24Hours = hourly.time.slice(0, 24).map((time, index) => ({
    time: new Date(time).getHours() + ':00',
    temp: Math.round(hourly.temperature_2m[index]),
    icon: getWeatherEmoji(hourly.weather_code[index], true),
    humidity: hourly.relative_humidity_2m[index],
    windSpeed: hourly.wind_speed_10m[index]
  }));

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-sky-900 dark:text-sky-100 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Previsioni Orarie
      </h3>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-4 pb-4">
          {next24Hours.map((hour, index) => (
            <div key={index} className="text-center min-w-[80px]">
              <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
                {hour.time}
              </p>
              <img 
                src={hour.icon} 
                alt="weather" 
                className="w-8 h-8 mx-auto my-2"
              />
              <p className="text-lg font-bold text-sky-900 dark:text-sky-100">
                {hour.temp}°
              </p>
              <p className="text-xs text-sky-600 dark:text-sky-400">
                {hour.humidity}%
              </p>
              <p className="text-xs text-sky-600 dark:text-sky-400">
                {hour.windSpeed}km/h
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 