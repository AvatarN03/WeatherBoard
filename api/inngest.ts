import { serve } from "inngest/node";
import { inngest } from "../inngest/client.js";
import { sendWelcomeEmail } from "../inngest/functions/welcomeEmail.js";
import { sendDailyDigest } from "../inngest/functions/sendDaily.js";

const handler = serve({
  client: inngest,
  functions: [sendWelcomeEmail, sendDailyDigest],
});

export default handler;