import { Wind } from 'lucide-react';

export default function WindInfo({ speed, direction }) {
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-sky-900 dark:text-sky-100">
          Vento
        </h3>
        <Wind className="w-6 h-6 text-sky-600 dark:text-sky-400" />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-3xl font-bold text-sky-700 dark:text-sky-300">
            {Math.round(speed)} km/h
          </p>
          <p className="text-sm text-sky-600 dark:text-sky-400">Velocità</p>
        </div>
        <div className="text-center">
          <div 
            className="w-12 h-12 flex items-center justify-center"
            style={{ transform: `rotate(${direction}deg)` }}
          >
            ↑
          </div>
          <p className="text-sm text-sky-600 dark:text-sky-400">
            {getWindDirection(direction)}
          </p>
        </div>
      </div>
    </div>
  );
} 