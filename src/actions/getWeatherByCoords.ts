import { getAQILevel } from "../lib/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeatherFullByCoords = async (lat: number, lon: number) => {
  // 🔹 1. Current weather
  const currentRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const currentData = await currentRes.json();

  if (!currentRes.ok) {
    throw new Error(currentData.message || "Failed to fetch current weather");
  }

  // 🔹 2. Forecast + AQI (parallel)
  const [forecastRes, aqiRes] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    ),
  ]);

  const forecastData = await forecastRes.json();
  const aqiData = await aqiRes.json();

  if (!forecastRes.ok) {
    throw new Error(forecastData.message || "Failed to fetch forecast");
  }

  if (!aqiRes.ok) {
    throw new Error(aqiData.message || "Failed to fetch AQI");
  }

  // 🔹 3. Transform (same as city version)

  const weatherData = {
    location: {
      city: currentData.name,
      country: currentData.sys.country,
      lat,
      lon,
      timezone: currentData.timezone?.toString() || "",
    },

    current: {
      temp: Math.round(currentData.main.temp),
      feels_like: currentData.main.feels_like,
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      visibility: currentData.visibility,
      wind_speed: currentData.wind.speed,
      wind_direction: currentData.wind.deg,
      weather: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
    },

    hourly: forecastData.list.slice(0, 8).map((item: any) => ({
      time: item.dt_txt,
      temp: Math.round(item.main.temp),
      weather: item.weather[0].description,
      icon: item.weather[0].icon,
      wind_speed: item.wind.speed,
      wind_direction: item.wind.deg,
    })),

    daily: forecastData.list
      .filter((item: any) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5)
      .map((item: any) => ({
        date: item.dt_txt.split(" ")[0],
        min_temp: Math.round(item.main.temp_min),
        max_temp: Math.round(item.main.temp_max),
        weather: item.weather[0].description,
        icon: item.weather[0].icon,
      })),

    airQuality: {
      aqi: aqiData.list[0].main.aqi,
      pm2_5: aqiData.list[0].components.pm2_5,
      pm10: aqiData.list[0].components.pm10,
      no2: aqiData.list[0].components.no2,
      so2: aqiData.list[0].components.so2,
      o3: aqiData.list[0].components.o3,
      co: aqiData.list[0].components.co,
      level: getAQILevel(aqiData.list[0].main.aqi),
    },

    astro: {
      sunrise: currentData.sys.sunrise.toString(),
      sunset: currentData.sys.sunset.toString(),
    },

    highlights: {
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      visibility: currentData.visibility,
      feels_like: currentData.main.feels_like,
    },
  };

  return weatherData;
};

export default getWeatherFullByCoords;