import { WeatherIcon } from "./WeatherIcon";
import { getHourOnly, getWindDirection, GetWindIcon } from "../lib/weather";
import type { HourlyWeather } from "../types";

export const HourlyForecast = ({ hourly }: { hourly: HourlyWeather[] }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium tracking-widest uppercase text-purple-200">
                Today · Hourly
            </h3>

            <div className="flex gap-2 overflow-x-auto pb-4 custom-scroll">
                {hourly.map((h, i) => {
                    const WindIcon = GetWindIcon(h.wind_direction);
                    return (
                        <div
                            key={i}
                            className="group shrink-0 w-28 rounded-2xl border border-white/5 bg-white/10 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-200 overflow-hidden"
                        >
                            {/* Time header */}
                            <div className="px-3 pt-3 pb-2 text-center">
                                <p className="text-lg font-medium tracking-wide text-purple-100 uppercase">
                                    {getHourOnly(h.time)}
                                </p>
                            </div>

                            {/* Weather section */}
                            <div className="flex flex-col items-center gap-1 px-3 pb-3">
                                <WeatherIcon
                                    icon={h.icon}
                                    className="w-9 h-9 text-purple-200 drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]"
                                />
                                <p className="text-xl font-semibold text-white tabular-nums">
                                    {h.temp}°
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="mx-3 h-px bg-white/15" />

                            {/* Wind section */}
                            <div
                                className="flex flex-col items-center gap-1 px-3 pt-4.5 pb-3"
                                title={`${h.wind_direction}°`}
                            >
                                <WindIcon className="w-8 h-8 text-purple-200/80 group-hover:text-purple-300 transition-colors" />
                                <p className="text-lg font-medium text-yellow-300 tracking-wide">
                                    {getWindDirection(h.wind_direction)}
                                </p>
                                <p className="text-lg font-semibold text-purple-200/90 tabular-nums">
                                    {h.wind_speed} m/s
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};