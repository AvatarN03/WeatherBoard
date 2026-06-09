import { serve } from "inngest/node";
import { inngest } from "../inngest/client.js";
import { sendWelcomeEmail } from "../inngest/functions/welcomeEmail";
import { sendDailyDigest } from "../inngest/functions/sendDailyDigest";

const handler = serve({
  client: inngest,
  functions: [sendWelcomeEmail, sendDailyDigest],
});


export default handler;