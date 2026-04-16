import { WeatherIcon } from "./WeatherIcon";

import { getDayFromDateShort } from "../lib/weather";
import type { DailyWeather } from "../types";

export const DailyForecast = ({ daily }: { daily: DailyWeather[] }) => {
  return (
    <div className="flex flex-col space-y-3">
      {daily.map((day, i) => (

        <div key={i} className="grid grid-cols-3 items-center gap-4 px-2 py-2 rounded-lg border-2 border-purple-500/20 hover:border-yellow-200 transition-colors cursor-pointer">
          <div className="space-y-2 flex flex-col items-start">
            <WeatherIcon icon={day.icon} className="w-6 h-6 " />
            <p className="text-purple-300 text-center text-sm whitespace-nowrap">{day.weather}</p>
          </div>
          <h3 className="text-purple-200 text-base font-semibold text-center">
            {Math.round((day.max_temp + day.min_temp) / 2)} °C
          </h3>
          <p className="text-purple-300 text-right text-base">{getDayFromDateShort(day.date)}</p>
        </div>
      ))}
    </div>
  );
};