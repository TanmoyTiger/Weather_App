import React from 'react';
import { Wind, Compass, Droplets, Sun, Gauge, Eye, Cloud, Umbrella, Navigation } from 'lucide-react';
import { ProcessedWeatherData, UnitsConfig } from '../types/weather';
import { formatSpeed, formatPrecipitation, getWindCompassDirection, convertTemperature } from '../utils/wmoCodes';

interface WeatherDetailsGridProps {
  data: ProcessedWeatherData;
  units: UnitsConfig;
}

export const WeatherDetailsGrid: React.FC<WeatherDetailsGridProps> = ({ data, units }) => {
  const { current, daily, hourly } = data;

  const windDirName = getWindCompassDirection(current.windDirection);
  const uvMax = daily.uvIndexMax?.[0] ?? 0;
  const precipSum = daily.precipitationSum?.[0] ?? current.precipitation;
  const cloudCover = current.cloudCover;
  
  // Calculate approximate dew point: T - ((100 - RH) / 5)
  const dewPointC = current.temperature - ((100 - current.humidity) / 5);
  const dewPointFormatted = `${convertTemperature(dewPointC, units.temperature)}°${units.temperature === 'celsius' ? 'C' : 'F'}`;

  // UV gauge status
  const getUvStatus = (uv: number) => {
    if (uv <= 2) return { text: 'Low Protection Needed', color: 'bg-emerald-500', textCol: 'text-emerald-600 dark:text-emerald-400' };
    if (uv <= 5) return { text: 'Moderate Protection', color: 'bg-yellow-500', textCol: 'text-yellow-600 dark:text-yellow-400' };
    if (uv <= 7) return { text: 'High Risk - Sunscreen Required', color: 'bg-amber-500', textCol: 'text-amber-600 dark:text-amber-400' };
    if (uv <= 10) return { text: 'Very High Risk - Seek Shade', color: 'bg-rose-500', textCol: 'text-rose-600 dark:text-rose-400' };
    return { text: 'Extreme Risk - Avoid Sun', color: 'bg-purple-600', textCol: 'text-purple-600 dark:text-purple-400' };
  };

  const uvInfo = getUvStatus(uvMax);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-sky-500" />
          Atmospheric & Live Metrics
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Wind & Compass */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Wind className="w-4 h-4 text-sky-500" /> Wind Speed
            </span>
            <Compass className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {formatSpeed(current.windSpeed, units.speed)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                Gusts up to {formatSpeed(current.windGusts, units.speed)}
              </p>
            </div>

            {/* Visual Direction Pointer */}
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-transform duration-500"
                style={{ transform: `rotate(${current.windDirection}deg)` }}
                title={`Wind direction: ${current.windDirection}° (${windDirName})`}
              >
                <Navigation className="w-5 h-5 text-sky-500 fill-sky-500" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-1">
                {windDirName} ({current.windDirection}°)
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Humidity & Dew Point */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Droplets className="w-4 h-4 text-cyan-500" /> Humidity
            </span>
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{current.humidity}%</span>
          </div>

          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {current.humidity}%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              Dew point is {dewPointFormatted}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(current.humidity, 100)}%` }}
            />
          </div>
        </div>

        {/* Card 3: UV Index */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Sun className="w-4 h-4 text-amber-500" /> UV Index
            </span>
            <span className={`text-xs font-bold ${uvInfo.textCol}`}>Level {uvMax}</span>
          </div>

          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {uvMax} / 12
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 pt-0.5">
              {uvInfo.text}
            </p>
          </div>

          {/* Multi-color UV bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex">
            <div
              className={`${uvInfo.color} h-full rounded-full transition-all duration-500`}
              style={{ width: `${Math.min((uvMax / 12) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Card 4: Pressure & Cloud Cover */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Cloud className="w-4 h-4 text-slate-500" /> Clouds & Pressure
            </span>
            <Umbrella className="w-4 h-4 text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Pressure</span>
              <div className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
                {Math.round(current.pressure)} <span className="text-xs text-slate-400 font-normal">hPa</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Cloud Cover</span>
              <div className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
                {cloudCover}%
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Precipitation today: {formatPrecipitation(precipSum, units.precipitation)}
          </p>
        </div>
      </div>
    </div>
  );
};
