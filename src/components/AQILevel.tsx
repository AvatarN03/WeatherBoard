import { getAQIColor} from "../lib/weather";

export const AQILevel = ({ level }: { level: string }) => {
   const colorClass = getAQIColor(level);

  return (
    <p
      className={`text-sm font-semibold px-3 py-1 border border-transparent hover:border-white rounded-full ${colorClass}`}
    >
      {level}
    </p>
  );
};