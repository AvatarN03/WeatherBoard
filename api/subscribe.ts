import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "../src/lib/mongo.js";
import { inngest } from "../inngest/client.js";


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("weatherboard");
    const collection = db.collection("subscribers");

    const existing = await collection.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Already subscribed" });
    }

    await collection.insertOne({
      email,
      active: true,
      subscribedAt: new Date(),
    });

    // Fire Inngest event → triggers welcome email function
    await inngest.send({
      name: "newsletter/subscribed",
      data: { email },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}