import { Sunrise, Sunset } from 'lucide-react';

export default function SunInfo({ sunrise, sunset }) {
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-sky-900 dark:text-sky-100 mb-4">
        Alba e Tramonto
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <Sunrise className="w-8 h-8 mx-auto text-amber-500" />
          <p className="mt-2 text-lg font-medium text-sky-800 dark:text-sky-200">
            {formatTime(sunrise)}
          </p>
          <p className="text-sm text-sky-600 dark:text-sky-400">Alba</p>
        </div>
        <div className="text-center">
          <Sunset className="w-8 h-8 mx-auto text-orange-600" />
          <p className="mt-2 text-lg font-medium text-sky-800 dark:text-sky-200">
            {formatTime(sunset)}
          </p>
          <p className="text-sm text-sky-600 dark:text-sky-400">Tramonto</p>
        </div>
      </div>
    </div>
  );
} 