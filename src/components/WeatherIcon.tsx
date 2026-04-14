import { Sun } from "lucide-react";

import { ICON_MAP } from "../lib/weather";

export const WeatherIcon = ({ icon, className }: { icon: string, className?:string }) => {
  const Icon = ICON_MAP[icon] || Sun;

  return <Icon className={className || "w-6 h-6 text-purple-300"} />;
};