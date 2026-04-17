import { Droplets, Eye, Gauge, Thermometer } from "lucide-react";

import { AQI } from "./AQI";
import { Astro } from "./Astro";

import type { WeatherData } from "../types";




export const Highlights = ({ data }: { data: WeatherData }) => {
    return (
        <div className="">
            <h2 className="text-purple-200 mb-4">Today's Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full items-stretch">
                <div className="col-span-2 lg:col-span-2">
                    <AQI data={data.airQuality} />
                </div>

                <div className="col-span-2 lg:col-span-2">
                    <Astro astro={data.astro} timezone={data.location.timezone} />
                </div>

                <div className="col-span-1">
                    <div className="space-y-4 bg-neutral-900 border border-purple-500/20 hover:border-purple-500/80 backdrop-blur-sm p-4 rounded-lg h-full">
                        <p className="text-purple-300 text-sm">Humidity</p>
                        <div className="flex flex-col">
                            <Droplets className="w-6 h-6 text-purple-400 mb-2" />
                            <h1 className="text-2xl font-bold text-purple-100">{data.highlights.humidity} %</h1>
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="space-y-4 bg-neutral-900 border border-purple-500/20 hover:border-purple-500/80 backdrop-blur-sm p-4 rounded-lg h-full">
                        <p className="text-purple-300 text-sm">Pressure</p>
                        <div className="flex flex-col">
                            <Gauge className="w-6 h-6 text-purple-400 mb-2" />
                            <h1 className="text-2xl font-bold text-purple-100">{data.highlights.pressure} hPa</h1>
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="space-y-4 bg-neutral-900 border border-purple-500/20 hover:border-purple-500/80 backdrop-blur-sm p-4 rounded-lg h-full">
                        <p className="text-purple-300 text-sm">Visibility</p>
                        <div className="flex flex-col">
                            <Eye className="w-6 h-6 text-purple-400 mb-2" />
                            <h1 className="text-2xl font-bold text-purple-100">{data.highlights.visibility} km</h1>
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="space-y-4 bg-neutral-900 border border-purple-500/20 hover:border-purple-500/80 backdrop-blur-sm p-4 rounded-lg h-full">
                        <p className="text-purple-300 text-sm">Feels Like</p>
                        <div className="flex flex-col">
                            <Thermometer className="w-6 h-6 text-purple-400 mb-2" />
                            <h1 className="text-2xl font-bold text-purple-100">{data.highlights.feels_like} °C</h1>
                        </div>
                    </div>
                </div>



            </div>
        </div>

    );
};