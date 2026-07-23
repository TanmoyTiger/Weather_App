import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Thermometer, Umbrella, Wind } from 'lucide-react';
import { DailyForecastData, UnitsConfig } from '../types/weather';
import { convertTemperature, convertSpeed, convertPrecipitation } from '../utils/wmoCodes';

interface ForecastChartProps {
  daily: DailyForecastData;
  units: UnitsConfig;
}

type ChartMetric = 'temperature' | 'precipitation' | 'wind';

export const ForecastChart: React.FC<ForecastChartProps> = ({ daily, units }) => {
  const [metric, setMetric] = useState<ChartMetric>('temperature');

  if (!daily.time || daily.time.length === 0) return null;

  // Prepare data array for Recharts
  const chartData = daily.time.map((timeStr, idx) => {
    const dateObj = new Date(timeStr);
    const dayLabel = idx === 0 ? 'Today' : dateObj.toLocaleDateString([], { weekday: 'short' });

    const maxTemp = convertTemperature(daily.temperatureMax[idx], units.temperature);
    const minTemp = convertTemperature(daily.temperatureMin[idx], units.temperature);
    const precipSum = convertPrecipitation(daily.precipitationSum[idx] || 0, units.precipitation);
    const precipProb = daily.precipitationProbabilityMax[idx] || 0;
    const windMax = convertSpeed(daily.windSpeedMax[idx] || 0, units.speed);

    return {
      day: dayLabel,
      date: dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      maxTemp,
      minTemp,
      precipSum,
      precipProb,
      windMax
    };
  });

  return (
    <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-sky-500" />
          7-Day Forecast Trends
        </h3>

        {/* Tab Switchers */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold">
          <button
            onClick={() => setMetric('temperature')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              metric === 'temperature'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" /> Temp
          </button>
          <button
            onClick={() => setMetric('precipitation')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              metric === 'precipitation'
                ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Umbrella className="w-3.5 h-3.5" /> Rain
          </button>
          <button
            onClick={() => setMetric('wind')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              metric === 'wind'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Wind className="w-3.5 h-3.5" /> Wind
          </button>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempHighGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="tempLowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-slate-900/90 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1 backdrop-blur-md">
                    <p className="font-bold text-sky-400">{d.day} ({d.date})</p>
                    {metric === 'temperature' && (
                      <>
                        <p className="text-amber-300">Max Temp: {d.maxTemp}°{units.temperature === 'celsius' ? 'C' : 'F'}</p>
                        <p className="text-blue-300">Min Temp: {d.minTemp}°{units.temperature === 'celsius' ? 'C' : 'F'}</p>
                      </>
                    )}
                    {metric === 'precipitation' && (
                      <>
                        <p className="text-sky-300">Rain Chance: {d.precipProb}%</p>
                        <p className="text-slate-300">Amount: {d.precipSum} {units.precipitation === 'inch' ? 'in' : 'mm'}</p>
                      </>
                    )}
                    {metric === 'wind' && (
                      <p className="text-indigo-300">Max Wind: {d.windMax} {units.speed === 'mph' ? 'mph' : 'km/h'}</p>
                    )}
                  </div>
                );
              }}
            />

            {metric === 'temperature' && (
              <>
                <Area
                  type="monotone"
                  dataKey="maxTemp"
                  name="High Temp"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#tempHighGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="minTemp"
                  name="Low Temp"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tempLowGrad)"
                />
              </>
            )}

            {metric === 'precipitation' && (
              <Area
                type="monotone"
                dataKey="precipProb"
                name="Rain Chance (%)"
                stroke="#0284c7"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#rainGrad)"
              />
            )}

            {metric === 'wind' && (
              <Area
                type="monotone"
                dataKey="windMax"
                name="Max Wind"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#windGrad)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
