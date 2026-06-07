export default function handler(req: any, res: any) {
    console.log(process.env.INNGEST_SIGNING_KEY);
  res.json({
    resend: process.env.RESEND_API_KEY ? "FOUND" : "MISSING",
    mongo: process.env.MONGODB_URI ? "FOUND" : "MISSING",
  });
}