import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { getWeatherEmoji } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix per l'icona del marker che non si vede
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function WeatherMap({ weather }) {
  if (!weather?.latitude || !weather?.longitude) return null;

  return (
    <div className="bg-card rounded-lg p-8 shadow-lg mt-8">
      <h3 className="text-xl font-semibold mb-6">Mappa Meteo</h3>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={[weather.latitude, weather.longitude]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri'
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <Marker position={[weather.latitude, weather.longitude]}>
            <Popup>
              <div className="text-center p-2">
                <h4 className="font-bold">{weather.current.city}</h4>
                <p className="text-lg">{Math.round(weather.current.temperature_2m)}°C</p>
                <img 
                  src={getWeatherEmoji(weather.current.weather_code, weather.current.is_day)}
                  alt="weather"
                  className="w-8 h-8 mx-auto mt-1"
                />
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
