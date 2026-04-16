export type Location = {
  city: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
};

export type CurrentWeather = {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  visibility: number;
  wind_speed: number;
  wind_direction: number;
  weather: string;
  icon: string;
};

export type HourlyWeather = {
  time: string;
  temp: number;
  weather: string;
  icon: string;
  wind_speed: number;
  wind_direction: number;
};

export type DailyWeather = {
  date: string;
  min_temp: number;
  max_temp: number;
  weather: string;
  icon: string;
};

export type AirQuality = {
  aqi: number; 
  pm2_5: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
  co: number;
  level: "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";
};

export type Astro = {
  sunrise: string;
  sunset: string;
};

export type Highlights = {
  humidity: number;
  pressure: number;
  visibility: number;
  feels_like: number;
};

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  airQuality: AirQuality;
  astro: Astro;
  highlights: Highlights;
}


export type WeatherStore = {
  weatherData: WeatherData | null;
  loading: boolean;
  setLoading: (value: boolean) => void;

  getWeatherByCityName: (city: string) => Promise<void>;

  getWeatherByCoordsData: () => Promise<void>;
};