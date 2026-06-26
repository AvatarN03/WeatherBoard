export function formatTime(unix: string, timezoneOffset: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(
    new Date((Number(unix) + Number(timezoneOffset)) * 1000)
  );
}