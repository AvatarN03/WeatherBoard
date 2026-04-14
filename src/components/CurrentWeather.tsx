import { Calendar, MapPin } from "lucide-react";
import type { WeatherData } from "../types";
import { WeatherIcon } from "./WeatherIcon";
import { getDayFromDateLong, GetWindIcon } from "../lib/weather";

export const CurrentWeather = ({ data }: { data: WeatherData }) => {
  const WindIcon = GetWindIcon(data.current.wind_direction);
  return (
    <div className="space-y-2 h-full">
      <p className="text-slate-200">Now</p>
      <div className="flex items-center gap-2 justify-between ">
        <h1 className="text-4xl font-bold">{data.current.temp}°C</h1>
        <WeatherIcon icon={data.current.icon} className="w-14 h-14" />
      </div>
      <p>{data.current.weather}</p>
      <hr className="h-[0.5px] w-full bg-white" />

      <div className="flex items-center w-full justify-between">
        <div className="">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-slate-400" />
            <p>{data.location.city}, {data.location.country}</p>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-slate-400" />
            <p>{getDayFromDateLong(data.daily[0].date)}</p>
          </div>
        </div>
        <div className="">
          <WindIcon className="w-5 h-5 text-slate-400" />
          <p>{data.current.wind_speed} km/h</p>

        </div>
      </div>


    </div>
  );
};