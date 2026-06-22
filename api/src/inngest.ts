import { serve } from "inngest/node";
import { sendWelcomeEmail } from "../../inngest-fn/functions/welcomeEmail.js";
import { sendDailyDigest } from "../../inngest-fn/functions/sendDailyDigest.js";
import { inngest } from "../../inngest-fn/client.js";

const handler = serve({
  client: inngest,
  functions: [sendWelcomeEmail, sendDailyDigest],
});


export default handler;