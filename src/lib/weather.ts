import {
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  ArrowDownRight,
  ArrowDown,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpLeft,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  type LucideIcon,
} from "lucide-react";


//AQI
export const getAQILevel = (aqi: number): "Good" | "Moderate" | "Poor" => {
  if (aqi <= 2) return "Good";
  if (aqi <= 3) return "Moderate";
  return "Poor";
};


// Day 
export const getDayFromDateShort = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });
};

export const getDayFromDateLong = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
};


// Time 
export function formatTimestamp(
  timestamp: string,
  timezoneOffset: string,
  options?: { showMinutes?: boolean },
) {
  // convert to ms + apply timezone offset
  const date = new Date((Number(timestamp) + Number(timezoneOffset)) * 1000);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  // convert to 12-hour
  hours = hours % 12 || 12;

  if (!options?.showMinutes) {
    return `${hours} ${ampm}`;
  }

  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${formattedMinutes} ${ampm}`;
}

export function getHourOnly(dateTime: string) {
  const date = new Date(dateTime.replace(" ", "T"));

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours} ${ampm}`;
}


// Direction 
export const GetWindIcon = (deg: number): LucideIcon => {
  if (deg >= 337.5 || deg < 22.5) return ArrowUp;
  if (deg < 67.5) return ArrowUpRight;
  if (deg < 112.5) return ArrowRight;
  if (deg < 157.5) return ArrowDownRight;
  if (deg < 202.5) return ArrowDown;
  if (deg < 247.5) return ArrowDownLeft;
  if (deg < 292.5) return ArrowLeft;
  return ArrowUpLeft;
};



export const getWindDirection = (deg: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

// Icon 

export const ICON_MAP: Record<string, LucideIcon> = {
  "01d": Sun,
  "01n": Moon,
  "02d": Cloud,
  "02n": Cloud,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudRain,
  "09n": CloudRain,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
};
