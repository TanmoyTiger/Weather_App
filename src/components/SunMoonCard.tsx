import React from 'react';
import { Sunrise, Sunset, Clock, Sun } from 'lucide-react';
import { ProcessedWeatherData } from '../types/weather';

interface SunMoonCardProps {
  data: ProcessedWeatherData;
}

export const SunMoonCard: React.FC<SunMoonCardProps> = ({ data }) => {
  const { daily, current } = data;

  const sunriseIso = daily.sunrise?.[0];
  const sunsetIso = daily.sunset?.[0];

  const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sunriseTimeStr = formatTime(sunriseIso);
  const sunsetTimeStr = formatTime(sunsetIso);

  // Calculate daylight duration & remaining percentage
  let durationHours = 0;
  let remainingText = '';
  let dayProgressPercent = 50;

  if (sunriseIso && sunsetIso) {
    const sr = new Date(sunriseIso).getTime();
    const ss = new Date(sunsetIso).getTime();
    const now = new Date(current.time).getTime();

    const totalMs = ss - sr;
    if (totalMs > 0) {
      durationHours = parseFloat((totalMs / (1000 * 60 * 60)).toFixed(1));

      if (now < sr) {
        dayProgressPercent = 0;
        const diffMins = Math.round((sr - now) / (1000 * 60));
        remainingText = `Sunrise in ${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
      } else if (now > ss) {
        dayProgressPercent = 100;
        remainingText = 'Sun has set for today';
      } else {
        const elapsed = now - sr;
        dayProgressPercent = Math.min(Math.max(Math.round((elapsed / totalMs) * 100), 0), 100);
        const remMins = Math.round((ss - now) / (1000 * 60));
        remainingText = `${Math.floor(remMins / 60)}h ${remMins % 60}m of daylight remaining`;
      }
    }
  }

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-[20px] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          Sun Cycles
        </h4>
        <span className="text-xs font-semibold text-slate-500">
          {durationHours > 0 ? `${durationHours} hrs total` : 'Daily Arc'}
        </span>
      </div>

      {/* Solar Arc Timeline */}
      <div className="relative pt-4 pb-2">
        {/* SVG Arc Path */}
        <div className="relative h-20 w-full overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full text-zinc-800" viewBox="0 0 200 100" preserveAspectRatio="none">
            {/* Dotted Arch */}
            <path
              d="M 10 90 A 80 80 0 0 1 190 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="4 4"
            />
            {/* Active Highlight Arch */}
            <path
              d="M 10 90 A 80 80 0 0 1 190 90"
              fill="none"
              stroke="url(#sun-gradient)"
              strokeWidth="4"
              strokeDasharray="300"
              strokeDashoffset={300 - (300 * dayProgressPercent) / 100}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="sun-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Sun icon along path */}
          <div
            className="absolute bottom-1 transition-all duration-1000 transform -translate-x-1/2"
            style={{
              left: `${10 + (dayProgressPercent / 100) * 80}%`,
              bottom: `${Math.sin((dayProgressPercent / 100) * Math.PI) * 50}px`
            }}
          >
            <div className="p-1 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/50">
              <Sun className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset Readouts */}
        <div className="flex items-center justify-between pt-3">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Sunrise</div>
            <div className="text-lg font-semibold text-white">{sunriseTimeStr}</div>
          </div>

          <div className="text-center px-2">
            <span className="text-[11px] font-medium text-slate-500 block">
              {remainingText}
            </span>
          </div>

          <div className="text-right">
            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Sunset</div>
            <div className="text-lg font-semibold text-white">{sunsetTimeStr}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
