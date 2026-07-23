import React from 'react';
import {
  Sparkles,
  Activity,
  Flame,
  Footprints,
  Shirt,
  Glasses,
  Umbrella,
  Car,
  AlertTriangle,
  Wind,
  Sun,
  SunMedium,
  Snowflake,
  Droplets,
  HeartPulse,
  ShieldAlert
} from 'lucide-react';
import { ProcessedWeatherData, UnitsConfig, SmartRecommendation } from '../types/weather';
import { generateSmartRecommendations } from '../utils/wmoCodes';

interface ActivityRecommendationsProps {
  data: ProcessedWeatherData;
  units: UnitsConfig;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Activity: (props) => <Activity {...props} />,
  Flame: (props) => <Flame {...props} />,
  Footprints: (props) => <Footprints {...props} />,
  SunMedium: (props) => <SunMedium {...props} />,
  Snowflake: (props) => <Snowflake {...props} />,
  Umbrella: (props) => <Umbrella {...props} />,
  Shirt: (props) => <Shirt {...props} />,
  Glasses: (props) => <Glasses {...props} />,
  AlertTriangle: (props) => <AlertTriangle {...props} />,
  Car: (props) => <Car {...props} />,
  Wind: (props) => <Wind {...props} />,
  ShieldAlert: (props) => <ShieldAlert {...props} />,
  Sun: (props) => <Sun {...props} />,
  Droplets: (props) => <Droplets {...props} />,
  HeartPulse: (props) => <HeartPulse {...props} />
};

export const ActivityRecommendations: React.FC<ActivityRecommendationsProps> = ({ data, units }) => {
  const recommendations: SmartRecommendation[] = generateSmartRecommendations(
    data.current,
    data.daily,
    units.temperature
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[20px] p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-indigo-500 mb-2">
        <Sparkles className="w-4 h-4" />
        Smart Planning
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {recommendations.map((rec) => {
          const IconComp = ICON_MAP[rec.icon] || Activity;
          let borderClass = 'border-indigo-500';
          if (rec.rating === 'ideal') borderClass = 'border-emerald-500';
          if (rec.rating === 'caution') borderClass = 'border-amber-500';
          if (rec.rating === 'avoid') borderClass = 'border-rose-500';

          return (
            <div
              key={rec.id}
              className={`bg-zinc-800 rounded-xl p-4 border-l-4 ${borderClass} flex items-start gap-3`}
            >
              <div className="text-zinc-400 shrink-0 mt-0.5">
                <IconComp className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-zinc-100">
                    {rec.title}
                  </h4>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
