import { render } from "@react-email/render";
import type { InngestEvent } from "../../../src/types.js";
import { WelcomeEmail } from "../../../src/components/WelcomeEmail.js";
import { inngest } from "../client.js";
import { sendEmail } from "../lib/sendEmail.js";


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

    await sendEmail({
      to: email,
      subject: "Welcome to WeatherBoard — You're all set! 🌤️",
      html,
    });

    return { success: true, email };
  },
);
