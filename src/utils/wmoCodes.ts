import { WMOInfo, TemperatureUnit, SpeedUnit, PrecipitationUnit, SmartRecommendation, CurrentWeatherData, DailyForecastData } from '../types/weather';

export const WMO_MAP: Record<number, WMOInfo> = {
  0: {
    code: 0,
    description: 'Clear Sky',
    category: 'clear',
    iconName: 'Sun',
    themeGradient: 'from-amber-500/20 via-sky-500/15 to-blue-600/20 dark:from-amber-950/40 dark:via-sky-950/30 dark:to-slate-900',
    bgStyle: 'bg-gradient-to-br from-amber-50/80 via-sky-50/60 to-blue-50/70 dark:from-slate-950 dark:via-blue-950/40 dark:to-slate-900'
  },
  1: {
    code: 1,
    description: 'Mainly Clear',
    category: 'clear',
    iconName: 'SunDim',
    themeGradient: 'from-amber-400/20 via-sky-400/15 to-blue-500/20 dark:from-amber-900/30 dark:via-slate-900 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-amber-50/70 via-sky-50/50 to-blue-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
  },
  2: {
    code: 2,
    description: 'Partly Cloudy',
    category: 'cloudy',
    iconName: 'CloudSun',
    themeGradient: 'from-sky-400/20 via-indigo-400/15 to-slate-500/20 dark:from-sky-950/40 dark:via-slate-900 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-sky-50/80 via-slate-50/70 to-indigo-50/60 dark:from-slate-950 dark:via-sky-950/30 dark:to-slate-900'
  },
  3: {
    code: 3,
    description: 'Overcast',
    category: 'cloudy',
    iconName: 'Cloud',
    themeGradient: 'from-slate-400/20 via-gray-500/15 to-slate-700/20 dark:from-slate-900 dark:via-slate-950 dark:to-gray-950',
    bgStyle: 'bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950'
  },
  45: {
    code: 45,
    description: 'Foggy',
    category: 'foggy',
    iconName: 'CloudFog',
    themeGradient: 'from-slate-300/30 via-teal-500/10 to-slate-600/20 dark:from-slate-900 dark:via-teal-950/30 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-teal-50/60 via-slate-100 to-gray-100 dark:from-slate-950 dark:via-teal-950/20 dark:to-slate-900'
  },
  48: {
    code: 48,
    description: 'Depositing Rime Fog',
    category: 'foggy',
    iconName: 'CloudFog',
    themeGradient: 'from-teal-300/20 via-cyan-400/15 to-slate-600/20 dark:from-teal-950/40 dark:via-slate-900 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-teal-50/70 via-cyan-50/60 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
  },
  51: {
    code: 51,
    description: 'Light Drizzle',
    category: 'rainy',
    iconName: 'CloudDrizzle',
    themeGradient: 'from-cyan-500/20 via-blue-500/15 to-slate-600/20 dark:from-cyan-950/40 dark:via-blue-950/30 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-cyan-50/80 via-blue-50/60 to-slate-100 dark:from-slate-950 dark:via-cyan-950/30 dark:to-slate-900'
  },
  53: {
    code: 53,
    description: 'Moderate Drizzle',
    category: 'rainy',
    iconName: 'CloudDrizzle',
    themeGradient: 'from-cyan-600/20 via-blue-600/20 to-slate-700/20 dark:from-cyan-950/50 dark:via-blue-950/40 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-cyan-100/70 via-blue-50/70 to-slate-200 dark:from-slate-950 dark:via-blue-950/40 dark:to-slate-950'
  },
  55: {
    code: 55,
    description: 'Dense Drizzle',
    category: 'rainy',
    iconName: 'CloudRain',
    themeGradient: 'from-blue-600/25 via-cyan-700/20 to-slate-800/20 dark:from-blue-950/60 dark:via-cyan-950/50 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-blue-100/80 via-cyan-100/70 to-slate-200 dark:from-slate-950 dark:via-blue-950/50 dark:to-slate-950'
  },
  56: {
    code: 56,
    description: 'Light Freezing Drizzle',
    category: 'rainy',
    iconName: 'CloudHail',
    themeGradient: 'from-cyan-400/20 via-indigo-500/15 to-slate-700/20 dark:from-cyan-950/50 dark:via-indigo-950/30 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-cyan-50 via-indigo-50 to-slate-150 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-950'
  },
  57: {
    code: 57,
    description: 'Dense Freezing Drizzle',
    category: 'rainy',
    iconName: 'CloudHail',
    themeGradient: 'from-cyan-500/25 via-indigo-600/20 to-slate-800/20 dark:from-cyan-950/60 dark:via-indigo-950/50 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-cyan-100 via-indigo-100 to-slate-200 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950'
  },
  61: {
    code: 61,
    description: 'Slight Rain',
    category: 'rainy',
    iconName: 'CloudRain',
    themeGradient: 'from-blue-500/20 via-cyan-500/15 to-slate-700/20 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-blue-50/80 via-sky-50/60 to-slate-100 dark:from-slate-950 dark:via-blue-950/40 dark:to-slate-900'
  },
  63: {
    code: 63,
    description: 'Moderate Rain',
    category: 'rainy',
    iconName: 'CloudRain',
    themeGradient: 'from-blue-600/25 via-sky-600/20 to-slate-800/20 dark:from-blue-950/60 dark:via-sky-950/50 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-blue-100/80 via-sky-100/70 to-slate-200 dark:from-slate-950 dark:via-blue-950/50 dark:to-slate-950'
  },
  65: {
    code: 65,
    description: 'Heavy Rain',
    category: 'rainy',
    iconName: 'CloudRainWind',
    themeGradient: 'from-blue-700/30 via-indigo-700/25 to-slate-900/30 dark:from-blue-950/70 dark:via-indigo-950/60 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-blue-200/70 via-indigo-100/80 to-slate-300 dark:from-slate-950 dark:via-blue-950/70 dark:to-slate-950'
  },
  66: {
    code: 66,
    description: 'Light Freezing Rain',
    category: 'rainy',
    iconName: 'CloudHail',
    themeGradient: 'from-sky-400/20 via-cyan-500/20 to-slate-700/20 dark:from-sky-950/50 dark:via-cyan-950/40 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-sky-50 via-cyan-100 to-slate-200 dark:from-slate-950 dark:via-sky-950/40 dark:to-slate-950'
  },
  67: {
    code: 67,
    description: 'Heavy Freezing Rain',
    category: 'rainy',
    iconName: 'CloudHail',
    themeGradient: 'from-sky-600/30 via-cyan-600/25 to-slate-800/30 dark:from-sky-950/70 dark:via-cyan-950/60 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-sky-100 via-cyan-200 to-slate-300 dark:from-slate-950 dark:via-cyan-950/60 dark:to-slate-950'
  },
  71: {
    code: 71,
    description: 'Slight Snow',
    category: 'snowy',
    iconName: 'Snowflake',
    themeGradient: 'from-sky-300/20 via-blue-200/15 to-indigo-400/20 dark:from-slate-900 dark:via-sky-950/30 dark:to-indigo-950/40',
    bgStyle: 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-sky-950/20 dark:to-slate-900'
  },
  73: {
    code: 73,
    description: 'Moderate Snow',
    category: 'snowy',
    iconName: 'Snowflake',
    themeGradient: 'from-blue-300/25 via-sky-300/20 to-indigo-500/25 dark:from-slate-900 dark:via-sky-950/40 dark:to-indigo-950/50',
    bgStyle: 'bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 dark:from-slate-950 dark:via-sky-950/30 dark:to-indigo-950/40'
  },
  75: {
    code: 75,
    description: 'Heavy Snow',
    category: 'snowy',
    iconName: 'Snowflake',
    themeGradient: 'from-sky-400/30 via-indigo-400/25 to-blue-600/30 dark:from-sky-950/60 dark:via-indigo-950/60 dark:to-blue-950/60',
    bgStyle: 'bg-gradient-to-br from-sky-100 via-indigo-100 to-blue-200 dark:from-slate-950 dark:via-sky-950/50 dark:to-slate-900'
  },
  77: {
    code: 77,
    description: 'Snow Grains',
    category: 'snowy',
    iconName: 'Snowflake',
    themeGradient: 'from-slate-300/20 via-sky-200/20 to-indigo-300/20 dark:from-slate-900 dark:via-sky-950/30 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
  },
  80: {
    code: 80,
    description: 'Slight Rain Showers',
    category: 'rainy',
    iconName: 'CloudSunRain',
    themeGradient: 'from-sky-400/20 via-blue-500/15 to-indigo-500/20 dark:from-sky-950/40 dark:via-blue-950/30 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-sky-950/30 dark:to-slate-900'
  },
  81: {
    code: 81,
    description: 'Moderate Rain Showers',
    category: 'rainy',
    iconName: 'CloudRain',
    themeGradient: 'from-blue-500/25 via-sky-600/20 to-slate-700/25 dark:from-blue-950/50 dark:via-sky-950/40 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-blue-100 via-sky-100 to-slate-200 dark:from-slate-950 dark:via-blue-950/40 dark:to-slate-950'
  },
  82: {
    code: 82,
    description: 'Violent Rain Showers',
    category: 'rainy',
    iconName: 'CloudRainWind',
    themeGradient: 'from-indigo-600/30 via-blue-700/25 to-slate-800/30 dark:from-indigo-950/70 dark:via-blue-950/60 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-indigo-100 via-blue-200 to-slate-300 dark:from-slate-950 dark:via-indigo-950/60 dark:to-slate-950'
  },
  85: {
    code: 85,
    description: 'Slight Snow Showers',
    category: 'snowy',
    iconName: 'Snowflake',
    themeGradient: 'from-sky-300/20 via-indigo-300/15 to-slate-600/20 dark:from-sky-950/40 dark:via-indigo-950/30 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-sky-50 via-indigo-50 to-slate-100 dark:from-slate-950 dark:via-sky-950/30 dark:to-slate-950'
  },
  86: {
    code: 86,
    description: 'Heavy Snow Showers',
    category: 'snowy',
    iconName: 'Snowflake',
    themeGradient: 'from-sky-400/30 via-indigo-500/25 to-slate-700/30 dark:from-sky-950/60 dark:via-indigo-950/50 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-sky-100 via-indigo-100 to-slate-200 dark:from-slate-950 dark:via-indigo-950/50 dark:to-slate-950'
  },
  95: {
    code: 95,
    description: 'Thunderstorm',
    category: 'stormy',
    iconName: 'CloudLightning',
    themeGradient: 'from-amber-600/25 via-purple-700/25 to-slate-900/35 dark:from-purple-950/60 dark:via-slate-900 dark:to-amber-950/50',
    bgStyle: 'bg-gradient-to-br from-slate-800 via-purple-900 to-slate-950 text-white dark:from-slate-950 dark:via-purple-950 dark:to-slate-950'
  },
  96: {
    code: 96,
    description: 'Thunderstorm with Light Hail',
    category: 'stormy',
    iconName: 'CloudLightning',
    themeGradient: 'from-indigo-600/30 via-purple-700/30 to-slate-900/40 dark:from-indigo-950/70 dark:via-purple-950/60 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-950 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950'
  },
  99: {
    code: 99,
    description: 'Thunderstorm with Heavy Hail',
    category: 'stormy',
    iconName: 'CloudLightning',
    themeGradient: 'from-red-600/25 via-purple-800/30 to-slate-900/40 dark:from-red-950/60 dark:via-purple-950/70 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950'
  }
};

