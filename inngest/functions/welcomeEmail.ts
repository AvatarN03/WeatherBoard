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
  async ({ event }) => {
    const email = event.data.email as string;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to WeatherBoard Newsletter! 🌤️",
      html: `
        <h1>You're subscribed!</h1>
        <p>Thanks for subscribing to WeatherBoard.</p>
      `,
    });

    return {
      success: true,
      email,
    };
  }
);