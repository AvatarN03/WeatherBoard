import React from "react";
import { render } from "@react-email/render";
import type { InngestEvent } from "../../src/types.js";
import { WelcomeEmail } from "../../src/components/WelcomeEmail.js";
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
  async ({ event }: { event: { data: InngestEvent } }) => {
    const { email, city } = event.data;

    const html = await render(<WelcomeEmail email={email} city={city} />);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to WeatherBoard — You're all set! 🌤️",
      html
    });

    return { success: true, email };
  },
);