export function getWMOInfo(code: number): WMOInfo {
  return WMO_MAP[code] || {
    code,
    description: 'Unknown Conditions',
    category: 'clear',
    iconName: 'HelpCircle',
    themeGradient: 'from-blue-500/20 via-sky-500/15 to-slate-600/20 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950',
    bgStyle: 'bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
  };
}

// Unit conversion helpers
export function convertTemperature(celsius: number, unit: TemperatureUnit): number {
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  const value = convertTemperature(celsius, unit);
  return `${value}°${unit === 'celsius' ? 'C' : 'F'}`;
}

export function convertSpeed(kmh: number, unit: SpeedUnit): number {
  if (unit === 'mph') {
    return Math.round(kmh * 0.621371);
  }
  return Math.round(kmh);
}

export function formatSpeed(kmh: number, unit: SpeedUnit): string {
  const value = convertSpeed(kmh, unit);
  return `${value} ${unit === 'mph' ? 'mph' : 'km/h'}`;
}

export function convertPrecipitation(mm: number, unit: PrecipitationUnit): number {
  if (unit === 'inch') {
    return parseFloat((mm * 0.0393701).toFixed(2));
  }
  return parseFloat(mm.toFixed(1));
}

export function formatPrecipitation(mm: number, unit: PrecipitationUnit): string {
  const value = convertPrecipitation(mm, unit);
  return `${value} ${unit === 'inch' ? 'in' : 'mm'}`;
}

