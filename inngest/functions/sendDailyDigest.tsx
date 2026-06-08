import { render } from "@react-email/render";
import { Resend } from "resend";
import { inngest } from "../client.js";
import { getGroupedSubscribers } from "../../src/lib/getGroupSubscribers.js";
import { WeatherDigest } from "../../src/components/SendDailyDigest.js";
import getWeatherFullByCoords from "../lib/getWeatherByCoord.js";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendDailyDigest = inngest.createFunction( 
  {
    id: "daily-weather-digest",
    name: "Daily Weather Digest",
    triggers: [{ cron: "8 0 * * *" }],
  },
  async () => {
    // ✅ Grouping done in Mongo — no client-side work
    const groups = await getGroupedSubscribers();

    let sent = 0;
    let failed = 0;
    let total = 0;

    for (const group of groups) {
      total += group.subscribers.length;

      let weather;
      try {
        weather = await getWeatherFullByCoords(group.lat, group.lon);
      } catch (err) {
        console.error(`Weather fetch failed for (${group.lat}, ${group.lon}):`, err);
        failed += group.subscribers.length;
        continue;
      }

      // ✅ Render once per location tile, send to all subscribers in group
      const html = await render(<WeatherDigest weather={weather} />);

      const emailResults = await Promise.allSettled(
        group.subscribers.map((sub) =>
          resend.emails.send({
            from: "onboarding@resend.dev",
            to: sub.email,
            subject: `Today's weather in  ${weather.location.city} 🌤️`,
            html,
          })
        )
      );

      for (const result of emailResults) {
        if (result.status === "fulfilled") {
          sent++;
        } else {
          failed++;
          console.error("Email failed:", result.reason);
        }
      }
    }

    return { sent, failed, total, uniqueLocations: groups.length };
  }
);