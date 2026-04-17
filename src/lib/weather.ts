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

import type { AirQuality } from "../types";


//AQI
export const getAQILevel = (
  aqi: number
): AirQuality["level"] => {
  switch (aqi) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
    default:
      return "Good";
  }
};

export const getAQIColor = (level: string) => {
  switch (level) {
    case "Good":
      return "bg-green-500 text-white";
    case "Fair":
      return "bg-lime-400 text-black";
    case "Moderate":
      return "bg-yellow-400 text-black";
    case "Poor":
      return "bg-orange-500 text-white";
    case "Very Poor":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

export const pollutantConfig = {
  pm2_5: {
    label: "PM2.5",
    desc: "Fine particles that enter lungs and bloodstream.",
    safe: 12,
    moderate: 35,
  },
  so2: {
    label: "SO₂",
    desc: "Gas from burning fossil fuels.",
    safe: 20,
    moderate: 80,
  },
  no2: {
    label: "NO₂",
    desc: "Traffic-related gas harmful to lungs.",
    safe: 40,
    moderate: 100,
  },
  o3: {
    label: "O₃",
    desc: "Ground-level ozone affecting breathing.",
    safe: 100,
    moderate: 160,
  },
  co: {
    label: "CO",
    desc: "Reduces oxygen delivery in body.",
    safe: 4400,
    moderate: 9400,
  },
};

export const getColor = (value: number, safe: number, moderate: number) => {
  if (value <= safe) return "text-green-400";
  if (value <= moderate) return "text-yellow-400";
  return "text-red-400";
}

// Day 
export const getDayFromDateShort = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

export const getDayFromDateLong = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
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
