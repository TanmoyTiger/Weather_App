import React from 'react';
import { ProcessedWeatherData, UnitsConfig } from '../types/weather';
import { getWMOInfo, formatSpeed } from '../utils/wmoCodes';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  data: ProcessedWeatherData;
  units: UnitsConfig;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, units }) => {
  const { location, current, daily } = data;
  const wmo = getWMOInfo(current.weatherCode);

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-indigo-950 to-zinc-950 border border-indigo-900 shadow-xl transition-all duration-500">
      {/* Glow Accent */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[340px]">
        {/* Top: Location Info */}
        <div className="space-y-1">
          <p className="text-zinc-400 text-lg">Current Weather</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {location.name}{location.country ? `, ${location.country}` : ''}
          </h1>
          <div className="text-2xl text-zinc-200 mt-2 font-medium flex items-center gap-3">
            <WeatherIcon code={current.weatherCode} isDay={current.isDay} className="w-8 h-8" />
            {wmo.description}
          </div>
        </div>

        {/* Bottom: Temperature & Stats */}
        <div className="mt-8 flex flex-col justify-end">
          {/* Temperature */}
          <div className="flex items-end gap-3">
            <div className="text-[100px] sm:text-[120px] font-extrabold leading-none tracking-tighter text-white drop-shadow-sm">
              {Math.round(current.temperature)}
            </div>
            <div className="text-4xl sm:text-[40px] font-normal text-indigo-500 mb-4 sm:mb-6">
              °{units.temperature === 'celsius' ? 'C' : 'F'}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Wind Speed</div>
              <div className="text-lg font-semibold text-white">
                {formatSpeed(current.windSpeed, units.speed)}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Precipitation</div>
              <div className="text-lg font-semibold text-white">
                {daily.precipitationSum?.[0] ?? 0} {units.precipitation === 'mm' ? 'mm' : 'in'}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Humidity</div>
              <div className="text-lg font-semibold text-white">
                {current.humidity}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
