import { Loader2, Search, X } from "lucide-react"
import { useState } from "react";
import useWeather from "../context/useWeather";

type SearchInputProps = {
    className?: string
    autoFocus?: boolean
}

export const SearchInput = ({ className = "", autoFocus = false }: SearchInputProps) => {

    const [loading, setLoading] = useState(false);
    const { getWeatherByCityName } = useWeather();

    const [city, setCity] = useState("");

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!city.trim()) return;

        setLoading(true);
        await getWeatherByCityName(city);
        setLoading(false);

        setCity(""); // clear input
    };

    return (
        <div className={`rounded-md border w-full max-w-md  border-purple-500/30 px-2 py-1 ${className}`}>
            <form onSubmit={handleSearch} className="flex items-center w-full">
                <Search className="w-5 h-5 text-purple-400" />
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for a city..."
                    autoFocus={autoFocus}
                    className="bg-transparent outline-none text-sm text-purple-300 font-semibold placeholder-purple-300/60 py-1 px-2 w-full flex flex-1 w-full"
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
            </form>
        </div>
    )
}
