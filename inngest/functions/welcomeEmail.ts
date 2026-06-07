import { inngest } from "../client.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = inngest.createFunction(
  {
    id: "send-welcome-email",
    name: "Send Welcome Email",
    triggers: [
      {
        event: "newsletter/subscribed",
      },
    ],
  },
  async ({ event }: any) => {
    const email = event.data.email as string;
    const city = event.data.city as string;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to WeatherBoard — You're all set! 🌤️",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:Arial,sans-serif;">
<div style="max-width:520px;margin:0 auto;padding:40px 16px;">

  <!-- Header / Logo -->
  <div style="text-align:center;margin-bottom:32px;">
    <div style="display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:16px;margin-bottom:16px;">
      <span style="font-size:32px;">🌤️</span>
    </div>
    <h1 style="color:#a78bfa;font-size:26px;margin:0;letter-spacing:-0.5px">WeatherBoard</h1>
    <p style="color:#6b7280;font-size:13px;margin:6px 0 0">Real-time weather, delivered to you</p>
  </div>

  <!-- Welcome Card -->
  <div style="background:#1a1a2e;border-radius:20px;padding:32px;margin-bottom:16px;border:1px solid #2a2a3a;">
    <h2 style="color:#fff;font-size:22px;margin:0 0 8px">Welcome aboard! 🎉</h2>
    <p style="color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 20px">
      You've successfully subscribed to WeatherBoard's daily weather digest.
      Every morning you'll receive a personalized weather report for
      <strong style="color:#a78bfa">${city}</strong> — so you're always one step ahead of the weather.
    </p>

    <div style="border-top:1px solid #2a2a3a;padding-top:20px;">
      <p style="color:#6b7280;font-size:12px;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.08em">What you'll get every day</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;vertical-align:top;width:32px;font-size:18px;">🌡️</td>
          <td style="padding:8px 0;">
            <p style="color:#fff;font-size:14px;font-weight:bold;margin:0">Current conditions</p>
            <p style="color:#6b7280;font-size:13px;margin:2px 0 0">Temperature, humidity, wind speed & feels like</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;vertical-align:top;width:32px;font-size:18px;">⏱️</td>
          <td style="padding:8px 0;">
            <p style="color:#fff;font-size:14px;font-weight:bold;margin:0">Hourly forecast</p>
            <p style="color:#6b7280;font-size:13px;margin:2px 0 0">Hour-by-hour breakdown for planning your day</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;vertical-align:top;width:32px;font-size:18px;">📅</td>
          <td style="padding:8px 0;">
            <p style="color:#fff;font-size:14px;font-weight:bold;margin:0">5-day forecast</p>
            <p style="color:#6b7280;font-size:13px;margin:2px 0 0">Plan your week with daily min/max temperatures</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;vertical-align:top;width:32px;font-size:18px;">🌿</td>
          <td style="padding:8px 0;">
            <p style="color:#fff;font-size:14px;font-weight:bold;margin:0">Air quality index</p>
            <p style="color:#6b7280;font-size:13px;margin:2px 0 0">PM2.5, AQI level and pollution breakdown</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;vertical-align:top;width:32px;font-size:18px;">🌅</td>
          <td style="padding:8px 0;">
            <p style="color:#fff;font-size:14px;font-weight:bold;margin:0">Sunrise & sunset</p>
            <p style="color:#6b7280;font-size:13px;margin:2px 0 0">Know exactly when golden hour hits</p>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <!-- CTA -->
  <div style="background:#1a1a2e;border-radius:20px;padding:28px;margin-bottom:16px;border:1px solid #2a2a3a;text-align:center;">
    <p style="color:#9ca3af;font-size:14px;margin:0 0 16px">
      Your first digest arrives tomorrow at <strong style="color:#fff">8:00 AM</strong>. Until then, check the live dashboard for real-time weather in ${city}.
    </p>
    <a href="https://weather-board-js.vercel.app/"
       style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:bold;letter-spacing:0.02em">
      Open WeatherBoard →
    </a>
  </div>

  <!-- Info strip -->
  <div style="background:#1a1a2e;border-radius:16px;padding:20px 24px;margin-bottom:24px;border:1px solid #2a2a3a;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="text-align:center;padding:0 8px;">
          <p style="color:#a78bfa;font-size:20px;font-weight:bold;margin:0">Daily</p>
          <p style="color:#6b7280;font-size:12px;margin:4px 0 0">Digest frequency</p>
        </td>
        <td style="text-align:center;padding:0 8px;border-left:1px solid #2a2a3a;">
          <p style="color:#a78bfa;font-size:20px;font-weight:bold;margin:0">8 AM</p>
          <p style="color:#6b7280;font-size:12px;margin:4px 0 0">Delivery time (UTC)</p>
        </td>
        <td style="text-align:center;padding:0 8px;border-left:1px solid #2a2a3a;">
          <p style="color:#a78bfa;font-size:16px;font-weight:bold;margin:0">${city}</p>
          <p style="color:#6b7280;font-size:12px;margin:4px 0 0">Your city</p>
        </td>
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <div style="text-align:center;">
    <p style="color:#374151;font-size:12px;line-height:1.6;margin:0">
      You subscribed with <span style="color:#6b7280">${email}</span><br/>
      Built with ❤️ using React, TypeScript & OpenWeather API<br/>
      <a href="https://weather-board-js.vercel.app/" style="color:#7c3aed;text-decoration:none;">weather-board-js.vercel.app</a>
    </p>
  </div>

</div>
</body>
</html>
      `,
    });

    return { success: true, email };
  },
);
