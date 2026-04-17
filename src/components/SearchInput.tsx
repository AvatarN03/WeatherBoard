import { useEffect, useState } from "react";
import { Loader2, Search, X } from "lucide-react"

import useWeather from "../context/useWeather";
import type { CitySuggestion, SearchInputProps } from "../types";



export const SearchInput = ({ className = "", autoFocus = false, onSearchComplete }: SearchInputProps) => {

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

    const { getWeatherByCityName, fetchCityNames, getWeatherByCoordsData } = useWeather();

    const [city, setCity] = useState("");

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!city.trim()) return;

        setLoading(true);
        await getWeatherByCityName(city);
        setSuggestions([]);
        setLoading(false);

        setCity("");
        onSearchComplete?.();
    };

    const handleSelectSuggestion = async (suggestion: CitySuggestion) => {
        await getWeatherByCoordsData({
            lat: suggestion.lat,
            lon: suggestion.lon
        });

        setCity("");
        setSuggestions([]);
        onSearchComplete?.();
    };

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!city.trim()) {
                setSuggestions([]);
                return;
            }

            try {
                const result = await fetchCityNames(city);
                setSuggestions(result);
            } catch (err) {
                console.error(err);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [city, fetchCityNames]);

    return (
        <div className={`relative rounded-md border w-full max-w-md border-purple-500/30 px-2 py-1 ${className}`}>
            <form onSubmit={handleSearch} className="flex items-center w-full">
                <Search className="w-5 h-5 text-purple-400" onBlur={() => setTimeout(() => setSuggestions([]), 150)} />
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for a city..."
                    autoFocus={autoFocus}
                    className="bg-transparent outline-none text-sm text-purple-300 font-semibold placeholder-purple-300/60 py-1 px-2 w-full flex flex-1"
                />
                {
                    loading && city.trim() &&
                    <Loader2 className="animate-spin text-purple-400" />
                }
                {
                    !loading && city.trim() &&
                    <button type="button" onClick={() => setCity("")} className="text-sm text-purple-300 font-semibold px-2 py-1 rounded-md bg-purple-800/50 hover:bg-purple-700/50 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                }
                {suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-gray-900 border border-purple-500/30 rounded-md shadow-lg z-10">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectSuggestion(suggestion)}
                                className="px-3 py-2 text-sm text-purple-300 hover:bg-purple-700/40 cursor-pointer"
                            >
                                {suggestion.label}
                            </div>
                        ))}
                        <p className="px-3 py-2 text-xs text-blue-200 border-t border-purple-500/20 italic">
                            Can't find your city? Try searching a nearby location.
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}
