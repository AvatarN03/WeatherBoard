import { serve } from "inngest/next"; // works for Vercel too
import { inngest } from "../inngest/client";
import { sendWelcomeEmail } from "../inngest/functions/welcomeEmail";
import { sendDailyDigest } from "../inngest/functions/sendDaily";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendWelcomeEmail, sendDailyDigest],
});