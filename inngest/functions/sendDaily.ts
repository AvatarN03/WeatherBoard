import clientPromise from "../../src/lib/mongo.js";
import { inngest } from "../client.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const API_KEY = process.env.VITE_OPENWEATHER_API_KEY;

async function getWeatherForCity(city: string) {
  // Step 1 - current weather (get lat/lon)
  const currentRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );
  const current = await currentRes.json();
  if (!currentRes.ok) throw new Error(current.message);

  const { lat, lon } = current.coord;

  // Step 2 - forecast + AQI in parallel
  const [forecastRes, aqiRes] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=4`,
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    ),
  ]);

  const forecast = await forecastRes.json();
  const aqi = await aqiRes.json();

  return { current, forecast, aqi };
}

const AQI_LABELS = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

function buildEmailHtml(city: string, current: any, forecast: any, aqi: any) {
  const temp = Math.round(current.main.temp);
  const feelsLike = Math.round(current.main.feels_like);
  const humidity = current.main.humidity;
  const wind = Math.round(current.wind.speed * 3.6);
  const description = current.weather[0].description;
  const icon = current.weather[0].icon;
  const country = current.sys.country;
  const aqiLevel = AQI_LABELS[aqi.list[0].main.aqi] ?? "N/A";
  const pm25 = aqi.list[0].components.pm2_5.toFixed(1);

  const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString(
    "en-IN",
    { hour: "2-digit", minute: "2-digit" },
  );
  const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString(
    "en-IN",
    { hour: "2-digit", minute: "2-digit" },
  );

  const forecastRows = forecast.list
    .map((item: any) => {
      const time = new Date(item.dt * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a3a;color:#aaa">${time}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a3a;color:#fff">${Math.round(item.main.temp)}°C</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a3a;color:#aaa;text-transform:capitalize">${item.weather[0].description}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a3a;color:#aaa">${Math.round(item.wind.speed * 3.6)} km/h</td>
      </tr>`;
    })
    .join("");

  const daily = forecast.list
    .filter((item: any) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .map(
      (item: any) => `
      <div style="background:#0f0f1a;border-radius:10px;padding:12px;text-align:center;">
        <p style="color:#6b7280;font-size:11px;margin:0 0 4px">${item.dt_txt.split(" ")[0]}</p>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" width="36" height="36" alt=""/>
        <p style="color:#fff;font-size:14px;font-weight:bold;margin:4px 0">${Math.round(item.main.temp_max)}° <span style="color:#6b7280;font-weight:normal">${Math.round(item.main.temp_min)}°</span></p>
        <p style="color:#6b7280;font-size:11px;margin:0;text-transform:capitalize">${item.weather[0].description}</p>
      </div>
    `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:32px 16px;">

  <div style="text-align:center;margin-bottom:24px;">
    <h1 style="color:#a78bfa;font-size:22px;margin:0">🌤️ WeatherBoard</h1>
    <p style="color:#6b7280;font-size:13px;margin:6px 0 0">Your daily weather digest</p>
  </div>

  <!-- Current Weather -->
  <div style="background:#1a1a2e;border-radius:16px;padding:24px;margin-bottom:16px;">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="64" height="64" alt="${description}"/>
      <div>
        <h2 style="color:#fff;font-size:22px;margin:0">${city}, ${country}</h2>
        <p style="color:#a78bfa;font-size:13px;margin:4px 0 0;text-transform:capitalize">${description}</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
      <div style="background:#0f0f1a;border-radius:10px;padding:12px;text-align:center;">
        <p style="color:#6b7280;font-size:11px;margin:0 0 4px;text-transform:uppercase">Temp</p>
        <p style="color:#fff;font-size:22px;font-weight:bold;margin:0">${temp}°C</p>
        <p style="color:#6b7280;font-size:11px;margin:4px 0 0">Feels ${feelsLike}°C</p>
      </div>
      <div style="background:#0f0f1a;border-radius:10px;padding:12px;text-align:center;">
        <p style="color:#6b7280;font-size:11px;margin:0 0 4px;text-transform:uppercase">Humidity</p>
        <p style="color:#fff;font-size:22px;font-weight:bold;margin:0">${humidity}%</p>
        <p style="color:#6b7280;font-size:11px;margin:4px 0 0">Wind ${wind} km/h</p>
      </div>
      <div style="background:#0f0f1a;border-radius:10px;padding:12px;text-align:center;">
        <p style="color:#6b7280;font-size:11px;margin:0 0 4px;text-transform:uppercase">Air Quality</p>
        <p style="color:#fff;font-size:22px;font-weight:bold;margin:0">${aqiLevel}</p>
        <p style="color:#6b7280;font-size:11px;margin:4px 0 0">PM2.5 ${pm25}</p>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;margin-top:12px;padding:10px 16px;background:#0f0f1a;border-radius:10px;">
      <span style="color:#aaa;font-size:13px">🌅 Sunrise: <strong style="color:#fff">${sunrise}</strong></span>
      <span style="color:#aaa;font-size:13px">🌇 Sunset: <strong style="color:#fff">${sunset}</strong></span>
    </div>
  </div>

  <!-- Hourly Forecast -->
  <div style="background:#1a1a2e;border-radius:16px;padding:24px;margin-bottom:16px;">
    <h3 style="color:#a78bfa;font-size:13px;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em">Next few hours</h3>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <th style="text-align:left;padding:6px 12px;color:#6b7280;font-size:11px;font-weight:normal">Time</th>
        <th style="text-align:left;padding:6px 12px;color:#6b7280;font-size:11px;font-weight:normal">Temp</th>
        <th style="text-align:left;padding:6px 12px;color:#6b7280;font-size:11px;font-weight:normal">Condition</th>
        <th style="text-align:left;padding:6px 12px;color:#6b7280;font-size:11px;font-weight:normal">Wind</th>
      </tr>
      ${forecastRows}
    </table>
  </div>

  <!-- 5 Day Forecast -->
  <div style="background:#1a1a2e;border-radius:16px;padding:24px;margin-bottom:24px;">
    <h3 style="color:#a78bfa;font-size:13px;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em">5-day forecast</h3>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;">
      ${daily}
    </div>
  </div>

  <div style="text-align:center;">
    <a href="https://weather-board-js.vercel.app/"
       style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:bold">
      View Full Dashboard →
    </a>
  </div>

  <p style="color:#374151;font-size:11px;text-align:center;margin-top:24px">
    You're receiving this because you subscribed to WeatherBoard.
  </p>
</div>
</body>
</html>`;
}

export const sendDailyDigest = inngest.createFunction(
  {
    id: "daily-weather-digest",
    name: "Daily Weather Digest",
    triggers: [
      { cron: "*/1 * * * *" }, // ← every minute (for quick testing)
    ],
  },
  async () => {
    const client = await clientPromise;
    const db = client.db("weatherboard");
    const subscribers = await db
      .collection("subscribers")
      .find({ active: true })
      .toArray();

    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers) {
      try {
        const { current, forecast, aqi } = await getWeatherForCity(subscriber.city);

        if (!current) {
          console.error(`Could not fetch weather for ${subscriber.city}`);
          failed++;
          continue;
        }

        await resend.emails.send({
          from: "onboarding@resend.dev", // change to your domain once verified
          to: subscriber.email,
          subject: `Today's weather in ${subscriber.city} 🌤️`,
          html: buildEmailHtml(subscriber.city, current, forecast, aqi),
        });

        sent++;
      } catch (err) {
        console.error(`Failed for ${subscriber.email}:`, err);
        failed++;
      }
    }

    return { sent, failed, total: subscribers.length };
  },
);
