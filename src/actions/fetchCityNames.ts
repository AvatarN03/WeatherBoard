import type { CitySuggestion } from "../types";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchCityNames = async (
  city: string,
): Promise<CitySuggestion[]> => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=4&appid=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch city names");
  }
  const data = await response.json();
  console.log("City Suggestions Data:", data);
return data.map((city: CitySuggestion) => ({
      name: city.name,
      label: [city.name, city.state, city.country].filter(Boolean).join(", "),
      lat: city.lat,
      lon: city.lon,
    }));
};
