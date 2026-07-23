export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country: string;
  admin1?: string; // State/Province
  admin2?: string;
  timezone: string;
  population?: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type SpeedUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inch';

export interface UnitsConfig {
  temperature: TemperatureUnit;
  speed: SpeedUnit;
  precipitation: PrecipitationUnit;
}

export interface CurrentWeatherData {
  time: string;
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  humidity: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  cloudCover: number;
  pressure: number;
}

export interface HourlyForecastData {
  time: string[];
  temperature2m: number[];
  apparentTemperature: number[];
  precipitationProbability: number[];
  precipitation: number[];
  weatherCode: number[];
  windSpeed10m: number[];
  humidity: number[];
  uvIndex: number[];
}

export interface DailyForecastData {
  time: string[];
  weatherCode: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  apparentTemperatureMax: number[];
  apparentTemperatureMin: number[];
  sunrise: string[];
  sunset: string[];
  uvIndexMax: number[];
  precipitationSum: number[];
  precipitationProbabilityMax: number[];
  windSpeedMax: number[];
  windGustsMax: number[];
  windDirectionDominant: number[];
}

export interface ProcessedWeatherData {
  location: LocationResult;
  current: CurrentWeatherData;
  hourly: HourlyForecastData;
  daily: DailyForecastData;
  fetchedAt: string;
}

export type WeatherCategory = 'clear' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy';

export interface WMOInfo {
  code: number;
  description: string;
  category: WeatherCategory;
  iconName: string;
  themeGradient: string; // Tailwind gradient classes
  bgStyle: string;
}

export interface SmartRecommendation {
  id: string;
  category: 'outdoor' | 'clothing' | 'travel' | 'health';
  title: string;
  description: string;
  icon: string;
  rating: 'ideal' | 'good' | 'caution' | 'avoid';
  scoreTag?: string;
}
