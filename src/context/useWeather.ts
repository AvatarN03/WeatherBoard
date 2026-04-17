import { create } from "zustand";
import { persist } from "zustand/middleware";

import toast from "react-hot-toast";

import getWeatherByCity from "../actions/getWeatherByCity";
import getWeatherByCoords from "../actions/getWeatherByCoords";
import { fetchCityNames as fetchCityNamesAPI } from "../actions/fetchCityNames";

import type { CitySuggestion, WeatherStore } from "../types";

const useWeather = create<WeatherStore>()(
  persist(
    (set, get) => ({
      weatherData: null,
      loading: false,
      setLoading: (value: boolean) => set({ loading: value }),
      getWeatherByCityName: async (city: string) => {
        if (city === get().weatherData?.location.city) {
          toast.error(`Weather data for ${city} is already displayed`);
          return;
        }
        set({ loading: true });
        try {
          const data = await getWeatherByCity(city);
          toast.success(`Weather data updated for ${city}!`);
          set({ weatherData: data, loading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch weather data";
          toast.error(errorMessage);
          set({ loading: false });
        }
      },

      getWeatherByCoordsData: async ({
        lat,
        lon,
      }: {
        lat?: number;
        lon?: number;
      }) => {
        try {
          let finalLat = lat;
          let finalLon = lon;

          // 👉 fallback to geolocation if not provided
          if (finalLat === undefined || finalLon === undefined) {
            if (!navigator.geolocation) {
              toast.error("Geolocation is not supported by your browser");
              return;
            }

            const position = await new Promise<GeolocationPosition>(
              (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
              },
            );

            finalLat = position.coords.latitude;
            finalLon = position.coords.longitude;
          }

          const current = get().weatherData?.location;

          const isSameLocation =
            current &&
            Math.abs(current.lat - finalLat!) < 0.01 &&
            Math.abs(current.lon - finalLon!) < 0.01;

          if (isSameLocation) {
            toast("Already showing this location");
            return;
          }

          // 👉 only now set loading
          set({ loading: true });

          const data = await getWeatherByCoords(finalLat!, finalLon!);

          toast.success(
            lat && lon
              ? "Weather updated for selected city"
              : "Weather updated based on your location",
          );

          set({ weatherData: data, loading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch weather data";

          toast.error(errorMessage);
          set({ loading: false });
        }
      },

      fetchCityNames: async (city: string): Promise<CitySuggestion[]> => {
        try {
          if (!city.trim()) return [];

          const names = await fetchCityNamesAPI(city);
          if (names.length === 0) {
            toast.error("No city suggestions found");
            return [];
          }
          return names;
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch city suggestions");
          return [];
        }
      },
    }),
    {
      name: "weather-board", // key in storage
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);

export default useWeather;
