import { Droplets, Thermometer, Wind } from 'lucide-react';

export default function DailyStats({ current }) {
    const stats = [
        {
            label: 'Temperatura Percepita',
            value: `${Math.round(current.apparent_temperature)}°C`,
            icon: Thermometer,
            color: 'text-red-500'
        },
        {
            label: 'Umidità',
            value: `${current.relative_humidity_2m}%`,
            icon: Droplets,
            color: 'text-blue-500'
        },
        {
            label: 'Vento',
            value: `${Math.round(current.wind_speed_10m)} km/h`,
            icon: Wind,
            color: 'text-green-500'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        <div>
                            <p className="text-sm text-sky-700 dark:text-sky-300">
                                {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-sky-900 dark:text-sky-100">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 