import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "01d": Sun,
  "01n": Moon,
  "02d": Cloud,
  "03d": Cloud,
  "04d": Cloud,
  "09d": CloudRain,
  "10d": CloudRain,
  "11d": CloudLightning,
  "13d": CloudSnow,
  "50d": CloudFog,
};

export const WeatherIcon = ({ icon, className }: { icon: string, className?:string }) => {
  const Icon = ICON_MAP[icon] || Sun;

  return <Icon className={className || "w-6 h-6 text-purple-300"} />;
};