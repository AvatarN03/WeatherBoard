import { getHourOnly, GetWindIcon } from "../lib/weather";
import type { HourlyWeather } from "../types";
import { WeatherIcon } from "./WeatherIcon";


export const HourlyForecast = ({ hourly }: { hourly: HourlyWeather[] }) => {
    return (
        <div className="flex gap-3 overflow-x-auto pb-2">
            {hourly.map((h, i) => {
                const WindIcon = GetWindIcon(h.wind_direction);
                return (
                    <div key={i} className="flex flex-col gap-3 shrink-0">
                        <div className="p-4 bg-purple-900/30 border border-purple-500/20 backdrop-blur-sm rounded-lg min-w-25 text-center">
                            <p className="text-xs text-purple-400 mb-2">{getHourOnly(h.time)}</p>
                            <WeatherIcon icon={h.icon} className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                            <p className="text-purple-200 font-semibold">{h.temp}°</p>
                        </div>
                        <div className="p-4 bg-purple-900/30 border border-purple-500/20 backdrop-blur-sm rounded-lg min-w-25 text-center" title={String(h.wind_direction)}>
                            <p className="text-xs text-purple-400 mb-2">{getHourOnly(h.time)}</p>
                            <WindIcon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                            <p className="text-purple-200 font-semibold">{h.temp}°</p>
                        </div>
                    </div>
                )
            }
        )}
        </div>
    );
};