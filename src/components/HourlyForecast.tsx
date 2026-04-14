import { WeatherIcon } from "./WeatherIcon";

import { getHourOnly, getWindDirection, GetWindIcon } from "../lib/weather";
import type { HourlyWeather } from "../types";


export const HourlyForecast = ({ hourly }: { hourly: HourlyWeather[] }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-purple-300">Today Hourly</h3>

            <div className="flex gap-3 overflow-x-auto pb-8 custom-scroll">
                {hourly.map((h, i) => {
                    const WindIcon = GetWindIcon(h.wind_direction);
                    return (
                        <div key={i} className="flex flex-col gap-3 shrink-0">
                            <div className="p-4 bg-neutral-900 border border-purple-500/20 backdrop-blur-sm rounded-lg min-w-25 text-center hover:bg-purple-800/20">
                                <p className="text-sm text-purple-200 mb-2">{getHourOnly(h.time)}</p>
                                <WeatherIcon icon={h.icon} className="w-8 h-8 text-purple-200 mx-auto mb-2" />
                                <p className="text-purple-200 font-semibold">{h.temp} °C</p>
                            </div>
                            <div className="p-4 bg-purple-950 border border-purple-500/20 hover:bg-purple-950/40 backdrop-blur-sm rounded-lg min-w-25 text-center" title={String(h.wind_direction)}>
                                <p className="text-sm text-purple-200 mb-2">{getHourOnly(h.time)}</p>
                                <WindIcon className="w-10 h-10 text-purple-200 mx-auto mb-2" />
                                <p className="text-purple-200 font-medium">{getWindDirection(h.wind_direction)}</p>
                                <p className="text-purple-200 font-semibold">{h.wind_speed} m/s</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
};