export function getWindCompassDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index] || 'N';
}

// Generate dynamic smart planning recommendations based on live conditions
export function generateSmartRecommendations(
  current: CurrentWeatherData,
  daily: DailyForecastData,
  unit: TemperatureUnit = 'celsius'
): SmartRecommendation[] {
  const tempC = current.temperature;
  const tempF = (tempC * 9) / 5 + 32;
  const precip = current.precipitation;
  const windKmh = current.windSpeed;
  const code = current.weatherCode;
  const wmo = getWMOInfo(code);
  const maxPrecipProb = daily.precipitationProbabilityMax?.[0] || 0;
  const uvMax = daily.uvIndexMax?.[0] || 0;

  const list: SmartRecommendation[] = [];

  // 1. Outdoor Running & Sports
  if (wmo.category === 'rainy' || precip > 1.5 || code >= 95) {
    list.push({
      id: 'outdoor-1',
      category: 'outdoor',
      title: 'Indoor Sports & Gym Recommended',
      description: `Active rain or storm in progress (${wmo.description}). Slippery surfaces outdoors — ideal for indoor workouts, yoga, or swimming.`,
      icon: 'Activity',
      rating: 'avoid',
      scoreTag: 'Rain Hazard'
    });
  } else if (tempC >= 12 && tempC <= 24 && windKmh < 25 && precip < 0.2) {
    list.push({
      id: 'outdoor-1',
      category: 'outdoor',
      title: 'Optimal Outdoor Running Weather',
      description: `Pleasant ${formatTemp(tempC, unit)} with gentle wind (${formatSpeed(windKmh, 'kmh')}). Perfect conditions for running, cycling, or tennis.`,
      icon: 'Flame',
      rating: 'ideal',
      scoreTag: '10/10 Score'
    });
  } else if (tempC > 30) {
    list.push({
      id: 'outdoor-1',
      category: 'outdoor',
      title: 'High Heat Warning for Workouts',
      description: `High temperature of ${formatTemp(tempC, unit)}. Exercise in early morning or late evening to prevent heat exhaustion.`,
      icon: 'SunMedium',
      rating: 'caution',
      scoreTag: 'Heat Advisory'
    });
  } else if (tempC < 2) {
    list.push({
      id: 'outdoor-1',
      category: 'outdoor',
      title: 'Freezing Conditions Outside',
      description: `Chilly ${formatTemp(tempC, unit)}. Warm up thoroughly indoors and wear thermal activewear if exercising outside.`,
      icon: 'Snowflake',
      rating: 'caution',
      scoreTag: 'Cold Advisory'
    });
  } else {
    list.push({
      id: 'outdoor-1',
      category: 'outdoor',
      title: 'Good Conditions for Walking & Sports',
      description: `Fair outdoor conditions at ${formatTemp(tempC, unit)} with ${wmo.description.toLowerCase()}.`,
      icon: 'Footprints',
      rating: 'good',
      scoreTag: 'Good'
    });
  }

  // 2. Clothing & Outfit Tips
  if (maxPrecipProb > 50 || wmo.category === 'rainy') {
    list.push({
      id: 'clothing-1',
      category: 'clothing',
      title: 'Umbrella & Waterproof Jacket Needed',
      description: `High rain likelihood (${maxPrecipProb}% chance today). Carry a compact umbrella and wear water-repellent footwear.`,
      icon: 'Umbrella',
      rating: 'caution',
      scoreTag: 'Precipitation'
    });
  } else if (tempC < 5) {
    list.push({
      id: 'clothing-1',
      category: 'clothing',
      title: 'Heavy Coat & Thermal Gear',
      description: `Cold temps around ${formatTemp(tempC, unit)}. Layer up with a heavy winter parka, scarf, gloves, and warm socks.`,
      icon: 'Shirt',
      rating: 'ideal',
      scoreTag: 'Warm Layers'
    });
  } else if (tempC >= 5 && tempC < 17) {
    list.push({
      id: 'clothing-1',
      category: 'clothing',
      title: 'Light Jacket or Fleece Layer',
      description: `Brisk atmosphere (${formatTemp(tempC, unit)}). A light windbreaker, hoodie, or cardigan will keep you comfortable.`,
      icon: 'Shirt',
      rating: 'good',
      scoreTag: 'Light Outerwear'
    });
  } else if (tempC >= 25) {
    list.push({
      id: 'clothing-1',
      category: 'clothing',
      title: 'Breathable & Light Fabrics',
      description: `Warm at ${formatTemp(tempC, unit)}. Wear linen or cotton fabrics, sunglasses, and a sunhat.`,
      icon: 'Glasses',
      rating: 'ideal',
      scoreTag: 'Summer Wear'
    });
  } else {
    list.push({
      id: 'clothing-1',
      category: 'clothing',
      title: 'Casual Comfortable Attire',
      description: `Mild temperature (${formatTemp(tempC, unit)}). Standard comfortable daytime apparel is suitable.`,
      icon: 'Shirt',
      rating: 'good',
      scoreTag: 'Standard'
    });
  }

  // 3. Travel & Commute Advisory
  if (code >= 95) {
    list.push({
      id: 'travel-1',
      category: 'travel',
      title: 'Severe Thunderstorm Warning',
      description: 'Lightning hazards and heavy downpours. Delay non-essential driving and seek sturdy shelter during peak storm cells.',
      icon: 'AlertTriangle',
      rating: 'avoid',
      scoreTag: 'Storm Danger'
    });
  } else if (wmo.category === 'foggy') {
    list.push({
      id: 'travel-1',
      category: 'travel',
      title: 'Reduced Visibility Fog Hazard',
      description: 'Foggy roads ahead. Use low-beam headlights and maintain safe braking distances when driving.',
      icon: 'Car',
      rating: 'caution',
      scoreTag: 'Fog Alert'
    });
  } else if (windKmh > 40) {
    list.push({
      id: 'travel-1',
      category: 'travel',
      title: 'High Wind Gusts on Highways',
      description: `Wind gusts up to ${formatSpeed(windKmh, 'kmh')}. Hold the steering wheel firmly, especially in high-profile vehicles.`,
      icon: 'Wind',
      rating: 'caution',
      scoreTag: 'Wind Advisory'
    });
  } else {
    list.push({
      id: 'travel-1',
      category: 'travel',
      title: 'Smooth Commuting Conditions',
      description: `Clear roadways and good visibility. Excellent conditions for driving or public transit.`,
      icon: 'Car',
      rating: 'ideal',
      scoreTag: 'Clear Travel'
    });
  }

  // 4. Health & UV Protection
  if (uvMax >= 8) {
    list.push({
      id: 'health-1',
      category: 'health',
      title: 'Very High UV Index (' + uvMax + ')',
      description: 'Dangerous solar radiation level. Apply SPF 50+ sunscreen every 2 hours, wear UV-blocking sunglasses, and seek shade 11am-4pm.',
      icon: 'ShieldAlert',
      rating: 'avoid',
      scoreTag: 'UV Level ' + uvMax
    });
  } else if (uvMax >= 5) {
    list.push({
      id: 'health-1',
      category: 'health',
      title: 'Moderate to High UV Index (' + uvMax + ')',
      description: 'Sun protection required. Wear SPF 30+ sunscreen and UV sunglasses when spending time outdoors.',
      icon: 'Sun',
      rating: 'caution',
      scoreTag: 'UV Level ' + uvMax
    });
  } else if (current.humidity > 80 && tempC > 22) {
    list.push({
      id: 'health-1',
      category: 'health',
      title: 'High Humidity & Muggy Feel',
      description: `Humidity is at ${current.humidity}%. Stay well hydrated with water and electrolytes throughout the day.`,
      icon: 'Droplets',
      rating: 'good',
      scoreTag: 'Hydration'
    });
  } else {
    list.push({
      id: 'health-1',
      category: 'health',
      title: 'Comfortable Health Index',
      description: `Balanced humidity (${current.humidity}%) and moderate UV (${uvMax}). Gentle environment for all ages.`,
      icon: 'HeartPulse',
      rating: 'ideal',
      scoreTag: 'Healthy'
    });
  }

  return list;
}
