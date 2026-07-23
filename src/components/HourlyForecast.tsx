import React from 'react';
import { Clock, Umbrella, Wind } from 'lucide-react';
import { HourlyForecastData, UnitsConfig } from '../types/weather';
import { formatTemp, formatSpeed } from '../utils/wmoCodes';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyForecastData;
  units: UnitsConfig;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, units }) => {
  if (!hourly.time || hourly.time.length === 0) return null;

  // Take the next 24 hours starting from current time
  const nowIndex = 0; // Hourly forecast starts from current hour in response
  const next24 = hourly.time.slice(nowIndex, nowIndex + 24).map((t, idx) => ({
    timeStr: new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: hourly.temperature2m?.[idx] ?? 0,
    code: hourly.weatherCode?.[idx] ?? 0,
    pop: hourly.precipitationProbability?.[idx] ?? 0,
    wind: hourly.windSpeed10m?.[idx] ?? 0,
    isNow: idx === 0
  }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-500" />
          24-Hour Forecast
        </h3>
        <span className="text-xs text-slate-400 font-medium">Scroll horizontally →</span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {next24.map((item, idx) => (
          <div
            key={`${item.timeStr}-${idx}`}
            className={`flex-shrink-0 flex flex-col items-center justify-between p-3.5 rounded-2xl min-w-[90px] border transition-all duration-200 ${
              item.isNow
                ? 'bg-gradient-to-b from-sky-500 to-blue-600 text-white border-sky-400 shadow-md shadow-sky-500/20 scale-105'
                : 'bg-white/80 dark:bg-slate-900/80 hover:bg-sky-50/60 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800/80'
            }`}
          >
            {/* Time label */}
            <span className={`text-xs font-bold ${item.isNow ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              {item.isNow ? 'Now' : item.timeStr}
            </span>

            {/* Weather icon */}
            <div className="my-2">
              <WeatherIcon code={item.code} className="w-8 h-8" />
            </div>

            {/* Temp */}
            <span className={`text-base font-black ${item.isNow ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              {formatTemp(item.temp, units.temperature)}
            </span>

            {/* Rain chance badge if > 10% */}
            {item.pop > 10 ? (
              <div
                className={`mt-1.5 flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  item.isNow
                    ? 'bg-white/20 text-white'
                    : 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300'
                }`}
              >
                <Umbrella className="w-2.5 h-2.5" />
                {item.pop}%
              </div>
            ) : (
              <div
                className={`mt-1.5 flex items-center gap-1 text-[10px] font-medium opacity-60 ${
                  item.isNow ? 'text-white' : 'text-slate-400'
                }`}
              >
                <Wind className="w-2.5 h-2.5" />
                {formatSpeed(item.wind, units.speed).split(' ')[0]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
