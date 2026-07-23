import React from 'react';
import { DailyForecastData, UnitsConfig } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface WeeklyForecastProps {
  daily: DailyForecastData;
  units: UnitsConfig;
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ daily, units }) => {
  if (!daily.time || daily.time.length === 0) return null;

  // Calculate global min and max temperature across the 7 days for range bar scaling
  const allMax = Math.max(...daily.temperatureMax);
  const allMin = Math.min(...daily.temperatureMin);
  const totalSpan = Math.max(allMax - allMin, 1);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[20px] p-5 flex justify-between items-center overflow-x-auto">
      {daily.time.slice(0, 7).map((dateStr, idx) => {
        const dateObj = new Date(dateStr);
        const dayName = dateObj.toLocaleDateString([], { weekday: 'short' });
        
        const code = daily.weatherCode[idx] ?? 0;
        const tMax = daily.temperatureMax[idx] ?? 0;
        const tMin = daily.temperatureMin[idx] ?? 0;
        const precipProb = daily.precipitationProbabilityMax?.[idx] ?? 0;

        return (
          <div
            key={dateStr}
            className="flex-1 flex flex-col items-center gap-2 border-r border-zinc-800 last:border-r-0 min-w-[60px]"
          >
            <div className="text-xs font-semibold text-zinc-400 uppercase">{dayName}</div>
            <WeatherIcon code={code} className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" />
            <div className="text-sm sm:text-base font-bold text-white whitespace-nowrap">
              {Math.round(tMax)}° / {Math.round(tMin)}°
            </div>
            <div className="text-[11px] font-medium text-indigo-500">
              {precipProb}%
            </div>
          </div>
        );
      })}
    </div>
  );
};
