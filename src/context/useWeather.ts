import { create } from "zustand";
import { persist } from "zustand/middleware";

import getWeatherByCity from "../actions/getWeatherByCity";
import getWeatherByCoords from "../actions/getWeatherByCoords";
import type { WeatherStore } from "../types";

const useWeather = create<WeatherStore>()(
  persist(
    (set) => ({
      weatherData: null,

      getWeatherByCityName: async (city: string) => {
        const data = await getWeatherByCity(city);
        set({ weatherData: data });
      },

      getWeatherByCoordsData: async () => {
        if (!navigator.geolocation) {
          alert("Geolocation is not supported by your browser");
          return;
        }

        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const { latitude: lat, longitude: lon } = position.coords;

        const data = await getWeatherByCoords(lat, lon);
        set({ weatherData: data });
      },
    }),
    {
      name: "weather-storage", // key in storage
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