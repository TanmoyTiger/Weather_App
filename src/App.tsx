import React, { useState, useEffect, useCallback } from 'react';
import { LocationResult, ProcessedWeatherData, UnitsConfig } from './types/weather';
import { getWeatherData, reverseGeocodeLocation, getUserLocation } from './services/openMeteo';
import { getWMOInfo } from './utils/wmoCodes';

import { SearchHeader } from './components/SearchHeader';
import { CurrentWeather } from './components/CurrentWeather';
import { SunMoonCard } from './components/SunMoonCard';
import { WeeklyForecast } from './components/WeeklyForecast';
import { ActivityRecommendations } from './components/ActivityRecommendations';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorBoundary } from './components/ErrorBoundary';

import { AlertCircle, RefreshCw, Globe, Heart } from 'lucide-react';

const DEFAULT_LOCATION: LocationResult = {
  id: 5128581,
  name: 'New York',
  latitude: 40.7128,
  longitude: -74.006,
  country: 'United States',
  admin1: 'New York',
  timezone: 'America/New_York'
};

const STORAGE_KEYS = {
  LAST_LOCATION: 'weather_app_last_location',
  RECENT_LOCATIONS: 'weather_app_recents',
  UNITS: 'weather_app_units'
};

export default function App() {
  const [location, setLocation] = useState<LocationResult>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
      return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  });

  const [units, setUnits] = useState<UnitsConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNITS);
      return saved
        ? JSON.parse(saved)
        : { temperature: 'celsius', speed: 'kmh', precipitation: 'mm' };
    } catch {
      return { temperature: 'celsius', speed: 'kmh', precipitation: 'mm' };
    }
  });

  const [recentLocations, setRecentLocations] = useState<LocationResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT_LOCATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [weatherData, setWeatherData] = useState<ProcessedWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch weather data for target location
  const fetchWeather = useCallback(async (loc: LocationResult, showRefreshSpinner = false) => {
    if (showRefreshSpinner) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setErrorMsg(null);

    try {
      const data = await getWeatherData(loc);
      setWeatherData(data);
      setLocation(loc);

      // Save last location
      localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(loc));

      // Update recent searches list
      setRecentLocations((prev) => {
        const filtered = prev.filter((item) => item.name.toLowerCase() !== loc.name.toLowerCase());
        const updated = [loc, ...filtered].slice(0, 5);
        localStorage.setItem(STORAGE_KEYS.RECENT_LOCATIONS, JSON.stringify(updated));
        return updated;
      });
    } catch (err: any) {
      console.error('Failed to load weather data:', err);
      setErrorMsg(err.message || 'Unable to load weather forecast for selected location. Please check your connection.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchWeather(location);
  }, []);

  // Toggle Units (Metric °C/kmh vs Imperial °F/mph)
  const handleToggleUnits = () => {
    const newUnits: UnitsConfig =
      units.temperature === 'celsius'
        ? { temperature: 'fahrenheit', speed: 'mph', precipitation: 'inch' }
        : { temperature: 'celsius', speed: 'kmh', precipitation: 'mm' };

    setUnits(newUnits);
    localStorage.setItem(STORAGE_KEYS.UNITS, JSON.stringify(newUnits));
  };

  // Locate User via Browser Geolocation API
  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setErrorMsg(null);

    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      const reverseLoc = await reverseGeocodeLocation(latitude, longitude);
      await fetchWeather(reverseLoc);
    } catch (err: any) {
      console.warn('Geolocation failed:', err);
      setErrorMsg('Could not detect your current location. Please allow browser location access or search manually.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleClearRecent = () => {
    setRecentLocations([]);
    localStorage.removeItem(STORAGE_KEYS.RECENT_LOCATIONS);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-zinc-950 text-zinc-50 dark font-sans selection:bg-indigo-500 selection:text-white">
        {/* Main Dashboard Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header Bar */}
          <SearchHeader
            onSelectLocation={(loc) => fetchWeather(loc)}
            onUseMyLocation={handleUseMyLocation}
            units={units}
            onToggleUnits={handleToggleUnits}
            onRefresh={() => fetchWeather(location, true)}
            isRefreshing={isRefreshing}
            isLocating={isLocating}
            currentLocationName={location.name}
            recentLocations={recentLocations}
            onClearRecent={handleClearRecent}
          />

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <p className="text-xs sm:text-sm font-semibold">{errorMsg}</p>
              </div>
              <button
                onClick={() => fetchWeather(DEFAULT_LOCATION)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs transition shrink-0 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Load Default City ({DEFAULT_LOCATION.name})
              </button>
            </div>
          )}

          {/* Main Weather Content View */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : weatherData ? (
            <main className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-stretch">
              {/* Left Column: Hero */}
              <CurrentWeather data={weatherData} units={units} />

              {/* Right Column: Side Panel */}
              <div className="flex flex-col gap-6">
                <ActivityRecommendations data={weatherData} units={units} />
                <SunMoonCard data={weatherData} />
              </div>

              {/* Bottom Span: Forecast */}
              <div className="lg:col-span-2">
                <WeeklyForecast daily={weatherData.daily} units={units} />
              </div>
            </main>
          ) : null}

          {/* Footer */}
          <footer className="pt-8 pb-4 border-t border-slate-200/50 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 font-medium">
              <Globe className="w-4 h-4 text-sky-500" />
              <span>Weather data provided by <a href="https://open-meteo.com" target="_blank" rel="noreferrer" className="underline hover:text-sky-500 font-semibold">Open-Meteo API</a> (No API Key Required)</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <span>Weather Intelligence Application</span>
            </div>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}
