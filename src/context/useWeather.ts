import { create } from "zustand";
import { persist } from "zustand/middleware";

import toast from "react-hot-toast";

import getWeatherByCity from "../actions/getWeatherByCity";
import getWeatherByCoords from "../actions/getWeatherByCoords";

import type { WeatherStore } from "../types";

const useWeather = create<WeatherStore>()(
  persist(
    (set) => ({
      weatherData: null,
      loading: false,
      setLoading: (value: boolean) => set({ loading: value }),
      getWeatherByCityName: async (city: string) => {
        set({ loading: true });
        try {
          const data = await getWeatherByCity(city);
          toast.success(`Weather data updated for ${city}!`);
          set({ weatherData: data, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data";
          toast.error(errorMessage);
          set({ loading: false });
        }
      },

      getWeatherByCoordsData: async () => {
        set({ loading: true });
        try {
          if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            set({ loading: false });
            return;
          }

          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );

          const { latitude: lat, longitude: lon } = position.coords;

          const data = await getWeatherByCoords(lat, lon);
          toast.success("Weather data updated based on your location!");
          set({ weatherData: data, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data";
          toast.error(errorMessage);
          set({ loading: false });
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
    }
  )
);

export default useWeather;