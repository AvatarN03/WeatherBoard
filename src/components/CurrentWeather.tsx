import { Calendar, MapPin } from "lucide-react";

import { WeatherIcon } from "./WeatherIcon";

import { getDayFromDateLong, getWindDirection, GetWindIcon } from "../lib/weather";
import type { WeatherData } from "../types";

export const CurrentWeather = ({ data }: { data: WeatherData }) => {
  const WindIcon = GetWindIcon(data.current.wind_direction);
  
  return (
    <div className="space-y-2 h-full ">
      <p className="text-purple-300 text-lg bg-purple-600/10 border-2 border-slate-300/50 px-2 py-.5 rounded-full inline">Now</p>
      <div className="flex items-center gap-2 justify-between ">
        <h1 className="text-4xl font-bold text-purple-300">{data.current.temp} °C</h1>
        <WeatherIcon icon={data.current.icon} className="w-14 h-14 text-yellow-400" />
      </div>
      <p>{data.current.weather}</p>
      <hr className="h-[0.5px] w-full bg-white" />

      <div className="flex items-center w-full justify-between py-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-2 border-purple-600 rounded-full px-2 py-1.5 bg-neutral-700/40">
            <MapPin className="w-4 h-4 text-purple-400" />
            <p>{data.location.city}, {data.location.country}</p>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-purple-400" />
            <p className="text-purple-100 font-light text-lg underline underline-offset-2">{getDayFromDateLong(data.daily[0].date)}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <WindIcon className="w-8 h-8 text-yellow-400" />
            <p className="text-purple-200 font-light">{getWindDirection(data.current.wind_direction)}</p>
          </div>
          <p>{data.current.wind_speed} m/s</p>

        </div>
      </div>


    </div>
  );
};