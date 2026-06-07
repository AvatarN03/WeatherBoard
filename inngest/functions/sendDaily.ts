import clientPromise from "../../src/lib/mongo";
import { inngest } from "../client";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendDailyDigest = inngest.createFunction(
  {
    id: "daily-weather-digest",
    name: "Daily Weather Digest",
    triggers: [
      {
        cron: "0 8 * * *",
      },
    ],
  },
  async () => {
    const client = await clientPromise;
    const db = client.db("weatherboard");
    const subscribers = await db
      .collection("subscribers")
      .find({ active: true })
      .toArray();

    for (const subscriber of subscribers) {
      await resend.emails.send({
        from: "WeatherBoard <newsletter@yourdomain.com>",
        to: subscriber.email,
        subject: "Your Daily Weather Digest 🌤️",
        html: `
          <h1>Daily Weather Update</h1>
          <p>Check the latest forecasts on your WeatherBoard dashboard.</p>
          <a href="https://weather-board-js.vercel.app/">View Dashboard →</a>
        `,
      });
    }

    return { sent: subscribers.length };
  },
);
