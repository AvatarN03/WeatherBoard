import { Moon, Sun } from "lucide-react";
import { formatTimestamp } from "../lib/weather";
import type { Astro as AstroType } from "../types";


export const Astro = ({ astro, timezone }: {astro: AstroType, timezone: string}) => {
    return (
        <div className="bg-neutral-900 border border-purple-500/20 backdrop-blur-sm p-4 rounded-lg h-full w-full">
            <h2 className="text-purple-200 font-semibold mb-6">Sunrise & Sunset</h2>
            <div className="flex justify-between items-center gap-4 flex-col sm:flex-row">
                <div className="space-y-2 text-center sm:text-left">
                    <Sun className="w-10 h-10 mx-auto sm:mx-0 text-purple-100" />
                    <p className="text-sm text-purple-200">Sunrise</p>
                    <h1 className="text-xl font-light text-purple-100">{formatTimestamp(astro.sunrise, timezone, { showMinutes: true })}</h1>
                </div>
                <div className="hidden sm:block w-px h-16 bg-purple-500/20"></div>
                <div className="space-y-2 text-center sm:text-left">
                    <Moon className="w-10 h-10 mx-auto sm:mx-0 text-purple-100" />
                    <p className="text-sm text-purple-200">Sunset</p>
                    <h1 className="text-xl font-light text-purple-100">{formatTimestamp(astro.sunset, timezone, { showMinutes: true })}</h1>
                </div>
            </div>
        </div>
    );
};