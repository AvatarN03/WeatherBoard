import { serve } from "inngest/next"; // works for Vercel too
import { inngest } from "../inngest/client.js";
import { sendWelcomeEmail } from "../inngest/functions/welcomeEmail.js";
import { sendDailyDigest } from "../inngest/functions/sendDaily.js";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendWelcomeEmail, sendDailyDigest],
});