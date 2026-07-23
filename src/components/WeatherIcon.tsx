import React from 'react';
import {
  Sun,
  SunDim,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudHail,
  Snowflake,
  CloudLightning,
  CloudSunRain,
  HelpCircle,
  LucideProps
} from 'lucide-react';
import { getWMOInfo } from '../utils/wmoCodes';

interface WeatherIconProps extends LucideProps {
  code: number;
  isDay?: boolean;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay = true, className = 'w-8 h-8', ...props }) => {
  const info = getWMOInfo(code);

  // Night overrides for clear/cloudy weather
  if (!isDay && (code === 0 || code === 1)) {
    return <Moon className={`${className} text-amber-200 dark:text-amber-300 drop-shadow-sm`} {...props} />;
  }

  if (!isDay && code === 2) {
    return <CloudMoon className={`${className} text-slate-300 dark:text-slate-200 drop-shadow-sm`} {...props} />;
  }

  switch (info.category) {
    case 'clear':
      return code === 0 ? (
        <Sun className={`${className} text-amber-500 dark:text-amber-400 animate-spin-slow drop-shadow-md`} {...props} />
      ) : (
        <SunDim className={`${className} text-amber-400 dark:text-amber-300 drop-shadow-sm`} {...props} />
      );

    case 'cloudy':
      return code === 2 ? (
        <CloudSun className={`${className} text-sky-500 dark:text-sky-300 drop-shadow-sm`} {...props} />
      ) : (
        <Cloud className={`${className} text-slate-400 dark:text-slate-300 drop-shadow-sm`} {...props} />
      );

    case 'foggy':
      return <CloudFog className={`${className} text-teal-500 dark:text-teal-300 drop-shadow-sm`} {...props} />;

    case 'rainy':
      if (code === 51 || code === 53) {
        return <CloudDrizzle className={`${className} text-cyan-500 dark:text-cyan-300 drop-shadow-sm`} {...props} />;
      }
      if (code === 80) {
        return <CloudSunRain className={`${className} text-sky-500 dark:text-sky-300 drop-shadow-sm`} {...props} />;
      }
      if (code === 65 || code === 82) {
        return <CloudRainWind className={`${className} text-blue-600 dark:text-blue-400 drop-shadow-md`} {...props} />;
      }
      return <CloudRain className={`${className} text-blue-500 dark:text-blue-300 drop-shadow-sm`} {...props} />;

    case 'snowy':
      return <Snowflake className={`${className} text-sky-300 dark:text-sky-200 animate-pulse drop-shadow-sm`} {...props} />;

    case 'stormy':
      return <CloudLightning className={`${className} text-purple-600 dark:text-amber-400 drop-shadow-lg animate-bounce`} {...props} />;

    default:
      return <HelpCircle className={`${className} text-slate-400`} {...props} />;
  }
};
