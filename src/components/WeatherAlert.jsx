import { AlertTriangle } from 'lucide-react';

export default function WeatherAlert({ weather }) {
  const getAlertMessage = () => {
    const temp = weather.current.temperature_2m;
    const windSpeed = weather.current.wind_speed_10m;
    const rainProb = weather.hourly.precipitation_probability[0];

    if (temp >= 35) {
      return {
        type: 'warning',
        message: 'Ondata di calore. Evita l\'esposizione diretta al sole.',
        icon: '🌡️'
      };
    }
    if (temp <= 0) {
      return {
        type: 'warning',
        message: 'Temperature sotto lo zero. Rischio ghiaccio.',
        icon: '❄️'
      };
    }
    if (windSpeed > 50) {
      return {
        type: 'danger',
        message: 'Venti forti. Prestare attenzione.',
        icon: '💨'
      };
    }
    if (rainProb > 70) {
      return {
        type: 'info',
        message: 'Alta probabilità di precipitazioni.',
        icon: '🌧️'
      };
    }
    return null;
  };

  const alert = getAlertMessage();
  if (!alert) return null;

  return (
    <div className={`
      mb-6 p-4 rounded-xl shadow-lg flex items-center gap-3
      ${alert.type === 'warning' ? 'bg-orange-500/20 text-orange-700' : ''}
      ${alert.type === 'danger' ? 'bg-red-500/20 text-red-700' : ''}
      ${alert.type === 'info' ? 'bg-blue-500/20 text-blue-700' : ''}
      dark:text-white
    `}>
      <AlertTriangle className="w-5 h-5" />
      <span>{alert.icon}</span>
      <p className="font-medium">{alert.message}</p>
    </div>
  );
} 