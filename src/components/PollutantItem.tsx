import { useEffect, useState } from "react";
import { Info } from "lucide-react";

import { getColor, pollutantConfig } from "../lib/weather";

export const PollutantItem = ({ type, value }: {
    type: keyof typeof pollutantConfig;
    value: number;
}) => {
    const [open, setOpen] = useState(false);

    const config = pollutantConfig[type];
    const color = getColor(value, config.safe, config.moderate);

    useEffect(() => {
        const handleClick = () => setOpen(false);
        if (open) window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [open]);

    return (
        <div className="relative space-y-2">

            {/* Value */}
            <h1 className={`text-3xl font-light ${color}`}>
                {value.toFixed(1)}
            </h1>

            {/* Label + Info Icon */}
            <div className="flex items-center gap-1">
                <p className="text-sm text-purple-200">
                    {config.label}
                </p>

                <Info
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                    className="w-4 h-4 text-purple-300 cursor-pointer"
                />
            </div>

            {/* Tooltip */}
            {open && (
                <div className="absolute z-10 top-0 -left-20 mt-2 w-52 bg-black/90 text-white text-xs p-3 rounded shadow-lg">
                    <p className="font-semibold">{config.label}</p>
                    <p>{config.desc}</p>
                    <p className="mt-1 text-gray-300">
                        Safe: 0–{config.safe} µg/m³
                    </p>
                </div>
            )}
        </div>
    );
};