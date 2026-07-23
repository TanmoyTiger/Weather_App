import { LocationResult, ProcessedWeatherData } from '../types/weather';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1';

export async function searchLocations(query: string, count: number = 8): Promise<LocationResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const url = `${GEOCODING_BASE_URL}/search?name=${encodeURIComponent(query.trim())}&count=${count}&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocoding service error: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map((item: any) => ({
    id: item.id,
    name: item.name,
    latitude: item.latitude,
    longitude: item.longitude,
    elevation: item.elevation,
    feature_code: item.feature_code,
    country_code: item.country_code,
    country: item.country || '',
    admin1: item.admin1 || '',
    admin2: item.admin2 || '',
    timezone: item.timezone || 'auto',
    population: item.population
  }));
}

export async function getWeatherData(location: LocationResult): Promise<ProcessedWeatherData> {
  const { latitude, longitude, timezone } = location;
  const tz = timezone && timezone !== 'auto' ? timezone : 'auto';

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    hourly: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant',
    current_weather: 'true',
    timezone: tz
  });

  const url = `${FORECAST_BASE_URL}/forecast?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather service error: ${response.statusText}`);
  }

  const data = await response.json();

  // Handle current weather fields reliably
  const curr = data.current || data.current_weather || {};

  const currentProcessed = {
    time: curr.time || new Date().toISOString(),
    temperature: curr.temperature_2m ?? curr.temperature ?? 0,
    apparentTemperature: curr.apparent_temperature ?? curr.temperature ?? 0,
    weatherCode: curr.weather_code ?? curr.weathercode ?? 0,
    isDay: curr.is_day !== undefined ? Boolean(curr.is_day) : true,
    windSpeed: curr.wind_speed_10m ?? curr.windspeed ?? 0,
    windDirection: curr.wind_direction_10m ?? curr.winddirection ?? 0,
    windGusts: curr.wind_gusts_10m ?? curr.wind_speed_10m ?? 0,
    humidity: curr.relative_humidity_2m ?? 50,
    precipitation: curr.precipitation ?? 0,
    rain: curr.rain ?? 0,
    showers: curr.showers ?? 0,
    snowfall: curr.snowfall ?? 0,
    cloudCover: curr.cloud_cover ?? 0,
    pressure: curr.pressure_msl ?? 1013
  };

  return {
    location,
    current: currentProcessed,
    hourly: {
      time: data.hourly?.time || [],
      temperature2m: data.hourly?.temperature_2m || [],
      apparentTemperature: data.hourly?.apparent_temperature || [],
      precipitationProbability: data.hourly?.precipitation_probability || [],
      precipitation: data.hourly?.precipitation || [],
      weatherCode: data.hourly?.weather_code || [],
      windSpeed10m: data.hourly?.wind_speed_10m || [],
      humidity: data.hourly?.relative_humidity_2m || [],
      uvIndex: data.hourly?.uv_index || []
    },
    daily: {
      time: data.daily?.time || [],
      weatherCode: data.daily?.weather_code || data.daily?.weathercode || [],
      temperatureMax: data.daily?.temperature_2m_max || [],
      temperatureMin: data.daily?.temperature_2m_min || [],
      apparentTemperatureMax: data.daily?.apparent_temperature_max || [],
      apparentTemperatureMin: data.daily?.apparent_temperature_min || [],
      sunrise: data.daily?.sunrise || [],
      sunset: data.daily?.sunset || [],
      uvIndexMax: data.daily?.uv_index_max || [],
      precipitationSum: data.daily?.precipitation_sum || [],
      precipitationProbabilityMax: data.daily?.precipitation_probability_max || [],
      windSpeedMax: data.daily?.wind_speed_10m_max || [],
      windGustsMax: data.daily?.wind_gusts_10m_max || [],
      windDirectionDominant: data.daily?.wind_direction_10m_dominant || []
    },
    fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

export async function reverseGeocodeLocation(lat: number, lon: number): Promise<LocationResult> {
  try {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || 'Your Location';
      const country = data.countryName || '';
      const admin1 = data.principalSubdivision || '';
      
      return {
        id: Math.floor(lat * 1000 + lon * 1000),
        name: city,
        latitude: lat,
        longitude: lon,
        country: country,
        admin1: admin1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
      };
    }
  } catch (err) {
    console.warn('Reverse geocoding client error:', err);
  }

  return {
    id: 999999,
    name: 'Current Location',
    latitude: lat,
    longitude: lon,
    country: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
  };
}

export function getUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}
