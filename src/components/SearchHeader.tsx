import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Compass, RefreshCw, Thermometer, Clock, X, ChevronRight } from 'lucide-react';
import { LocationResult, UnitsConfig } from '../types/weather';
import { searchLocations } from '../services/openMeteo';

interface SearchHeaderProps {
  onSelectLocation: (location: LocationResult) => void;
  onUseMyLocation: () => void;
  units: UnitsConfig;
  onToggleUnits: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  isLocating: boolean;
  currentLocationName?: string;
  recentLocations: LocationResult[];
  onClearRecent: () => void;
}

const POPULAR_CITIES: Array<{ name: string; country: string; lat: number; lon: number; admin1?: string; tz: string }> = [
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, admin1: 'New York', tz: 'America/New_York' },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, admin1: 'England', tz: 'Europe/London' },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, admin1: 'New South Wales', tz: 'Australia/Sydney' },
  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, tz: 'Asia/Singapore' }
];

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  onSelectLocation,
  onUseMyLocation,
  units,
  onToggleUnits,
  onRefresh,
  isRefreshing,
  isLocating,
  currentLocationName,
  recentLocations,
  onClearRecent
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced geocoding search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchRes = await searchLocations(query);
        setResults(searchRes);
        setIsOpen(true);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: LocationResult) => {
    onSelectLocation(location);
    setQuery('');
    setIsOpen(false);
  };

  const handlePopularSelect = (city: typeof POPULAR_CITIES[0], index: number) => {
    onSelectLocation({
      id: index + 1000,
      name: city.name,
      latitude: city.lat,
      longitude: city.lon,
      country: city.country,
      admin1: city.admin1,
      timezone: city.tz
    });
  };

  return (
    <header className="w-full space-y-4 mb-6">
      {/* Top Bar: Brand, Search, Units, Actions */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Logo / Brand Title */}
        <div className="flex items-center gap-3 justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
              <Compass className="w-[18px] h-[18px]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SkyLine AI</span>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={onToggleUnits}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition"
              title="Toggle Units"
            >
              °{units.temperature === 'celsius' ? 'C' : 'F'}
            </button>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 disabled:opacity-50 transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Search Bar Input Container */}
        <div ref={containerRef} className="relative flex-1 max-w-sm mx-auto md:mx-0 w-full">
          <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-lg pl-4 pr-1 py-1 overflow-hidden transition focus-within:border-zinc-700">
            <Search className="w-4 h-4 text-zinc-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (results.length > 0) setIsOpen(true);
              }}
              placeholder="Search for a city..."
              className="w-full bg-transparent border-none text-sm font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0 px-2.5 py-1.5"
            />
            
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setResults([]);
                }}
                className="p-1 text-zinc-500 hover:text-zinc-300 mr-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Location Button embedded inside input */}
            <button
              onClick={onUseMyLocation}
              disabled={isLocating}
              className="px-2 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-1 transition shrink-0"
              title="Use current location"
            >
              <MapPin className={`w-3.5 h-3.5 ${isLocating ? 'animate-bounce text-indigo-400' : ''}`} />
            </button>
          </div>

          {/* Auto-complete Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl z-50 overflow-hidden divide-y divide-zinc-800 max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-xs font-medium text-zinc-500 flex items-center justify-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                  Searching global locations...
                </div>
              ) : results.length > 0 ? (
                results.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(loc)}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-800 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-500 group-hover:text-white transition">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-100 group-hover:text-indigo-400">
                          {loc.name}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {[loc.admin1, loc.country].filter(Boolean).join(', ')}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transform group-hover:translate-x-0.5 transition" />
                  </button>
                ))
              ) : query.trim().length >= 2 ? (
                <div className="p-4 text-center text-xs font-medium text-zinc-500">
                  No cities found matching "{query}". Check spelling or try a larger city name.
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Desktop Controls (Date, Live Pill, Unit Toggle & Refresh) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
            <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              LIVE
            </div>
          </div>

          <div className="flex items-center gap-2 ml-2 pl-4 border-l border-zinc-800">
            {/* Unit Switcher Button */}
            <div className="flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-800 shadow-sm">
              <button
                onClick={() => units.temperature !== 'celsius' && onToggleUnits()}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                  units.temperature === 'celsius'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => units.temperature !== 'fahrenheit' && onToggleUnits()}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                  units.temperature === 'fahrenheit'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                °F
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition disabled:opacity-50"
              title="Refresh current weather data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Popular City Quick Selectors & Recent Locations */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-1">
          Popular:
        </span>
        {POPULAR_CITIES.map((city, idx) => (
          <button
            key={city.name}
            onClick={() => handlePopularSelect(city, idx)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200 transition"
          >
            {city.name}
          </button>
        ))}

        {/* Recent Searches */}
        {recentLocations.length > 0 && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Recent:
            </span>
            {recentLocations.slice(0, 3).map((loc) => (
              <button
                key={`${loc.name}-${loc.id}`}
                onClick={() => onSelectLocation(loc)}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition border border-zinc-800/50"
              >
                {loc.name}
              </button>
            ))}
            <button
              onClick={onClearRecent}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 underline ml-1"
              title="Clear search history"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
