import { getDayFromDateShort } from "../lib/weather";
import type { DailyWeather } from "../types";
import { WeatherIcon } from "./WeatherIcon";

export const DailyForecast = ({ daily }: { daily: DailyWeather[] }) => {
  return (
    <div className="flex flex-col space-y-3">
      {daily.map((day, i) => (
        <div key={i} className="grid grid-cols-3 items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <WeatherIcon icon={day.icon} className="w-6 h-6" />
          <h3 className="text-purple-200 text-base font-semibold ">
            {Math.round((day.max_temp + day.min_temp) / 2)} °C
          </h3>
          <p className="text-purple-300 text-right text-sm">{getDayFromDateShort(day.date)}</p>
        </div>
      ))}
    </div>
  );
};